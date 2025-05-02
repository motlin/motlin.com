import React from 'react';
import Image from '@theme/IdealImage';

export default function OptimizedImageExample(): JSX.Element {
  return (
    <div>
      <h2>Optimized Image Example</h2>
      <Image 
        img={require('@site/static/img/docusaurus-social-card.jpg')}
        alt="Docusaurus social card"
        style={{maxWidth: 700}}
      />
    </div>
  );
}