import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Banner from '../common/Banner';
import GoogleMap from './GoogleMap';
import WorkoutCreation from './WorkoutCreation';
import PlanCreation from './PlanCreation';
import WorkoutCollection from './WorkoutCollection';
import PlanCollection from './PlanCollection';
import ScheduleCalendar from './ScheduleCalendar';
import styled from 'styled-components';
import { firebase } from '../../utils/firebase';
import { BsFillPencilFill } from 'react-icons/bs';
import 'firebase/auth';
import ProfileSubMenu from './ProfileSubMenu';
import SidebarData from '../../utils/profileSidebarData';
import { HiUserCircle } from 'react-icons/hi';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import NoResult from './NoResult';
import { useHistory } from 'react-router-dom';
import ConfirmPopup from '../common/ConfirmPopup';
import EditProfilePopup from './EditProfilePopup';
import FullPageLoading from '../common/FullPageLoading';

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledProfilePageContainer = styled.div`
  padding: 50px 10% 100px;
  min-height: 800px;

  @media (min-width: 950px) {
    padding: 50px 15% 100px;
  }

  @media (min-width: 1100px) {
    padding: 50px 5% 100px;
  }

  @media (min-width: 1400px) {
    padding: 50px 10% 100px;
  }
`;

const StyledPersonalInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 3px solid #1face1;
  position: relative;
`;

const StyledPersonalImage = styled.img`
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  object-position: center;
  height: 50px;

  @media (min-width: 450px) {
    width: 60px;
    height: 60px;
  }

  @media (min-width: 750px) {
    width: 120px;
    margin-right: 40px;
    height: 120px;
  }
`;

const StyledPersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPersonalName = styled.div`
  color: #1face1;
  font-size: 30px;
  margin-bottom: 10px;

  @media (min-width: 750px) {
    font-size: 50px;
    margin-bottom: 10px;
  }
`;

const StyledPersonalEmail = styled.div`
  color: white;
  font-size: 20px;

  @media (min-width: 750px) {
    font-size: 30px;
  }
`;

const StyledPencilIcon = styled(BsFillPencilFill)`
  font-size: 20px;
  margin-left: 10px;
  color: #7d7d7d;
  cursor: pointer;

  &:hover {
    color: white;
  }

  @media (min-width: 450px) {
    font-size: 25px;
    margin-left: 20px;
  }

  @media (min-width: 750px) {
    font-size: 40px;
    margin-left: 40px;
  }
`;

const StyledSignOutIcon = styled(RiLogoutBoxRLine)`
  font-size: 25px;
  color: #7d7d7d;
  cursor: pointer;
  position: absolute;
  right: 0;

  &:hover {
    color: white;
  }

  @media (min-width: 450px) {
    font-size: 30px;
  }

  @media (min-width: 750px) {
    font-size: 50px;
  }
`;

const StyledSideBarContainer = styled.div`
  width: 100%;

  @media (min-width: 1100px) {
    width: 400px;
  }

  @media (min-width: 1400px) {
    width: 450px;
  }
`;

const StyledProfileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;

  @media (min-width: 800px) {
    display: block;
  }

  @media (min-width: 1100px) {
    margin-top: 0px;
    padding: 0px 0px 50px 50px;
  }

  @media (min-width: 1500px) {
    margin-left: 100px;
  }
`;

const StyledProfileContentTitle = styled.div`
  color: #1face1;
  font-size: 50px;
  margin-bottom: 30px;
`;

const StyledBookmark = styled.div`
  display: flex;
`;

const StyledWorkoutTypeTag = styled.div`
  color: ${(props) => (props.selected ? 'white' : '#808080')};
  font-size: 30px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const StyledWorkoutTypeSeparator = styled.div`
  color: white;
  font-size: 30px;
  margin-right: 20px;
`;

const StyledPersonalIcon = styled(HiUserCircle)`
  font-size: 120px;
  margin-right: 10px;
  color: white;
`;

const StyledMainContent = styled.div`
  margin-top: 50px;

  @media (min-width: 1100px) {
    display: flex;
  }
