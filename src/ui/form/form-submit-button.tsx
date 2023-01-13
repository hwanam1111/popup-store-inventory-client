import React from 'react';
import styled from 'styled-components';

import ComponentLoading from '@ui/loading-component';

const Button = styled.button`
  color: ${({ theme }) => theme.color.G0};
  background-color: ${({ theme }) => theme.color.PB600};
  font-size: 0.875rem;
  padding: 0 1.25rem;
  width: 100%;
  height: 2.875rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: ${({ theme }) => theme.color.G40};
  }
`;

interface FormSubmitButtonProps {
  text: string;
  disabled: boolean;
  isLoading: boolean;
  className?: string;
}

function FormSubmitButton({ text, disabled, isLoading, className = '' }: FormSubmitButtonProps) {
  return (
    <Button className={className} type="submit" disabled={disabled}>
      {isLoading ? <ComponentLoading /> : text}
    </Button>
  );
}

export default FormSubmitButton;
