import React from 'react';
import styled from 'styled-components';
import { UseFormRegisterReturn } from 'react-hook-form';

const Input = styled.input<{ readOnly: boolean }>`
  width: 100%;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  text-align: left;
  color: ${({ theme }) => theme.color.G80};
  border: 1px solid ${({ theme }) => theme.color.G30};
  border-radius: 0.25rem;
  pointer-events: ${({ readOnly }) => (readOnly ? 'none' : 'all')};

  &:focus {
    border-color: ${({ theme }) => theme.color.G40};
    transition: border-color 0.2s;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.G60};
    font-weight: 300;
  }
`;

interface FormInputProps {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  register: UseFormRegisterReturn;
  className?: string;
  required?: boolean;
  maxLength?: number;
  hidden?: boolean;
  step?: string;
  readonly?: boolean;
}

export default function FormInput({
  type,
  placeholder,
  register,
  step = '',
  required = false,
  className = '',
  hidden = false,
  readonly = false,
  maxLength = 1000000,
}: FormInputProps) {
  return (
    <Input
      {...register}
      className={className}
      type={type}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      step={step}
      hidden={hidden}
      readOnly={readonly}
      autoComplete="off"
    />
  );
}
