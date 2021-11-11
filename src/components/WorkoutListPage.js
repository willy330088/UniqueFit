import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './Banner';
import CreateWorkoutPopup from './CreateWorkoutPopup';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import WorkoutItem from './WorkoutItem';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import Filter from './Filter';
import { MdAddCircleOutline } from 'react-icons/md';

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledWorkoutContainer = styled.div`
  @media (min-width: 1400px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  };
`;

const StyledWorkoutListContainer = styled.div`
  padding: 50px 16% 100px;
`;

const StyledBookmark = styled.div`
  display: flex;
  margin-bottom: 50px;
  align-items: center;
`;

const StyledWorkoutTypeTag = styled.div`
  color: ${(props) => (props.selected ? '#1face1' : '#808080')};
  font-size: 40px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: #1face1;
  }
`;

const StyledWorkoutTypeSeparator = styled.div`
  color: white;
  font-size: 40px;
  margin-right: 20px;
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
  };
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
  };
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

    @media (min-width: 500px) {
      width: 700px;
      height: 800px;
      border-radius: 10px;
    } 

    @media (min-width: 650px) {
      padding: 50px 100px;
    } 
  }
`;

export default function WorkoutListPage() {
  const [workouts, setWorkouts] = useState([]);
  const [gymWorkoutTypeSelected, setGymWorkoutTypeSelected] = useState(true);
  const [filteredMuscleGroups, setFilteredMuscleGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection('workouts')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setWorkouts(data);
      });
  }, []);

  console.log(filteredMuscleGroups);

  return (
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
          <StyledCreateWorkoutContainer onClick={()=>{setOpen(true)}}>
            <StyledCreateWorkoutIcon/>
            <StyledCreateWorkoutText>Click To Create Workout</StyledCreateWorkoutText>
          </StyledCreateWorkoutContainer>
          <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
            <CreateWorkoutPopup close={closeModal}/>
          </StyledPopup>
          {workouts.map((workout) => {
            if (filteredMuscleGroups.length !== 0) {
              if (filteredMuscleGroups.includes(workout.targetMuscleGroup)) {
                if (gymWorkoutTypeSelected) {
                  if (workout.type === 'Gymworkout') {
                    return (
                      <WorkoutItem workout={workout} />
                    );
                  }
                } else {
                  if (workout.type === 'Homeworkout') {
                    return (
                      <WorkoutItem
                        workout={workout}
                      />
                    );
                  }
                }
              }
            } else {
              if (gymWorkoutTypeSelected) {
                if (workout.type === 'Gymworkout') {
                  return (
                    <WorkoutItem
                      workout={workout}
                    />
                  );
                }
              } else {
                if (workout.type === 'Homeworkout') {
                  return (
                    <WorkoutItem
                      workout={workout}
                    />
                  );
                }
              }
            }
          })}
        </StyledWorkoutContainer>
      </StyledWorkoutListContainer>
    </StyledBody>
  );
}
