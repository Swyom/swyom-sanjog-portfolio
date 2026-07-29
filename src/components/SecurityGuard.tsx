import React, { useEffect } from 'react';

export const SecurityGuard: React.FC = () => {
  useEffect(() => {
    // 1. Disable Right Click (Context Menu) across the entire application
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable Image Drag and Drop
    const handleDragStart = (e: DragEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // 3. Block Developer Tools & Source Inspection Hotkeys
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 (DevTools)
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C / Cmd+Option+C (Inspect Element Picker)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U (View Page Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+S (Save Page HTML)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};
