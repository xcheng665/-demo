# Mobile Project Reader Navigation Design

## Goal

Improve the mobile Project reader so visitors can switch projects without leaving the reading context. The previous and next controls move from the lower corners to the vertical midpoint of the viewport, and a deliberate horizontal swipe also changes projects.

## Approved interaction

- On viewports up to 760px wide, the previous and next controls remain fixed to the left and right screen edges at the vertical midpoint.
- The controls retain their existing click, focus, accessible label, and circular previous/next project behavior.
- The reader keeps its existing vertical scroll and scroll-snap behavior for navigating cover and drawing slides.
- A horizontal touch gesture switches projects only when its horizontal travel exceeds a small threshold and is greater than its vertical travel. A leftward gesture selects the next project; a rightward gesture selects the previous project.
- Short, vertical, or substantially diagonal gestures do not change the project. This preserves ordinary drawing-page scrolling.
- Desktop behavior and layout remain unchanged.

## Implementation design

`ProjectDetailPage` owns the touch-state logic because it already determines the current, previous, and next projects. It will attach touch-start and touch-end handlers to the reader container, calculate the X/Y movement, and use the existing `navigate(projectRoute(...))` path so browser history, scroll reset, and the cyclic project order stay consistent.

The mobile stylesheet changes only the existing `.project-switch` placement rules: remove the bottom anchoring and restore its 50%-from-top positioning with the existing vertical translation. The compact mobile button dimensions stay unchanged.

## Validation

- At a mobile viewport, controls are centered vertically at the opposite edges.
- Tapping either control opens the expected adjacent project, including 01 ↔ 05 wrapping.
- A decisive left/right swipe changes to the expected adjacent project.
- A short swipe, vertical scroll, and diagonal gesture do not change the project.
- `npm run build` succeeds.
