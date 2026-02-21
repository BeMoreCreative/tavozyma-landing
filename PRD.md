# PRABA Landing Page Redesign — PRD

## Goal

Redesign the landing page around two connected narratives that answer the visitor's two core questions:

1. **"Kaip tai veikia?"** — How do I build a verified portfolio?
2. **"Kaip tai padeda gauti klientu?"** — How does a verified portfolio help me win clients?

The page collects waitlist emails. Nothing else matters.

---

## Design System (existing, unchanged)

- **Accent**: forest green `#166534`, hover `#14532D`, light `#F0FDF4`
- **Fonts**: DM Serif Display (headlines, `font-serif`), Inter (body, `font-sans`)
- **Colors**: `--text-primary: #1A1A2E`, `--text-secondary: #6B7280`, `--text-tertiary: #9CA3AF`
- **Backgrounds**: `--bg-primary: #FFFFFF`, `--bg-secondary: #F8F9FA`
- **Shadows**: sm/md/lg as defined in `globals.css`
- **Max content width**: `1120px`
- **Language**: Lithuanian with proper diacritics

---

## Page Structure

The page has a centered hero on top, then splits into two side-by-side narrative columns, then reunites at the final CTA.

```
┌─────────────────────────────────────────────────┐
│  Header (sticky)                                │
├─────────────────────────────────────────────────┤
│                                                 │
│              HERO (centered)                    │
│     Headline + subtext + WaitlistForm           │
│            + trust signals                      │
│                                                 │
├─────────────────────────────────────────────────┤
│  Social Proof Bar (conditional)                 │
├────────────────────┬────────────────────────────┤
│                    │                            │
│    SIDE 1:         │    SIDE 2:                 │
│    Kaip tai        │    Kaip tai padeda         │
│    veikia          │    gauti klientu           │
│                    │                            │
│    Build your      │    Get leads via           │
│    verified        │    private sharing         │
│    portfolio       │                            │
│                    │                            │
├────────────────────┴────────────────────────────┤
│                                                 │
│              Bottom CTA (dark)                  │
│                                                 │
├─────────────────────────────────────────────────┤
│  Footer                                         │
└─────────────────────────────────────────────────┘
```

```
Section                          | BG           | Est. Height
---------------------------------|--------------|------------
1. Header (sticky)               | white/blur   | 64px fixed
2. Hero (centered)               | white        | ~80vh
3. Social Proof Bar              | accent-light | 48px (conditional)
4. Two Sides Section             | bg-secondary | ~120vh
   Left: "Kaip tai veikia"      |              |
   Right: "Kaip tai padeda"     |              |
5. Bottom CTA                    | dark         | ~70vh
6. Footer                        | white        | ~80px
```

---

## Section-by-Section Specification

### 1. Header

**Component**: `Header.tsx` (reuse, minor update)

**Changes**: Update the CTA button text from "Uzsiregistruoti" to "Isvesti profili" for stronger action framing. Keep sticky behavior, blur backdrop, and PRABA logo as-is.

```
[PRABA logo]                           [Isvesti profili ->]
```

**Lithuanian text**:
- Logo: `PRABA`
- CTA: `Išvesti profilį`

---

### 2. Hero (Centered)

**Component**: `HeroSection.tsx` (major rewrite)

**Layout**: Fully centered, single column. No two-column split. No interactive card in the hero — the demo card moves into Side 1 below.

```
              [badge]
        Headline (centered)
        Subtext (centered)
        [WaitlistForm centered]
        Below-form text
        Trust signals (centered row)
```

**Lithuanian text**:

Badge:
```
Patikrintas darbų portfolio
```

Headline:
```
Įrodymai, kurie
uždirba už jus.
```

Subtext:
```
Sukurkite portfolio, kuriame jūsų klientai patvirtina atliktus darbus savo tikra tapatybe.
Tada dalinkitės juo su naujais klientais — per unikalią privačią nuorodą.
```

Tagline:
```
Kaip carVertical automobiliams — tik jūsų darbų istorijai.
```

CTA form: `WaitlistForm` with `id="hero-form"`, centered, `max-w-md mx-auto`

Below-form text:
```
Pirmi 100 narių gauna nemokamą Pro planą visam laikui.
```

Trust signals (centered row of 3):
```
Saugus | Skaidrus | Nemokamas
```

**Mobile**: Already single-column, so no layout change needed. Just ensure comfortable spacing.

---

### 3. Social Proof Bar

**Component**: `SocialProofBar.tsx` (reuse as-is)

No changes. Conditionally renders when count >= 5. Currently hidden.

---

### 4. Two Sides Section — The Core of the Page

**Component**: NEW `TwoSidesSection.tsx`

