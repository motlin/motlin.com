import React from 'react';
import styles from './ColorSwatch.module.css';

export interface ColorSwatchProps {
  color: string;
  size?: 'small' | 'medium' | 'large';
  label?: boolean;
}

export default function ColorSwatch({
  color,
  size = 'medium',
  label = true
}: ColorSwatchProps): React.JSX.Element {
  const colorValue = color.startsWith('#') ? color : `#${color}`;

  return (
    <span className={styles.container}>
      <span
        className={`${styles.swatch} ${styles[size]}`}
        style={{ backgroundColor: colorValue }}
        title={colorValue}
      />
      {label && <code className={styles.code}>{colorValue}</code>}
    </span>
  );
}
