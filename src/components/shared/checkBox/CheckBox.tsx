import React from 'react';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';
import WarningIcon from '../../icons/WarningIcon';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | undefined;
};

const CheckBox = React.forwardRef(
  ({ label, error, ...inputProps }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <InputRow>
        <InputContainer $error={error ? true : false}>
          <input type="checkbox" ref={ref} autoComplete="off" {...inputProps} />
          {error && <WarningIcon />}
        </InputContainer>
        <InputLabel $error={error ? true : false} htmlFor={inputProps.id}>
          {label}*
        </InputLabel>
        <InputMessage>{error?.message} </InputMessage>
      </InputRow>
    );
  }
);

export default CheckBox;

const InputRow = styled.div`
  width: 100%;
  display: flex;

  gap: 0.3rem;
`;

const InputLabel = styled.label<{ $error: boolean }>`
  color: ${(props) => (props.$error ? 'rgb(237, 74, 74)' : 'var(--text-dark)')};
  font-weight: 600;
`;
const InputContainer = styled.div<{ $error: boolean }>`
  border: ${(props) => (props.$error ? '0.125rem solid rgb(237, 74, 74)' : '0.125rem solid transparent')};
  padding: 0 1rem;
  border-radius: 0.3125rem;
  background: var(--white-color);
  border: 0.0625rem solid var(--text-dark);

  display: flex;
  justify-content: space-between;
  input {
    width: 100%;
    outline: 0.125rem solid transparent;
    appearance: revert;
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
