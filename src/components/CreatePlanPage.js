import React from 'react'
import Header from './Header'
import DragandDrop from './Drag&Drop'
import Banner from './Banner'
import styled from 'styled-components';
import PlanDetailsInput from './PlanDetailsInput';

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


export default function CreatePlanPage() {
  return (
    <StyledBody>
      <Header />
      <Banner />
      <StyledContainer>
        <PlanDetailsInput />
        <DragandDrop/>
      </StyledContainer>
    </StyledBody>
  )
}
