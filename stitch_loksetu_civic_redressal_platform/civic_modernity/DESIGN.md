---
name: Civic Modernity
colors:
  surface: '#f0fcf4'
  surface-dim: '#d0ddd5'
  surface-bright: '#f0fcf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf7ef'
  surface-container: '#e4f1e9'
  surface-container-high: '#dfebe3'
  surface-container-highest: '#d9e5de'
  on-surface: '#131e19'
  on-surface-variant: '#3f4942'
  inverse-surface: '#28332e'
  inverse-on-surface: '#e7f4ec'
  outline: '#6f7a71'
  outline-variant: '#bfc9c0'
  surface-tint: '#186c45'
  primary: '#005131'
  on-primary: '#ffffff'
  primary-container: '#176b45'
  on-primary-container: '#99e9b9'
  inverse-primary: '#88d7a8'
  secondary: '#006c45'
  on-secondary: '#ffffff'
  secondary-container: '#87f5ba'
  on-secondary-container: '#007148'
  tertiary: '#5d4100'
  on-tertiary: '#ffffff'
  tertiary-container: '#7b5700'
  on-tertiary-container: '#ffd07c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a4f4c3'
  primary-fixed-dim: '#88d7a8'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#005232'
  secondary-fixed: '#8af8bd'
  secondary-fixed-dim: '#6ddba2'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005233'
  tertiary-fixed: '#ffdea7'
  tertiary-fixed-dim: '#f8bd45'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4200'
  background: '#f0fcf4'
  on-background: '#131e19'
  surface-variant: '#d9e5de'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-sm: 1rem
  margin-lg: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system defines an authoritative yet deeply approachable digital public-service portal. It marries the institutional gravitas of democratic governance with the fluidity, efficiency, and clarity of modern enterprise software. The emotional response sought is institutional trust, procedural transparency, clarity of recourse, and dignified civic participation.

The design movement combines **Corporate Modern** with subtle **Tactile & Editorial Nuance**. Interfaces avoid bureaucratic clutter, instead relying on expansive generous whitespace, structured data cards, high typographic hierarchy, deliberate state-tracking metaphors, and subdued surface boundaries. Subtle warm undertones prevent the portal from feeling sterile, cultivating a sense of national pride and reliable civic partnership.

## Colors

The palette grounds the interface in stability and procedural integrity. The deep forest green anchor reflects public infrastructure, authority, and institutional stability, elevated by an emerald companion for affirmative actions. The soft saffron accent provides cultural resonance and energetic focus, reserved exclusively for critical status markers, high-priority notifications, and spotlight metrics.

### Functional Roles
- **Primary (`#176B45`)**: Used for primary brand markers, active navigation nodes, primary action buttons, and dominant header typography.
- **Secondary (`#239B68`)**: Used for secondary interactive states, progress step fills, interactive links, and forward momentum elements.
- **Accent / Tertiary (`#F4B942`)**: Reserved strictly for notification pips, attention callouts, pending actions, and subtle commemorative touches.
- **Neutral Base (`#202B26`)**: Dark charcoal serving as high-contrast body text on light surfaces; avoids the harsh starkness of pure black.
- **Muted Text (`#69766F`)**: Calibrated slate-sage for subtext, metadata, tracking codes, and secondary labels.
- **Backgrounds**: Canvas sits at `#F7F9F6` (warm institutional off-white), while primary cards sit on elevated pure `#FFFFFF` surfaces.
- **Status Semantics**:
  - *Submitted/New*: Slate (`#64748B`)
  - *Under Review*: Amber (`#D97706`)
  - *In Progress*: Cobalt Blue (`#2563EB`)
  - *Resolved*: Pure Emerald (`#16A34A`)
  - *Escalated/Rejected*: Crimson Rose (`#E11D48`)

## Typography

The typographic hierarchy is designed around programmatic legibility across variable device environments, demographic age spans, and multi-script data tables. Standardized on `Inter`, the type system enforces strict line-heights and slightly tight headline tracking to preserve an editorial and structured civic presence.

All long-form citizen charters, legal terms, and status descriptions utilize `body-md` (15px) or `body-lg` (18px) with generous line heights to minimize reading fatigue. Numeric tracking IDs, timestamps, and metadata tags reference `label-md` and `label-sm` with tabular numbers (`tnum`) enabled by default to ensure precise vertical column alignment in administrative tables.

## Layout & Spacing

The structural layout utilizes a desktop-first 12-column grid system bounded inside a maximum container width of `1280px`. Civic dashboards and multi-step reporting workflows prioritize structured content chunking over continuous single-column scrolling.

### Breakpoints & Adaptations
- **Desktop (1024px and up)**: 12-column grid, `margin-lg` (4rem/64px) outer container offsets, `gutter-lg` (2rem/32px) grid gutters. Side navigation bars remain fixed at 280px; main workload dashboards occupy remaining fluid columns.
- **Tablet (768px - 1023px)**: 8-column layout, `margin` (2rem/32px), `gutter` (1.5rem/24px). Dual-column data structures collapse into single-column groupings with tabular views moving to horizontally scrollable viewports.
- **Mobile (Below 768px)**: 4-column layout, `margin-sm` (1rem/16px), `gutter-sm` (1rem/16px). Navigation transitions into an anchored bottom bar or slide-over sheet. Action groups pin to the viewport base with safe-area spacing.

