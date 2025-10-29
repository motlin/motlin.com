import { beforeAll } from 'vitest';

beforeAll(() => {
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --card-bg: #ffffff;
      --card-border: #e0e0e0;
      --card-red: #dc3545;
      --card-black: #000000;
      --card-text: #333333;
      --card-text-secondary: #666666;
    }
  `;
  document.head.appendChild(style);
});
