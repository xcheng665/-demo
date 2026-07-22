# Design QA

## Comparison Targets

- Other page structure reference: `C:\Users\czy\AppData\Local\Temp\codex-clipboard-355afb41-cb16-4131-8894-6267d8163c9c.jpg`
- Card art reference: `C:\Users\czy\AppData\Local\Temp\codex-clipboard-9fd2a711-507b-4643-bf3a-a73e2e9f5701.png`
- AI avatar reference: `C:\Users\czy\AppData\Local\Temp\codex-clipboard-223712b7-4fd6-4f27-9185-4df4b80807ca.jpg`
- Abilities reference: `C:\Users\czy\AppData\Local\Temp\codex-clipboard-f55f3257-1d41-44f4-85a5-d5325017087a.png`
- Other implementation capture: `design-qa-assets/other-page-implementation.png`
- AI implementation capture: `design-qa-assets/ai-page-implementation.png`
- Abilities implementation capture: `design-qa-assets/abilities-page-implementation.png`
- Side-by-side comparison evidence: `design-qa-assets/other-page-comparison.png`, `design-qa-assets/ai-page-comparison.png`

## Verified States

- Desktop `1440 x 720`: `/other` and `/ai`.
- Mobile `390 x 844`: `/other` and `/ai`.
- Other page card selection: selecting `绿色性能` updates both the active card and centered explanation.
- AI avatar quick question: `绿色建筑方面有哪些经验？` adds the selected question and a relevant response to the chat transcript.
- Abilities desktop `1672 x 941`: four equal-width cards, compact item spacing, and an explicit icon/header hierarchy.
- Abilities interaction: selecting `建筑设计` expands its recorded experience while retaining the other three cards in place.
- Browser console errors: none on `/other` or `/ai`.
- Production build: passed with `npm run build`.

## Comparison Notes

**Findings**

- No actionable P0, P1, or P2 findings.

**Open Questions**

- None. The difference in AI page accent color is intentional: the reference uses orange on black, while this portfolio retains the existing cream, sage, olive, and deep brown-gray token system.

## Fidelity Surfaces

- Fonts and typography: display headings use the existing black display face, while explanatory Chinese copy remains Song-style for readability. Desktop and mobile heading wrapping is intentional with no clipping.
- Spacing and layout rhythm: both pages keep the source's broad centered hero, fanned-card or split-panel composition, restrained borders, and fixed page controls. Mobile changes the deck to horizontal scrolling and stacks the AI panels.
- Colors and visual tokens: implementation uses `#F7F1E5`, `#C6D0B4`, `#7A8B64`, and `#3B352F`; dark AI mode is built from the existing deep brown-gray rather than a new black-orange theme.
- Image quality and asset fidelity: the five `/other` card images are independent generated assets, each with a themed manga-style male character. No portfolio image is used in the ability-card deck.
- Copy and content: card labels and AI responses are grounded in the portfolio's actual architectural design, green-performance, BIM, parametric, Python, and research skills.
- Abilities page: the reference's compact four-card hierarchy is matched through equal-width light cards, rounded icon medallions, condensed title/summary spacing, and small level badges.

## Implementation Checklist

- [x] Add `/other` route, navigation item, page rail marker, and sequential page controls.
- [x] Add an interactive five-card skill carousel with real generated card art.
- [x] Add `/ai` as the final route with prompt chips, typed input, and contextual local responses.
- [x] Update `/abilities` with compact four-card skill grouping and expandable experience details.
- [x] Verify card selection, AI response interaction, responsive overflow, browser console, and production build.

## Follow-up Polish

- None.

final result: passed
