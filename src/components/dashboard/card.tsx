import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.color.G0};
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.G30};
  padding: 1.25rem;
  flex: 1;
`;

interface DashboardCardProps {
  children: React.ReactNode;
}

export default function DashboardCard({ children }: DashboardCardProps) {
  return <CardContainer>{children}</CardContainer>;
}
