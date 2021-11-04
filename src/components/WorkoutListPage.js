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

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledExerciseContainer = styled.div`
  @media (min-width: 1380px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  } ;
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

const StyledCreateWorkoutBtn = styled.button`
  width: 200px;
  height: 50px;
  margin-left: auto;
  font-size: 20px;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 700px;
    height: 800px;
    padding: 50px 100px;
    position: relative;
  }
`;

export default function WorkoutListPage() {
  const [workouts, setWorkouts] = useState([]);
  const [gymWorkoutTypeSelected, setGymWorkoutTypeSelected] = useState(true);
  const [filteredMuscleGroups, setFilteredMuscleGroups] = useState([]);

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
          <StyledPopup
            trigger={
              <StyledCreateWorkoutBtn>
                Create Your Workout
              </StyledCreateWorkoutBtn>
            }
            modal
            nested
          >
            <CreateWorkoutPopup />
          </StyledPopup>
        </StyledBookmark>
        <Filter
          filteredMuscleGroups={filteredMuscleGroups}
          setFilteredMuscleGroups={setFilteredMuscleGroups}
        />
        <StyledExerciseContainer>
          {workouts.map((workout) => {
            if (filteredMuscleGroups.length !== 0) {
              if (filteredMuscleGroups.includes(workout.targetMuscleGroup)) {
                if (gymWorkoutTypeSelected) {
                  if (workout.type === 'Gymworkout') {
                    return (
                      <WorkoutItem
                        workout={workout}
                        gymWorkoutTypeSelected={gymWorkoutTypeSelected}
                      />
                    );
                  }
                } else {
                  if (workout.type === 'Homeworkout') {
                    return (
                      <WorkoutItem
                        workout={workout}
                        gymWorkoutTypeSelected={gymWorkoutTypeSelected}
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
                      gymWorkoutTypeSelected={gymWorkoutTypeSelected}
                    />
                  );
                }
              } else {
                if (workout.type === 'Homeworkout') {
                  return (
                    <WorkoutItem
                      workout={workout}
                      gymWorkoutTypeSelected={gymWorkoutTypeSelected}
                    />
                  );
                }
              }
            }
          })}
        </StyledExerciseContainer>
      </StyledWorkoutListContainer>
    </StyledBody>
  );
}
