import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { form, setEmail, setPassword } = useForm();
  const navigate = useNavigate();

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.email === '' || form.password === '') return;

    if (form.email === 'prueba@prueba.com' && form.password === 'prueba') {
      setIsAuthenticated(true);
      localStorage.setItem('login', 'true');
      navigate('/admin');
    }
  };

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) navigate('/admin');
  }, [isAuthenticated, navigate]);

  return (
    <LoginPage className="wrapper">
      <h2>WellCome to Hotel Miranda Dashboard</h2>

      <form onSubmit={handleSumit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          id="email"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </LoginPage>
  );
};

export default Login;
const useForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const setEmail = (email: string) => {
    setForm({ ...form, email });
  };
  const setPassword = (password: string) => {
    setForm({ ...form, password });
  };

  return { form, setEmail, setPassword };
};

const LoginPage = styled.section`
  background-color: #171717;
  height: 100dvh;
  h2 {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 3em;
  }
`;
