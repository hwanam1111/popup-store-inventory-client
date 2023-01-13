import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  padding-left: 0.125rem;
  font-size: 0.75rem;
  line-height: 1.25;
  color: ${({ theme }) => theme.color.ER100};
`;

interface FormErrorProps {
  message: string;
  className?: string;
}

export default function FormError({ message, className = '' }: FormErrorProps) {
  return <ErrorMessage className={className}>{message}</ErrorMessage>;
}
