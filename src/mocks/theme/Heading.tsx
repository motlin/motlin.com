import React from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  as: HeadingTag;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

// Simple mock of Docusaurus Heading component for Storybook
const Heading: React.FC<HeadingProps> = ({ as: Tag = 'h1', children, className, style, id }) => {
  return <Tag className={className} style={style} id={id}>{children}</Tag>;
};

export default Heading;
