import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './Banner';
import styled from 'styled-components';
import Abs from '../images/muscle group/abs.png';
import Back from '../images/muscle group/back.png';
import Biceps from '../images/muscle group/biceps.png';
import Chest from '../images/muscle group/chest.png';
import Glutes from '../images/muscle group/glutes.png';
import Hamstrings from '../images/muscle group/hamstrings.png';
import Lowerback from '../images/muscle group/lowerback.png';
import Quadriceps from '../images/muscle group/quadriceps.png';
import Shoulder from '../images/muscle group/shoulder.png';
import Triceps from '../images/muscle group/triceps.png';
import FrontMuscle from './FrontMuscle';
import BackMuscle from './BackMuscle';
import Popup from 'reactjs-popup';
import ExercisePopup from './ExercisePopup';
import ExerciseItem from './ExerciseItem';
import firebase from '../utils/firebase';
import 'firebase/firestore';

const StyledFilterContainer = styled.div`
  display: none;
  @media (min-width: 800px) {
    width: 750px;
    height: 200px;
    background-color: #ddd;
    display: flex;
    margin: 30px auto 0px;
    border-radius: 20px;
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
  padding: 5px;
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
  padding: 0px 5% 100px;
  align-items: center;
  display: block;
  @media (min-width: 1150px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const StyledExerciseCount = styled.div`
  font-size: 30px;
  color: white;
  text-align: center;
  margin-top: 50px;
  @media (min-width: 1300px) {
    text-align: left;
    margin: 50px 0 0px 250px;
  }
`;

export default function CreatePlanPage() {
  const [gymWorkouts, setGymWorkouts] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('gym-workouts')
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          return docSnapshot.data();
        });
        setGymWorkouts(data);
      });
  }, []);

  return (
    <>
      <StyledBody>
        <Header />
        <Banner />
        <StyledFilterContainer>
          <StyledFilterMuscleGroups>
            <StyledMuscleGroupImage src={Abs} />
            <StyledMuscleGroupImage src={Back} />
            <StyledMuscleGroupImage src={Biceps} />
            <StyledMuscleGroupImage src={Chest} />
            <StyledMuscleGroupImage src={Glutes} />
            <StyledMuscleGroupImage src={Hamstrings} />
            <StyledMuscleGroupImage src={Lowerback} />
            <StyledMuscleGroupImage src={Quadriceps} />
            <StyledMuscleGroupImage src={Shoulder} />
            <StyledMuscleGroupImage src={Triceps} />
          </StyledFilterMuscleGroups>
          <StyledPopup
            trigger={
              <StyledFilterMuscleIcons>
                <FrontMuscle width={'100px'} />
                <BackMuscle width={'100px'} />
              </StyledFilterMuscleIcons>
            }
            modal
            nested
          >
            {(close) => (
              <>
                <FrontMuscle width={'300px'} />
                <BackMuscle width={'300px'} />
              </>
            )}
          </StyledPopup>
        </StyledFilterContainer>
        <StyledExerciseCount>Total ({gymWorkouts.length})</StyledExerciseCount>
        <StyledExerciseContainer>
          {gymWorkouts.map((gymWorkout) => {
            return (
              <ExerciseItem
                image={Abs}
                gymWorkout={gymWorkout}
              />
            );
          })}
        </StyledExerciseContainer>
      </StyledBody>
    </>
  );
}
