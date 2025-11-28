import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function MnemonicaStackPage() {
  const history = useHistory();

  useEffect(() => {
    history.replace('/mnemonica');
  }, [history]);

  return null;
}
