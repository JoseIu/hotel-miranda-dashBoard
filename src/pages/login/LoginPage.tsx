import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginFetch } from '../../helpers';
import { useAuth } from '../../hooks';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { LoginContainer, LoginContent, LoginForm, LoginLeft, LoginRight } from './loginStyles';

const LoginPage = () => {
  const { userData, dispatch } = useAuth();
  const { form, setEmail, setPassword } = useForm();
  const navigate = useNavigate();

  const handleSumit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.email === '' || form.password === '') return;

    const data = loginFetch(form.email, form.password);
    toast.promise<LoginRequest>(data, {
      loading: 'logging in...',
      success: 'Login success',
      error: 'Error, try again',
    });
    const responseLogin = await data;

    if (responseLogin.error === false) {
      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: true,
          userName: responseLogin.data.user.name,
          userEmail: responseLogin.data.user.email,
        },
      });
      navigate('/admin');
    }
  };

  useEffect(() => {
    if (userData.isAuthenticated) navigate('/admin');
  }, [userData.isAuthenticated, navigate]);

  return (
    <LoginContainer>
      <LoginContent>
        <LoginLeft>
          <h1>Hotel Miranda</h1>
          <span>Experience luxury and comfort</span>
          <ul>
            <li>Elegant Accommodations</li>
            <li> World-class Service</li>
            <li>Exquisite Dining</li>
            <li>Prime Locations</li>
          </ul>
        </LoginLeft>
        <LoginRight>
          <h2>Dashboard Login</h2>
          <span>Enter your credentials to access the management system</span>

          <LoginForm onSubmit={handleSumit}>
            <label htmlFor="email">
              Email*
              <input
                type="email"
                placeholder="email"
                name="email"
                id="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label htmlFor="password">
              Password*
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button type="submit">Login</button>
          </LoginForm>
        </LoginRight>
      </LoginContent>
    </LoginContainer>
  );
};

export default LoginPage;
const useForm = () => {
  const [form, setForm] = useState({ email: 'prueba@prueba.com', password: 'prueba' });

  const setEmail = (email: string) => {
    setForm({ ...form, email });
  };
  const setPassword = (password: string) => {
    setForm({ ...form, password });
  };

  return { form, setEmail, setPassword };
};
