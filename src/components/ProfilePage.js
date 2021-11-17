import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './Banner';
import GoogleMap from './GoogleMap';
import WorkoutCreation from './WorkoutCreation';
import PlanCreation from './PlanCreation';
import WorkoutCollection from './WorkoutCollection';
import PlanCollection from './PlanCollection';
import ScheduleCalendar from './ScheduleCalendar';
import styled from 'styled-components';
import firebase from '../utils/firebase';
import { BsFillPencilFill } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import 'firebase/auth';
import ProfileSubMenu from './ProfileSubMenu';
import SidebarData from '../utils/profileSidebarData';
import { HiUserCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import NoResult from './NoResult';
import { useHistory } from 'react-router-dom';


const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledProfilePageContainer = styled.div`
  padding: 50px 10% 100px;
  min-height: 800px;
`;

const StyledPersonalInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 3px solid #1face1;
`;

const StyledPersonalImage = styled.img`
  width: 120px;
  border-radius: 50%;
  margin-right: 40px;
`;

const StyledPersonalInfo = styled.div``;

const StyledPersonalName = styled.div`
  color: #1face1;
  font-size: 50px;
  margin-bottom: 10px;
`;

const StyledPersonalEmail = styled.div`
  color: white;
  font-size: 30px;
`;

const StyledPencilIcon = styled(BsFillPencilFill)`
  font-size: 30px;
  margin-left: 10px;
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
    background: #222d35;
    width: 400px;
    height: 250px;
    border-radius: 20px;
    padding: 0px 50px;
  }
`;

const StyledPopupTitle = styled.div`
  font-size: 40px;
  color: white;
  text-align: center;
  width: 100%;
  padding-bottom: 15px;
  margin: 20px 0px;
  border-bottom: 3px white solid;
`;

const StyledPopupInput = styled.input`
  width: 100%;
  height: 50px;
  outline: none;
  font-size: 30px;
  margin-bottom: 30px;
`;

const StyledPopupBtn = styled.button`
  width: 100px;
  height: 40px;
  font-size: 30px;
  margin-left: calc(50% - 50px);
  cursor: pointer;
`;

const StyledSideBar = styled.aside`
  float: left;
`;

const StyledSideBarContainer = styled.div`
  margin-top: 50px;
  width: 300px;
`;

const StyledProfileContentContainer = styled.div`
  padding: 50px 0px 50px 50px;
  margin-left: 200px;
  @media (min-width: 1280px) {
    margin-left: 30%;
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

export default function CreateWorkoutPage() {
  const history = useHistory();
  const workouts = useSelector((state) => state.workouts);
  const plans = useSelector((state) => state.plans);
  const currentUser = useSelector((state) => state.currentUser);
  const [mainContent, setMainContent] = useState('My Workout Creations');
  const [gymWorkoutTypeSelected, setGymWorkoutTypeSelected] = useState(true);
  const gymWorkouts = workouts.filter(
    (workout) => workout.type === 'Gymworkout'
  );
  const homeWorkouts = workouts.filter(
    (workout) => workout.type === 'Homeworkout'
  );

  useEffect(() => {
    window.scrollTo({ top: 300, left: 0, behavior: 'smooth' })
  }, [mainContent])

  function showCreationWorkout() {
    if (gymWorkoutTypeSelected) {
      return gymWorkouts.filter(workout => workout.publisher.uid === firebase.auth().currentUser.uid);
    } else {
      return homeWorkouts.filter(workout => workout.publisher.uid === firebase.auth().currentUser.uid);
    }
  }

  function showCollectionWorkout() {
    if (gymWorkoutTypeSelected) {
      return gymWorkouts.filter(workout => workout.collectedBy.includes(firebase.auth().currentUser.uid));
    } else {
      return homeWorkouts.filter(workout => workout.collectedBy.includes(firebase.auth().currentUser.uid));
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
        return (<NoResult type={'workout'}/>)
      } else {
        return (
          <>
            {showCreationWorkout().map((workout) => {
              return <WorkoutCreation workout={workout} />
            })}
          </>
        );
      }
    } else if (mainContent === 'My Workout Collections') {
      if (showCollectionWorkout().length === 0) {
        return (<NoResult type={'workout'}/>)
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
      if (plans.filter(plan => plan.publisher.uid === firebase.auth().currentUser.uid).length === 0) {
        return (<NoResult type={'plan'}/>)
      } else {
        return (
          <>
            {plans.filter(plan => plan.publisher.uid === firebase.auth().currentUser.uid).map((plan) => {
              return <PlanCreation plan={plan} />;
            })}
          </>
        );
      }
    } else if (mainContent === 'My Plan Collections') {
      if (plans.filter(plan => plan.collectedBy.includes(firebase.auth().currentUser.uid)).length === 0) {
        return (<NoResult type={'plan'}/>)
      } else {
        return (
          <>
            {plans.filter(plan => plan.collectedBy.includes(firebase.auth().currentUser.uid)).map((plan) => {
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

  return currentUser ? (
    <StyledBody>
      <Header />
      <Banner slogan={'My Profile'} />
      <StyledProfilePageContainer>
        <div onClick={() => {
          firebase.auth().signOut()
          history.push('/home');
        }}>logout</div>
        <StyledPersonalInfoContainer>
          {currentUser.photoURL ? (
            <StyledPersonalImage src={currentUser.photoURL} />
          ) : (
            <StyledPersonalIcon />
          )}
          <StyledPersonalInfo>
            <StyledPersonalName>
              {currentUser.displayName}
              <StyledPopup trigger={<StyledPencilIcon />} modal nested>
                <StyledPopupTitle>Edit Your Name</StyledPopupTitle>
                <StyledPopupInput />
                <StyledPopupBtn>Save</StyledPopupBtn>
              </StyledPopup>
            </StyledPersonalName>
            <StyledPersonalEmail>{currentUser.email}</StyledPersonalEmail>
          </StyledPersonalInfo>
        </StyledPersonalInfoContainer>
        <StyledSideBar>
          <StyledSideBarContainer>
            {SidebarData.map((item) => {
              return (
                <ProfileSubMenu item={item} setMainContent={setMainContent} mainContent={mainContent}/>
              );
            })}
          </StyledSideBarContainer>
        </StyledSideBar>
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
      </StyledProfilePageContainer>
    </StyledBody>
  ) : (
    <StyledBody>
      <Header />
      <Banner slogan={'My Profile'} />
    </StyledBody>
  );
}
