import React, { useState } from 'react';
import styled from 'styled-components';
import ProfilePlan from './ProfilePlan';
import EditPlanPopup from './EditPlanPopup';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import { firebase } from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import ConfirmPopup from './ConfirmPopup';

const StyledPlanCreationContainer = styled.div`
  margin: 20px 0px 50px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 800px) {
    display: flex;
    align-items: center;
    margin: 50px 0px;
    flex-direction: row;
  }
`;

const StyledPencilIcon = styled(BsFillPencilFill)`
  font-size: 40px;
  margin-left: 30px;
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
    height: 600px;
    width: ${(props) => (props.paging === 3 ? '1100px' : '350px')};
    padding: ${(props) => (props.paging === 3 ? '50px 50px' : '20px 30px')};
    position: relative;
    border-radius: 5px;
    transition: ease-in-out 0.5s;

    @media (min-width: 500px) {
      width: ${(props) => (props.paging === 3 ? '1100px' : '650px')};
      padding: ${(props) => (props.paging === 3 ? '50px 50px' : '20px 30px')};
      border-radius: 10px;
      height: 700px;
    }

    @media (min-width: 650px) {
      width: ${(props) => (props.paging === 3 ? '1100px' : '650px')};
      padding: ${(props) => (props.paging === 3 ? '30px 70px' : '30px 70px')};
    }
  }
`;

const StyledToolContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 800px) {
    margin-left: auto;
  }
`;

export default function PlanCreation({ plan }) {
  const [paging, setPaging] = useState(1);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const closeConfirm = () => setConfirmOpen(false);
  const users = useSelector((state) => state.users);

  function deletePlan() {
    firebase
      .firestore()
      .collection('plans')
      .doc(plan.id)
      .delete()
      .then(() => {
        const batch = firebase.firestore().batch();
        users.forEach((user) => {
          const scheduleEvents = user.events;
          const modified = scheduleEvents?.filter((scheduleEvent) => {
            if (scheduleEvent.extendedProps.planId !== plan.id) {
              return scheduleEvent;
            }
          });
          console.log(modified);
          if (modified) {
            batch.update(
              firebase.firestore().collection('users').doc(user.id),
              {
                events: modified,
              }
            );
          }
        });
        batch.commit().then(() => {
          toast.success('Deleted Successfully', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          closeConfirm();
        });
      });
  }

  return (
    <StyledPlanCreationContainer>
      <ProfilePlan plan={plan} />
      <StyledToolContainer>
        <StyledPencilIcon
          onClick={() => {
            setOpen(true);
          }}
        />
        <StyledPopup
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          paging={paging}
        >
          <EditPlanPopup
            paging={paging}
            setPaging={setPaging}
            originalPlan={plan}
            close={closeModal}
          />
        </StyledPopup>
        <StyledRemoveIcon
          onClick={() => {
            setConfirmOpen(true);
          }}
        />
        <ConfirmPopup
          confirmOpen={confirmOpen}
          closeConfirm={closeConfirm}
          action={deletePlan}
          type={'delete'}
        />
      </StyledToolContainer>
    </StyledPlanCreationContainer>
  );
}
