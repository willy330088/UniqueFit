import React from 'react';
import styled from 'styled-components';
import ProfilePlan from './ProfilePlan';
import { FaDumbbell } from 'react-icons/fa';
import { removePlanCollection } from '../../utils/firebase';

export default function WorkoutCreation({ plan, userId }) {
  function removeCollected() {
    removePlanCollection(plan.id, userId);
  }

  return (
    <StyledPlanCreationContainer>
      <ProfilePlan plan={plan} />
      <StyledCollectIcon onClick={removeCollected} />
    </StyledPlanCreationContainer>
  );
}

const StyledPlanCreationContainer = styled.div`
  margin: 20px 0px 50px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 800px) {
    margin: 50px 0px;
    flex-direction: row;
  }
`;

const StyledCollectIcon = styled(FaDumbbell)`
  font-size: 50px;
  margin-left: 40px;
  color: #1face1;
  cursor: pointer;

  @media (min-width: 800px) {
    margin-left: auto;
  }

  &:hover {
    color: white;
  }
`;
