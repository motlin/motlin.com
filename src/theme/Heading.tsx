import React from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  as: HeadingTag;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ as: Tag = 'h1', children, className }) => {
  return <Tag className={className}>{children}</Tag>;
};

export default Heading;
