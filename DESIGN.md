# Design Brief: The Pride Exchange Mobile App

## Overview
Production-ready WooCommerce mobile app for LGBTQ+ pride-themed storefront. Bold, vibrant, welcoming marketplace UI with smooth animations and grid-based product discovery.

## Tone & Differentiation
Playful inclusivity meets modern commerce. Vibrant pride accents (magenta, orange, purple) on clean neutral base create a celebratory, not corporate, shopping experience. The app feels invitation to explore and celebrate, not just transact.

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | 0.55 0.24 15 (vibrant magenta) | 0.72 0.25 14 | Buttons, branding, CTAs |
| Secondary | 0.65 0.18 35 (warm orange) | 0.65 0.20 35 | Action highlights, badges |
| Accent | 0.52 0.22 290 (pride purple) | 0.70 0.20 290 | Featured products, badges |
| Destructive | 0.55 0.22 25 (red) | 0.65 0.19 22 | Delete, cancel, error states |
| Background | 0.99 0 0 (white) | 0.145 0 0 (charcoal) | Page background |
| Card | 1.0 0 0 (white) | 0.18 0 0 (dark) | Product cards, surfaces |
| Foreground | 0.15 0 0 (dark grey) | 0.95 0 0 (off-white) | Body text |
| Muted | 0.95 0 0 (light grey) | 0.22 0 0 (dark grey) | Secondary content |
| Border | 0.9 0 0 (light grey) | 0.28 0 0 (medium grey) | Dividers, separators |

## Typography
- **Display Font:** General Sans (modern, geometric, slightly rounded)
- **Body Font:** DM Sans (highly readable, clean at mobile sizes, tight metrics)
- **Mono Font:** JetBrains Mono (technical fallback, rarely used)
- **Scale:** 12px (caption) → 14px (body) → 16px (body+) → 18px (heading) → 24px (title) → 32px (hero)

## Structural Zones

| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header/Nav | Elevated with border-b, sticky, clean background | Search, cart badge, account access |
| Hero/Featured | Gradient accent background, large product images | Seasonal campaigns, new arrivals |
| Product Grid | 2-col mobile, 3+ desktop, card-hover shadow animation | Primary discovery, grid layout |
| Section Dividers | Alternate muted/10 backgrounds | Visual rhythm, breathing room |
| Footer | Muted background with border-t, centered links | Help, policy, social links |

## Component Patterns
- **Buttons:** Primary (solid magenta) and secondary (solid orange) with hover opacity and active scale-down. No outlines; use solid fills.
- **Product Cards:** Image + rounded corners (10px) + subtle shadow (card) → elevated on hover. Badge accent in corner (pride purple).
- **Input Fields:** Light grey border (input), rounded 8px, focus ring with primary color.
- **Badges:** Accent/20 background with text-accent color; small, tight padding.
- **Search Bar:** Input style with icon, full width on mobile, constrained on desktop.

## Motion & Animation
- **Entrance:** Fade-in (300ms) + slide-up (8px) for cards and sections on load.
- **Hover:** Product cards lift (-4px) with shadow elevation and 200ms ease-out.
- **Active:** Buttons scale-down (95%) on press for tactile feedback.
- **Transition Default:** all 300ms cubic-bezier(0.4, 0, 0.2, 1) for smooth, professional feel.

## Spacing & Density
- **Base Unit:** 4px grid
- **Mobile Padding:** 16px (4 units)
- **Desktop Padding:** 24px (6 units)
- **Component Gaps:** 8px (tight), 12px (comfortable), 16px (spacious)
- **Card Padding:** 12px (mobile), 16px (desktop)

## Shape Language
- **Border Radius:** 0px (elements), 8px (inputs, badges), 10px (cards, modals), 24px (hero sections), full (icons)
- **Icons:** Rounded-square 8px, inline or as buttons

## Elevation & Depth
- **Shadow xs:** 0 1px 2px 0 rgba(0,0,0,0.05) — subtle, rarely used
- **Shadow card:** 0 2px 8px 0 rgba(0,0,0,0.08) — default card elevation
- **Shadow elevated:** 0 8px 16px 0 rgba(0,0,0,0.12) — modals, prominent overlays
- No glow or neon effects; depth through layering and composition.

## Dark Mode Strategy
**Approach:** Full intentional redesign, not inverted lightness. Primary becomes brighter (0.72), secondary maintains saturation. Backgrounds drop to charcoal (0.145), cards to 0.18. All text/borders tuned for readability and visual hierarchy. Accent colors pop more against dark backgrounds.

## Constraints & Guardrails
- ✅ Use primary, secondary, accent colors sparingly and with purpose
- ✅ No full-page gradients; solid backgrounds with accent accents only
- ✅ All text on cards and buttons uses theme colors, not arbitrary hex
- ✅ Icons and badges use accent color for visual pop without chaos
- ❌ No bootstrap blue, no default Tailwind shadows, no mixed color modes
- ❌ No arbitrary opacity — all contrast tuned via lightness (L) and chroma (C)
- ❌ No rounded-full borders on non-icon elements

## Signature Detail
**Pride Accent Grid:** Product badges use accent color (purple) with semi-transparent background, creating a subtle visual rhythm that celebrates pride without overwhelming product photography. Combined with primary/secondary buttons, the UI feels vibrant and inclusive.

## Files
- `src/frontend/src/index.css` — OKLCH tokens, light/dark mode, @font-face declarations, custom utility classes
- `src/frontend/tailwind.config.js` — Custom animations (fade-in, slide-up), shadow hierarchy, animation timing
- `src/frontend/public/assets/fonts/` — GeneralSans, DMSans, JetBrainsMono
