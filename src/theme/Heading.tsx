import React from 'react';
import OriginalHeading from '@theme-original/Heading';
import type HeadingType from '@theme/Heading';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof HeadingType>;

export default function HeadingWrapper(props: Props): React.JSX.Element {
  return <OriginalHeading {...props} />;
}
