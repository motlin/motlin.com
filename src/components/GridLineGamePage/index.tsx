import React, { useEffect } from 'react';
import GridLineGame from '../GridLineGame';

const GridLineGamePage = () => {
  useEffect(() => {
    // Hide the sidebar and center the content
    const sidebarElement = document.querySelector('aside.theme-doc-sidebar-container') as HTMLElement;
    const tocElement = document.querySelector('.theme-doc-toc-desktop') as HTMLElement;
    const mainElement = document.querySelector('main') as HTMLElement;
    const articleElement = document.querySelector('article') as HTMLElement;
    const allContainers = document.querySelectorAll('.container');

    // Hide sidebar and TOC
    if (sidebarElement) sidebarElement.style.display = 'none';
    if (tocElement) tocElement.style.display = 'none';

    // Make main take full width
    if (mainElement) {
      mainElement.style.maxWidth = '100%';
      mainElement.style.width = '100%';
      mainElement.style.margin = '0';
      mainElement.style.padding = '0';
    }

    // Make article take full width
    if (articleElement) {
      articleElement.style.maxWidth = '100%';
      articleElement.style.margin = '0';
      articleElement.style.padding = '0';
    }

    // Remove all container constraints
    allContainers.forEach(container => {
      const el = container as HTMLElement;
      el.style.maxWidth = '100%';
      el.style.width = '100%';
      el.style.margin = '0';
      el.style.padding = '0';
    });

    return () => {
      // Cleanup when leaving the page
      if (sidebarElement) sidebarElement.style.removeProperty('display');
      if (tocElement) tocElement.style.removeProperty('display');
      if (mainElement) {
        mainElement.style.removeProperty('max-width');
        mainElement.style.removeProperty('width');
        mainElement.style.removeProperty('margin');
        mainElement.style.removeProperty('padding');
      }
      if (articleElement) {
        articleElement.style.removeProperty('max-width');
        articleElement.style.removeProperty('margin');
        articleElement.style.removeProperty('padding');
      }
      allContainers.forEach(container => {
        const el = container as HTMLElement;
        el.style.removeProperty('max-width');
        el.style.removeProperty('width');
        el.style.removeProperty('margin');
        el.style.removeProperty('padding');
      });
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--ifm-background-color)'
    }}>
      <GridLineGame />
    </div>
  );
};

export default GridLineGamePage;
