import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';

describe('Register Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Register />
      </Router>
    );
  });

  test('renders the register form', () => {
    expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password:/i)).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty fields', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  test('shows password mismatch error', async () => {
    fireEvent.input(screen.getByLabelText(/Password:/i), { target: { value: 'password1' } });
    fireEvent.input(screen.getByLabelText(/Confirm Password:/i), { target: { value: 'password2' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  test('shows password length error when less than 6 characters', async () => {
    fireEvent.input(screen.getByLabelText(/Password:/i), { target: { value: '123' } });
    fireEvent.input(screen.getByLabelText(/Confirm Password:/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  });

  test('shows email validation error for invalid email', async () => {
    fireEvent.input(screen.getByLabelText(/Email:/i), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(await screen.findByText(/Email is invalid/i)).toBeInTheDocument();
  });

  test('calls register function on valid form submission', async () => {
    const mockRegister = jest.fn(() => Promise.resolve());
    const mockNavigate = jest.fn();

    render(
      <Router>
        <Register onRegister={mockRegister} />
      </Router>
    );

    fireEvent.input(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.input(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByLabelText(/Password:/i), { target: { value: 'password' } });
    fireEvent.input(screen.getByLabelText(/Confirm Password:/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => expect(mockRegister).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/login'));
  });
});
