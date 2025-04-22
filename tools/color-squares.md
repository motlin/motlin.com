# Color Square Options for Markdown

With the shutdown of via.placeholder.com, there are several alternative approaches for displaying color swatches in markdown documents. This article demonstrates five different methods to replace these placeholders.

## 1. Alternative Placeholder Service

Using [dummyimage.com](https://dummyimage.com/) as a replacement:

- ![#AA0000](https://dummyimage.com/15x15/AA0000/AA0000.png) `#AA0000` maroon for classes
- ![#00AAAA](https://dummyimage.com/15x15/00AAAA/00AAAA.png) `#00AAAA` teal for interfaces

Benefits:
- Easy replacement for via.placeholder
- Same basic format as before
- No local file management

Drawbacks:
- Still depends on external service availability
- Could go down in the future
- Depends on network to render colors

## 2. Local Static Color Squares

Creating and storing small colored PNGs locally in your repository:

- ![#AA0000](/icons/colors/AA0000.png) `#AA0000` maroon for classes
- ![#00AAAA](/icons/colors/00AAAA.png) `#00AAAA` teal for interfaces

Benefits:
- Fully self-contained, no external dependencies
- Will never go down or be unavailable
- Faster rendering without external requests

Drawbacks:
- Requires generating and storing small image files
- More files to manage in the repository
- Need to create a new image for each color

## 3. Inline HTML/CSS

Using inline HTML with CSS for color swatches:

- <span style="display:inline-block;width:15px;height:15px;background:#AA0000;vertical-align:middle;"></span> `#AA0000` maroon for classes
- <span style="display:inline-block;width:15px;height:15px;background:#00AAAA;vertical-align:middle;"></span> `#00AAAA` teal for interfaces

Benefits:
- No external dependencies or extra files
- Colors are defined directly in the document
- Changes are easy to make (just edit the hex code)

Drawbacks:
- Depends on markdown renderer supporting HTML/CSS
- More verbose than image syntax
- Some platforms might strip HTML for security

## 4. SVG Squares Directly in Markdown

Using inline SVG for color swatches:

- <svg width="15" height="15" style="vertical-align:middle;display:inline-block;"><rect width="15" height="15" fill="#AA0000"/></svg> `#AA0000` maroon for classes
- <svg width="15" height="15" style="vertical-align:middle;display:inline-block;"><rect width="15" height="15" fill="#00AAAA"/></svg> `#00AAAA` teal for interfaces

Benefits:
- Self-contained and no external dependencies
- Vector-based (scales well at any resolution)
- Supported by many markdown renderers

Drawbacks:
- Lengthy markup compared to simple images
- Might not be supported by all markdown renderers
- More complex to edit and maintain

## 5. GitHub Markdown Color Preview

Using GitHub's special markdown color preview syntax:

- `#AA0000` maroon for classes
- `#00AAAA` teal for interfaces

Benefits:
- Extremely simple syntax
- Clean and minimal appearance
- Automatically renders a preview of the color

Drawbacks:
- Only works on GitHub and compatible platforms
- Doesn't work on many other markdown renderers
- Less visually prominent than dedicated swatches

## Recommendation

For a long-term, reliable solution, the local static image approach (#2) is recommended. It ensures your color swatches will always be available, regardless of external service availability. Alternatively, if your markdown renderer fully supports HTML, the inline HTML/CSS approach (#3) offers a good balance of simplicity and reliability without additional files.

For GitHub-specific content, the built-in color preview syntax (#5) is the simplest option.
