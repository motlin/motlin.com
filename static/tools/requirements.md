# Factorio Blueprint Parser

### Layout

The header consists of a title and card to paste in a blueprint. The title is "Factorio Blueprint Parser."

Under the header, the layout consists of two vertical columns:

Left Pane:
1. Root Blueprint card
2. Blueprint Tree card
3. Blueprint JSON buttons

Right Pane:
1. Selected Blueprint card (always, the root is the initial selection)
2. Contents card (always)
3. Upgrade Planner card (when applicable)
4. Deconstruction Planner card (when applicable)
5. Parameters card (when applicable)
6. Root Blueprint JSON panel
7. Selected Blueprint JSON panel

## Parsing Factorio Blueprints

 The card to paste in a blueprint should contain a textarea that says "Paste your blueprint here." The textarea should be rendered small, since the data isn't human-readable.

There shouldn't be any button to parse the blueprint. As soon as a paste is detected, the blueprint should be parsed and displayed.

The way that Factorio Blueprint parsing works:

- Remove the '0' prefix
- Decode the base64 string
- Decompress the zlib data
- Parse the JSON

## Displaying Blueprint Information

Below the header where the user pastes the blueprint, we will have a section to display parsed information about the blueprint. I'd like to have the below section to be split vertically, and for each section I describe below to be in a collapsible card. The user can click on the card to expand or collapse the section. Each card has an indicator showing whether it's expanded, making it clear that it's a collapsible card.

### Root blueprint card

First card on the left.

- Root blueprint label
- Root blueprint description
- Game version
- Root blueprint type, shown as an icon with hover text to display the type name (blueprint, blueprint book, upgrade planner, or deconstruction planner)
- The up to 4 icons

Footer buttons:
- "Copy Blueprint" - copies the blueprint string
- "View JSON" - expands the Root Blueprint JSON panel

When copying blueprints:
- The "Copy Blueprint" buttons should generate a proper Factorio blueprint string:
  - Convert to minified JSON (no whitespace)
  - Compress using zlib
  - Base64 encode the result
  - Prepend '0' to the string

### Blueprint tree card

Second card on the left. The card is only displayed if the root blueprint is a blueprint book.

Display a tree of the blueprints in the book, showing its recursive structure.

If the current row represents a deconstruction planner or upgrade planner, the row should start with the relevant icon.

Each row in the tree should show the 4 icons and label of the blueprint.

The row should change color on hover to indicate that it is clickable. We should respond to clicks on the row by displaying the summary information about that blueprint in the summary card, and the selected row should be highlighted.

### Selected Blueprint card

First card on the right. This card is only displayed when there is a selected blueprint. The root blueprint is considered selected right after it's pasted, so this card is displayed by default, as long as a blueprint is pasted.

- Label
- Description
- Game version
- Blueprint type, shown as an icon with hover text
- Icons
- Whether the blueprint uses snap-to-grid, and if so, whether it's absolute or relative
- Feature badges
  - Parameters
  - 2.0 features
  - Space Age features
  - Quality features
  - Elevated Rails features

Footer buttons:
- "Copy Blueprint" - copies the blueprint string
- "View JSON" - expands the Selected Blueprint JSON panel

All feature badges (parameters, Quality, etc.) should detect features recursively when viewing a blueprint book.

### Contents card

Second card on the right. This card is only displayed when there is a selected blueprint.

- Table of entities
- Table of recipes
- Table of tiles

All tables have the following columns:

- Icon
- Count
- Name

### Upgrade planner card

This card is only displayed when the selected blueprint type is an upgrade planner.

The upgrade planner structure looks like this:
```json
{
  "upgrade_planner": {
    "settings": {
      "mappers": [
        {
          "from": {
            "type": "entity",
            "name": "underground-belt"
          },
          "to": {
            "type": "entity",
            "name": "fast-underground-belt"
          },
          "index": 0
        }
      ]
    },
    "item": "upgrade-planner",
    "version": 73014509569
  }
}
```

Display upgrade mappings in a vertical list, sorted by the index field. Each mapping shows:
- The "from" item with its icon
- An arrow (→)
- The "to" item with its icon

### Deconstruction planner card

This card is only displayed when the selected blueprint type is a deconstruction planner. The structure looks like this:

```json
{
  "deconstruction_planner": {
    "settings": {
      "trees_and_rocks_only": true,
      "tile_selection_mode": 3,
      "entity_filters": [
        {
          "name": "laser-turret",
          "index": 0
        }
      ]
    },
    "item": "deconstruction-planner",
    "label": "Optional Label",
    "version": 281479276658688
  }
}
```

The card should show:
- Special modes (like "trees_and_rocks_only")
- Tile selection mode (values: 2="Never deconstruct tiles", 3="Always deconstruct tiles")
- Entity filters, if present, showing icons and names sorted by index

