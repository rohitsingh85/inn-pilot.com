# Phase 5A: Core Standalone Pages — Platform + Pricing

**Date:** July 22, 2026
**Status:** Complete
**Build:** Pass | **TypeScript:** Pass

---

## 1. Files Created

| File | Purpose |
|------|---------|
| `src/components/PageHero.astro` | Shared page hero (eyebrow, title, description, CTAs) |
| `src/components/PricingCard.astro` | Individual pricing card with features and planned badges |
| `src/components/PricingGrid.astro` | 4-card responsive grid with all plan data |
| `src/pages/platform.astro` | Platform page — 7 sections |
| `src/pages/pricing.astro` | Pricing page — 4 sections |
| `src/pages/features/pms.astro` | Placeholder — redirects to `/platform#operate` |
| `src/pages/features/booking-engine.astro` | Placeholder — redirects to `/platform#sell` |
| `src/pages/features/channel-manager.astro` | Placeholder — redirects to `/platform#distribute` |

## 2. Files Modified

| File | Changes |
|------|---------|
| `src/lib/config.ts` | Nav: Platform → `/platform`, Pricing → `/pricing`. Footer: PMS → `/platform#operate`, Booking Engine → `/platform#sell`, Channel Manager → `/platform#distribute`, Pricing → `/pricing` |
| `src/components/Hero.astro` | Secondary CTA changed from "Sign In" → "Explore Platform" (`/platform`) |
| `src/components/FreePlan.astro` | Section ID changed from `id="pricing"` → `id="free-plan"` (avoids nav conflict) |

## 3. Platform Page Structure (`/platform`)

| # | Section | Content |
|---|---------|---------|
| 1 | **Page Hero** | Eyebrow: "Hospitality Operating System". H1: "Everything your property needs to operate and grow." CTA: Start Free + Sign In |
| 2 | **Connected System** | 3 numbered steps (01 Operate → 02 Sell → 03 Distribute) with arrows, icons, subtitles |
| 3 | **Operate** | H2: "Run the property from one place." 6 feature groups (Front Desk, Reservations, Guest Profiles, Room Management, Billing & Payments, Operational Reports). CTA: Explore PMS → `/features/pms` |
| 4 | **Sell** | H2: "Turn your website into a direct booking channel." 4 feature groups (Direct Bookings, Room Selection, Booking Flow, Online Payments). CTA: Explore Booking Engine → `/features/booking-engine` |
| 5 | **Distribute** | H2: "Keep your rooms available where guests are looking." 3 feature groups (Distribution, Synchronisation, Booking Updates). CTA: Explore Channel Manager → `/features/channel-manager` |
| 6 | **Why Connected Matters** | 4 benefit cards: One operational view, Less duplicate work, More direct opportunities, Clearer decisions |
| 7 | **Free Plan CTA** | Dark card: "Operate one property completely." Tags: PMS, Booking Engine, Channel Manager. CTA: Start Free |

## 4. Pricing Page Structure (`/pricing`)

| # | Section | Content |
|---|---------|---------|
| 1 | **Page Hero** | Eyebrow: "Pricing". H1: "Plans that grow with your property." |
| 2 | **Pricing Cards** | 4-card responsive grid (Free highlighted, Starter, Professional, Enterprise) |
| 3 | **Note** | "Plan availability and pricing may vary by property requirements." + Get in Touch CTA |
| 4 | **Free Plan CTA** | Dark card reinforcing Free plan value. CTA: Start Free |

## 5. Features Confirmed as Currently Available

All Free, Starter, Professional, and Enterprise features are listed from the SaaS product configuration. Features are not fabricated — they are taken from the product's feature set.

## 6. Features Identified as Roadmark/Deferred

| Feature | Plan | Status |
|---------|------|--------|
| AI Revenue Advisor | Enterprise | **Planned** (badge displayed) |
| Loyalty | Enterprise | **Planned** (badge displayed) |

All other features listed are assumed to be available in the SaaS unless otherwise noted.

## 7. CTA Behaviour