This is the main structural piece. It contains a shared section header, then a two-column layout where each column is one narrative. On mobile, the columns stack vertically (Side 1 first, then Side 2).

**Layout**:

```
bg-secondary full-width
  max-w-[1120px] mx-auto
    Section header (centered, spanning full width)
    grid md:grid-cols-2 gap-8 (or gap-10)
      Left column: Side 1
      Right column: Side 2
```

#### Section Header (centered, above both columns)

Eyebrow:
```
Du žingsniai iki naujų klientų
```

Headline:
```
Sukurkite. Dalinkitės.
```

Subtext:
```
Kairėje — kaip sukurti patikrintą profilį. Dešinėje — kaip jis padeda laimėti klientus.
```

On mobile, this subtext changes conceptually (no left/right) but the section header still works because the sides stack naturally (first build, then share).

---

#### Side 1 (Left Column): "Kaip tai veikia" — Build Your Verified Portfolio

**Component**: NEW `Side1BuildPortfolio.tsx` (rendered inside TwoSidesSection)

This is a single tall card/column containing a mini-header and the 3-step flow stacked vertically. Each step has a small visual preview.

**Structure inside the column**:

```
┌─────────────────────────────┐
│  Column header:             │
│  "Kaip tai veikia"          │
│  Nuo pirmo projekto         │
│  iki patikimo profilio.     │
│                             │
│  Step 1: Įkelkite projektą  │
│  [mini form visual]         │
│                             │
│  ↓ (connector)              │
│                             │
│  Step 2: Klientas patvirtina│
│  [mini auth visual]         │
│                             │
│  ↓ (connector)              │
│                             │
│  Step 3: Profilis auga      │
│  [mini profile visual]      │
│                             │
│  ── Credibility cards ──    │
│  Tikra tapatybė             │
│  Autentiškumo %             │
│  Skaidrumo monitorius       │
└─────────────────────────────┘
```

**Column header**:

Eyebrow (small, accent color):
```
Kaip tai veikia
```

Headline:
```
Nuo pirmo projekto
iki patikimo profilio.
```

**Steps** (stacked vertically inside the column, connected by small downward arrows/lines):

**Step 1 — "Įkelkite projektą"**
```
Number badge: 01
Detail: 2 minutės
Title: Įkelkite projektą
Description: Pridėkite darbą: ką padarėte, kur, kiek laiko užtruko. Įveskite kliento el. paštą — sistema išsiųs patvirtinimo nuorodą.
```
Visual: A compact card mockup showing form fields (project name, description, client email) — simplified version of `AddProjectScreen` from `HeroProfileCard`. Static mini-card, rounded corners, border, ~120px tall.

**Step 2 — "Klientas patvirtina"**
```
Number badge: 02
Detail: 1 paspaudimas
Title: Klientas patvirtina savo tapatybę
Description: Jūsų klientas gauna nuorodą, prisijungia per Facebook, Google ar telefoną ir vienu paspaudimu patvirtina, kad darbas atliktas.
```
Visual: Compact auth method badges (Facebook highlighted blue, Google and Phone dimmed) + a small "Patvirtinti darbą" button mockup — simplified from `ClientVerificationScreen`.

**Step 3 — "Profilis auga"**
```
Number badge: 03
Detail: automatiškai
Title: Profilis auga su kiekvienu darbu
Description: Kiekvienas patvirtinimas didina jūsų autentiškumo procentą. Sistema skaičiuoja automatiškai — sukčiauti neįmanoma.
```
Visual: Authenticity percentage bar (75%, "Geras" badge) + "3/4 patvirtinti" stat. Static mini-display extracted from `ProfileScreen`.

**Credibility strip** (below the 3 steps, still inside Side 1):

Three compact feature badges stacked or in a mini-grid, each with icon + short title + one-line description. These replace the old full AuthenticitySection cards with a more compact format that fits inside the column:

```
[Person icon] Tikra tapatybė — Facebook, Google arba telefonas
[Chart icon]  Autentiškumo % — automatiškai skaičiuojamas
[Eye icon]    Skaidrumo monitorius — matoma, kiek paslėpta
```

Render as small rows with icon + bold title + dash + short description. No cards, just clean rows with subtle dividers.

---

#### Side 2 (Right Column): "Kaip tai padeda gauti klientų" — Win Clients

**Component**: NEW `Side2GetLeads.tsx` (rendered inside TwoSidesSection)

This column explains the private sharing mechanism and shows what the potential client sees.

**Structure inside the column**:

```
┌─────────────────────────────┐
│  Column header:             │
│  "Kaip tai padeda"          │
│  Dalinkitės tik su tais,   │
│  kurie turi nuspręsti.      │
│                             │
│  Feature 1: Private profile │
│  Feature 2: Unique link     │
│  Feature 3: Client sees     │
│            verified data    │
│                             │
│  ── Client View Preview ──  │
│  [Static mockup of what     │
│   the client sees when      │
│   opening the link]         │
│                             │
│  Jonas Petrauskas           │
│  Autentiškumas: 75%         │
│  3/4 patvirtinti            │
│  Latest projects...         │
│  Link bar + share button    │
└─────────────────────────────┘
```

**Column header**:

Eyebrow (small, accent color):
```
Kaip tai padeda gauti klientų
```

Headline:
```
Dalinkitės tik su tais,
kurie turi nuspręsti.
```

**Features** (3 blocks stacked, each with icon + title + short description):

Feature 1:
```
Icon: Lock
Title: Profilis nėra viešai pasiekiamas
Description: Jūsų portfolio nerandamas per Google ar jokią kitą paieškos sistemą. Jokių viešų sąrašų. Tik jūs kontroliuojate, kas jį mato.
```

Feature 2:
```
Icon: Link
Title: Unikali nuoroda su slaptu kodu
Description: Sugeneruokite nuorodą kaip praba.lt/p/jonas/a8x2k — kiekviena nuoroda unikali ir seka, kas ją atidarė.
```

Feature 3:
```
Icon: Eye / Chart
Title: Klientas mato tai, kas svarbu
Description: Potencialus klientas atidaro nuorodą ir mato jūsų patvirtintus darbus, autentiškumo procentą ir skaidrumo monitoriaus duomenis. Jokių marketingo žodžių — tik faktus.
```

**Client View Preview** (below the features, still inside Side 2):

A static card showing what the recipient sees when they open the shared link. This reuses visual patterns from `ProfileScreen` in `HeroProfileCard.tsx` but rendered as a standalone static mockup:

```
┌─────────────────────────────────────┐
│  [Lock icon] Privatus profilis      │
│                                     │
│  praba.lt/p/jonas/a8x2k [Dalintis] │
│                                     │
│  ─── Ką mato jūsų klientas ───     │
│                                     │
│  [JP]  Jonas Petrauskas             │
│        Interjero dizaineris         │
│                                     │
│  75%  Autentiškumas  [====] Geras   │
│  3/4 patvirtinti · 0 paslėpti      │
│                                     │
│  Paskutiniai darbai:                │
│  ✓ Butas, Antakalnio g.            │
│    Marius K. · Facebook             │
│  ✓ Kavinė, Gedimino pr.            │
│    *****@gmail.com · Google         │
│                                     │
│  [Eye] Skaidrumo monitorius         │
│  0 iš 4 paslėpti                   │
└─────────────────────────────────────┘
```

Render as a bordered card with rounded corners and `shadow-md`. Static — no interactivity needed.

---

#### Mobile Behavior for Two Sides Section

On mobile (`< md` breakpoint), the two columns stack vertically:

1. Section header (centered)
2. Side 1 (full width) — "Kaip tai veikia"
3. Small visual divider or spacing (24-32px)
4. Side 2 (full width) — "Kaip tai padeda gauti klientų"

The subtext "Kairėje...Dešinėje..." in the section header should be hidden on mobile or replaced with a simpler version. Use a `hidden md:block` / `md:hidden` swap:
- Desktop: `Kairėje — kaip sukurti patikrintą profilį. Dešinėje — kaip jis padeda laimėti klientus.`
- Mobile: `Pirmiausia — kaip sukurti profilį. Tada — kaip jis padeda gauti klientų.`

---

### 5. Bottom CTA

**Component**: `BottomCTA.tsx` (modify text)

**Changes**: Update supporting text to reference both narratives. Keep dark background, waitlist form, benefits list, pricing.

**Updated Lithuanian text**:

Badge:
```
Liko vietų ankstyvajam prisijungimui
```

Headline:
```
Pasiruošk įrodyti
savo darbą.
```

Subtext:
```
Sukurkite patikimą profilį. Dalinkitės juo su klientais. Tegul jūsų darbai kalba už save.
```

Benefits list:
```
- Nemokamas Pro planas visam laikui
- Neriboti projektai ir patvirtinimai
- Tiesioginė prieiga prie kūrėjo komandos
```

Price line:
```
EUR 9/mėn. (strikethrough)   EUR 0. Visam laikui.
```

Below-form text:
```
Jokio spam. Tik vienas laiškas, kai paleisime.
```

---

### 6. Footer

**Component**: `Footer.tsx` (reuse as-is)

No changes needed.

---

## Component Mapping

