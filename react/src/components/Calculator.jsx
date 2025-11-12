import React, { useState, useMemo } from 'react';

function formatResult(value) {
  if (typeof value !== 'number' || !isFinite(value)) {
    return '0';
  }
  // Limit precision, then trim trailing zeros without regex
  let s = value.toFixed(12);
  // Trim trailing zeros
  while (s.indexOf('.') !== -1 && s.charAt(s.length - 1) === '0') {
    s = s.substring(0, s.length - 1);
  }
  // Trim ending dot
  if (s.charAt(s.length - 1) === '.') {
    s = s.substring(0, s.length - 1);
  }
  return s;
}

function compute(a, b, op) {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '×') return a * b;
  if (op === '÷') return b === 0 ? NaN : a / b;
  return b;
}

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const onClear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const onDigit = (d) => {
    if (waitingForSecondOperand) {
      setDisplay(String(d));
      setWaitingForSecondOperand(false);
      return;
    }
    if (display === '0') {
      setDisplay(String(d));
    } else {
      setDisplay(display + String(d));
    }
  };

  const onDecimal = () => {
    // Avoid multiple decimals
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const onToggleSign = () => {
    if (display === '0') return;
    if (display.charAt(0) === '-') {
      setDisplay(display.substring(1));
    } else {
      setDisplay('-' + display);
    }
  };

  const onPercent = () => {
    const current = parseFloat(display);
    if (!isFinite(current)) return;
    const result = current / 100;
    setDisplay(formatResult(result));
  };

  const onOperator = (op) => {
    const current = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(current);
    } else if (!waitingForSecondOperand && operator) {
      const result = compute(firstOperand, current, operator);
      setFirstOperand(result);
      setDisplay(formatResult(result));
    }

    setOperator(op);
    setWaitingForSecondOperand(true);
  };

  const onEquals = () => {
    if (operator === null || firstOperand === null) return;
    const current = parseFloat(display);
    const result = compute(firstOperand, current, operator);
    setDisplay(formatResult(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const clearLabel = useMemo(() => (display !== '0' || firstOperand !== null ? 'C' : 'AC'), [display, firstOperand]);

  const onClearSmart = () => {
    if (display !== '0') {
      setDisplay('0');
      return;
    }
    onClear();
  };

  return (
    <div className="iphone-calculator" data-easytag="id1-src/components/Calculator.jsx">
      <div className="calc-body" data-easytag="id2-src/components/Calculator.jsx">
        <div className="display" data-easytag="id3-src/components/Calculator.jsx">
          <div className="display-text" style={{ fontSize: display.length > 10 ? 40 : 56 }} data-easytag="id4-src/components/Calculator.jsx">
            {display}
          </div>
        </div>

        <div className="keys-grid" data-easytag="id5-src/components/Calculator.jsx">
          {/* Row 1 */}
          <button className="key-button variant-function" onClick={onClearSmart} data-easytag="id6-src/components/Calculator.jsx" aria-label="Очистить">
            {clearLabel}
          </button>
          <button className="key-button variant-function" onClick={onToggleSign} data-easytag="id7-src/components/Calculator.jsx" aria-label="Сменить знак">
            +/-
          </button>
          <button className="key-button variant-function" onClick={onPercent} data-easytag="id8-src/components/Calculator.jsx" aria-label="Процент">
            %
          </button>
          <button className="key-button variant-operator" onClick={() => onOperator('÷')} data-easytag="id9-src/components/Calculator.jsx" aria-label="Деление">
            ÷
          </button>

          {/* Row 2 */}
          <button className="key-button variant-digit" onClick={() => onDigit(7)} data-easytag="id10-src/components/Calculator.jsx">7</button>
          <button className="key-button variant-digit" onClick={() => onDigit(8)} data-easytag="id11-src/components/Calculator.jsx">8</button>
          <button className="key-button variant-digit" onClick={() => onDigit(9)} data-easytag="id12-src/components/Calculator.jsx">9</button>
          <button className="key-button variant-operator" onClick={() => onOperator('×')} data-easytag="id13-src/components/Calculator.jsx" aria-label="Умножение">
            ×
          </button>

          {/* Row 3 */}
          <button className="key-button variant-digit" onClick={() => onDigit(4)} data-easytag="id14-src/components/Calculator.jsx">4</button>
          <button className="key-button variant-digit" onClick={() => onDigit(5)} data-easytag="id15-src/components/Calculator.jsx">5</button>
          <button className="key-button variant-digit" onClick={() => onDigit(6)} data-easytag="id16-src/components/Calculator.jsx">6</button>
          <button className="key-button variant-operator" onClick={() => onOperator('-')} data-easytag="id17-src/components/Calculator.jsx" aria-label="Вычитание">
            −
          </button>

          {/* Row 4 */}
          <button className="key-button variant-digit" onClick={() => onDigit(1)} data-easytag="id18-src/components/Calculator.jsx">1</button>
          <button className="key-button variant-digit" onClick={() => onDigit(2)} data-easytag="id19-src/components/Calculator.jsx">2</button>
          <button className="key-button variant-digit" onClick={() => onDigit(3)} data-easytag="id20-src/components/Calculator.jsx">3</button>
          <button className="key-button variant-operator" onClick={() => onOperator('+')} data-easytag="id21-src/components/Calculator.jsx" aria-label="Сложение">
            +
          </button>

          {/* Row 5 */}
          <button className="key-button variant-digit zero-span" onClick={() => onDigit(0)} data-easytag="id22-src/components/Calculator.jsx">0</button>
          <button className="key-button variant-digit" onClick={onDecimal} data-easytag="id23-src/components/Calculator.jsx">.</button>
          <button className="key-button variant-operator" onClick={onEquals} data-easytag="id24-src/components/Calculator.jsx" aria-label="Равно">
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
