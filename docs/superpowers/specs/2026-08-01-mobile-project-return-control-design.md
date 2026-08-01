# Mobile project return control

## Goal

Replace the oversized mobile “全部项目 / ALL PROJECTS” floating card with a compact return control that does not obscure project content.

## Chosen direction

At viewports up to 760px, the project-detail return link becomes a left-edge floating pill positioned around the vertical midpoint of the viewport. It keeps the left-chevron icon and a single short Chinese label, `项目`, while hiding the English subtitle.

The control will use a restrained translucent paper background, a one-pixel border, and a compact 44px-high touch target. It will stay above the project content but below the bottom page navigator, with a clear focus indicator and the existing destination (`/projects`). Desktop styling remains unchanged.

## Scope

- Update the existing `.project-return` mobile overrides in `src/styles.css`.
- Preserve the existing React structure and route behavior in `src/App.tsx`.
- Verify the production build and inspect the 390px-wide mobile layout.

## Acceptance criteria

- On mobile, the return control is visually compact and no longer a wide two-line card.
- It does not overlap the bottom pager or obscure project titles and drawings.
- It remains keyboard-focusable and has a usable 44px minimum touch height.
- Desktop return controls keep their present appearance.
