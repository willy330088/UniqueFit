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
import Delete from '../images/delete.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

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

const StyledConfirmDeletePopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 350px;
    height: 200px;
    position: relative;
    border-radius: 5px;
    position: relative;
  }
`;

const StyledConfirmTextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  position: absolute;
  right: calc(50% - 125px);
  top: 45px;
`;

const StyledConfirmDeleteIcon = styled.img`
  width: 35px;
  margin-right: 15px;
`;

const StyledConfirmDeleteText = styled.div`
  font-size: 25px;
  color: white;
`;

const StyledConfirmBtnContainer = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  display: flex;
`;

const StyledConfirmYesBtn = styled.div`
  width: 50%;
  height: 60px;
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  background-color: hsla(129, 40%, 35%);
  cursor: pointer;
  &:hover {
    background-color: hsla(129, 40%, 40%);
  }
`;

const StyledConfirmNoBtn = styled.div`
  width: 50%;
  height: 60px;
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  background-color: hsla(148, 0%, 35%);
  cursor: pointer;

  &:hover {
    background-color: hsla(148, 0%, 40%);
  }
`;

export default function PlanCreation({ plan }) {
  const [paging, setPaging] = useState(1);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const closeConfirm = () => setConfirmOpen(false);
  const schedules = useSelector((state) => state.schedules);

  function deletePlan() {
    firebase
      .firestore()
      .collection('plans')
      .doc(plan.id)
      .delete()
      .then(() => {
        const batch = firebase.firestore().batch();
        schedules.forEach((schedule) => {
          const scheduleEvents = schedule.events;
          const modified = scheduleEvents.filter((scheduleEvent) => {
            if (scheduleEvent.id !== plan.id) {
              return scheduleEvent;
            }
          });
          batch.update(
            firebase.firestore().collection('schedules').doc(schedule.id),
            {
              events: modified,
            }
          );
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
      <StyledPencilIcon
        onClick={() => {
          setOpen(true);
        }}
      />
      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal} paging={paging}>
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
      <StyledConfirmDeletePopup
        open={confirmOpen}
        closeOnDocumentClick
        onClose={closeConfirm}
      >
        <StyledConfirmTextContainer>
          <StyledConfirmDeleteIcon src={Delete} />
          <StyledConfirmDeleteText>
            Are you sure you want to delete?
          </StyledConfirmDeleteText>
        </StyledConfirmTextContainer>
        <StyledConfirmBtnContainer>
          <StyledConfirmYesBtn
            onClick={() => {
              deletePlan();
            }}
          >
            Yes
          </StyledConfirmYesBtn>
          <StyledConfirmNoBtn
            onClick={() => {
              closeConfirm();
            }}
          >
            No
          </StyledConfirmNoBtn>
        </StyledConfirmBtnContainer>
      </StyledConfirmDeletePopup>
    </StyledPlanCreationContainer>
  );
}
