import React, { useState } from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { ImPlay } from 'react-icons/im';
import { FaDumbbell } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';
import muscleGroups from '../utils/muscleGroup';
import WorkoutPopup from './WorkoutPopup';
import { useSelector } from 'react-redux';

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
`;

const StyledWorkoutItemPublisher = styled.div`
  display: flex;
  align-items: center;
`;

const StyledWorkoutItemImage = styled.img`
  width: 100px;
  display: none;
  @media (min-width: 650px) {
    display: block;
  }
`;

const StyledPublisherIcon = styled(HiUserCircle)`
  font-size: 30px;
  margin-right: 10px;
  color: white;
`;

const StyledPublisherImage = styled.img`
  border-radius: 50%;
  width: 30px;
  margin-right: 10px;
`;

const StyledPublisherName = styled.div`
  color: white;
  font-size: 18px;
`;

const StyledWorkoutItemSocial = styled.div`
  font-size: 20px;
  margin-top: 10px;
  color: white;

  @media (min-width: 500px) {
    display: flex;
    align-items: baseline;
  } ;
`;

const StyledPlayIcon = styled(ImPlay)`
  color: white;
  font-size: 60px;
  position: absolute;
  top: calc(50% - 30px);
  display: ${(props) => (props.hover ? 'block' : 'none')};
`;

const StyledCollectIcon = styled(FaDumbbell)`
  font-size: 18px;
  margin-right: 5px;
`;

const StyledMessageIcon = styled(RiMessage2Fill)`
  font-size: 15px;
  margin-right: 5px;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledContainer2 = styled.div`
  display: flex;
  align-items: center;
  
  @media (min-width: 500px) {
    margin-left: 10px;
  }
`;

const StyledCollectNum = styled.div`
  padding-top: 3px;
`;

const StyledCommentNum = styled.div`
  padding-top: 3px;
`;


export default function ProfileWorkout({ workout }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const users = useSelector((state) => state.users);
  const publisher = users.filter((user) => user.id === workout.publisher)[0];

  return (
    <>
      <StyledWorkoutItemContainer
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <StyledPlayIcon hover={hover} />
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
            {publisher?.photoURL ? (
              <StyledPublisherImage src={publisher?.photoURL} />
            ) : (
              <StyledPublisherIcon />
            )}
            {<StyledPublisherName>{publisher?.displayName}</StyledPublisherName>}
          </StyledWorkoutItemPublisher>
          <StyledWorkoutItemSocial>
            <StyledContainer>
              <StyledCollectIcon />{' '}
              <StyledCollectNum>
                Collected ({workout.collectedBy.length})
              </StyledCollectNum>{' '}
            </StyledContainer>
            <StyledContainer2>
              <StyledMessageIcon />{' '}
              <StyledCommentNum>
                Comments ({workout.commentsCount || 0})
              </StyledCommentNum>
            </StyledContainer2>
          </StyledWorkoutItemSocial>
        </StyledWorkoutItemDescription>
      </StyledWorkoutItemContainer>
      <WorkoutPopup workout={workout} close={closeModal} open={open} />
    </>
  );
}
