import React, { useEffect, useMemo, useState } from 'react';

function formatNumber(value) {
  if (value === 'Infinity' || value === '-Infinity' || value === 'NaN') return 'Ошибка';
  const str = String(value);
  // Avoid scientific notation for small/large numbers when possible
  if (str.includes('e') || str.includes('E')) {
    return Number(value).toString();
  }
  return str;
}

function compute(a, b, op) {
  const x = Number(a);
  const y = Number(b);
  if (op === '+') return x + y;
  if (op === '−') return x - y; // visually like iPhone minus
  if (op === '×') return x * y;
  if (op === '÷') return y === 0 ? 'Infinity' : x / y;
  return y;
}

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null); // previous value
  const [op, setOp] = useState(null); // current operator
  const [overwrite, setOverwrite] = useState(true); // when true, next digit replaces display

  // Dynamic font size similar to iPhone fitting
  const fontSize = useMemo(() => {
    const len = String(display).length;
    if (len <= 6) return 64;
    if (len <= 9) return 48;
    if (len <= 12) return 34;
    return 28;
  }, [display]);

  const onClear = () => {
    if (display !== '0') {
      setDisplay('0');
      setOverwrite(true);
      return;
    }
    // Full reset (AC)
    setDisplay('0');
    setPrev(null);
    setOp(null);
    setOverwrite(true);
  };

  const onToggleSign = () => {
    if (display === '0') return;
    if (display.startsWith('-')) setDisplay(display.slice(1));
    else setDisplay('-' + display);
  };

  const onPercent = () => {
    const num = Number(display);
    const val = num / 100;
    setDisplay(formatNumber(val));
    setOverwrite(true);
  };

  const inputDigit = (d) => {
    if (overwrite) {
      setDisplay(String(d));
      setOverwrite(false);
    } else {
      if (display === '0') setDisplay(String(d));
      else setDisplay(display + String(d));
    }
  };

  const inputDot = () => {
    if (overwrite) {
      setDisplay('0.');
      setOverwrite(false);
      return;
    }
    if (!display.includes('.')) setDisplay(display + '.');
  };

  const chooseOperator = (nextOp) => {
    if (op && !overwrite) {
      // Compute immediately for chained operations
      const result = compute(prev ?? display, display, op);
      setPrev(String(result));
      setDisplay(formatNumber(result));
    } else {
      setPrev(display);
    }
    setOp(nextOp);
    setOverwrite(true);
  };

  const onEquals = () => {
    if (op == null || prev == null) return;
    const result = compute(prev, display, op);
    setDisplay(formatNumber(result));
    setPrev(null);
    setOp(null);
    setOverwrite(true);
  };

  const onBackspace = () => {
    if (overwrite) return; // nothing to delete
    if (display.length <= 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
      setOverwrite(true);
      return;
    }
    setDisplay(display.slice(0, -1));
  };

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      const k = e.key;
      if (k >= '0' && k <= '9') {
        inputDigit(k);
        return;
      }
      if (k === '.' || k === ',') {
        inputDot();
        return;
      }
      if (k === '+' || k === '=' && e.shiftKey) {
        chooseOperator('+');
        return;
      }
      if (k === '-') {
        chooseOperator('−');
        return;
      }
      if (k === '*' || k === 'x' || k === 'X') {
        chooseOperator('×');
        return;
      }
      if (k === '/' || k === '÷') {
        chooseOperator('÷');
        return;
      }
      if (k === 'Enter' || k === '=') {
        onEquals();
        return;
      }
      if (k === '%') {
        onPercent();
        return;
      }
      if (k === 'Backspace') {
        onBackspace();
        return;
      }
      if (k === 'Escape') {
        onClear();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [display, prev, op, overwrite]);

  // AC/C label logic in Russian
  const clearLabel = display === '0' && prev == null && op == null ? 'АС' : 'С';

  return (
    <div className="iphone-calculator" data-easytag="id1-src/components/Calculator.jsx" aria-label="Калькулятор iPhone">
      <div className="calc-body" data-easytag="id2-src/components/Calculator.jsx">
        <div className="display" data-easytag="id3-src/components/Calculator.jsx">
          <div className="display-text" style={{ fontSize: fontSize + 'px' }} data-easytag="id4-src/components/Calculator.jsx">
            {display}
          </div>
        </div>
        <div className="keys-grid" data-easytag="id5-src/components/Calculator.jsx">
          {/* Row 1 */}
          <button className="key-button variant-function" onClick={onClear} aria-label="Очистить" data-easytag="id6-src/components/Calculator.jsx">{clearLabel}</button>
          <button className="key-button variant-function" onClick={onToggleSign} aria-label="Поменять знак" data-easytag="id7-src/components/Calculator.jsx">±</button>
          <button className="key-button variant-function" onClick={onPercent} aria-label="Процент" data-easytag="id8-src/components/Calculator.jsx">%</button>
          <button className="key-button variant-operator" onClick={() => chooseOperator('÷')} aria-label="Деление" data-easytag="id9-src/components/Calculator.jsx">÷</button>

          {/* Row 2 */}
          <button className="key-button variant-digit" onClick={() => inputDigit(7)} data-easytag="id10-src/components/Calculator.jsx">7</button>
          <button className="key-button variant-digit" onClick={() => inputDigit(8)} data-easytag="id11-src/components/Calculator.jsx">8</button>
          <button className="key-button variant-digit" onClick={() => inputDigit(9)} data-easytag="id12-src/components/Calculator.jsx">9</button>
          <button className="key-button variant-operator" onClick={() => chooseOperator('×')} aria-label="Умножение" data-easytag="id13-src/components/Calculator.jsx">×</button>

          {/* Row 3 */}
          <button className="key-button variant-digit" onClick={() => inputDigit(4)} data-easytag="id14-src/components/Calculator.jsx">4</button>
          <button className="key-button variant-digit" onClick={() => inputDigit(5)} data-easytag="id15-src/components/Calculator.jsx">5</button>
          <button className="key-button variant-digit" onClick={() => inputDigit(6)} data-easytag="id16-src/components/Calculator.jsx">6</button>
          <button className="key-button variant-operator" onClick={() => chooseOperator('−')} aria-label="Вычитание" data-easytag="id17-src/components/Calculator.jsx">−</button>

          {/* Row 4 */}
          <button className="key-button variant-digit" onClick={() => inputDigit(1)} data-easytag="id18-src/components/Calculator.jsx">1</button>
          <button className="key-button variant-digit" onClick={() => inputDigit(2)} data-easytag="id19-src/components/Calculator.jsx">2</button>
          <button className="key-button variant-digit" onClick={() => inputDigit(3)} data-easytag="id20-src/components/Calculator.jsx">3</button>
          <button className="key-button variant-operator" onClick={() => chooseOperator('+')} aria-label="Сложение" data-easytag="id21-src/components/Calculator.jsx">+</button>

          {/* Row 5 */}
          <button className="key-button variant-digit zero-span" onClick={() => inputDigit(0)} data-easytag="id22-src/components/Calculator.jsx">0</button>
          <button className="key-button variant-digit" onClick={inputDot} data-easytag="id23-src/components/Calculator.jsx">.</button>
          <button className="key-button variant-operator" onClick={onEquals} aria-label="Равно" data-easytag="id24-src/components/Calculator.jsx">=</button>
        </div>
      </div>
    </div>
  );
}
