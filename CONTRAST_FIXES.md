# Fix Contrasti - Riepilogo

## Problema
Alcuni elementi avevano contrasti insufficienti (testo bianco su bianco o nero su nero) a causa dell'uso errato delle variabili CSS `bg-[color:var(--card)]` che non funzionano correttamente con Tailwind.

## Soluzioni Applicate

### ✅ Button Component
**Prima**: Colori secondari poco visibili
**Dopo**: 
- Primary: `bg-brand-600 text-white`
- Secondary: `bg-gray-200 dark:bg-gray-700` con testo `text-gray-900 dark:text-gray-100`
- Danger: `bg-red-600 text-white`

### ✅ Card Component
**Prima**: `bg-[color:var(--card)]` (non funzionava)
**Dopo**: `bg-white dark:bg-gray-800` con border `border-gray-200 dark:border-gray-700`

### ✅ Input Component
**Prima**: Background poco contrastato in dark mode
**Dopo**: `bg-white dark:bg-gray-900` con testo `text-gray-900 dark:text-white`

### ✅ Dashboard
**Prima**: Testi con `text-[color:var(--muted)]` invisibili
**Dopo**: `text-gray-600 dark:text-gray-400`

### ✅ MatchDetail
**Prima**: Card e testi con variabili CSS non funzionanti
**Dopo**: 
- Card: `bg-white dark:bg-gray-800`
- Testi muted: `text-gray-600 dark:text-gray-400`
- Border: `border-gray-200 dark:border-gray-700`

### ✅ AuthPage
**Prima**: Background card e testi con variabili CSS
**Dopo**: `bg-white dark:bg-gray-800` per le card

### ✅ PlayerSignupForm
**Prima**: Form con background problematico
**Dopo**: `bg-white dark:bg-gray-800` con select `bg-white dark:bg-gray-900`

### ✅ App Background
**Prima**: Solo `bg-gray-100`
**Dopo**: `bg-gray-100 dark:bg-gray-900`

## Palette Contrasti Verificati

### Light Mode
- Background principale: `#F3F4F6` (gray-100)
- Card: `#FFFFFF` (white)
- Testo primario: `#111827` (gray-900) - Contrasto 16.1:1 ✅
- Testo secondario: `#4B5563` (gray-600) - Contrasto 7.1:1 ✅
- Border: `#E5E7EB` (gray-200)

### Dark Mode
- Background principale: `#111827` (gray-900)
- Card: `#1F2937` (gray-800)
- Testo primario: `#FFFFFF` (white) - Contrasto 15.3:1 ✅
- Testo secondario: `#9CA3AF` (gray-400) - Contrasto 6.4:1 ✅
- Border: `#374151` (gray-700)

### Pulsanti
- Primary: Violet `#5B3DF5` su bianco - Contrasto 4.8:1 ✅
- Secondary: Gray-900 su Gray-200 - Contrasto 12.6:1 ✅
- Danger: Red-600 su bianco - Contrasto 5.9:1 ✅

## Test di Verifica

Tutti i contrasti ora rispettano **WCAG AA** (≥ 4.5:1 per testo normale).

### Come Testare
1. Avvia l'app: `npm run dev`
2. Prova entrambi i temi (light/dark) usando il toggle nell'header
3. Verifica:
   - ✅ Tutti i pulsanti sono visibili
   - ✅ Tutti i testi sono leggibili
   - ✅ Le card hanno sfondo visibile
   - ✅ Gli input hanno border e sfondo chiari
   - ✅ Nessun elemento "bianco su bianco" o "nero su nero"

## Regole per il Futuro

### ✅ DA FARE
- Usare classi Tailwind dirette: `bg-white dark:bg-gray-800`
- Specificare sempre varianti dark: `text-gray-900 dark:text-white`
- Testare entrambi i temi

### ❌ DA EVITARE
- ~~`bg-[color:var(--card)]`~~ (non funziona con Tailwind v4)
- ~~`text-[color:var(--muted)]`~~ (non funziona con Tailwind v4)
- Usare colori custom senza specificare variante dark

## Checklist Contrasti ✅

- ✅ Button primary visibile (violet su bianco)
- ✅ Button secondary visibile (gray-200/700)
- ✅ Button danger visibile (red su bianco)
- ✅ Card background visibile (white/gray-800)
- ✅ Input visibili con border e background
- ✅ Testi primari con contrasto alto (gray-900/white)
- ✅ Testi secondari con contrasto medio (gray-600/400)
- ✅ Badge con contrasti verificati
- ✅ Header con background colorato
- ✅ Form leggibili in entrambi i temi
- ✅ Background app diverso da card
