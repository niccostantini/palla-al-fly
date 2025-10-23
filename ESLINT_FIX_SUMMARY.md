# Risoluzione Errori ESLint Fast Refresh

## Data risoluzione
23 Ottobre 2025

## Problema
ESLint segnalava errori Fast Refresh su `AuthContext.tsx` e `ThemeContext.tsx`:
```
Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
```

## Causa
I file dei context esportavano sia:
- Un componente React (Provider)
- Hook personalizzati (useAuth, useTheme)
- Context definition

Questo causava problemi con Fast Refresh di React, che richiede che i file esportino SOLO componenti oppure SOLO funzioni/costanti.

## Soluzione implementata

### 1. Separazione dei Context
Creati file separati per le definizioni dei context:
- `src/contexts/auth-context.ts` - Definizione di `AuthContext` e `AuthContextType`
- `src/contexts/theme-context.ts` - Definizione di `ThemeContext` e `ThemeContextType`

### 2. Creazione di Hook dedicati
Creati file separati per gli hooks:
- `src/hooks/useAuth.ts` - Hook per accedere al `AuthContext`
- `src/hooks/useTheme.ts` - Hook per accedere al `ThemeContext`

### 3. Aggiornamento dei Provider
- `src/contexts/AuthContext.tsx` - Ora esporta SOLO `AuthProvider` (componente)
- `src/contexts/ThemeContext.tsx` - Ora esporta SOLO `ThemeProvider` (componente)

### 4. Aggiornamento degli import
Tutti i file che usavano gli hooks sono stati aggiornati:
- `src/pages/VenuesPage.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/CreateMatchPage.tsx`
- `src/pages/MatchDetail.tsx`
- `src/pages/AuthPage.tsx`
- `src/components/Header.tsx`
- `src/components/PlayerSignupForm.tsx`

## Struttura finale

```
src/
├── contexts/
│   ├── auth-context.ts          # Context definition (NO components)
│   ├── AuthContext.tsx           # Provider component ONLY
│   ├── theme-context.ts          # Context definition (NO components)
│   └── ThemeContext.tsx          # Provider component ONLY
├── hooks/
│   ├── useAuth.ts                # Hook per AuthContext
│   ├── useTheme.ts               # Hook per ThemeContext
│   └── useMatches.ts             # Hook esistente
└── ...
```

## Vantaggi

1. ✅ **Fast Refresh funziona correttamente** - I file sono ora conformi ai requisiti
2. ✅ **Separazione delle responsabilità** - Context, Provider e Hook sono separati
3. ✅ **Più pulito e mantenibile** - Ogni file ha un singolo scopo
4. ✅ **Conforme alle best practice React** - Segue il pattern consigliato

## Risultati ESLint

### Prima
```
✖ 3 problems (2 errors, 1 warning)
- AuthContext.tsx: Fast refresh error
- ThemeContext.tsx: Fast refresh error
- MatchDetail.tsx: useEffect dependency warning (pre-esistente)
```

### Dopo
```
✖ 1 problem (0 errors, 1 warning)
- MatchDetail.tsx: useEffect dependency warning (pre-esistente, non correlato)
```

## Test
- ✅ `npm run lint` - Passa con solo 1 warning pre-esistente
- ✅ `npm run build` - Compila correttamente
- ✅ Nessun breaking change - L'API pubblica rimane invariata

## File modificati

### Nuovi file creati:
- `src/contexts/auth-context.ts`
- `src/contexts/theme-context.ts`
- `src/hooks/useAuth.ts`
- `src/hooks/useTheme.ts`

### File modificati:
- `src/contexts/AuthContext.tsx`
- `src/contexts/ThemeContext.tsx`
- `src/pages/VenuesPage.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/CreateMatchPage.tsx`
- `src/pages/MatchDetail.tsx`
- `src/pages/AuthPage.tsx`
- `src/components/Header.tsx`
- `src/components/PlayerSignupForm.tsx`

## Note
Il warning rimasto in `MatchDetail.tsx` riguarda una dipendenza mancante in useEffect ed era già presente prima della modifica. Non è correlato al problema Fast Refresh ed è un'ottimizzazione opzionale.
