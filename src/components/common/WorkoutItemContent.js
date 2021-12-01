import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HiUserCircle } from 'react-icons/hi';
import { FaDumbbell } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';

import { StyledVerticalContainer } from './GeneralStyle';

export default function WorkoutItemContent({ workout }) {
  const users = useSelector((state) => state.users);
  const publisher = users.filter((user) => user.id === workout.publisher)[0];

  return (
    <>
      <StyledVerticalContainer>
        {publisher?.photoURL ? (
          <StyledPublisherImage src={publisher?.photoURL} />
        ) : (
          <StyledPublisherIcon />
        )}
        <StyledPublisherName>{publisher?.displayName}</StyledPublisherName>
      </StyledVerticalContainer>
      <StyledWorkoutItemSocial>
        <StyledVerticalContainer>
          <StyledCollectIcon />{' '}
          <StyledIconNum>
            Collected ({workout.collectedBy.length})
          </StyledIconNum>{' '}
        </StyledVerticalContainer>
        <StyledContainer2>
          <StyledMessageIcon />{' '}
          <StyledIconNum>Comments ({workout.commentsCount || 0})</StyledIconNum>
        </StyledContainer2>
      </StyledWorkoutItemSocial>
    </>
  );
}

const StyledPublisherIcon = styled(HiUserCircle)`
  font-size: 30px;
  margin-right: 10px;
  color: white;
`;

const StyledPublisherImage = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
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

const StyledCollectIcon = styled(FaDumbbell)`
  font-size: 18px;
  margin-right: 5px;
`;

const StyledMessageIcon = styled(RiMessage2Fill)`
  font-size: 15px;
  margin-right: 5px;
`;

const StyledContainer2 = styled(StyledVerticalContainer)`
  @media (min-width: 500px) {
    margin-left: 10px;
  }
`;

const StyledIconNum = styled.div`
  padding-top: 3px;
`;
