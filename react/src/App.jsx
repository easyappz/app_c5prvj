import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function Calculator() {
  return (
    <main data-easytag="id1-react/src/App.jsx" className="calculator-root" style={{ maxWidth: 420, margin: '0 auto', padding: 16 }}>
      <h1 data-easytag="id2-react/src/App.jsx" style={{ fontSize: 24, marginBottom: 12 }}>Калькулятор</h1>
      <p data-easytag="id3-react/src/App.jsx" style={{ color: '#555', margin: 0 }}>
        Скоро здесь будет калькулятор в стиле iPhone.
      </p>
    </main>
  );
}

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      window.handleRoutes(['/']);
    }
  }, []);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Calculator />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
