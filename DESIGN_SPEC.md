# PRABA Landing Page — Brutally Premium Redesign Spec

## Visual System

### Typography
- **Display/Headlines**: `Space Grotesk` (700, 600) — geometric, premium tech feel
- **Body**: `Inter` (400, 500) — keep for readability
- **Accent/Labels**: `Space Grotesk` (500) — for badges, labels, small caps
- Remove DM Serif Display entirely. The page should feel modern/tech, not editorial.

### Color System (Dark-First)
The page uses a **dark hero + alternating sections** approach:

```
--bg-primary: #0A0A0F          (near-black, hero + CTA)
--bg-secondary: #111118        (dark sections)
--bg-card: #16161F             (elevated cards on dark)
--bg-card-hover: #1C1C28       (card hover state)
--bg-light: #FAFAFA            (light sections)
--bg-light-card: #FFFFFF       (cards on light bg)

--text-primary: #F5F5F7        (white text on dark)
--text-secondary: #8E8E9A      (muted text on dark)
--text-dark-primary: #0A0A0F   (dark text on light)
--text-dark-secondary: #6B7280 (muted on light)

--accent: #00D4AA              (teal-green, premium feel)
--accent-dim: #00D4AA1A        (accent at 10% opacity)
--accent-glow: #00D4AA33       (accent at 20% for glows)
--accent-hover: #00EBBD        (lighter on hover)

--border-dark: #ffffff0F       (white at 6%)
--border-light: #0A0A0F0F      (black at 6%)

--glass-bg: #ffffff08          (glassmorphism background)
--glass-border: #ffffff12      (glassmorphism border)
```

### Spacing Scale
Use Tailwind's default scale but enforce generous whitespace:
- Section padding: `py-24 md:py-32 lg:py-40`
- Max content width: `max-w-6xl` (1152px)
- Card padding: `p-8 md:p-10`
- Between major elements: `gap-16 md:gap-20`

### Shadows & Effects
```css
--shadow-glow: 0 0 60px rgba(0, 212, 170, 0.08);
--shadow-card: 0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2);
--shadow-card-hover: 0 4px 24px rgba(0,0,0,0.3), 0 0 40px rgba(0,212,170,0.05);
```

### Glassmorphism Recipe (for cards on dark bg)
```css
background: var(--glass-bg);
border: 1px solid var(--glass-border);
backdrop-filter: blur(20px);
border-radius: 16px;
```

---

## Page Structure (Top to Bottom)

