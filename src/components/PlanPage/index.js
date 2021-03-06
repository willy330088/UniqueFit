import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import Popup from 'reactjs-popup';

import usePopup from '../../hooks/usePopup';
import Header from '../Common/Header';
import Banner from '../Common/Banner';
import CreatePlanPopup from './CreatePlanPopup';
import SignInPopup from '../Common/SignInPopup';
import PlanItem from './PlanItem';
import Filter from '../Common/Filter';
import useWindowWidth from '../../hooks/useWindowWidth';
import { errorToast } from '../../utils/toast';
import PlanBackground from '../../images/plan-background.jpeg';

export default function PlanPage() {
  const plans = useSelector((state) => state.plans);
  const workouts = useSelector((state) => state.workouts);
  const currentUser = useSelector((state) => state.currentUser);
  const [filteredMuscleGroups, setFilteredMuscleGroups] = useState([]);
  const [paging, setPaging] = useState(1);
  const [open, setOpen, close] = usePopup();
  const [signInOpen, setSignInOpen, closeSignIn] = usePopup();
  const { width } = useWindowWidth();

  const publicPlans = plans.filter((plan) => plan.public === true);
  const collectedWorkouts = workouts.filter((workout) =>
    workout.collectedBy.includes(currentUser?.uid)
  );

  function showPlanList() {
    if (filteredMuscleGroups.length === 0) {
      return publicPlans;
    } else {
      return publicPlans.filter((plan) =>
        filteredMuscleGroups.includes(plan.targetMuscleGroup)
      );
    }
  }

  function onAddPlan() {
    if (currentUser) {
      if (collectedWorkouts.length === 0) {
        errorToast('Please collect workouts before creating plans');
      } else if (width < 1100) {
        errorToast('Please create plans on desktop');
      } else {
        setOpen(true);
      }
    } else {
      setSignInOpen(true);
    }
  }

  return (
    <StyledBody>
      <Header />
      <Banner slogan={'Collect Your Plans'} />
      <StyledPlanListPageContainer>
        <Filter
          filteredMuscleGroups={filteredMuscleGroups}
          setFilteredMuscleGroups={setFilteredMuscleGroups}
        />
        <StyledPlanListContainer>
          <StyledAddPlanContainer onClick={onAddPlan}>
            <StyledCreatePlanIcon />
            <StyledCreatePlanText>Click To Create Plan</StyledCreatePlanText>
          </StyledAddPlanContainer>
          <SignInPopup open={signInOpen} closeModal={closeSignIn} />
          <StyledPopup
            open={open}
            closeOnDocumentClick
            onClose={close}
            paging={paging}
          >
            <CreatePlanPopup
              paging={paging}
              setPaging={setPaging}
              close={close}
            />
          </StyledPopup>
          {showPlanList().map((plan) => {
            return <PlanItem plan={plan} key={plan.id} />;
          })}
        </StyledPlanListContainer>
      </StyledPlanListPageContainer>
    </StyledBody>
  );
}

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledPlanListPageContainer = styled.div`
  padding: 10px 5% 100px;

  @media (min-width: 600px) {
    padding: 10px 16% 100px;
  }
`;

const StyledPlanListContainer = styled.div`
  margin-top: 40px;

  @media (min-width: 1200px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  } ;
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

const StyledCreatePlanText = styled.div`
  color: black;
  font-size: 30px;
  text-align: center;
  z-index: 10;
`;

const StyledCreatePlanIcon = styled(MdAddCircleOutline)`
  color: black;
  font-size: 40px;
  margin-right: 15px;
  display: none;
  z-index: 10;

  @media (min-width: 600px) {
    display: block;
  } ;
`;

const StyledAddPlanContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 30px 20px;
  position: relative;
  margin-bottom: 50px;
  height: 650px;
  cursor: pointer;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: '';
    background-image: url(${PlanBackground});
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

  &:hover ${StyledCreatePlanText} {
    color: white;
  }

  &:hover ${StyledCreatePlanIcon} {
    color: white;
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
