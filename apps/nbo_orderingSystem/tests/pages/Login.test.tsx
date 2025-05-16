import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/pages/Login';

describe('Login Page', () => {
  it('renders the login form', () => {
    render(<Login />);

    expect(screen.getByText('登入')).toBeInTheDocument();
    expect(screen.getByLabelText('帳號')).toBeInTheDocument();
    expect(screen.getByLabelText('密碼')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember Me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /登入/i })).toBeInTheDocument();
  });

  it('validates empty fields on login attempt', () => {
    render(<Login />);

    const loginButton = screen.getByRole('button', { name: /登入/i });
    fireEvent.click(loginButton);

    expect(screen.getByText('帳號')).toHaveClass('Mui-error');
    expect(screen.getByText('密碼')).toHaveClass('Mui-error');
  });

  it('submits the form with valid data', () => {
    render(<Login />);

    const accountInput = screen.getByLabelText('帳號');
    const passwordInput = screen.getByLabelText('密碼');
    const rememberMeCheckbox = screen.getByLabelText('Remember Me');
    const loginButton = screen.getByRole('button', { name: /登入/i });

    fireEvent.change(accountInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(rememberMeCheckbox);
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith(
      '帳號: testuser\n密碼: password123\n記住我: true'
    );
  });
});