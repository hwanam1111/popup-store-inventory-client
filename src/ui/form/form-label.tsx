import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.G60};
`;

const RequireBadge = styled.span``;

interface FormLabelProps {
  label: string;
  isRequired?: boolean;
}

function FormLabel({ label, isRequired = false }: FormLabelProps) {
  return (
    <Label>
      {label} {isRequired && <RequireBadge>*</RequireBadge>}
    </Label>
  );
}

export default FormLabel;
