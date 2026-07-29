# Project Cover Media Design

## Scope

Populate the existing three-card media area on each project cover page with the supplied files in `E:\Users\czy\Desktop\作品集稿件628\web封面图`. Keep the existing project pages, navigation, and drawing slides intact.

## Media mapping

| Project | Cover media |
| --- | --- |
| 01 山海 · 绿境 | Existing primary project image, `项目1_1.jpg`, `项目1_2.jpg` |
| 02 城市绿洲 · 邻里中心 | `项目2_1.png`, `项目2_漫游动画.mp4`, `项目2_生长动画.mp4` |
| 03 大地 · 黎纹 | `项目3_1.jpg` as the primary card; retain the existing project images in the remaining cards |
| 04 生生不息 · 绿脉生长 | Existing portfolio pages 16, 17 and 18 |
| 05 其他作品 | Existing portfolio pages 20, 21 and 22 |

## Presentation

- Store the copied media under the public assets directory and reference them through the existing public-path helper.
- Extend cover-card data to distinguish image and video assets.
- Images fill their cards with `object-fit: cover`; card aspect ratios remain the existing landscape / portrait / landscape composition.
- Videos are muted, looped, inline, and automatically played. They use the same card framing and crop behavior as images.
- Existing image cards remain links to their source file. Video cards expose native controls when hovered or focused so visitors can pause and scrub when needed.
- On narrow screens, cards remain ordered and stack vertically with no horizontal overflow.
- Project-index covers, cover cards and full-screen drawing images use a layered warm-gray shadow; hover/focus increases the lift slightly without changing the image crop.

## Validation

- Each supplied image and video appears only on its matching project cover page.
- Every project cover page renders three populated media cards with no placeholder panel.
- Project 02 renders both videos without console errors and starts playback when the browser permits it.
- Image/video cards are responsive, keyboard reachable, and visually aligned with the current cover layout.
- `npm run build` completes successfully.
