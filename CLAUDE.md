# Modern Cobalt2 VSCode Theme — Claude Context

## Palette

| Role                      | Hex       |
| ------------------------- | --------- |
| Background                | `#193549` |
| Sidebar (darker)          | `#122738` |
| Floating surfaces         | `#15232d` |
| Selection / highlights    | `#1F4662` |
| Deep background           | `#0d2235` |
| Accent (yellow)           | `#ffc600` |
| Accent hover (darker)     | `#e6a800` |
| Secondary accent (orange) | `#ff9d00` |
| Foreground                | `#e1efff` |
| Muted text                | `#6c8ca4` |

## Architecture

- `themes/cobalt2.json` — all edits go here, split into two sections:
  - `colors` — workbench UI (borders, sidebar, tabs, terminal, etc.)
  - `tokenColors` — TextMate syntax rules (Cobalt2 palette)
- Unlike November, tokenColors here ARE part of the theme and should be tweaked to match the Cobalt2 aesthetic

## Workflow

```sh
npm run install-ext   # package + install locally, then reload VS Code window
npm run marketplace   # package + open marketplace upload page
npm run release:patch # bump version, commit, tag, push
```

## Key theming decisions

### Surfaces (dark → light)

- `#0d2235` — deepest (widget shadows, deepest borders)
- `#122738` — sidebar, tab bar background, structural borders
- `#193549` — main editor, panels, status bar, title bar
- `#15232d` — floating surfaces (dropdowns, quick input, suggest widget, inline chat)
- `#1F4662` — selection, active list items, highlights

### Accent

- `#ffc600` yellow is the primary accent (cursor, badges, buttons, active borders)
- `#ff9d00` orange is the secondary accent (keywords, support functions)
- Button foreground is `#193549` (dark navy on yellow — NOT white)

### Syntax highlights (Cobalt2 characteristic)

- Comments: `#0088ff` italic (blue — distinctive Cobalt2 trait)
- Strings: `#a5ff90` (light green)
- Keywords/storage: `#ff9d00` bold (orange)
- Functions: `#ffc600` (yellow)
- Constants/numbers: `#ff628c` (pink)
- Classes/types: `#80ffbb` (mint)
- Properties: `#9effff` (cyan)
- Language variables (this/self): `#fb94ff` (magenta)

## VS Code theming notes (inherited from November)

- `input.background` controls all search/replace inputs globally — change carefully
- `peekViewTitle.background` controls the edit textarea in comment widget edit mode
- Minimap uses `minimapSlider.*`, NOT `scrollbarSlider.*`
- `editorError.foreground: #00000000` is intentional (invisible squiggles, using border instead)
