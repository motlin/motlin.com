import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent(): React.JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--ifm-color-emphasis-200)' }}>
      <Giscus
        id="comments"
        repo="motlin/motlin.com-comments"
        repoId="R_kgDOPDECdQ"
        category="General"
        categoryId="DIC_kwDOPDECdc4CkJB_"
        mapping="pathname"
        term="Comments"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
