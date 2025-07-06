import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent(): React.JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--ifm-color-emphasis-200)' }}>
      <Giscus
        repo="motlin/motlin.com-comments"
        repoId="R_kgDOPDECdQ"
        category="Announcements"
        categoryId="DIC_kwDOPDECdc4CsH4X"
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={colorMode}
        lang="en"
      />
    </div>
  );
}
