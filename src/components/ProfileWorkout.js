import React from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { ImPlay } from 'react-icons/im';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import muscleGroups from '../utils/muscleGroup';
import Popup from 'reactjs-popup';
import WorkoutPopup from './WorkoutPopup';

const StyledWorkoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledWorkoutItemDescription = styled.div``;

const StyledWorkoutItemTitle = styled.div`
  font-size: 40px;
  color: #1face1;
`;

const StyledWorkoutItemPublisher = styled.div`
  font-size: 30px;
  color: white;
  display: flex;
`;

const StyledWorkoutItemSocial = styled.div`
  font-size: 20px;
  margin-top: 10px;
  color: white;
`;

const StyledWorkoutItemImage = styled.img`
  width: 80px;
  height: 80px;
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
  margin-left: 30px;
  cursor: pointer;

  &:hover {
    color: #1face1;
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

export default function ProfileWorkout({workout}) {
  return (
    <StyledWorkoutItemContainer>
      <StyledWorkoutItemImage
        src={
          muscleGroups.filter((muscleGroup) => {
            if (muscleGroup.name === workout.targetMuscleGroup)
              return muscleGroup;
          })[0].src
        }
      />
      <StyledWorkoutItemDescription>
        <StyledWorkoutItemTitle>{workout.title}</StyledWorkoutItemTitle>
        <StyledWorkoutItemPublisher>
          {workout.publisher.photoURL ? (
            <StyledPublisherImage src={workout.publisher.photoURL} />
          ) : (
            <StyledPublisherIcon />
          )}
          {workout.publisher.displayName
            ? workout.publisher.displayName
            : 'User'}
        </StyledWorkoutItemPublisher>
        <StyledWorkoutItemSocial>
          <StyledCollectIcon /> Collected ({workout.collectedBy.length}) / <StyledMessageIcon /> Comments ({workout.commentsCount || 0})
        </StyledWorkoutItemSocial>
      </StyledWorkoutItemDescription>
      <StyledPopup trigger={<StyledPlayIcon />} modal nested>
        <WorkoutPopup workout={workout}/>
      </StyledPopup>
    </StyledWorkoutItemContainer>
  );
}