| Existing Component         | Action    | Notes                                                |
|----------------------------|-----------|------------------------------------------------------|
| `Header.tsx`               | Modify    | Change CTA text                                      |
| `HeroSection.tsx`          | Rewrite   | Centered layout, remove two-column split, no card    |
| `HeroProfileCard.tsx`      | Reuse     | No longer in hero — visual patterns reused in sides  |
| `WaitlistForm.tsx`         | Reuse     | No changes                                           |
| `SocialProofBar.tsx`       | Reuse     | No changes                                           |
| `ProblemSection.tsx`       | Delete    | Replaced by Side 1 inside TwoSidesSection            |
| `HowItWorksSection.tsx`    | Delete    | Replaced by Side 1 inside TwoSidesSection            |
| `AuthenticitySection.tsx`  | Delete    | Credibility features absorbed into Side 1 as compact strip |
| `BottomCTA.tsx`            | Modify    | Update subtext                                       |
| `Footer.tsx`               | Reuse     | No changes                                           |
| `useFadeIn.ts`             | Reuse     | Used by new sections too                             |

| New Component              | Purpose                                                        |
|----------------------------|----------------------------------------------------------------|
| `TwoSidesSection.tsx`      | Wrapper: section header + 2-col grid holding Side 1 and Side 2 |
| `Side1BuildPortfolio.tsx`  | Left column: 3-step build flow + credibility strip             |
| `Side2GetLeads.tsx`        | Right column: private sharing features + client view mockup    |

Note: `HeroProfileCard.tsx` is no longer rendered directly, but its visual patterns (AddProjectScreen, ClientVerificationScreen, ProfileScreen) are referenced when building the step visuals and client view preview. The implementations in Side 1 and Side 2 are static simplifications — not the interactive component itself.

---

## Updated page.tsx Composition

```tsx
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import TwoSidesSection from "@/components/TwoSidesSection";
import BottomCTA from "@/components/BottomCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <SocialProofBar />
      <TwoSidesSection />
      <BottomCTA />
      <Footer />
    </>
  );
}
```

---

## Narrative Flow (Reader's Journey)

1. **Hero** (centered): "Irodymai, kurie uzdirba uz jus" — sets up the promise. Both narratives teased in the subtext. Waitlist form is immediately accessible.

2. **Two Sides — Side 1** (left): "Kaip tai veikia" — the visitor reads down the left column and understands the 3-step process to build a verified profile, plus the credibility mechanisms (identity, authenticity %, transparency).

3. **Two Sides — Side 2** (right): "Kaip tai padeda gauti klientu" — the visitor reads down the right column and understands that the profile is private, shared via unique links, and sees exactly what a potential client would see.

4. **Bottom CTA**: "Pasiruosk irodyti savo darba" — register now, get free Pro.

The side-by-side layout lets the visitor scan both narratives at a glance. They naturally read left-to-right: first build, then share. On mobile, the stacking preserves this same order.

---

## Mobile Considerations

- Hero is already centered, no layout change on mobile
- Two Sides grid collapses from `md:grid-cols-2` to single column on mobile
- Side 1 stacks above Side 2 on mobile (natural reading order)
- Section header subtext swaps "Kaireje/Desineje" for "Pirmiausia/Tada" on mobile
- All step visuals inside Side 1 are compact enough for a single column
- Client View Preview in Side 2 renders full-width on mobile
- All text sizes use `clamp()` via CSS variables (already in `globals.css`)
- Touch targets remain 44px+ for interactive elements
- `useFadeIn` hook used on TwoSidesSection for scroll-triggered entrance

---

## What NOT to Build

- No public profiles or search functionality
- No user authentication or login flows
- No database integration (waitlist stays in-memory for dev)
- No animations beyond `useFadeIn` and subtle transitions
- No dark mode
- No English translation
- No cookie banners or analytics
- No "Who is this for" / persona section
- The interactive `HeroProfileCard` auto-play demo is NOT used in the new design (its visual patterns are reused as static mockups in the two sides)

---

## Implementation Notes

### Task 2 (Side 1) should build:
- `Side1BuildPortfolio.tsx` — the 3-step vertical flow with mini-visuals + credibility strip
- Modify `HeroSection.tsx` — centered layout, remove two-column grid, remove HeroProfileCard
- Modify `Header.tsx` — CTA text change

### Task 3 (Side 2) should build:
- `Side2GetLeads.tsx` — private sharing features + client view static mockup
- `TwoSidesSection.tsx` — the wrapper with section header + 2-col grid importing Side1 and Side2
- Modify `BottomCTA.tsx` — updated subtext

### Task 4 should:
- Update `page.tsx` with new composition
- Delete `ProblemSection.tsx`, `HowItWorksSection.tsx`, `AuthenticitySection.tsx`
- Verify full build with `npm run build`
- Check mobile responsiveness