`;

export default function ProfilePage() {
  const history = useHistory();
  const workouts = useSelector((state) => state.workouts);
  const plans = useSelector((state) => state.plans);
  const currentUser = useSelector((state) => state.currentUser);
  const [mainContent, setMainContent] = useState('My Workout Creations');
  const [gymWorkoutTypeSelected, setGymWorkoutTypeSelected] = useState(true);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const closeConfirm = () => setConfirmOpen(false);
  const gymWorkouts = workouts.filter(
    (workout) => workout.type === 'Gymworkout'
  );
  const homeWorkouts = workouts.filter(
    (workout) => workout.type === 'Homeworkout'
  );

  useEffect(() => {
    window.scrollTo({ top: 300, left: 0, behavior: 'smooth' });
  }, [mainContent]);

  function showCreationWorkout() {
    if (gymWorkoutTypeSelected) {
      return gymWorkouts.filter(
        (workout) => workout.publisher === currentUser?.uid
      );
    } else {
      return homeWorkouts.filter(
        (workout) => workout.publisher === currentUser?.uid
      );
    }
  }

  function showCollectionWorkout() {
    if (gymWorkoutTypeSelected) {
      return gymWorkouts.filter((workout) =>
        workout.collectedBy.includes(currentUser?.uid)
      );
    } else {
      return homeWorkouts.filter((workout) =>
        workout.collectedBy.includes(currentUser?.uid)
      );
    }
  }

  function showMainContent() {
    if (mainContent === 'My Nearby Gyms') {
      return (
        <>
          <GoogleMap />
        </>
      );
    } else if (mainContent === 'My Workout Creations') {
      if (showCreationWorkout().length === 0) {
        return <NoResult type={'workout'} />;
      } else {
        return (
          <>
            {showCreationWorkout().map((workout) => {
              return <WorkoutCreation workout={workout} />;
            })}
          </>
        );
      }
    } else if (mainContent === 'My Workout Collections') {
      if (showCollectionWorkout().length === 0) {
        return <NoResult type={'workout'} />;
      } else {
        return (
          <>
            {showCollectionWorkout().map((workout) => {
              return <WorkoutCollection workout={workout} />;
            })}
          </>
        );
      }
    } else if (mainContent === 'My Plan Creations') {
      if (
        plans.filter((plan) => plan.publisher === currentUser?.uid).length === 0
      ) {
        return <NoResult type={'plan'} />;
      } else {
        return (
          <>
            {plans
              .filter((plan) => plan.publisher === currentUser?.uid)
              .map((plan) => {
                return <PlanCreation plan={plan} />;
              })}
          </>
        );
      }
    } else if (mainContent === 'My Plan Collections') {
      if (
        plans.filter((plan) => plan.collectedBy.includes(currentUser?.uid))
          .length === 0
      ) {
        return <NoResult type={'plan'} />;
      } else {
        return (
          <>
            {plans
              .filter((plan) => plan.collectedBy.includes(currentUser?.uid))
              .map((plan) => {
                return <PlanCollection plan={plan} />;
              })}
          </>
        );
      }
    } else if (mainContent === 'My Schedule') {
      return (
        <>
          <ScheduleCalendar />
        </>
      );
    }
  }

  function signOut() {
    firebase.auth().signOut();
  }

  return workouts.length !== 0 ? (
    <StyledBody>
      <Header />
      <Banner slogan={'My Profile'} />
      <StyledProfilePageContainer>
        <StyledPersonalInfoContainer>
          {currentUser?.photoURL ? (
            <StyledPersonalImage src={currentUser?.photoURL} />
          ) : (
            <StyledPersonalIcon />
          )}
          <StyledPersonalInfo>
            <StyledPersonalName>{currentUser?.displayName}</StyledPersonalName>
            <StyledPersonalEmail>{currentUser?.email}</StyledPersonalEmail>
          </StyledPersonalInfo>
          <StyledPencilIcon
            onClick={() => {
              setOpen(true);
            }}
          />
          <EditProfilePopup open={open} closeModal={closeModal} />
          <StyledSignOutIcon
            onClick={() => {
              setConfirmOpen(true);
            }}
          />
          <ConfirmPopup
            confirmOpen={confirmOpen}
            closeConfirm={closeConfirm}
            action={signOut}
            type={'signOut'}
          />
        </StyledPersonalInfoContainer>
        <StyledMainContent>
          <StyledSideBarContainer>
            {SidebarData.map((item) => {
              return (
                <ProfileSubMenu
                  item={item}
                  setMainContent={setMainContent}
                  mainContent={mainContent}
                />
              );
            })}
          </StyledSideBarContainer>
          <StyledProfileContentContainer>
            <StyledProfileContentTitle>{mainContent}</StyledProfileContentTitle>
            {mainContent === 'My Workout Collections' ||
            mainContent === 'My Workout Creations' ? (
              <StyledBookmark>
                <StyledWorkoutTypeTag
                  selected={gymWorkoutTypeSelected}
                  onClick={() => {
                    setGymWorkoutTypeSelected(true);
                  }}
                >
                  Gym Workout
                </StyledWorkoutTypeTag>
                <StyledWorkoutTypeSeparator>|</StyledWorkoutTypeSeparator>
                <StyledWorkoutTypeTag
                  selected={!gymWorkoutTypeSelected}
                  onClick={() => {
                    setGymWorkoutTypeSelected(false);
                  }}
                >
                  Home Workout
                </StyledWorkoutTypeTag>
              </StyledBookmark>
            ) : null}
            {showMainContent()}
          </StyledProfileContentContainer>
        </StyledMainContent>
      </StyledProfilePageContainer>
    </StyledBody>
  ) : (
    <FullPageLoading />
  );
}
