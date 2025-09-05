import React from 'react';
import Layout from '@theme/Layout';
import MnemonicaStudyMode from '@site/src/components/MnemonicaStack/MnemonicaStudyMode';

export default function StudyModePage() {
  return (
    <Layout title="Mnemonica Stack - Study Mode" description="Slideshow of all peg and transition images for memorization">
      <MnemonicaStudyMode />
    </Layout>
  );
}
