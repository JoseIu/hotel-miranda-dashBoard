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

    console.log(responseLogin);
  };

  useEffect(() => {
    console.log(userData.isAuthenticated);
    if (userData.isAuthenticated) navigate('/admin');
  }, [userData.isAuthenticated, navigate]);

  return (
    <LoginContainer>
      <LoginImage></LoginImage>
      <LoginDiv>
        <div>
          <h2>Hotel Miranda Dashboard</h2>

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
      </LoginDiv>
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
  display: grid;
  grid-template-columns: 50rem auto;

  h2 {
    max-width: 30rem;
    text-transform: uppercase;
    font-weight: 600;
    font-size: clamp(2rem, 3vw, 3.5rem);
    margin-bottom: 3rem;
  }
`;
const LoginImage = styled.div`
  background-image: url('images/login-image-2.webp');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const LoginDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginForm = styled.form`
  width: 50rem;
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