### Parameters card

This card is only displayed when the blueprint contains parameters. Parameters appear in the following structure:

```json
"parameters": [
  {
    "type": "id",
    "name": "Primary",
    "id": "parameter-0",
    "quality-condition": {
      "quality": "normal",
      "comparator": "="
    }
  },
  {
    "type": "number",
    "number": "10",
    "name": "Stock"
  }
]
```

The card should show:
- Parameter name
- For ID type parameters:
  - The parameter ID
  - Quality conditions if present
- For number type parameters:
  - The numeric value

Parameter IDs can be referenced elsewhere in the blueprint, particularly in:
- Recipe fields as "parameter-0", "parameter-1", etc.
- Circuit conditions
- Other settings that accept signals or recipes

When parameters are present, the usesParameters flag in metadata should be set to true.

### JSON Panels

Two panels at the bottom of the right pane:

#### Root Blueprint JSON panel
Shows formatted JSON for the root blueprint. Contains:
- Header with caret for expand/collapse
- "Copy to Clipboard" button
- "Download JSON" button
- Formatted JSON content

#### Selected Blueprint JSON panel
Shows formatted JSON for the selected blueprint. Contains:
- Header with caret for expand/collapse
- "Copy to Clipboard" button
- "Download JSON" button
- Formatted JSON content

When generating filenames for downloads:
- Use <label>.json if label is available
- Use <root label>-<path>.json for child blueprints (e.g., "1.2" means root's first child's second child) if root label is available
- Use "blueprint" as default if no label available
- Remove invalid filename characters from labels
- Replace spaces with hyphens

## General card requirements

These requirements apply to all cards.

### Version number parsing

Game versions are embedded in blueprints as 64-bit numbers. They need to be split into 4 chunks of 16-bits each, and then turned into a four-part version number like 1.2.3.4.

Due to JavaScript's number precision limitations with large integers, version parsing must use BigInt operations to correctly handle the bitwise operations. For example, the version number 562949954076673 should parse to "2.0.10.1" and requires BigInt operations to parse correctly.

### Icons and URLs

All game icons (items, entities, recipes, etc.) should be loaded from factorio.school. The URL format is:
```
https://www.factorio.school/icons/{type}/{name}.png
```

Icon types:
- item
- entity
- recipe
- fluid
- technology
- virtual-signal (used when type is "virtual")
- achievement
- tile

Special cases:
- When a type is not specified in blueprint data, assume "item"
- When type is "virtual", use "virtual-signal" in the URL path

Example usages:
- Entity: `<img src="https://www.factorio.school/icons/entity/assembling-machine-3.png">`
- Recipe: `<img src="https://www.factorio.school/icons/recipe/coal-liquefaction.png">`
- Item with missing type: `"signal": { "name": "space-platform-starter-pack" }` → `icons/item/space-platform-starter-pack.png`
- Virtual signal: `"type": "virtual"` → use `icons/virtual-signal/` path

### Rich Text

The attachment `factorio-rich-text.txt` contains the information from the Factorio wiki about rich text and can be considered a specification for how to parse and display rich text.

All blueprint labels and descriptions can contain rich text. We should parse the rich text and display it in a readable format. For example, `[color=blue][font=default-bold]example[/font][/color]` should display as "example" in blue and bold.

Images, like `[item=red-wire]` should become img tags with the appropriate image, like `<img src="https://www.factorio.school/icons/item/red-wire.png">`.

### Feature Detection

Features like Parameters, Quality, etc. must be detected recursively when examining blueprint books:

#### Quality Mod

Quality features can appear in several places:
- In recipe quality settings: `"recipe_quality": "normal"`
- In circuit conditions: `"quality": "normal", "comparator": "="`
- In parameters: `"quality-condition": { "quality": "normal", "comparator": "=" }`

The Quality badge should light up if any of these are found in the current blueprint or any child blueprints.

#### Parameters

Parameters should be detected:
- In the parameters array of the current blueprint
- In any child blueprints within a blueprint book

#### Elevated Rails Mod

The blueprint uses elevated rails if it uses any of these entities:

- elevated-curved-rail-a
- elevated-curved-rail-b
- elevated-half-diagonal-rail
- elevated-straight-rail
- rail-ramp
- rail-support

- The blueprint uses Factorio 2 if it uses any elevated rails or any of these entities.

- curved-rail-a
- curved-rail-b
- half-diagonal-rail

### CSS

The style should be consistent with the video game menus, and https://factorio.com/. The CSS from factorio.com is in the attachment `factorio.css`. Our CSS should be embedded in the single html file. The attachment `Factorio.html` is the html content of factorio.com and should help with context about how CSS is applied to elements.

Import and use Tailwind CSS for styling if you think that makes sense after reading factorio.css.