### 1. HEADER
- **Background**: Transparent, becomes `backdrop-blur-xl bg-[#0A0A0F]/80` on scroll
- **Left**: "PRABA" in Space Grotesk 700, tracking-tight, text-[#F5F5F7]
- **Right**: Single CTA button with accent border glow
- **Height**: h-16
- **Position**: sticky top-0 z-50

### 2. HERO SECTION (Dark: #0A0A0F)
**Layout**: Centered text, no demo card. Clean and bold.

**Top Badge** (above headline):
- Small pill badge: glassmorphism bg, accent text
- Content: "Patikima darbo istorija · Verified work history"
- Subtle pulse animation on the dot

**Headline** (h1):
- "Įrodymai, kurie uždirba už jus."
- Space Grotesk 700, text-5xl md:text-6xl lg:text-7xl
- White text with very subtle gradient (white → white/80)
- tracking-tight, max-w-4xl mx-auto

**Subheadline**:
- "Sukurkite patikimą darbo portfelį su tikrais klientų patvirtinimais. Kaip carVertical, tik darbų istorijai."
- text-lg md:text-xl, text-secondary, max-w-2xl mx-auto

**CTA Area**:
- WaitlistForm centered, max-w-md
- Input: dark glass bg, subtle border, white text
- Button: solid accent bg (#00D4AA), dark text, font-semibold
- Below form: "Jokio spam. Nemokamas Pro planas pirmiems 100."

**Trust Row** (below CTA):
- 3 trust items in a horizontal row, centered
- Each: small icon (custom SVG, not basic) + label
- Items: "Šifruota" (Encrypted) | "Neištrinama" (Immutable) | "Nemokama" (Free)
- Style: text-secondary, text-sm, gap-8, icons in accent color

**Bottom gradient**: Subtle gradient fade from #0A0A0F to transparent, height ~80px

### 3. SOCIAL PROOF BAR
- Thin bar, bg-accent/5, border-y border-accent/10
- Centered text with pulsing green dot
- "{count} profesionalai jau užsiregistravo"
- Only shows if count >= 5

### 4. EXPANDABLE SLICES SECTION (Light: #FAFAFA)
**This is the core interactive section. Two vertical panels side by side.**

**Section intro** (centered above the panels):
- Small label: "KAIP TAI VEIKIA" (HOW IT WORKS) — uppercase, tracking-widest, text-sm, accent color
- Headline: "Viskas, ko reikia patikimam profiliui"
- Subheadline: "Du keliai. Vienas rezultatas — daugiau pasitikėjimo."

**Layout**: `grid grid-cols-1 md:grid-cols-2 gap-6`

Each panel is a tall card that contains expandable slices:

#### LEFT PANEL: "Kaip gauti patvirtinimus" (How to get confirmations)
- Panel header: Icon + title at top
- **3 expandable slices** (accordion-style, one open at a time):
  1. **"Įkelkite projektą"** (Upload project) — 2 min
     - Expanded: Shows a mini form mockup (project name, description, client email) in a glass card
  2. **"Klientas patvirtina tapatybę"** (Client verifies identity)
     - Expanded: Shows auth method badges (Facebook, Google, Phone) with verified checkmarks
  3. **"Profilis auga automatiškai"** (Profile grows automatically)
     - Expanded: Shows authenticity bar filling up to 75% with "Geras" badge

#### RIGHT PANEL: "Kaip tai padeda gauti klientų" (How it helps get clients)
- Panel header: Icon + title at top
- **3 expandable slices**:
  1. **"Sukurkite privatų profilį"** (Create private profile)
     - Expanded: Shows profile card preview with lock icon
  2. **"Dalinkitės unikalia nuoroda"** (Share unique link)
     - Expanded: Shows link bar with `praba.lt/p/jonas/a8x2k` and copy button
  3. **"Klientas mato įrodymus"** (Client sees evidence)
     - Expanded: Shows client view preview with verified projects list

**Slice Interaction Design**:
- Default: Only the slice title + number visible, subtle border-b
- Hover: bg shifts slightly lighter
- Active/expanded: Smooth height animation (300ms ease-out), content fades in (200ms delay)
- The slice number: "01", "02", "03" in accent color, monospace
- Transition: `max-height` with overflow-hidden, or use CSS grid rows `0fr → 1fr`
- Only one slice open per panel at a time
- First slice in each panel open by default
- Auto-advance every 6 seconds (pause on hover/interaction)

**Panel Card Style** (on light bg):
```
bg-white
border border-[#0A0A0F]/[0.06]
rounded-2xl
shadow-[0_1px_3px_rgba(0,0,0,0.04)]
overflow-hidden
```

**Expanded content area**:
- Padding: p-6
- Contains visual mockups styled as mini glass cards
- Subtle bg-[#F8F9FA] behind mockup areas

### 5. TRUST & SECURITY SECTION (Dark: #111118)
**Layout**: Centered intro + 3-column grid of trust cards

**Intro**:
- Label: "PATIKIMUMAS" (TRUST) — uppercase, tracking-widest, accent
- Headline: "Saugumo standartai, kuriais galite pasitikėti"
- Subheadline explaining the verification system

**3 Trust Cards** (glassmorphism on dark bg):
Each card has:
- A custom icon (SVG) in an accent-glow circle at top
- Title
- Description
- A subtle visual element

Cards:
1. **"Tikra tapatybė"** (Real Identity)
   - Icon: Shield with checkmark
   - Shows: "Patvirtinta per Facebook" verification badge mockup
   - Description: Real people verify through real accounts

2. **"Neištrinama istorija"** (Immutable History)
   - Icon: Lock/chain link
   - Shows: Timeline with 3 verified entries
   - Description: Once verified, records cannot be altered

3. **"Skaidrumo monitorius"** (Transparency Monitor)
   - Icon: Eye/radar
   - Shows: "0 iš 4 paslėpti" with a visual bar
   - Description: Clients see if anything is hidden

**Card Style**:
```
background: rgba(255,255,255,0.03)
border: 1px solid rgba(255,255,255,0.06)
border-radius: 16px
padding: 32px
transition: all 0.3s ease
hover: border-color rgba(0,212,170,0.2), shadow-glow
```

### 6. BOTTOM CTA (Dark: #0A0A0F)
**Layout**: Centered, generous padding (py-32 md:py-40)

**Top**: Animated badge — pulsing green dot + "Liko vietų ankstyvajam prisijungimui"

**Headline**: "Pasiruošk įrodyti savo darbą."
- Space Grotesk 700, text-4xl md:text-5xl, white

**Benefits row**: 3 items with accent checkmarks
- Nemokamas Pro planas visam laikui
- Neriboti projektai ir patvirtinimai
- Tiesioginė prieiga prie kūrėjo komandos

**Pricing**:
- Strikethrough: "EUR 9/mėn."
- Bold accent: "EUR 0. Visam laikui."

**WaitlistForm**: Same as hero but on dark bg

**Footer note**: "Jokio spam. Tik vienas laiškas, kai paleisime."

### 7. FOOTER
- Dark bg matching CTA section (seamless)
- Border-t with glass-border color
- Three cols: "PRABA · 2025" | "LT | EN" | "Privatumo politika"
- All text-secondary, text-sm

---

## Animations & Micro-interactions

### Scroll Reveal (replace useFadeIn)
Enhanced animation hook with stagger support:
- Elements start at `translateY(32px), opacity: 0`
- Animate to `translateY(0), opacity: 1`
- Duration: 600ms, ease: cubic-bezier(0.16, 1, 0.3, 1) (ease-out-expo)
- Stagger: 100ms between sibling elements
- Threshold: 0.15
- Respects prefers-reduced-motion

### Expandable Slice Animation
- Use CSS grid `grid-template-rows: 0fr → 1fr` for smooth height
- Inner content wrapper with `overflow: hidden`
- Duration: 400ms, ease: cubic-bezier(0.16, 1, 0.3, 1)
- Content fade-in: 200ms delay after expand starts

### Hero Badge Pulse
```css
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}
```

### Button Hover
- Scale: 1 → 1.02 on hover
- Shadow appears on hover
- Transition: 200ms ease

### Card Hover (Trust Cards)
- Border color transition to accent/20
- Subtle glow shadow appears
- translateY: 0 → -2px
- Transition: 300ms ease

### Header Scroll
- Transparent → blurred bg on scroll (use scroll event + state)
- Transition: 200ms ease

---

## Custom SVG Icons

Do NOT use any icon library. Create inline SVG icons for:
1. **Shield-check**: Trust/security (hero trust row, trust cards)
2. **Chain-lock**: Immutable/encrypted
3. **Eye-radar**: Transparency/monitoring
4. **Sparkle**: Premium/free
5. **Arrow-right**: Flow indicators
6. **Upload**: Upload project
7. **User-check**: Identity verification
8. **Chart-up**: Profile growth
9. **Lock**: Private
10. **Link**: Shareable link
11. **Document-check**: Client view/evidence

All icons: 24x24 viewbox, stroke-based (strokeWidth=1.5), currentColor.

---

## Responsive Breakpoints

- **Mobile (< 768px)**: Single column everything, panels stack vertically, text-center for hero
- **Tablet (768-1024px)**: 2-col grid for slices, reduced padding
- **Desktop (> 1024px)**: Full layout, generous whitespace

### Mobile-specific adjustments:
- Hero headline: text-4xl (not text-7xl)
- Panels: full-width stacked
- Trust cards: single column
- Section padding: py-16 instead of py-32
- Expandable slices: all work the same, just full width

---

## Component Mapping

| Old Component | New Component | Notes |
|---|---|---|
| Header.tsx | Header.tsx | Restyle: transparent/glass, accent CTA |
| HeroSection.tsx | HeroSection.tsx | Major rewrite: centered, dark, no card |
| HeroProfileCard.tsx | DELETE | No longer needed in hero |
| WaitlistForm.tsx | WaitlistForm.tsx | Restyle: glass input, accent button |
| SocialProofBar.tsx | SocialProofBar.tsx | Minor restyle |
| BuildPortfolioSection.tsx | ExpandableSlicesSection.tsx | NEW: complete rewrite |
| AuthenticitySection.tsx | TrustSection.tsx | Rewrite as dark trust cards |
| BridgeSection.tsx | DELETE | Absorbed into right panel slices |
| PrivateSharingSection.tsx | DELETE | Absorbed into right panel slices |
| BottomCTA.tsx | BottomCTA.tsx | Restyle to match new system |
| Footer.tsx | Footer.tsx | Minor restyle |
| useFadeIn.ts | useScrollReveal.ts | Enhanced with stagger + better easing |

---

## Font Loading

In `layout.tsx`, replace font imports:
```tsx
import { Space_Grotesk, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})
```

Apply to body: `className={`${spaceGrotesk.variable} ${inter.variable} font-body`}`

In CSS:
```css
--font-display: var(--font-display), 'Space Grotesk', sans-serif;
--font-body: var(--font-body), 'Inter', sans-serif;
```
