import React, { useRef } from 'react';

function KeyButton({ label, variant, onClick }) {
  const handledByKeyboard = useRef(false);

  function onKeyDown(e) {
    const k = e.key;
    if (k === 'Enter' || k === ' ' || e.code === 'Space') {
      handledByKeyboard.current = true;
      e.preventDefault();
    }
  }

  function onKeyUp(e) {
    const k = e.key;
    if (handledByKeyboard.current && (k === 'Enter' || k === ' ' || e.code === 'Space')) {
      e.preventDefault();
      handledByKeyboard.current = false;
      if (typeof onClick === 'function') {
        onClick(e);
      }
    }
  }

  return (
    <button
      data-easytag="id3-src/components/KeyButton.jsx"
      type="button"
      className={`key-button variant-${variant}`}
      aria-label={String(label)}
      aria-keyshortcuts="Enter Space"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {label}
    </button>
  );
}

export default KeyButton;