## Elevation & Depth

Visual hierarchy is communicated through subtle tonal separation, ambient tinted shadows, and refined surface boundaries rather than heavy elevation jumps. The system relies on soft atmospheric depth that feels grounded in paper and physical public registers.

### Elevation Levels
- **Canvas Base (`Level 0`)**: The `#F7F9F6` background. Flat, zero elevation.
- **Card & Panel Layer (`Level 1`)**: `#FFFFFF` background bound by a 1px border of `rgba(23, 107, 69, 0.08)` or `#E2E8F0`, paired with an ambient shadow: `0 1px 3px rgba(32, 43, 38, 0.04), 0 4px 12px rgba(32, 43, 38, 0.03)`.
- **Active Interactive / Hover Layer (`Level 2`)**: Interactive cards lift slightly on pointer interaction: `0 4px 6px -1px rgba(23, 107, 69, 0.06), 0 10px 24px -3px rgba(32, 43, 38, 0.06)`, retaining subtle border definition.
- **Overlay & Modal Layer (`Level 3`)**: Status dialogues, citizen verification drawers, and confirmation modals: `0 20px 25px -5px rgba(32, 43, 38, 0.1), 0 10px 10px -5px rgba(32, 43, 38, 0.04)` over a backdrop of `rgba(32, 43, 38, 0.45)` with `backdrop-blur-sm`.

## Shapes

The design system maintains a balanced, approachable geometry using moderate border radiuses that soften institutional authority without sacrificing organizational structure. 

- **Base Radius (`0.5rem` / `8px`)**: Applied to all form inputs, select dropdowns, alert banners, and small buttons.
- **Large Radius (`1rem` / `16px`)**: Standard for all functional content cards, metric tiles, and data list containers.
- **Extra Large Radius (`1.5rem` / `24px`)**: Reserved for primary platform feature modules, modal sheets, and central status tracking summaries.
- **Pill (`9999px`)**: Exclusively reserved for status chips, category pills, and tag markers.

## Components

### Buttons
- **Primary**: Solid Deep Forest Green (`#176B45`) background, `#FFFFFF` text, subtle shadow, rounded-md (`8px`). Hover state darkens to `#104F33`. Focus ring exhibits a 2px offset in `#239B68`.
- **Secondary**: Clear background with a 1.5px border in `#176B45`, text in `#176B45`. Hover applies a light green tint `rgba(23, 107, 69, 0.05)`.
- **Tertiary / Ghost**: Transparent background, `#202B26` text. Hover adds a warm tint `#EAEFE9`.
- **Destructive**: Rose background (`#E11D48`), `#FFFFFF` text, with crimson focus states.

### Status Badges & Chips
- Fully rounded (`rounded-full`), padding `0.25rem 0.75rem`, typed in `label-sm`.
- Constructed using soft background tints (10-15% opacity of semantic color) with high-contrast text:
  - *Submitted*: `#F1F5F9` background, `#475569` text.
  - *Under Review*: `#FEF3C7` background, `#B45309` text.
  - *In Progress*: `#EFF6FF` background, `#1D4ED8` text.
  - *Resolved*: `#DCFCE7` background, `#15803D` text.
  - *Escalated*: `#FFE4E6` background, `#BE123C` text.
- Accent Badges (Priority/Notice): Soft saffron `#FEF3C7` background with `#92400E` text.

### Inputs & Form Fields
- Height of 44px on desktop to guarantee accessible touch targets.
- Background: `#FFFFFF`. Border: 1px solid `#CBD5E1`.
- Focused state: Border transforms to `#176B45` paired with an ambient green focus ring: `0 0 0 3px rgba(23, 107, 69, 0.15)`.
- Helper labels sit firmly at `label-md` with tracking numbers using monospace font variants.

### Cards & Grievance Panels
- Primary cards employ `#FFFFFF` surfaces with `rounded-xl` (16px), a 1px border of `rgba(23, 107, 69, 0.08)`, and `Level 1` ambient elevation.
- Internal padding adheres strictly to `space-lg` (24px) for desktop and `space-md` (16px) for mobile.

### Specialized Civic Components
- **Grievance Progress Tracker**: A multi-step horizontal rail displaying step nodes. Completed stages use solid `#16A34A` indicators; current step pulses with `#239B68` alongside an amber badge if under active review; pending stages display muted neutral outlines.
- **Official Seal & Department Badge**: Micro-container with `rounded-md` housing state emblems or department typography in high-contrast forest green tints.
- **Reference ID Token**: High-contrast, monospaced inline block with a one-click copy function for citizens tracking grievances via external SMS/IVR.