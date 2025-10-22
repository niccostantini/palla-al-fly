# 📘 Guida Tailwind CSS - Palla al Fly

## Indice
1. [Cos'è Tailwind CSS](#cosè-tailwind-css)
2. [Concetti Base](#concetti-base)
3. [Come Modificare gli Stili](#come-modificare-gli-stili)
4. [Classi Comuni](#classi-comuni)
5. [Dark Mode](#dark-mode)
6. [Responsive Design](#responsive-design)
7. [Esempi Pratici](#esempi-pratici)
8. [Colori del Progetto](#colori-del-progetto)

---

## Cos'è Tailwind CSS

Tailwind è un framework CSS **utility-first**. Invece di scrivere CSS custom, usi **classi predefinite** direttamente nell'HTML/JSX.

### Esempio Confronto

**CSS Tradizionale:**
```css
/* styles.css */
.button {
  background-color: #5B3DF5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
}
```
```html
<button class="button">Clicca</button>
```

**Tailwind:**
```jsx
<button className="bg-brand-600 text-white px-4 py-2 rounded-2xl">
  Clicca
</button>
```

---

## Concetti Base

### 1. Classi Utility
Ogni classe fa **una sola cosa**:
- `bg-blue-500` → background blu
- `text-white` → testo bianco
- `p-4` → padding di 1rem (16px)
- `rounded-lg` → bordi arrotondati

### 2. Sistema di Numerazione
Tailwind usa una scala da 0 a 96 (e oltre):
- `p-1` = 0.25rem (4px)
- `p-2` = 0.5rem (8px)
- `p-4` = 1rem (16px)
- `p-8` = 2rem (32px)

### 3. Naming Pattern
Le classi seguono questo schema:
```
[proprietà]-[variante]-[valore]
```

Esempi:
- `text-gray-600` → colore testo grigio 600
- `bg-white` → background bianco
- `p-4` → padding 1rem
- `mt-2` → margin-top 0.5rem

---

## Come Modificare gli Stili

### 📍 Dove Modificare

Gli stili si trovano nell'attributo `className` dei componenti React:

```tsx
// src/components/ui/Button.tsx
<button className="bg-brand-600 text-white px-4 py-2 rounded-2xl">
  Clicca qui
</button>
```

### ✏️ Cambiare uno Stile

**Per cambiare il colore del background:**

```tsx
// PRIMA
<button className="bg-brand-600 text-white">

// DOPO (background rosso)
<button className="bg-red-600 text-white">
```

**Per cambiare la dimensione del padding:**

```tsx
// PRIMA
<button className="px-4 py-2">

// DOPO (più grande)
<button className="px-6 py-3">
```

**Per cambiare il border radius:**

```tsx
// PRIMA
<button className="rounded-2xl">

// DOPO (più arrotondato)
<button className="rounded-full">
```

### ➕ Aggiungere una Classe

Aggiungi la nuova classe separata da uno spazio:

```tsx
// PRIMA
<div className="bg-white p-4">

// DOPO (aggiungo ombra)
<div className="bg-white p-4 shadow-lg">
```

### ➖ Rimuovere una Classe

Togli la classe che non vuoi:

```tsx
// PRIMA
<div className="bg-white p-4 shadow-lg rounded-2xl">

// DOPO (rimuovo ombra)
<div className="bg-white p-4 rounded-2xl">
```

---

## Classi Comuni

### 🎨 Colori

#### Background
```tsx
bg-white         // bianco
bg-gray-100      // grigio chiaro
bg-gray-800      // grigio scuro
bg-brand-600     // violet (nostro brand)
bg-red-600       // rosso
bg-blue-600      // blu
```

#### Testo
```tsx
text-white       // bianco
text-gray-900    // grigio molto scuro (quasi nero)
text-gray-600    // grigio medio
text-red-600     // rosso
```

### 📏 Spacing

#### Padding (spazio interno)
```tsx
p-2    // padding 0.5rem (8px) su tutti i lati
p-4    // padding 1rem (16px) su tutti i lati
px-4   // padding orizzontale (left + right)
py-2   // padding verticale (top + bottom)
pt-4   // padding-top
pb-4   // padding-bottom
pl-4   // padding-left
pr-4   // padding-right
```

#### Margin (spazio esterno)
```tsx
m-2    // margin su tutti i lati
mx-4   // margin orizzontale
my-2   // margin verticale
mt-4   // margin-top
mb-4   // margin-bottom
```

### 📐 Layout

#### Display
```tsx
flex           // display flex
inline-flex    // display inline-flex
block          // display block
inline-block   // display inline-block
hidden         // display none
```

#### Flex
```tsx
flex-col       // direzione colonna
flex-row       // direzione riga
items-center   // align items center
justify-between // justify-content space-between
gap-2          // gap tra elementi
```

#### Width & Height
```tsx
w-full         // width 100%
w-1/2          // width 50%
h-screen       // height 100vh
max-w-md       // max-width medium
```

### 🔤 Tipografia

#### Font Size
```tsx
text-xs        // extra small (0.75rem)
text-sm        // small (0.875rem)
text-base      // base (1rem)
text-lg        // large (1.125rem)
text-xl        // extra large (1.25rem)
text-2xl       // 1.5rem
text-3xl       // 1.875rem
```

#### Font Weight
```tsx
font-normal    // 400
font-medium    // 500
font-semibold  // 600
font-bold      // 700
```

#### Font Family
```tsx
font-sans      // Inter (nostro body font)
font-display   // Space Grotesk (nostri titoli)
```

### 🔲 Bordi

#### Border
```tsx
border              // border 1px
border-2            // border 2px
border-gray-300     // colore border
border-t            // border solo top
border-none         // nessun border
```

#### Border Radius
```tsx
rounded-none    // 0
rounded-sm      // 0.125rem
rounded         // 0.25rem
rounded-lg      // 0.5rem
rounded-xl      // 0.75rem
rounded-2xl     // 1rem (default nel progetto)
rounded-full    // 9999px (cerchio perfetto)
```

### 🎭 Effetti

#### Shadow
```tsx
shadow-sm       // ombra piccola
shadow          // ombra normale
shadow-md       // ombra media
shadow-lg       // ombra grande
shadow-card     // ombra custom del progetto
shadow-none     // nessuna ombra
```

#### Opacity
```tsx
opacity-0       // invisibile
opacity-50      // 50% opacità
opacity-100     // completamente visibile
```

---

## Dark Mode

In questo progetto, il dark mode si attiva con la classe `dark:` prima della classe normale.

### Sintassi

```tsx
className="bg-white dark:bg-gray-800"
```

Significa:
- **Light mode**: background bianco
- **Dark mode**: background grigio scuro

### Esempi Completi

```tsx
// Card con dark mode
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Contenuto
</div>

// Button con dark mode
<button className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
  Clicca
</button>

// Input con dark mode
<input className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600" />
```

### Regola d'Oro

**Specifica SEMPRE entrambe le varianti:**
- ❌ `className="bg-white"` → invisibile in dark mode!
- ✅ `className="bg-white dark:bg-gray-800"`

---

## Responsive Design

Tailwind usa **breakpoint prefixes** per il responsive:

### Breakpoints
```
sm:  → 640px
md:  → 768px
lg:  → 1024px
xl:  → 1280px
```

### Come Funziona

**Mobile-first**: le classi senza prefisso si applicano sempre, poi si aggiungono quelle per schermi più grandi.

```tsx
// Testo piccolo su mobile, grande su desktop
<h1 className="text-xl md:text-3xl">
  Titolo
</h1>

// Hidden su mobile, visible su desktop
<div className="hidden md:block">
  Visibile solo su desktop
</div>

// 1 colonna su mobile, 3 su desktop
<div className="grid grid-cols-1 md:grid-cols-3">
  ...
</div>
```

### Esempi Pratici

```tsx
// Padding responsive
<div className="p-2 sm:p-4 md:p-6">
  Padding cresce con lo schermo
</div>

// Gap responsive
<div className="flex gap-2 md:gap-4">
  Gap più grande su desktop
</div>

// Font size responsive
<p className="text-sm sm:text-base md:text-lg">
  Testo che cresce
</p>
```

---

## Esempi Pratici

### 1. Modificare un Pulsante

**File**: `src/components/ui/Button.tsx`

```tsx
// PRIMA (violet)
<button className="bg-brand-600 hover:bg-brand-700 text-white">

// DOPO (blu)
<button className="bg-blue-600 hover:bg-blue-700 text-white">

// DOPO (più grande e arrotondato)
<button className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full text-lg">
```

### 2. Modificare una Card

**File**: `src/components/ui/Card.tsx`

```tsx
// PRIMA
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-4">

// DOPO (più spaziosa e ombra più grande)
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

// DOPO (con border colorato)
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-4 border-2 border-brand-600">
```

### 3. Modificare l'Header

**File**: `src/components/Header.tsx`

```tsx
// PRIMA (violet)
<header className="bg-brand-600 dark:bg-gray-900 text-white">

// DOPO (blu)
<header className="bg-blue-600 dark:bg-gray-900 text-white">

// DOPO (più padding)
<header className="bg-brand-600 dark:bg-gray-900 text-white px-4 py-4">
```

### 4. Modificare Input

**File**: `src/components/ui/Input.tsx`

```tsx
// PRIMA
<input className="border-gray-300 rounded-2xl">

// DOPO (border più spesso)
<input className="border-2 border-gray-400 rounded-2xl">

// DOPO (più padding)
<input className="border-gray-300 rounded-2xl px-4 py-3">
```

### 5. Modificare Titoli

**File**: qualsiasi componente con `<h1>`, `<h2>`, ecc.

```tsx
// PRIMA
<h1 className="text-3xl font-bold">

// DOPO (più grande)
<h1 className="text-4xl font-bold">

// DOPO (con colore custom)
<h1 className="text-3xl font-bold text-brand-600">

// DOPO (con margin)
<h1 className="text-3xl font-bold mb-6">
```

---

## Colori del Progetto

### Brand Colors (nostri colori custom)

```tsx
// Violet (principale)
bg-brand-600       // #5B3DF5
bg-brand-700       // #4D32D6

// Aqua (accento)
bg-accent-aqua     // #00D4FF
text-accent-aqua   // per testo

// Rose (accento)
bg-accent-rose     // #FF4D96
text-accent-rose   // per testo
```

### Role Colors (chip ruoli)

```tsx
bg-role-setter     // #5B3DF5 (violet)
bg-role-oh         // #00D4FF (aqua)
bg-role-oph        // #FF4D96 (rose)
bg-role-mb         // #65A30D (lime)
bg-role-l          // #F59E0B (amber)
```

### Grays (per UI)

```tsx
// Light Mode
bg-gray-50         // più chiaro
bg-gray-100
bg-gray-200
bg-gray-300
bg-gray-400
bg-gray-500
bg-gray-600
text-gray-700
text-gray-800
text-gray-900      // più scuro

// Dark Mode
dark:bg-gray-900   // più scuro
dark:bg-gray-800
dark:bg-gray-700
dark:text-gray-400
dark:text-gray-300
dark:text-gray-200
dark:text-white    // più chiaro
```

---

## 🎯 Tips & Tricks

### 1. Usa l'Autocompletamento

VS Code con l'estensione **Tailwind CSS IntelliSense** ti suggerisce le classi mentre scrivi!

### 2. Raggruppa le Classi Logicamente

```tsx
// ✅ BUONO (raggruppato)
<div className="
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
  p-4 rounded-2xl shadow-card
">

// ❌ EVITA (mescolato)
<div className="bg-white p-4 text-gray-900 rounded-2xl dark:bg-gray-800 shadow-card dark:text-white">
```

### 3. Usa le Variabili Tailwind Config

Nel file `tailwind.config.js` puoi vedere tutti i colori custom:

```js
colors: {
  brand: {
    600: '#5B3DF5',
    700: '#4D32D6',
  },
}
```

### 4. Testa Sempre Entrambi i Temi

Quando modifichi uno stile, clicca il toggle 🌙/☀️ nell'header per verificare sia light che dark mode.

### 5. Mobile First

Parti sempre dal mobile, poi aggiungi breakpoint:

```tsx
// ✅ BUONO
<div className="p-2 md:p-4 lg:p-6">

// ❌ EVITA
<div className="lg:p-6 md:p-4 p-2">
```

---

## 🔧 Modifiche Comuni

### Cambiare il Colore Brand Principale

**File**: `tailwind.config.js`

```js
colors: {
  brand: {
    600: '#5B3DF5',  // Cambia questo
    700: '#4D32D6',  // Cambia questo
  },
}
```

Poi riavvia il dev server:
```bash
npm run dev
```

### Aumentare lo Spacing Generale

**File**: qualsiasi componente

Cerca classi tipo `p-4`, `gap-2`, `space-y-4` e aumenta i numeri:
```tsx
// PRIMA
<div className="p-4 gap-2 space-y-4">

// DOPO (più spazioso)
<div className="p-6 gap-4 space-y-6">
```

### Cambiare Font Size Globale

**File**: `src/index.css`

```css
body {
  font-size: 16px; /* Aumenta per font più grandi */
}
```

---

## 📚 Risorse Utili

- [Documentazione Ufficiale Tailwind](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind Play (sandbox online)](https://play.tailwindcss.com)

---

## ❓ FAQ

### Come cambio il colore di un pulsante?

Modifica la classe `bg-*`:
```tsx
bg-brand-600  →  bg-blue-600
```

### Come rendo un elemento più grande?

Aumenta padding, font-size, o dimensioni:
```tsx
px-4 py-2 text-base  →  px-6 py-3 text-lg
```

### Come nascondo un elemento su mobile?

Usa `hidden` senza prefisso e `md:block` per desktop:
```tsx
<div className="hidden md:block">
```

### Come cambio l'arrotondamento degli angoli?

Modifica `rounded-*`:
```tsx
rounded-2xl  →  rounded-full  (cerchio)
rounded-2xl  →  rounded-lg    (meno arrotondato)
```

### Il mio testo è invisibile!

Probabilmente manca la variante dark mode:
```tsx
// ❌ Invisibile in dark mode
<p className="text-gray-900">

// ✅ Visibile sempre
<p className="text-gray-900 dark:text-white">
```

---

## 🎓 Esercizi Pratici

### Esercizio 1: Cambia Colore Button

1. Apri `src/components/ui/Button.tsx`
2. Trova `bg-brand-600`
3. Cambialo in `bg-green-600`
4. Salva e guarda il risultato

### Esercizio 2: Aumenta Padding Card

1. Apri `src/components/ui/Card.tsx`
2. Trova `p-4`
3. Cambialo in `p-8`
4. Salva e guarda il risultato

### Esercizio 3: Rendi Header Più Alto

1. Apri `src/components/Header.tsx`
2. Trova `py-3`
3. Cambialo in `py-6`
4. Salva e guarda il risultato

---

## 🚀 Prossimi Passi

1. Sperimenta modificando i componenti UI in `src/components/ui/`
2. Prova a creare combinazioni di classi diverse
3. Testa sempre in light e dark mode
4. Verifica il responsive su mobile

**Buon divertimento con Tailwind! 🎨**
