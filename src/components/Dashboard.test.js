import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';

// Unfortunately I had problems with configuring Jest, so I couldn't run the tests.

test('renders dashboard name when provided', () => {
  const dashboard = { id: '123', displayName: 'Test Dashboard' };
  render(<Dashboard dashboard={dashboard} />);
  expect(screen.getByText('Test Dashboard')).toBeInTheDocument();
});

test('expands accordion when clicked', () => {
  const dashboard = { id: '123', displayName: 'Test Dashboard' };
  const onDashboardClick = jest.fn();
  render(<Dashboard dashboard={dashboard} onDashboardClick={onDashboardClick} />);
  fireEvent.click(screen.getByText('Test Dashboard'));
  expect(onDashboardClick).toHaveBeenCalledWith('123');
});

