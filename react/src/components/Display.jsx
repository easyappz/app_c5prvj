import React, { useMemo } from 'react';

function countDigits(str) {
  let c = 0;
  for (let i = 0; i < str.length; i += 1) {
    const ch = str[i];
    if (ch >= '0' && ch <= '9') {
      c += 1;
    }
  }
  return c;
}

function toScientific(str) {
  const num = Number(str);
  if (!Number.isFinite(num)) {
    return 'Ошибка';
  }
  return num.toExponential(6);
}

function Display({ value }) {
  const formatted = useMemo(() => {
    if (value === 'Ошибка') return 'Ошибка';
    const raw = String(value);
    const digits = countDigits(raw);
    if (digits <= 12) {
      return raw;
    }
    return toScientific(raw);
  }, [value]);

  const fontSize = useMemo(() => {
    if (formatted === 'Ошибка') return 44;
    const digits = countDigits(formatted);
    if (digits <= 6) return 64;
    if (digits <= 9) return 52;
    if (digits <= 12) return 44;
    return 36;
  }, [formatted]);

  return (
    <div data-easytag="id2-src/components/Display.jsx" className="display">
      <div className="display-text" style={{ fontSize: `${fontSize}px` }}>{formatted}</div>
    </div>
  );
}

export default Display;
