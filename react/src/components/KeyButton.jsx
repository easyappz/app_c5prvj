import React from 'react';

function KeyButton({ label, variant, onClick }) {
  return (
    <button
      data-easytag="id3-src/components/KeyButton.jsx"
      type="button"
      className={`key-button variant-${variant}`}
      aria-label={String(label)}
      tabIndex={0}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default KeyButton;
