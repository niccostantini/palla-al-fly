# Design System - Palla al Fly

## Panoramica

Il design system è stato completamente rinnovato con un approccio mobile-first, accessibile (WCAG AA) e con supporto per dark mode e internazionalizzazione (IT/EN).

## 🎨 Palette Colori

### Brand & Accenti
- **Primary Violet**: `#5B3DF5` (Royal Violet) - Brand principale
- **Primary Violet Dark**: `#4D32D6`
- **Accent Aqua**: `#00D4FF` - Per stati "Open" e Outside Hitter
- **Accent Rose**: `#FF4D96` - Per overbooking e Opposite

### Stati
- **Success**: `#16A34A` (verde)
- **Warning**: `#F59E0B` (amber) - Anche per Libero
- **Danger**: `#EF4444` (rosso) - Per stati cancelled
- **Info**: `#0EA5E9` (ciano)

### Ruoli Giocatori (Chip colorati)
- **Setter (P)**: Violet `#5B3DF5`
- **Outside Hitter (OH)**: Aqua `#00D4FF`
- **Opposite (OpH)**: Rose `#FF4D96`
- **Middle Blocker (MB)**: Lime `#65A30D`
- **Libero (L)**: Amber `#F59E0B`

### Neutri
- **Light Mode**:
  - Background: `#FFFFFF`
  - Foreground: `#0F172A`
  - Muted: `#6B7280`
  - Border: `#E5E7EB`

- **Dark Mode**:
  - Background: `#0B1220`
  - Foreground: `#E5E7EB`
  - Muted: `#9CA3AF`
  - Border: `#1F2937`
  - Card: `#111827`

## 📝 Tipografia

### Font Families
- **Display** (Heading): `Space Grotesk` - 600/700
- **Body/UI**: `Inter` - 400/500/600

### Utility
- `.tabular` - Per numeri tabulari (orari, punteggi)
- `.font-display` - Per titoli e heading

## 🧩 Componenti

### Button
Varianti: `primary`, `secondary`, `danger`

```tsx
<Button variant="primary">Azione</Button>
<Button variant="secondary">Annulla</Button>
<Button variant="danger">Elimina</Button>
```

**Stili**:
- Border radius: `rounded-2xl` (1rem)
- Focus ring: `ring-4` con colore brand/20
- Transizioni: 200ms con easing

### Badge
Varianti: `open`, `full`, `overbooking`, `cancelled`

**Design**:
- **Open**: Aqua background/10, bordo aqua/30
- **Full**: Brand violet pieno, testo bianco
- **Overbooking**: Rose background/10, bordo rose/30, italic
- **Cancelled**: Danger/10, bordo danger/30, line-through

### RoleBadge
Chip colorati per ruoli giocatori con palette dedicata.

### Card
```tsx
<Card onClick={handleClick}>
  Contenuto card
</Card>
```

**Stili**:
- Border radius: `rounded-2xl`
- Shadow: `shadow-card` (custom)
- Border: variabile CSS `--border`

### Input
```tsx
<Input 
  label="Nome" 
  placeholder="Inserisci nome"
  error="Campo obbligatorio"
/>
```

**Stili**:
- Border radius: `rounded-2xl`
- Focus ring: `ring-4` brand/20
- Supporto dark mode integrato

## 🌓 Dark Mode

Implementato con strategia `class` su `<html>`.

**Toggle**: Nell'header, icona sole/luna.

**Context**: `ThemeContext` con hook `useTheme()`.

**Persistenza**: localStorage con chiave `theme`.

## 🌍 Internazionalizzazione

### Lingue Supportate
- 🇮🇹 Italiano (default)
- 🇬🇧 Inglese

### Struttura
File JSON in `src/locales/`:
- `it.json`
- `en.json`

### Utilizzo
```tsx
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

return <h1>{t('header.title')}</h1>;
```

### Toggle Lingua
Nell'header, flag IT/EN con switch automatico.

**Persistenza**: localStorage con chiave `language`.

## 📱 Responsive & Mobile-First

### Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Header Mobile
- Flex wrap su elementi
- Email truncate: `max-w-[40vw] sm:max-w-none`
- Pulsanti dimensione adattiva: `text-xs sm:text-sm`
- Gap compatto: `gap-2`

### Card e Grid
- Grid responsive: `sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Flex wrap per badge multipli

## ♿ Accessibilità (WCAG AA)

### Contrasti
Tutti i contrasti testo/background verificati ≥ 4.5:1.

### Focus Visibili
- Ring 4px con offset
- Colori accessibili in light e dark mode

### Aria Labels
Aggiunti su toggle lingua e dark mode.

## 🎭 Animazioni

### Transizioni
- Durata: 150-200ms
- Easing: `ease-out`
- Proprietà: `all` o specifiche (colors, shadow, transform)

### Hover States
- Button: shadow-md
- Card: shadow-lg (se clickable)
- Links: cambio colore

## 📏 Spacing & Layout

### Padding Standard
- Card: `p-4` / `p-6`
- Button: `px-4 py-2`
- Container: `px-4 py-8`

### Border Radius
- Default: `rounded-2xl` (1rem)
- XL: `0.75rem`

### Shadows
- Card: `shadow-card` (0 8px 24px rgba(0,0,0,0.06))
- Button: `shadow-sm` → `shadow-md` on hover

## 🚀 Utilizzo

### Avvio Dev
```bash
npm run dev
```

### Build Produzione
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## 📦 Dipendenze Principali
- `tailwindcss` v4.1.15
- `react-i18next` + `i18next`
- `@supabase/supabase-js`
- Font: Google Fonts (Space Grotesk, Inter)

## ✅ Checklist Completata

- ✅ Palette colori brand (violet/aqua/rose)
- ✅ Tipografia (Space Grotesk + Inter)
- ✅ Token Tailwind (colori, radius, shadow)
- ✅ Dark mode con toggle
- ✅ Internazionalizzazione IT/EN
- ✅ Componenti aggiornati (Button, Badge, Card, Input)
- ✅ Header responsive mobile-first
- ✅ Badge stati con nuova palette
- ✅ Card partite con design aggiornato
- ✅ Roster con chip ruoli colorati
- ✅ Contrasti WCAG AA verificati
- ✅ Numeri tabulari per orari
- ✅ No overflow mobile

## 🎯 Best Practices

1. Usa sempre `font-display` per heading
2. Applica `.tabular` per numeri (orari, score)
3. Includi varianti dark: in tutti i componenti custom
4. Testa contrasti con DevTools o tool WCAG
5. Usa traduzioni `t()` per tutti i testi visibili
6. Mantieni border-radius coerente (`rounded-2xl`)
7. Usa variabili CSS per bg/fg/border dove possibile
