import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { userData, dispatch } = useAuth();
  const { form, setEmail, setPassword } = useForm();
  const navigate = useNavigate();

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.email === '' || form.password === '') return;

    if (form.email === userData.userEmail && form.password === 'prueba') {
      dispatch({ type: 'SET_AUTH', payload: true });
      navigate('/admin');
    }
  };

  useEffect(() => {
    console.log(userData.isAuthenticated);
    if (userData.isAuthenticated) navigate('/admin');
  }, [userData.isAuthenticated, navigate]);

  return (
    <LoginContainer>
      <div className="wrapper">
        <h2>WellCome to Hotel Miranda Dashboard</h2>

        <LoginForm onSubmit={handleSumit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </LoginForm>
      </div>
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

const LoginContainer = styled.section`
  background-color: #18181b;
  height: 100dvh;

  display: flex;
  justify-content: center;
  h2 {
    text-transform: uppercase;
    font-weight: 600;
    font-size: clamp(2rem, 3vw, 3.5rem);
    text-align: center;
    margin-bottom: 10rem;
  }
`;

const LoginForm = styled.form`
  max-width: 50rem;
  padding: 2rem;
  margin-inline: auto;

  background-color: linear-gradient(145deg, #161618, #1a1a1d);
  box-shadow: 5px 5px 10px #141417, -5px -5px 10px #1c1c1f;
  border-radius: 0.5rem;

  input {
    width: 100%;
    padding: 0.5rem 1rem;
    margin-bottom: 1.5rem;
    border-radius: 0.3rem;
    outline: none;
    box-shadow: 2px 2px 5px #141417, -0.5px -0.5px 3px #1c1c1f;
    &:focus {
      box-shadow: 3px 3px 10px #1c1c1f, -1px -1px 6px #141417;
    }
  }
  button {
    box-shadow: 5px 5px 10px #141417, -5px -5px 10px #1c1c1f;
    padding: 0.5rem 2rem;
    border-radius: 0.3rem;
    margin-inline: auto;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
