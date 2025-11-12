import React, { useEffect, useState } from 'react';
import '../styles/iphone-calculator.css';

function formatNumber(value) {
  if (!isFinite(value)) return 'Error';
  const maxDigits = 12;
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 10 ** maxDigits || abs < 10 ** -6)) {
    return value.toExponential(6).replace('+', '');
  }
  let s = String(Math.round(value * 1e10) / 1e10);
  if (s.includes('.') && !s.includes('e')) {
    s = s.replace(/\.0+$/, '').replace(/(\.[0-9]*?)0+$/, '$1');
  }
  if (s.length > maxDigits && !s.includes('e')) {
    s = Number(value).toPrecision(10).replace('+', '');
  }
  return s;
}

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  useEffect(() => {
    document.title = 'Калькулятор';
  }, []);

  const inputDigit = (digit) => {
    if (waitingForSecond) {
      setDisplay(String(digit));
      setWaitingForSecond(false);
      return;
    }
    setDisplay((prev) => (prev === '0' ? String(digit) : prev + String(digit)));
  };

  const inputDecimal = () => {
    if (waitingForSecond) {
      setDisplay('0.');
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const toggleSign = () => {
    if (display === '0') return;
    if (display.startsWith('-')) setDisplay(display.slice(1));
    else setDisplay('-' + display);
  };

  const percent = () => {
    const value = parseFloat(display);
    if (isNaN(value)) return;
    const result = value / 100;
    setDisplay(formatNumber(result));
  };

  const performCalculation = (a, op, b) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b === 0 ? Infinity : a / b;
      default:
        return b;
    }
  };

  const chooseOperator = (nextOp) => {
    const inputVal = parseFloat(display);
    if (firstOperand === null) {
      setFirstOperand(inputVal);
    } else if (operator && !waitingForSecond) {
      const result = performCalculation(firstOperand, operator, inputVal);
      setFirstOperand(result);
      setDisplay(formatNumber(result));
    }
    setOperator(nextOp);
    setWaitingForSecond(true);
  };

  const equals = () => {
    if (operator === null || waitingForSecond) return;
    const inputVal = parseFloat(display);
    const result = performCalculation(firstOperand ?? 0, operator, inputVal);
    setDisplay(formatNumber(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecond(true);
  };

  const operatorMap = {
    '÷': '/',
    '×': '*',
    '−': '-',
    '+': '+',
  };

  return (
    <div className="iphone-calculator" data-easytag="id1-src/components/Calculator.jsx">
      <div className="calc-body" data-easytag="id2-src/components/Calculator.jsx">
        <div className="display" data-easytag="id3-src/components/Calculator.jsx">
          <div className="display-text" data-easytag="id4-src/components/Calculator.jsx" aria-live="polite" aria-atomic="true">
            {display}
          </div>
        </div>

        <div className="keys-grid" data-easytag="id5-src/components/Calculator.jsx">
          {/* Function row */}
          <button type="button" className="key-button variant-function" onClick={clearAll} aria-label="Очистить" data-easytag="id6-src/components/Calculator.jsx"><span>AC</span></button>
          <button type="button" className="key-button variant-function" onClick={toggleSign} aria-label="Сменить знак" data-easytag="id7-src/components/Calculator.jsx"><span>±</span></button>
          <button type="button" className="key-button variant-function" onClick={percent} aria-label="Процент" data-easytag="id8-src/components/Calculator.jsx"><span>%</span></button>
          <button type="button" className="key-button variant-operator" onClick={() => chooseOperator(operatorMap['÷'])} aria-label="Деление" data-easytag="id9-src/components/Calculator.jsx"><span>÷</span></button>

          {/* 7 8 9 */}
          <button type="button" className="key-button variant-digit" onClick={() => inputDigit(7)} aria-label="Семь" data-easytag="id10-src/components/Calculator.jsx"><span>7</span></button>
          <button type="button" className="key-button variant-digit" onClick={() => inputDigit(8)} aria-label="Восемь" data-easytag="id11-src/components/Calculator.jsx"><span>8</span></button>
          <button type="button" className="key-button variant-digit" onClick={() => inputDigit(9)} aria-label="Девять" data-easytag="id12-src/components/Calculator.jsx"><span>9</span></button>
          <button type="button" className="key-button variant-operator" onClick={() => chooseOperator(operatorMap['×'])} aria-label="Умножение" data-easytag="id13-src/components/Calculator.jsx"><span>×</span></button>

          {/* 4 5 6 */}
          <button type="button" className="key-button variant-digit" onClick={() => inputDigit(4)} aria-label="Четыре" data-easytag="id14-src/components/Calculator.jsx"><span>4</span></button>
          <button type="button" className="key-button variant-digit" onClick={() => inputDigit(5)} aria-label="Пять" data-easytag="id15-src/components/Calculator.jsx"><span>5</span></button>
          <button type="button" className="key-button variant-digit" onClick={() => inputDigit(6)} aria-label="Шесть" data-easytag="id16-src/components/Calculator.jsx"><span>6</span></button>
          <button type="button" className="key-button variant-operator" onClick={() => chooseOperator(operatorMap['−'])} aria-label="Вычитание" data-easytag="id17-src/components/Calculator.jsx"><span>−</span></button>

          {/* 1 2 3 */}
          <button type="button" className="key-button variant-digit" onClick={() => inputDigit(1)} aria-label="Один" data-easytag="id18-src/components/Calculator.jsx"><span>1</span></button>
          <button type="button" className="key-button variant-digit" onClick={() => inputDigit(2)} aria-label="Два" data-easytag="id19-src/components/Calculator.jsx"><span>2</span></button>
          <button type="button" className="key-button variant-digit" onClick={() => inputDigit(3)} aria-label="Три" data-easytag="id20-src/components/Calculator.jsx"><span>3</span></button>
          <button type="button" className="key-button variant-operator" onClick={() => chooseOperator(operatorMap['+'])} aria-label="Сложение" data-easytag="id21-src/components/Calculator.jsx"><span>+</span></button>

          {/* 0 . = */}
          <button type="button" className="key-button variant-digit zero-span" onClick={() => inputDigit(0)} aria-label="Ноль" data-easytag="id22-src/components/Calculator.jsx"><span>0</span></button>
          <button type="button" className="key-button variant-digit" onClick={inputDecimal} aria-label="Десятичная точка" data-easytag="id23-src/components/Calculator.jsx"><span>.</span></button>
          <button type="button" className="key-button variant-operator" onClick={equals} aria-label="Равно" data-easytag="id24-src/components/Calculator.jsx"><span>=</span></button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
