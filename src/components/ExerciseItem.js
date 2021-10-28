import React from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { ImPlay } from 'react-icons/im';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';

const StyledExerciseItemContainer = styled.div`
  text-align: center;
  margin: 40px 10px;
  @media (min-width: 600px) {
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
  }
`;

const StyledExerciseItemDescription = styled.div``;

const StyledExerciseItemTitle = styled.div`
  font-size: 50px;
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
  width: 100px;
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

  &:hover {
    color: #1face1;
  }

  @media (min-width: 600px) {
    margin-left: 40px;
  }
`;

const StyledCollectIcon = styled(BsFillBookmarkHeartFill)`
  color: white;
`;

const StyledMessageIcon = styled(RiMessage2Fill)`
  color: white;
`;

export default function ExerciseItem({
  image,
  gymWorkout
}) {
  return (
    <StyledExerciseItemContainer>
      <StyledExerciseItemImage src={image} />
      <StyledExerciseItemDescription>
        <StyledExerciseItemTitle>{gymWorkout.title}</StyledExerciseItemTitle>
        <StyledExerciseItemPublisher>
          {gymWorkout.publisher.photoURL ? (<StyledPublisherImage src={gymWorkout.publisher.photoURL} />) : (<StyledPublisherIcon />)}
          {gymWorkout.publisher.displayName ? (gymWorkout.publisher.displayName) : ('User')}
        </StyledExerciseItemPublisher>
        <StyledExerciseItemSocial>
          <StyledCollectIcon /> Collected 5 / <StyledMessageIcon /> Comments 7
        </StyledExerciseItemSocial>
      </StyledExerciseItemDescription>
      <StyledPlayIcon />
    </StyledExerciseItemContainer>
  );
}
