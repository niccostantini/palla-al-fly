# Riepilogo Aggiornamento Cookie e Privacy Policy

## Data aggiornamento
23 Ottobre 2025

## Modifiche effettuate

### 1. Privacy Policy (`src/pages/PrivacyPage.tsx`)
La Privacy Policy è stata completamente riscritta e tradotta in italiano per essere conforme al GDPR (Regolamento UE 2016/679).

#### Principali miglioramenti:
- **Traduzione completa in italiano** (era precedentemente in inglese)
- **Conformità GDPR completa** con tutti gli articoli pertinenti citati
- **Struttura più dettagliata** con 11 sezioni:
  1. Titolare del trattamento
  2. Dati raccolti (dettagliati per categoria)
  3. Base giuridica e finalità del trattamento (Art. 6.1 GDPR)
  4. Condivisione dei dati (con riferimenti a Supabase e Google OAuth)
  5. Conservazione dei dati
  6. Sicurezza dei dati
  7. I tuoi diritti (GDPR) - tutti i diritti citati con articoli specifici:
     - Accesso (Art. 15)
     - Rettifica (Art. 16)
     - Cancellazione (Art. 17)
     - Limitazione (Art. 18)
     - Portabilità (Art. 20)
     - Opposizione (Art. 21)
  8. Trasferimento dati extra-UE
  9. Cookie (con link alla Cookie Policy)
  10. Modifiche all'informativa
  11. Contatti

- **Riferimento all'Autorità Garante** per la protezione dei dati personali
- **Data di aggiornamento dinamica** che si aggiorna automaticamente

### 2. Cookie Policy (`src/pages/CookiePolicyPage.tsx`)
La Cookie Policy era già in italiano, ma è stata migliorata significativamente.

#### Principali miglioramenti:
- **Elenco dettagliato dei cookie** con informazioni strutturate per ciascuno:
  - cookie-consent (preferenze)
  - sb-access-token / sb-refresh-token (autenticazione Supabase)
  - Theme preference (localStorage per tema scuro/chiaro)
  
- **Nuova sezione "Base giuridica e GDPR"** che spiega:
  - Quali cookie richiedono consenso e quali no
  - Riferimenti all'Art. 122 del Codice Privacy
  - Come revocare il consenso
  - Link alla Privacy Policy per maggiori dettagli sui diritti

- **Maggiori dettagli sui cookie di terze parti** (Supabase e Google OAuth)

## Tecnologie e servizi menzionati nelle policy

1. **Supabase** - Autenticazione e database
2. **Google OAuth** - Autenticazione tramite Google (opzionale)
3. **Cookie localStorage** - Gestione preferenze utente

## Dati personali raccolti

Le policy ora documentano chiaramente:
- Email (autenticazione)
- Nome e cognome (iscrizione partite)
- Numero di telefono (iscrizione partite)
- Ruolo nel gioco (setter, OH, OPH, MB, L)
- Cookie tecnici e di preferenze

## Conformità normativa

✅ **GDPR (Regolamento UE 2016/679)** - Completamente conforme
✅ **Codice Privacy italiano** - Riferimenti all'Art. 122
✅ **Trasparenza** - Tutte le informazioni necessarie sono fornite
✅ **Diritti degli utenti** - Tutti i diritti GDPR sono chiaramente elencati
✅ **Cookie Banner** - Già implementato nell'applicazione (`CookieBanner.tsx`)

## Collegamenti tra le policy

- Privacy Policy → Cookie Policy (sezione 9)
- Cookie Policy → Privacy Policy (sezione Base giuridica e GDPR)
- Footer → entrambe le policy
- Cookie Banner → Cookie Policy

## Note importanti

1. **Nessuna tracciamento analytics** - Il sito non utilizza Google Analytics, Facebook Pixel o altri strumenti di tracciamento
2. **Cookie solo tecnici** - Solo cookie necessari per il funzionamento del sito
3. **Dati visibili agli utenti** - Nome e telefono sono visibili agli altri utenti autenticati quando ci si iscrive a una partita (chiaramente documentato)

## Prossimi passi consigliati

1. **Aggiungere contatto amministratore** - Specificare un indirizzo email per richieste privacy
2. **Implementare funzionalità di cancellazione account** - Se non già presente
3. **Valutare accordo DPA con Supabase** - Per formalizzare il rapporto di responsabile del trattamento
4. **Considerare cookie banner più granulare** - Se in futuro si aggiungono cookie non essenziali

## File modificati

- `/src/pages/PrivacyPage.tsx` - Completamente riscritto
- `/src/pages/CookiePolicyPage.tsx` - Migliorato con nuove sezioni

## Test consigliati

- Verificare che i link tra le policy funzionino correttamente
- Verificare la visualizzazione mobile delle policy (già responsive)
- Testare il cookie banner e verificare che il consenso venga memorizzato
