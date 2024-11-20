import styled from 'styled-components';

export const LoginContainer = styled.section`
  background-color: var(--bg-color);
  height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LoginContent = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  border: 0.0625rem solid var(--text-dark);

  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
export const LoginLeft = styled.div`
  padding: 3rem;
  background-color: var(--hover-color);
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
export const LoginRight = styled.div`
  padding: 3rem;

  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  h2 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 600;
  }
`;
export const LoginForm = styled.form`
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
    background-color: var(--white-color);
    outline: 0.0625rem solid var(--text-dark);

    &:focus {
      outline: 0.125rem solid var(--text-dark);
      box-shadow: var(--box-shadow);
    }
  }
  button {
    width: 100%;
    box-shadow: var(--box-shadow);
    border: 0.0625rem solid var(--text-dark);
    background-color: var(--hover-color);

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
