import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './Banner';
import styled from 'styled-components';
import muscleGroupImage from '../utils/muscleGroup';
import FrontMuscle from './FrontMuscle';
import BackMuscle from './BackMuscle';
import Popup from 'reactjs-popup';
import WorkoutItem from './WorkoutItem';
import firebase from '../utils/firebase';
import 'firebase/firestore';

const StyledFilterContainer = styled.div`
  display: none;
  @media (min-width: 800px) {
    width: 100%;
    height: 200px;
    background-color: #ddd;
    display: flex;
    margin: 30px auto 30px;
    align-items: center;
    justify-content: space-around;
  }
`;

const StyledFilterMuscleGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 450px;
  height: 180px;
  background: #ddd;
  margin: 20px;
  border-radius: 5px;
`;

const StyledMuscleGroupImage = styled.img`
  flex: 1 20%;
  width: 50px;
  cursor: pointer;
  border-radius: 50%;
  border: ${(props) => (props.selected ? '3px solid #1face1' : 'none')};

  &:hover {
    border: 3px solid #a2dff5;
  }
`;

const StyledFilterMuscleIcons = styled.div`
  background: #ddd;
  border-radius: 5px;
  padding: 5px;
  margin: 20px;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    background: #ddd;
    width: 700px;
    height: 550px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

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
  @media (min-width: 1300px) {
  }
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

  function toggleMuscleClick(name) {
    if (filteredMuscleGroups.includes(name)) {
      setFilteredMuscleGroups(
        filteredMuscleGroups.filter((muscle) => {
          if (muscle !== name) return muscle;
        })
      );
    } else {
      setFilteredMuscleGroups((filteredMuscleGroups) => [
        ...filteredMuscleGroups,
        name,
      ]);
    }
  }

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
        <StyledFilterContainer>
          <StyledFilterMuscleGroups>
            {muscleGroupImage.map((muscle) => {
              return (
                <StyledMuscleGroupImage
                  key={muscle.name}
                  src={muscle.src}
                  onClick={() => {
                    toggleMuscleClick(muscle.name);
                  }}
                  selected={filteredMuscleGroups.includes(muscle.name)}
                />
              );
            })}
          </StyledFilterMuscleGroups>
          <StyledPopup
            trigger={
              <StyledFilterMuscleIcons>
                <FrontMuscle
                  width={'100px'}
                  filteredMuscleGroups={filteredMuscleGroups}
                  setFilteredMuscleGroups={setFilteredMuscleGroups}
                />
                <BackMuscle
                  width={'100px'}
                  filteredMuscleGroups={filteredMuscleGroups}
                  setFilteredMuscleGroups={setFilteredMuscleGroups}
                />
              </StyledFilterMuscleIcons>
            }
            modal
            nested
          >
            {(close) => (
              <>
                <FrontMuscle
                  width={'300px'}
                  filteredMuscleGroups={filteredMuscleGroups}
                  setFilteredMuscleGroups={setFilteredMuscleGroups}
                />
                <BackMuscle
                  width={'300px'}
                  filteredMuscleGroups={filteredMuscleGroups}
                  setFilteredMuscleGroups={setFilteredMuscleGroups}
                />
              </>
            )}
          </StyledPopup>
        </StyledFilterContainer>
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
