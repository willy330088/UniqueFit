import React from 'react';
import styled from 'styled-components';
import ProfilePlan from './ProfilePlan';
import { FaDumbbell } from 'react-icons/fa';
import { firebase } from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

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

export default function WorkoutCreation({ plan }) {
  function removeCollected() {
    const uid = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection('plans')
      .doc(plan.id)
      .update({
        collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
      });
  }

  return (
    <StyledPlanCreationContainer>
      <ProfilePlan plan={plan} />
      <StyledCollectIcon onClick={removeCollected} />
    </StyledPlanCreationContainer>
  );
}
