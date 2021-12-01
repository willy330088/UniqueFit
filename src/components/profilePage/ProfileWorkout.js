import React, { useState } from 'react';
import styled from 'styled-components';
import { ImPlay } from 'react-icons/im';

import WorkoutPopup from '../common/WorkoutPopup';
import WorkoutItemContent from '../common/WorkoutItemContent';
import muscleGroups from '../../utils/muscleGroup';

export default function ProfileWorkout({ workout }) {
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <StyledWorkoutItemContainer
        onClick={() => {
          setOpen(true);
        }}
      >
        <StyledPlayIcon />
        <StyledWorkoutItemImage
          src={
            muscleGroups.filter(
              (muscleGroup) => muscleGroup.name === workout.targetMuscleGroup
            )[0].src
          }
        />
        <StyledWorkoutItemDescription>
          <StyledWorkoutItemTitle>{workout.title}</StyledWorkoutItemTitle>
          <WorkoutItemContent workout={workout} />
        </StyledWorkoutItemDescription>
      </StyledWorkoutItemContainer>
      <WorkoutPopup workout={workout} close={closeModal} open={open} />
    </>
  );
}

const StyledPlayIcon = styled(ImPlay)`
  color: white;
  font-size: 60px;
  position: absolute;
  top: calc(50% - 30px);
  display: none;
`;

const StyledWorkoutItemContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-color: #374652;
  height: 200px;
  margin-bottom: 30px;
  border-radius: 10px;
  position: relative;
  width: 350px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 10px;
    transition: ease-in-out 0.2s;
  }

  &:hover {
    &::before {
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
    }
  }

  &:hover ${StyledPlayIcon} {
    display: block;
  }

  @media (min-width: 650px) {
    width: 600px;
  }
`;

const StyledWorkoutItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 650px) {
    display: block;
    margin-left: 30px;
  }
`;

const StyledWorkoutItemTitle = styled.div`
  font-size: 35px;
  color: #1face1;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  text-align: center;

  @media (min-width: 500px) {
    text-align: start;
  }

  @media (min-width: 700px) {
    width: 300px;
  }

  @media (min-width: 1400px) {
    width: 300px;
  } ;
`;

const StyledWorkoutItemImage = styled.img`
  width: 100px;
  display: none;
  @media (min-width: 650px) {
    display: block;
  }
`;
