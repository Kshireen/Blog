import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { login } from '../services/auth';

// Mock the login function
jest.mock('../services/auth', () => ({
  login: jest.fn(),
}));

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate, // Mocking useNavigate as a function
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear any previous calls to mock functions
    jest.clearAllMocks();
  });

  test('renders the login form', () => {
    render(<Login />);
  
    // Query the heading specifically by its role and name
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
  
    // Query the button specifically by its role and name
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });
  

  test('shows validation errors when fields are empty', async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  test('shows email validation error for invalid email', async () => {
    render(<Login />);
  
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'invalid-email' } });
    
    // Use getByRole to specifically select the button
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
  
    expect(await screen.findByText(/Invalid email format/i)).toBeInTheDocument();
  });
    

test('shows password validation error for too short password', async () => {
  render(<Login />);

  fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: '123' } });
  
  // Use getByRole for the button
  fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  expect(await screen.findByText(/Password must be at least 6 characters long/i)).toBeInTheDocument();
});


  test('successful login redirects to home', async () => {
    login.mockResolvedValueOnce({ data: { token: 'mockToken' } });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mockToken');
      expect(mockNavigate).toHaveBeenCalledWith('/'); // Check if the mockNavigate was called with '/'
    });
  });

  test('shows general error message on login failure', async () => {
    login.mockRejectedValueOnce(new Error('Login failed'));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(await screen.findByText(/Login failed. Please check your credentials/i)).toBeInTheDocument();
  });
});
