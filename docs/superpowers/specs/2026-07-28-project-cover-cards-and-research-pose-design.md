# Project Cover Cards and Research Card Pose Design

## Goals

1. Give every project cover slide a three-card media area so images can be added later without changing the layout.
2. Differentiate the data-research tarot card from the mathematics-modeling card by changing only the research card's figure pose.

## Project cover cards

The existing project cover image becomes card one. Two more image slots are added, for a total of three cards on every project cover slide.

- Card one: landscape, left-aligned.
- Card two: narrow portrait/square card in the center.
- Card three: landscape, right-aligned.
- The landscape cards use a 16:9-style proportion; the middle card uses a taller near-square proportion. Their bottom edges align, matching the supplied reference.
- Empty cards display a quiet paper-colored placeholder with the existing fine border and no fabricated content.
- Each project gets two optional image-path fields in `portfolioData.ts`. Adding an image later only requires filling the relevant path; present cards remain usable links when an image exists.
- On narrow screens, the three cards stack vertically in the same order while retaining their proportions.

## Research tarot-card revision

The target is `research-papers-tarot-card.png`. A new sibling version is generated rather than overwriting the original.

- Change the central person from a seated, downward-looking, pencil-in-hand posture to a side-standing pose, holding a tablet and studying data charts.
- Preserve the illustrated tarot-card format: dark ornamental green border, aged paper texture, muted ink palette, analysis-map/chart context, visual framing, and blank lower label panel.
- Update only the research-card image reference in the website after the new image passes visual review. The mathematics-modeling card remains unchanged.

## Validation

- Each project cover shows exactly three cards in the approved desktop proportions and order.
- Empty secondary cards do not create broken links or image-load errors.
- Mobile layout has no overflow and stacks the three cards in order.
- The revised research image no longer duplicates the mathematics-modeling figure pose while retaining the same card system.
- `npm run build` succeeds.
