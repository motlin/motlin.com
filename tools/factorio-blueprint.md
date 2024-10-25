I would like to create an artifact that will parse a Factorio blueprint and print out the version number.

The way that Factorio Blueprint parsing works:

- Remove the '0' prefix
- Decode the base64 string
- Decompress the zlib data
- Parse the JSON

After parsing the blueprint, display a table of basic information about the blueprint including:

- Game version
- Blueprint type, like blueprint, blueprint book, upgrade planner, deconstruction planner.
- Label
- Description
- Icons

Factorio text, in labels and descriptions, can contain "rich text," a format described in the attachment factorio-rich-text.txt. This format includes color, font, and other formatting information. Whenever we display blueprint labels or descriptions, we should parse the rich text and display it in a readable format. For example, `[color=blue][font=default-bold]Shift-click[/font][/color]` should display as "Shift-click" in blue and bold. Images, like `[item=red-wire]` should become img tags with the appropriate image, like `https://www.factorio.school/icons/item/red-wire.png`.

There shouldn't be any button to parse the blueprint. As soon as a paste is detected, the blueprint should be parsed and displayed.

If the blueprint is a blueprint book, display a tree of the blueprints in the book, showing its recursive structure, including the 4 icons and label of each blueprint.

If we click on a blueprint in the tree, or if the blueprint type is just a single blueprint, then display summary information about that blueprint in a separate section. That summary should repeat the label, show the description, the game version number, the blueprint type, and tables of the included entities, tiles, and icons.

At the bottom, include a button to show or hide the json of the root blueprint.
