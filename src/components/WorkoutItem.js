import React from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { ImPlay } from 'react-icons/im';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import Popup from 'reactjs-popup';
import muscleGroups from '../utils/muscleGroup';
import WorkoutPopup from './WorkoutPopup';

const StyledExerciseItemContainer = styled.div`
  padding: 30px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 450px;
  margin: auto;

  @media (min-width: 1380px) {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 450px;
    margin: 0 10px 0 0;
  }
`;

const StyledExerciseItemDescription = styled.div``;

const StyledExerciseItemTitle = styled.div`
  font-size: 40px;
  color: #1face1;
`;

const StyledExerciseItemPublisher = styled.div`
  font-size: 30px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 600px) {
    justify-content: flex-start;
  }
`;

const StyledExerciseItemSocial = styled.div`
  font-size: 20px;
  margin-top: 20px;
  color: white;
`;

const StyledExerciseItemImage = styled.img`
  width: 80px;
  margin-right: 20px;
`;

const StyledPublisherIcon = styled(HiUserCircle)`
  size: 30px;
  margin-right: 10px;
`;

const StyledPublisherImage = styled.img`
  border-radius: 50%;
  width: 30px;
  margin-right: 10px;
`;

const StyledPlayIcon = styled(ImPlay)`
  color: white;
  font-size: 60px;
  margin-left: auto;

  &:hover {
    color: #1face1;
  }

  @media (min-width: 1300px) {
    margin-left: auto;
  }
`;

const StyledCollectIcon = styled(BsFillBookmarkHeartFill)`
  color: white;
`;

const StyledMessageIcon = styled(RiMessage2Fill)`
  color: white;
`;

//popup
const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 700px;
    height: 550px;
    overflow-y: scroll;
  }
`;

export default function WorkoutItem({ workout, gymWorkoutTypeSelected }) {
  return (
    <StyledExerciseItemContainer>
      <StyledExerciseItemImage
        src={
          muscleGroups.filter((muscleGroup) => {
            if (muscleGroup.name === workout.targetMuscleGroup)
              return muscleGroup;
          })[0].src
        }
      />
      <StyledExerciseItemDescription>
        <StyledExerciseItemTitle>{workout.title}</StyledExerciseItemTitle>
        <StyledExerciseItemPublisher>
          {workout.publisher.photoURL ? (
            <StyledPublisherImage src={workout.publisher.photoURL} />
          ) : (
            <StyledPublisherIcon />
          )}
          {workout.publisher.displayName
            ? workout.publisher.displayName
            : 'User'}
        </StyledExerciseItemPublisher>
        <StyledExerciseItemSocial>
          <StyledCollectIcon /> Collected ({workout.collectedBy.length}) / <StyledMessageIcon /> Comments
          ({workout.commentsCount || 0})
        </StyledExerciseItemSocial>
      </StyledExerciseItemDescription>
      <StyledPopup trigger={<StyledPlayIcon />} modal nested>
        <WorkoutPopup workout={workout} gymWorkoutTypeSelected={gymWorkoutTypeSelected}/>
      </StyledPopup>
    </StyledExerciseItemContainer>
  );
}
