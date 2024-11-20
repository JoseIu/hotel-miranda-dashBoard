import React from 'react';
import { FieldError } from 'react-hook-form';
import styled from 'styled-components';
import WarningIcon from '../../icons/WarningIcon';

type InputProps = React.ComponentProps<'select'> & {
  label: string;
  error: FieldError | undefined;
  children: React.ReactNode;
};

const Select = React.forwardRef(
  ({ label, error, children, ...inputProps }: InputProps, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <InputRow>
        <InputLabel $error={error ? true : false}>{label}*</InputLabel>
        <InputContainer $error={error ? true : false}>
          <select ref={ref} {...inputProps}>
            {children}
          </select>
          {error && <WarningIcon />}
        </InputContainer>
        <InputMessage>{error?.message}</InputMessage>
      </InputRow>
    );
  }
);

export default Select;
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
  border: ${(props) =>
    props.$error ? '0.125rem solid rgb(237, 74, 74)' : '0.125rem solid var(--text-dark)'};
  padding: 0 1rem;
  border-radius: 0.3125rem;
  background: var(--white-color);
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: space-between;
  select {
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
