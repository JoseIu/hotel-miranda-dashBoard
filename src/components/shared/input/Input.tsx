import React from 'react';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';
import WarningIcon from '../../icons/WarningIcon';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | undefined;
};

const Input = React.forwardRef(
  ({ label, error, ...inputProps }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <InputRow>
        <InputLabel $error={error ? true : false} htmlFor={inputProps.id}>
          {label}*
        </InputLabel>
        <InputContainer $error={error ? true : false}>
          <input ref={ref} autoComplete="off" {...inputProps} />
          {error && <WarningIcon />}
        </InputContainer>
        <InputMessage>{error?.message} </InputMessage>
      </InputRow>
    );
  }
);

export default Input;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const InputLabel = styled.label<{ $error: boolean }>`
  color: ${(props) => (props.$error ? 'rgb(237, 74, 74)' : 'var(--text-dark)')};
  font-weight: 600;
`;
const InputContainer = styled.div<{ $error: boolean }>`
  padding: 0 1rem;
  border-radius: 0.3125rem;
  background-color: var(--white-color);
  box-shadow: var(--box-shadow);
  border: 0.0625rem solid ${(props) => (props.$error ? 'rgb(237, 74, 74)' : 'var(--text-dark)')};
  display: flex;
  justify-content: space-between;
  &:focus-within {
    background-color: var(--hover-color);
  }
  input {
    width: 100%;
    outline: 0.125rem solid transparent;
    padding: 0.75rem 0;
  }
  svg {
    color: rgb(237, 74, 74);
    width: 1rem;
  }
`;
const InputMessage = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: rgb(237, 74, 74);
`;
