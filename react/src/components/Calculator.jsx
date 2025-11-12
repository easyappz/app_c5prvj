import React, { useMemo, useState } from 'react';
import Display from './Display.jsx';
import KeyButton from './KeyButton.jsx';

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

function toPlainString(num) {
  if (!Number.isFinite(num)) return 'Ошибка';
  let s = num.toFixed(10);
  let i = s.length - 1;
  while (i >= 0 && s[i] === '0') {
    i -= 1;
  }
  if (i >= 0 && s[i] === '.') {
    i -= 1;
  }
  const out = s.slice(0, i + 1);
  return out.length ? out : '0';
}

function operate(aStr, bStr, op) {
  const a = Number(aStr);
  const b = Number(bStr);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 'Ошибка';
  let res = 0;
  if (op === '+') res = a + b;
  else if (op === '-') res = a - b;
  else if (op === '×') res = a * b;
  else if (op === '÷') {
    if (b === 0) return 'Ошибка';
    res = a / b;
  }
  return toPlainString(res);
}

function Calculator() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null); // '+', '-', '×', '÷' | null
  const [overwrite, setOverwrite] = useState(true);

  const isAC = useMemo(() => currentValue === '0' && previousValue === null && operator === null, [currentValue, previousValue, operator]);
  const clearLabel = isAC ? 'AC' : 'C';

  function inputDigit(d) {
    if (currentValue === 'Ошибка') {
      setCurrentValue(String(d));
      setOverwrite(false);
      return;
    }
    if (overwrite) {
      setCurrentValue(String(d));
      setOverwrite(false);
      return;
    }
    if (currentValue === '0') {
      setCurrentValue(String(d));
      return;
    }
    const digits = countDigits(currentValue);
    if (digits >= 12) return;
    setCurrentValue(currentValue + String(d));
  }

  function inputDot() {
    if (currentValue === 'Ошибка') {
      setCurrentValue('0.');
      setOverwrite(false);
      return;
    }
    if (overwrite) {
      setCurrentValue('0.');
      setOverwrite(false);
      return;
    }
    let hasDot = false;
    for (let i = 0; i < currentValue.length; i += 1) {
      if (currentValue[i] === '.') { hasDot = true; break; }
    }
    if (!hasDot) {
      setCurrentValue(currentValue + '.');
    }
  }

  function chooseOperator(op) {
    if (currentValue === 'Ошибка') return;

    if (previousValue === null) {
      setPreviousValue(currentValue);
      setOperator(op);
      setOverwrite(true);
      return;
    }

    if (operator !== null && !overwrite) {
      const result = operate(previousValue, currentValue, operator);
      setPreviousValue(result === 'Ошибка' ? null : result);
      setCurrentValue(result);
      setOperator(result === 'Ошибка' ? null : op);
      setOverwrite(true);
      return;
    }

    // If user simply changes the operator before typing next number
    setOperator(op);
    setOverwrite(true);
  }

  function evaluate() {
    if (currentValue === 'Ошибка') return;
    if (operator === null || previousValue === null) return;
    const result = operate(previousValue, currentValue, operator);
    setCurrentValue(result);
    setPreviousValue(result === 'Ошибка' ? null : null);
    setOperator(null);
    setOverwrite(true);
  }

  function toggleSign() {
    if (currentValue === 'Ошибка') return;
    if (currentValue === '0') return;
    if (currentValue[0] === '-') {
      setCurrentValue(currentValue.slice(1));
    } else {
      setCurrentValue('-' + currentValue);
    }
  }

  function percent() {
    if (currentValue === 'Ошибка') return;
    let val = Number(currentValue);
    if (!Number.isFinite(val)) return;
    if (previousValue !== null && operator !== null) {
      const base = Number(previousValue);
      if (!Number.isFinite(base)) return;
      val = (base * val) / 100;
    } else {
      val = val / 100;
    }
    setCurrentValue(toPlainString(val));
    setOverwrite(false);
  }

  function clear() {
    if (isAC) {
      setCurrentValue('0');
      setPreviousValue(null);
      setOperator(null);
      setOverwrite(true);
    } else {
      setCurrentValue('0');
      setOverwrite(true);
    }
  }

  return (
    <div data-easytag="id1-src/components/Calculator.jsx" className="iphone-calculator">
      <div className="calc-body">
        <Display value={currentValue} />

        <div className="keys-grid">
          {/* Row 1: AC/C, ±, %, ÷ */}
          <KeyButton label={clearLabel} variant="function" onClick={clear} />
          <KeyButton label="±" variant="function" onClick={toggleSign} />
          <KeyButton label="%" variant="function" onClick={percent} />
          <KeyButton label="÷" variant="operator" onClick={() => chooseOperator('÷')} />

          {/* Row 2: 7 8 9 × */}
          <KeyButton label="7" variant="digit" onClick={() => inputDigit('7')} />
          <KeyButton label="8" variant="digit" onClick={() => inputDigit('8')} />
          <KeyButton label="9" variant="digit" onClick={() => inputDigit('9')} />
          <KeyButton label="×" variant="operator" onClick={() => chooseOperator('×')} />

          {/* Row 3: 4 5 6 − */}
          <KeyButton label="4" variant="digit" onClick={() => inputDigit('4')} />
          <KeyButton label="5" variant="digit" onClick={() => inputDigit('5')} />
          <KeyButton label="6" variant="digit" onClick={() => inputDigit('6')} />
          <KeyButton label="−" variant="operator" onClick={() => chooseOperator('-')} />

          {/* Row 4: 1 2 3 + */}
          <KeyButton label="1" variant="digit" onClick={() => inputDigit('1')} />
          <KeyButton label="2" variant="digit" onClick={() => inputDigit('2')} />
          <KeyButton label="3" variant="digit" onClick={() => inputDigit('3')} />
          <KeyButton label="+" variant="operator" onClick={() => chooseOperator('+')} />

          {/* Row 5: 0 (span 2) . = */}
          <div className="zero-span">
            <KeyButton label="0" variant="digit" onClick={() => inputDigit('0')} />
          </div>
          <KeyButton label="." variant="digit" onClick={inputDot} />
          <KeyButton label="=" variant="operator" onClick={evaluate} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
