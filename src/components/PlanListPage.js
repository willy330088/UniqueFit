import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './Banner';
import CreatePlanPopup from './CreatePlanPopup';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import SignInPopup from './SignInPopup';
import PlanItem from './PlanItem';
import Filter from './Filter';
import GymBackground from '../images/gym.jpeg';
import { MdAddCircleOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import FullPageLoading from './FullPageLoading';

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

const StyledAddPlanContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 30px 20px;
  position: relative;
  margin-bottom: 50px;
  height: 650px;
  /* box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22); */
  cursor: pointer;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

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

const StyledCreatePlanText = styled.div`
  color: ${(props) => (props.hover ? 'white' : 'black')};
  font-size: 30px;
  text-align: center;
  z-index: 10;
`;

const StyledCreatePlanIcon = styled(MdAddCircleOutline)`
  color: ${(props) => (props.hover ? 'white' : 'black')};
  font-size: 40px;
  margin-right: 15px;
  display: none;
  z-index: 10;

  @media (min-width: 600px) {
    display: block;
  } ;
`;

export default function PlanListPage({currentUser}) {
  const [filteredMuscleGroups, setFilteredMuscleGroups] = useState([]);
  const [paging, setPaging] = useState(1);
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const closeSignIn = () => setSignInOpen(false);
  const plans = useSelector((state) => state.plans);
  // const currentUser = useSelector((state) => state.currentUser);
  console.log(plans)

  const publicPlans = plans.filter(
    (plan) => plan.public === true
  );

  function showPlanList() {
    if (filteredMuscleGroups.length === 0) {
      return publicPlans
    } else {
      return publicPlans.filter(plan => filteredMuscleGroups.includes(plan.targetMuscleGroup))
    }
  }

  return currentUser !== undefined ? (
    <StyledBody>
      <Header />
      <Banner slogan={'Collect Your Plans'} />
      <StyledPlanListPageContainer>
        <Filter
          filteredMuscleGroups={filteredMuscleGroups}
          setFilteredMuscleGroups={setFilteredMuscleGroups}
        />
        <StyledPlanListContainer>
         <StyledAddPlanContainer
            onMouseOver={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            onClick={() => {
              if (currentUser) {
                setOpen(true);
              } else {
                setSignInOpen(true)
              }
            }}
          >
            <StyledCreatePlanIcon hover={hover}/>
            <StyledCreatePlanText hover={hover}>Click To Create Plan</StyledCreatePlanText>
          </StyledAddPlanContainer>
          <SignInPopup open={signInOpen} closeModal={closeSignIn}/>
          <StyledPopup open={open} closeOnDocumentClick onClose={closeModal} paging={paging}>
            <CreatePlanPopup paging={paging} setPaging={setPaging} close={closeModal}/>
          </StyledPopup>
          {showPlanList().map((plan) => {
            return <PlanItem plan={plan} />;
          })}
        </StyledPlanListContainer>
      </StyledPlanListPageContainer>
    </StyledBody>
  ): <FullPageLoading/>;
}
