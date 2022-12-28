import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.G60};
`;

const RequireBadge = styled.span`
  color: ${({ theme }) => theme.color.PP600};
  padding-top: 0.25rem;
`;

interface FormLabelProps {
  label: string;
  required?: boolean;
}

function FormLabel({ label, required = false }: FormLabelProps) {
  return (
    <Label>
      {label} {required && <RequireBadge>*</RequireBadge>}
    </Label>
  );
}

export default FormLabel;