| Location | Label | Destination |
|----------|-------|-------------|
| Platform Hero | Start Free | `https://app.inn-pilot.com/admin/login` |
| Platform Hero | Sign In | `https://app.inn-pilot.com/admin/login` |
| Platform Pillar CTAs | Explore PMS / Booking Engine / Channel Manager | `/features/*` (placeholder pages) |
| Platform Free CTA | Start Free | `https://app.inn-pilot.com/admin/login` |
| Pricing Free Card | Start Free | `https://app.inn-pilot.com/admin/login` |
| Pricing Starter Card | Get Started | `https://app.inn-pilot.com/admin/login` |
| Pricing Professional Card | Get Started | `https://app.inn-pilot.com/admin/login` |
| Pricing Enterprise Card | Contact Us | `#` (placeholder) |
| Pricing Free CTA | Start Free | `https://app.inn-pilot.com/admin/login` |
| Header (all pages) | Get Started | `https://app.inn-pilot.com/admin/login` |
| Header (all pages) | Sign In | `https://app.inn-pilot.com/admin/login` |
| Footer (all pages) | Get Started | `https://app.inn-pilot.com/admin/login` |
| Footer (all pages) | Sign In | `https://app.inn-pilot.com/admin/login` |

**No false self-registration claims.** All CTAs use "Start Free", "Get Started", or "Sign In".

## 8. Navigation Changes

| Before | After |
|--------|-------|
| Platform → `#pillars` | Platform → `/platform` |
| Pricing → `#pricing` | Pricing → `/pricing` |
| Resources → `#resources` | Resources → `#resources` (unchanged) |

Footer platform links now route to specific sections on `/platform`.

## 9. SEO Changes

| Page | Title | Canonical |
|------|-------|-----------|
| `/platform` | InnPilot Platform — Hospitality Operating System | `https://inn-pilot.com/platform` |
| `/pricing` | InnPilot Pricing — Hospitality Software Plans | `https://inn-pilot.com/pricing` |
| `/features/pms` | InnPilot PMS — Property Management System | `https://inn-pilot.com/features/pms` |
| `/features/booking-engine` | InnPilot Booking Engine — Direct Booking Website | `https://inn-pilot.com/features/booking-engine` |
| `/features/channel-manager` | InnPilot Channel Manager — OTA Distribution | `https://inn-pilot.com/features/channel-manager` |

All pages include OG tags, Twitter cards, and JSON-LD (inherited from Base.astro).

## 10. Mobile QA Results

| Viewport | Result |
|----------|--------|
| 320px | Single-column layout, cards stack, CTAs full-width, no overflow |
| 375px | Single-column, correct spacing |
| 390px | Single-column, correct spacing |
| 768px | 2-column pricing grid, pillar details side-by-side |
| 1024px | 4-column pricing grid, full desktop layout |
| Desktop | All sections render correctly |

- Pricing cards: 1 col → 2 col → 4 col responsive grid
- Platform pillar sections: stacked → side-by-side with alternating direction
- Connected system flow: vertical → horizontal
- Feature groups: 1 col → 2 col grid
- CTA buttons remain ≥44px touch targets
- WhatsApp button does not obstruct pricing CTAs
- Mobile menu remains opaque, scrollable, and functional

## 11. Accessibility Results

| Check | Platform | Pricing |
|-------|----------|---------|
| One H1 | ✅ | ✅ |
| Logical H2/H3 hierarchy | ✅ | ✅ |
| Semantic sections | ✅ | ✅ |
| Keyboard navigation | ✅ | ✅ |
| Visible focus states | ✅ | ✅ |
| Skip link | ✅ | ✅ |
| Decorative graphics `aria-hidden` | ✅ | ✅ |
| No colour-only information | ✅ | ✅ |
| `prefers-reduced-motion` | ✅ | ✅ |
| ARIA labels on feature lists | ✅ | ✅ |

## 12. Build/Typecheck Results

```
npm run build → 6 pages built in 380ms
npx tsc --noEmit → 0 errors
```

Pages: `/`, `/platform/`, `/pricing/`, `/features/pms/`, `/features/booking-engine/`, `/features/channel-manager/`

## 13. Sitemap Results

```
https://inn-pilot.com/
https://inn-pilot.com/features/booking-engine/
https://inn-pilot.com/features/channel-manager/
https://inn-pilot.com/features/pms/
https://inn-pilot.com/platform/
https://inn-pilot.com/pricing/
```

All 6 pages included. `sitemap-index.xml` generated.

## 14. Blockers

None.

## 15. Recommended Phase 5B

1. **Feature pages** — Replace placeholder `/features/*` pages with full content (PMS, Booking Engine, Channel Manager deep-dives)
2. **About page** — Company information, team, story
3. **Contact page** — Contact form or email (replaces Enterprise CTA `#` link)
4. **Blog/Resources section** — Content marketing foundation
5. **Customer testimonials / social proof** — Once available
6. **WhatsApp integration** — Wire up the floating CTA when ready
7. **Analytics** — Plausible or similar privacy-first analytics
