import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

test('renders calculator title in Russian', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const title = screen.getByText('Калькулятор');
  expect(title).toBeInTheDocument();
});
