import React from 'react';
import { render, screen } from '@testing-library/react';
import JournalApp from './JournalApp';

test('renders learn react link', () => {
  render(<JournalApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
