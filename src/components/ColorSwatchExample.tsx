import React from 'react';
import ColorSwatch from './ColorSwatch';

export default function ColorSwatchExample(): JSX.Element {
  return (
    <div className="color-swatch-examples">
      <h3>Color Swatch Examples</h3>
      
      <h4>Sizes</h4>
      <div>
        <p>
          Small: <ColorSwatch color="#AA0000" size="small" />
          Medium: <ColorSwatch color="#00AAAA" size="medium" />
          Large: <ColorSwatch color="#0033B3" size="large" />
        </p>
      </div>
      
      <h4>With and Without Labels</h4>
      <div>
        <p>
          With label: <ColorSwatch color="#FF8800" />
          Without label: <ColorSwatch color="#00AA00" label={false} />
        </p>
      </div>
      
      <h4>Colors from Documentation</h4>
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