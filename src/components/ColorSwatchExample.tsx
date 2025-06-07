import React from 'react';
import Heading from '@theme/Heading';
import ColorSwatch from './ColorSwatch';

export default function ColorSwatchExample(): React.JSX.Element {
  return (
    <div className="color-swatch-examples">
      <Heading as="h3">Color Swatch Examples</Heading>

      <Heading as="h4">Sizes</Heading>
      <div>
        <p>
          Small: <ColorSwatch color="#AA0000" size="small" />
          Medium: <ColorSwatch color="#00AAAA" size="medium" />
          Large: <ColorSwatch color="#0033B3" size="large" />
        </p>
      </div>

      <Heading as="h4">With and Without Labels</Heading>
      <div>
        <p>
          With label: <ColorSwatch color="#FF8800" />
          Without label: <ColorSwatch color="#00AA00" label={false} />
        </p>
      </div>

      <Heading as="h4">Colors from Documentation</Heading>
      <div>
        <p>
          Maroon (Classes): <ColorSwatch color="#AA0000" />
          Teal (Interfaces): <ColorSwatch color="#00AAAA" />
          Blue (Keywords): <ColorSwatch color="#0033B3" />
          Green (Strings): <ColorSwatch color="#00AA00" />
          Orange (Parameters): <ColorSwatch color="#FF8800" />
          Purple (Fields): <ColorSwatch color="#871094" />
          Pink (Commas): <ColorSwatch color="#FF15B4" />
        </p>
      </div>
    </div>
  );
}
