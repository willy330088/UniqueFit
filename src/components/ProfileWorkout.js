import React from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { ImPlay } from 'react-icons/im';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import muscleGroups from '../utils/muscleGroup';

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

export default function ProfileWorkout() {
  return (
    <StyledWorkoutItemContainer>
      <StyledWorkoutItemImage
        src={
          muscleGroups[0].src
        }
      />
      <StyledWorkoutItemDescription>
        <StyledWorkoutItemTitle>Flutter Kicks</StyledWorkoutItemTitle>
        <StyledWorkoutItemPublisher>
          <StyledPublisherIcon /> User
        </StyledWorkoutItemPublisher>
        <StyledWorkoutItemSocial>
          <StyledCollectIcon /> Collected (5) / <StyledMessageIcon /> Comments (7)
        </StyledWorkoutItemSocial>
      </StyledWorkoutItemDescription>
      <StyledPlayIcon />
    </StyledWorkoutItemContainer>
  );
}