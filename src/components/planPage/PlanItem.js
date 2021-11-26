import React, { useState } from 'react';
import styled from 'styled-components';
import GymBackground from '../../images/gym.jpeg';
import PlanItemContent from '../common/PlanItemContent';

export default function PlanItem({ plan }) {
  const [hover, setHover] = useState(false);
  return (
    <StyledPlanContainer
      onClick={() => {
        window.open(`/plans/${plan.id}`);
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <PlanItemContent plan={plan} hover={hover} />
    </StyledPlanContainer>
  );
}

const StyledPlanContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 30px 20px;
  position: relative;
  margin-bottom: 50px;
  height: 650px;
  cursor: pointer;
  z-index: 1;

  &:before {
    content: '';
    background-image: url(${GymBackground});
    background-position-x: 7%;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: ease-in-out 0.2s;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    &::after {
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
    }
  }

  @media (min-width: 800px) {
    padding: 30px 50px;
  }

  @media (min-width: 800px) {
    padding: 30px 120px;
  }

  @media (min-width: 1200px) {
    padding: 30px 50px;
    width: 45%;
  } ;
`;
