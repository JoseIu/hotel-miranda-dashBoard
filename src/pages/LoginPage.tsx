import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loginFetch from '../helpers/loginFetch';
import useAuth from '../hooks/useAuth';
import { LoginRequest } from '../interfaces/loginRequest.interface';

const LoginPage = () => {
  const { userData, dispatch } = useAuth();
  const { form, setEmail, setPassword } = useForm();
  const navigate = useNavigate();

  const handleSumit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.email === '' || form.password === '') return;

    const data = loginFetch(form.email, form.password);
    toast.promise<LoginRequest>(data, {
      loading: 'Loading',
      success: 'Login success',
      error: 'Error when fetching',
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

const LoginContainer = styled.section`
  background-color: #18181b;
  height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginContent = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: var(--box-shadow);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const LoginLeft = styled.div`
  padding: 3rem;
  background-color: var(--green);
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  h1 {
    font-weight: 600;
    font-size: clamp(2rem, 3vw, 2.3rem);
  }
  ul {
    padding: 0 1rem;
  }
  li {
    margin-bottom: 0.3rem;
    list-style: disc;
  }
`;
const LoginRight = styled.div`
  padding: 3rem;
  background: var(--bg-gradient);

  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  h2 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 600;
  }
`;
const LoginForm = styled.form`
  label {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }
  input {
    width: 100%;
    padding: 0.5rem 1rem;
    margin-bottom: 1.5rem;
    border-radius: 0.3rem;
    outline: none;
    box-shadow: var(--box-shadow);

    &:focus {
      outline: 1px solid var(--green);
      box-shadow: var(--box-shadow);
    }
  }
  button {
    width: 100%;
    background-color: var(--green);

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
