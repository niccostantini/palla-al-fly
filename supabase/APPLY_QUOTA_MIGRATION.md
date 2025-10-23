# Applicare la Migration per il Limite di Quota Partite

## Obiettivo
Questa migration implementa un limite hard di **3 partite per utente negli ultimi 7 giorni** (finestra mobile), con esenzione per gli admin.

## Come Applicare la Migration

### Opzione 1: Tramite Dashboard Supabase (Consigliata)
1. Vai su [Supabase Dashboard](https://app.supabase.com)
2. Seleziona il tuo progetto "palla-al-fly"
3. Nel menu laterale, clicca su **SQL Editor**
4. Clicca su **New Query**
5. Copia tutto il contenuto del file `migration_match_quota_limit.sql`
6. Incollalo nell'editor SQL
7. Clicca su **Run** per eseguire la migration

### Opzione 2: Tramite CLI Supabase
```bash
# Dalla directory del progetto
cd /Users/niccolo/Desktop/palla-al-fly

# Assicurati che Supabase CLI sia installato
# Se non installato: brew install supabase/tap/supabase

# Applica la migration
supabase db push --db-url "postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

## Cosa Fa la Migration

1. **Crea funzione `count_user_matches_last_7_days(user_email TEXT)`**
   - Conta le partite create dall'utente negli ultimi 7 giorni
   - Usa timestamp `created_at` per calcolo preciso (non giorni di calendario)

2. **Crea funzione `is_user_admin(user_email TEXT)`**
   - Verifica se un utente è presente nella tabella `admins`
   - Usata per esentare gli admin dal limite

3. **Sostituisce la policy RLS su `matches`**
   - Vecchia policy: "Authenticated users can insert matches"
   - Nuova policy: "Authenticated users can insert matches with quota limit"
   - Blocca INSERT se l'utente ha già 3+ partite negli ultimi 7 giorni
   - Gli admin possono sempre creare partite (nessun limite)

4. **Crea index su `matches.created_at`**
   - Ottimizza le query di conteggio per performance

5. **Grant permessi di esecuzione**
   - Permette agli utenti autenticati di chiamare le funzioni RPC

## Verifica Post-Migration

Dopo aver applicato la migration, verifica che tutto funzioni:

### 1. Test manuale nel SQL Editor
```sql
-- Verifica che le funzioni esistano
SELECT count_user_matches_last_7_days('test@example.com');
SELECT is_user_admin('your-admin-email@example.com');

-- Verifica che la policy sia attiva
SELECT * FROM pg_policies WHERE tablename = 'matches' AND policyname LIKE '%quota%';

-- Verifica l'index
SELECT * FROM pg_indexes WHERE tablename = 'matches' AND indexname = 'idx_matches_created_at';
```

### 2. Test dall'UI
1. Login come utente normale (non admin)
2. Vai su "Crea Partita"
3. Dovresti vedere: "Partite create negli ultimi 7 giorni: X/3"
4. Crea fino a 3 partite
5. Al quarto tentativo, il pulsante dovrebbe essere disabilitato
6. Se provi comunque (manipolando il client), il DB dovrebbe rifiutare l'INSERT

### 3. Test come Admin
1. Login come admin
2. Vai su "Crea Partita"
3. Dovresti vedere: "Admin - nessun limite di quota"
4. Puoi creare infinite partite senza blocchi

## Rollback (Se Necessario)

Se vuoi rimuovere il limite quota e tornare alla policy precedente:

```sql
-- Rimuovi la policy con quota
DROP POLICY IF EXISTS "Authenticated users can insert matches with quota limit" ON matches;

-- Ricrea la policy semplice originale
CREATE POLICY "Authenticated users can insert matches"
  ON matches FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND
    auth.jwt() ->> 'email' = created_by
  );

-- Opzionale: rimuovi le funzioni se non servono
DROP FUNCTION IF EXISTS count_user_matches_last_7_days(TEXT);
DROP FUNCTION IF EXISTS is_user_admin(TEXT);

-- Opzionale: rimuovi l'index se non serve
DROP INDEX IF EXISTS idx_matches_created_at;
```

## Note Tecniche

- **Finestra Mobile**: Il conteggio usa `NOW() - INTERVAL '7 days'`, quindi è dinamico e basato sul timestamp esatto
- **Performance**: L'index su `created_at` garantisce che le query di conteggio siano veloci anche con migliaia di partite
- **Sicurezza**: Le funzioni sono `SECURITY DEFINER` ma sicure perché fanno solo SELECT/verifiche
- **Client-side**: L'UI mostra preventivamente la quota, ma il blocco finale è sempre lato DB (non aggirabile)

## Troubleshooting

### "Permission denied for function count_user_matches_last_7_days"
Assicurati di aver eseguito i GRANT:
```sql
GRANT EXECUTE ON FUNCTION count_user_matches_last_7_days(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION is_user_admin(TEXT) TO authenticated;
```

### "Function already exists"
Se riapplichi la migration, usa `CREATE OR REPLACE FUNCTION` (già nel file).

### La quota non si aggiorna nell'UI
Verifica che il metodo `getUserMatchQuota` in `matches.service.ts` stia chiamando correttamente `supabase.rpc()`.
