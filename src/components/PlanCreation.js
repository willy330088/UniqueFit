import React, { useState } from 'react';
import styled from 'styled-components';
import ProfilePlan from './ProfilePlan';
import EditPlanPopup from './EditPlanPopup';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
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

const StyledPencilIcon = styled(BsFillPencilFill)`
  font-size: 40px;
  margin-left: auto;
  color: #7d7d7d;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const StyledRemoveIcon = styled(FaTrashAlt)`
  font-size: 40px;
  margin-left: 40px;
  color: #7d7d7d;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: ${(props) => (props.paging === 3 ? '1100px' : '700px')};
    height: 800px;
    padding: ${(props) => (props.paging === 3 ? '50px 50px' : '50px 100px')};
    position: relative;
  }
`;

export default function WorkoutCreation({ plan }) {
  const [paging, setPaging] = useState(1);
  function deletePlan() {
    firebase
      .firestore()
      .collection('plans')
      .doc(plan.id)
      .delete()
      .then(() => {
        firebase
          .firestore()
          .collection('schedules')
          .get()
          .then((collectionSnapshot) => {
            collectionSnapshot.docs.forEach((docSnapshot) => {
              const id = docSnapshot.id;
              const schedule = docSnapshot.data();
              const scheduleEvents = schedule.events;
              const modified = scheduleEvents.filter((scheduleEvent) => {
                if (scheduleEvent.id !== plan.id) {
                  return scheduleEvent;
                }
              });
              firebase
                .firestore()
                .collection('schedules')
                .doc(id)
                .update({
                  events: modified,
                })
                .then(() => {
                  alert('Deleted Successfully!');
                });
            });
          });
      });
  }

  return (
    <StyledPlanCreationContainer>
      <ProfilePlan plan={plan} />
      <StyledPopup
        trigger={<StyledPencilIcon />}
        modal
        nested
        paging={paging}
      >
        <EditPlanPopup paging={paging} setPaging={setPaging} originalPlan={plan}/>
      </StyledPopup>
      <StyledRemoveIcon onClick={deletePlan}/>
    </StyledPlanCreationContainer>
  );
}
