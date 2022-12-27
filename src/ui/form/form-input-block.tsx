import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
  width: 100%;
`;

interface FormBlockProps {
  className?: string;
  children: React.ReactNode;
}

export default function FormInputBlock({ children, className = '' }: FormBlockProps) {
  return <Block className={className}>{children}</Block>;
}
