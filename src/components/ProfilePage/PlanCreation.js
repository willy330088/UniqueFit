import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import Popup from 'reactjs-popup';

import usePopup from '../../hooks/usePopup';
import ProfilePlan from './ProfilePlan';
import EditPlanPopup from './EditPlanPopup';
import ConfirmPopup from '../Common/ConfirmPopup';
import { deletePlan } from '../../utils/firebase';
import { successToast, errorToast } from '../../utils/toast';
import useWindowWidth from '../../hooks/useWindowWidth';

export default function PlanCreation({ plan }) {
  const [paging, setPaging] = useState(1);
  const [open, setOpen, close] = usePopup();
  const [confirmOpen, setConfirmOpen, closeConfirm] = usePopup();
  const users = useSelector((state) => state.users);
  const { width } = useWindowWidth();

  async function deletePlanCreation() {
    await deletePlan(plan.id, users);
    successToast('Deleted Successfully');
    closeConfirm();
  }

  function onEditPlan() {
    if (width < 1100) {
      errorToast('Please edit plan on desktop');
    } else {
      setOpen(true);
    }
  }

  return (
    <StyledPlanCreationContainer>
      <ProfilePlan plan={plan} />
      <StyledToolContainer>
        <StyledPencilIcon onClick={onEditPlan} />
        <StyledPopup
          open={open}
          closeOnDocumentClick
          onClose={close}
          paging={paging}
        >
          <EditPlanPopup
            paging={paging}
            setPaging={setPaging}
            originalPlan={plan}
            close={close}
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
          action={deletePlanCreation}
          type={'delete'}
        />
      </StyledToolContainer>
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
    width: 350px;
    padding: 20px 30px;
    position: relative;
    border-radius: 5px;
    transition: ease-in-out 0.5s;

    @media (min-width: 500px) {
      width: 650px;
      border-radius: 10px;
      height: 700px;
    }

    @media (min-width: 650px) {
      padding: 30px 70px;
    }

    @media (min-width: 1100px) {
      width: ${(props) => (props.paging === 3 ? '1100px' : '650px')};
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
