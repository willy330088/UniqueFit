import React, { useState } from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { ImPlay } from 'react-icons/im';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import Popup from 'reactjs-popup';
import muscleGroups from '../utils/muscleGroup';
import WorkoutPopup from './WorkoutPopup';

const StyledWorkoutItemContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  width: 100%;
  background-color: #374652;
  height: 200px;
  margin-bottom: 30px;
  border-radius: 10px;
  position: relative;

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

  @media (min-width: 1400px) {
    max-width: 600px;
    width: 48%;
  };
`;

const StyledWorkoutItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 500px) {
    display: block;
    margin-left: 30px;
  };

  @media (min-width: 700px) {
    margin-left: 50px;
  };

  @media (min-width: 1400px) {
    margin-left: 30px;
  };
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
  };
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
  };
`;

const StyledPlayIcon = styled(ImPlay)`
  color: white;
  font-size: 60px;
  position: absolute;
  top: calc(50% - 30px);
  display: ${(props) => (props.hover ? 'block' : 'none')};
`;

const StyledCollectIcon = styled(BsFillBookmarkHeartFill)`
  font-size: 15px;
  margin-right: 5px;
`;

const StyledMessageIcon = styled(RiMessage2Fill)`
  font-size: 15px;
  @media (min-width: 500px) {
    margin: 0px 5px 0 10px;
  };
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

export default function WorkoutItem({ workout }) {
  const [hover, setHover] = useState(false);

  return (
    <StyledPopup
      trigger={
        <StyledWorkoutItemContainer
          onMouseOver={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <StyledPlayIcon hover={hover}/>
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
              {workout.publisher.displayName ? (
                <StyledPublisherName>
                  {workout.publisher.displayName}
                </StyledPublisherName>
              ) : (
                <StyledPublisherName>User</StyledPublisherName>
              )}
            </StyledWorkoutItemPublisher>
            <StyledWorkoutItemSocial>
              <div>
                <StyledCollectIcon /> Collected ({workout.collectedBy.length}){' '}
              </div>
              <div>
                <StyledMessageIcon /> Comments ({workout.commentsCount || 0})
              </div>
            </StyledWorkoutItemSocial>
          </StyledWorkoutItemDescription>
        </StyledWorkoutItemContainer>
      }
      modal
      nested
    >
      <WorkoutPopup workout={workout} />
    </StyledPopup>
  );
}
