import React from 'react'
import Header from './Header'
import Banner from './Banner'
import styled from 'styled-components';
import Abs from '../images/muscle group/abs.png'
import Back from '../images/muscle group/back.png'
import Biceps from '../images/muscle group/biceps.png'
import Chest from '../images/muscle group/chest.png'
import Glutes from '../images/muscle group/glutes.png'
import Hamstrings from '../images/muscle group/hamstrings.png'
import Lowerback from '../images/muscle group/lowerback.png'
import Quadriceps from '../images/muscle group/quadriceps.png'
import Shoulder from '../images/muscle group/shoulder.png'
import Triceps from '../images/muscle group/triceps.png'
import FrontMuscle from './FrontMuscle';
import BackMuscle from './BackMuscle';
import Popup from 'reactjs-popup';
import ExercisePopup from './ExercisePopup';
import ExerciseItem from './ExerciseItem';

const StyledFilterContainer = styled.div`
  width: 750px;
  height: 200px;
  background-color: #ddd;
  display: flex;
  margin: 30px auto;
  border-radius: 20px;
  align-items: center;
  justify-content: space-around;
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
  padding: 50px 200px;
`;

export default function CreatePlanPage() {
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
            <StyledMuscleGroupImage src={Triceps}/>
          </StyledFilterMuscleGroups>
          <StyledPopup
            trigger={
              <StyledFilterMuscleIcons>
                <FrontMuscle width={'100px'}/>
                <BackMuscle width={'100px'}/>
              </StyledFilterMuscleIcons>
            }
            modal
            nested
            >
            {(close) => (
              <>
                <FrontMuscle width={'300px'} />
                <BackMuscle width={'300px'}/>
              </>
            )}
          </StyledPopup>
        </StyledFilterContainer>
        <StyledExerciseContainer>
          <ExerciseItem img={Abs}/>
        </StyledExerciseContainer>
      </StyledBody>
    </>
  )
}