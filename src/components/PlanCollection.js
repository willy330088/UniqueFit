import React, { useState } from 'react';
import styled from 'styled-components';
import ProfilePlan from './ProfilePlan';
import { BsBookmarkFill } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const StyledPlanCreationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 50px 0px;
`;

const StyledCollectIcon = styled(BsBookmarkFill)`
  font-size: 40px;
  margin-left: 40px;
  color: #1face1;
  cursor: pointer;
  margin-left: auto;

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
      <StyledCollectIcon onClick={removeCollected}/>
    </StyledPlanCreationContainer>
  );
}
