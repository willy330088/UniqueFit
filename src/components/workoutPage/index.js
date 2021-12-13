import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { MdAddCircleOutline } from 'react-icons/md';

import usePopup from '../../hooks/usePopup';
import CreateWorkoutPopup from './CreateWorkoutPopup';
import WorkoutItem from './WorkoutItem';
import Header from '../Common/Header';
import Banner from '../Common/Banner';
import Filter from '../Common/Filter';
import SignInPopup from '../Common/SignInPopup';
import FullPageLoading from '../Common/FullPageLoading';
import { anvil } from '../../utils/animation';

export default function WorkoutPage({ currentUser }) {
  const [gymWorkoutTypeSelected, setGymWorkoutTypeSelected] = useState(true);
  const [filteredMuscleGroups, setFilteredMuscleGroups] = useState([]);
  const [signInOpen, setSignInOpen] = useState(false);
  const closeSignIn = () => setSignInOpen(false);
  const workouts = useSelector((state) => state.workouts);
  const [open, setOpen, close] = usePopup();

  const gymWorkouts = workouts.filter(
    (workout) => workout.type === 'Gymworkout'
  );
  const homeWorkouts = workouts.filter(
    (workout) => workout.type === 'Homeworkout'
  );

  function showWorkoutList() {
    if (filteredMuscleGroups.length === 0 && gymWorkoutTypeSelected) {
      return gymWorkouts;
    } else if (filteredMuscleGroups.length === 0 && !gymWorkoutTypeSelected) {
      return homeWorkouts;
    } else if (filteredMuscleGroups.length !== 0 && gymWorkoutTypeSelected) {
      return gymWorkouts.filter((workout) =>
        filteredMuscleGroups.includes(workout.targetMuscleGroup)
      );
    } else {
      return homeWorkouts.filter((workout) =>
        filteredMuscleGroups.includes(workout.targetMuscleGroup)
      );
    }
  }

  return currentUser !== undefined ? (
    <StyledBody>
      <Header />
      <Banner slogan={'Collect Your Workouts'} />
      <StyledWorkoutListContainer>
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
        <Filter
          filteredMuscleGroups={filteredMuscleGroups}
          setFilteredMuscleGroups={setFilteredMuscleGroups}
        />
        <StyledWorkoutContainer>
          <StyledCreateWorkoutContainer
            onClick={() => {
              if (currentUser) {
                setOpen(true);
              } else {
                setSignInOpen(true);
              }
            }}
          >
            <StyledCreateWorkoutIcon />
            <StyledCreateWorkoutText>
              Click To Create Workout
            </StyledCreateWorkoutText>
          </StyledCreateWorkoutContainer>
          <SignInPopup open={signInOpen} closeModal={closeSignIn} />
          <StyledPopup open={open} closeOnDocumentClick onClose={close}>
            <CreateWorkoutPopup close={close} />
          </StyledPopup>
          {showWorkoutList().map((workout) => {
            return (
              <WorkoutItem
                workout={workout}
                setSignInOpen={setSignInOpen}
                key={workout.id}
              />
            );
          })}
        </StyledWorkoutContainer>
      </StyledWorkoutListContainer>
    </StyledBody>
  ) : (
    <FullPageLoading />
  );
}

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledWorkoutContainer = styled.div`
  @media (min-width: 1400px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  } ;
`;

const StyledWorkoutListContainer = styled.div`
  padding: 50px 16% 100px;
  max-width: 1920px;
  margin: auto;
`;

const StyledBookmark = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const StyledWorkoutTypeTag = styled.div`
  color: ${(props) => (props.selected ? '#1face1' : '#808080')};
  font-size: 30px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: #1face1;
  }

  @media (min-width: 800px) {
    font-size: 40px;
  }
`;

const StyledWorkoutTypeSeparator = styled.div`
  color: white;
  font-size: 30px;
  margin-right: 20px;
  display: none;

  @media (min-width: 620px) {
    font-size: 30px;
    display: block;
  }

  @media (min-width: 800px) {
    font-size: 40px;
  }
`;

const StyledCreateWorkoutContainer = styled.div`
  width: 100%;
  background-color: #374652;
  height: 200px;
  margin-bottom: 30px;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  @media (min-width: 1400px) {
    max-width: 600px;
    width: 48%;
  } ;
`;

const StyledCreateWorkoutText = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
`;

const StyledCreateWorkoutIcon = styled(MdAddCircleOutline)`
  color: white;
  font-size: 40px;
  margin-right: 15px;
  display: none;

  @media (min-width: 600px) {
    display: block;
  } ;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 350px;
    height: 600px;
    padding: 20px 30px;
    position: relative;
    border-radius: 5px;
    animation: ${anvil} 0.6s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;

    @media (min-width: 500px) {
      width: 650px;
      height: 700px;
      border-radius: 10px;
    }

    @media (min-width: 650px) {
      padding: 30px 70px;
    }
  }
`;
