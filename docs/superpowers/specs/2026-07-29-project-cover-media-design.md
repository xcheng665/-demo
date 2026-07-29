# Project Cover Media Design

## Scope

Render the supplied `作品集_cheng_已压缩.pdf` into the project galleries. The PDF is the sole source for all project images, including the three-card cover area, full-screen drawing slides and project-index thumbnails.

## Media mapping

| Project | Cover media |
| --- | --- |
| 01 山海 · 绿境 | PDF 04–08 |
| 02 城市绿洲 · 邻里中心 | PDF 09–14 |
| 03 大地 · 黎纹 | PDF 15–18 |
| 04 生生不息 · 绿脉生长 | PDF 19–22 |
| 05 其他作品 | PDF 23–29 |

## Presentation

- Store the rendered JPEG pages under `public/assets/project-pages/` and reference them through the existing public-path helper.
- Use the first three pages of each mapped range in the cover-card area; the remaining pages render in the full-screen gallery.
- Images fill their cards with `object-fit: cover`; card aspect ratios remain the existing landscape / portrait / landscape composition.
- Image cards remain links to their source file.
- On narrow screens, cards remain ordered and stack vertically with no horizontal overflow.
- Project-index covers, cover cards and full-screen drawing images use a layered warm-gray shadow; hover/focus increases the lift slightly without changing the image crop.

## Validation

- Every project image is a page rendered from the supplied PDF.
- Every project cover page renders three populated media cards with no placeholder panel.
- Image cards are responsive, keyboard reachable, and visually aligned with the current cover layout.
- `npm run build` completes successfully.
