# Design QA

## References

- Cover reference: `aa0d950cc1bc0bb23bb10b69f3de5161.jpg`
- Abilities reference: `e356c86a106620576cbca33e9c2eee2f.jpg`

## Verified States

- Desktop cover at 1440 x 900
- Desktop abilities page at 1440 x 900
- Mobile cover at 390 x 844
- Mobile abilities page at 390 x 844
- Projects page image loading and independent image links
- In-site portfolio PDF preview
- History API navigation between routes
- Expandable personal experience entries on the abilities page
- Animated monochrome perimeter light on the cover
- Original-color project imagery and five project design statements
- Four images for projects 01, 03, 04 and 05; five images for project 02

## Comparison Notes

- Preserved the reference's whitewashed architectural background, dense top utility row, bold centered identity, bottom discipline strip, side page index and restrained monochrome palette.
- Preserved the reference abilities page's oversized title, four-column editorial structure and compact status tags while replacing its content with the portfolio owner's actual architecture, green-building, BIM, visualization, computation and research experience.
- AI avatar panel intentionally omitted for the later phase requested by the user.
- No horizontal overflow was found at the tested mobile breakpoint.
- All inspected project images reported a non-zero natural width.
- Project imagery uses its original color with no CSS grayscale filter.
- Project previews use the source page ratio and `object-fit: contain` so no page content is cropped.
- Project images rotate automatically, pause on hover/focus and remain manually selectable.
- The full site uses the provided cream, sage, olive and deep brown-gray palette: `#F7F1E5`, `#C6D0B4`, `#7A8B64`, `#3B352F`.
- The about page uses the replacement resume PDF, a full-color extracted portrait and a legible olive-green web resume panel.
- The contact heading is locked to two intentional Chinese lines with an English subtitle.

final result: passed
