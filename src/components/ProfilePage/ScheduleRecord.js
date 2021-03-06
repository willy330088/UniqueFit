import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import ProfileFrontMuscle from './ProfileFrontMuscle';
import ProfileBackMuscle from './ProfileBackMuscle';
import SpinHover from '../../images/spin-icon-hover.png';

export function getRecentEvents(events) {
  return (
    events
      ?.slice()
      .sort((a, b) => new Date(b.start) - new Date(a.start))
      .filter(
        (event) =>
          new Date() - new Date(event.start) > 0 &&
          2592000000 > new Date() - new Date(event.start)
      ) || []
  );
}

export default function ScheduleRecord() {
  const currentUser = useSelector((state) => state.currentUser);
  const plans = useSelector((state) => state.plans);
  const users = useSelector((state) => state.users);
  const [isFront, setIsFront] = useState(true);
  const trainedMuscleGroups = [];
  let recentCompletedEvents = [];

  if (currentUser) {
    const events = users.filter((user) => user.id === currentUser.uid)[0]
      .events;

    recentCompletedEvents = getRecentEvents(events).filter(
      (event) => event.extendedProps.completed === true
    );
  }

  const plansDetails = recentCompletedEvents.map((event) => {
    const plan = plans.filter(
      (plan) => plan.id === event.extendedProps.planId
    )[0];
    if (!trainedMuscleGroups.includes(plan?.targetMuscleGroup)) {
      trainedMuscleGroups.push(plan?.targetMuscleGroup);
    }
    return plan;
  });

  return (
    <StyledScheduleRecordContainer>
      <StyledScheduleRecordTitle>
        Past 30 Days I Trained...
      </StyledScheduleRecordTitle>
      <StyledScheduleCompleteContainer>
        <StyledScheduleCompleteListContainer>
          {recentCompletedEvents.length === 0 ? (
            <StyledScheduleCompleteListItem>
              <StyledScheduleCompleteListTitle>
                No Completed Training!
              </StyledScheduleCompleteListTitle>
            </StyledScheduleCompleteListItem>
          ) : (
            recentCompletedEvents.map((event, index) => {
              return (
                <StyledScheduleCompleteListItem key={event.id}>
                  <StyledScheduleCompleteListTime>
                    {event.start}
                  </StyledScheduleCompleteListTime>
                  <StyledScheduleCompleteListTitle>
                    {plansDetails[index]?.title}
                  </StyledScheduleCompleteListTitle>
                </StyledScheduleCompleteListItem>
              );
            })
          )}
        </StyledScheduleCompleteListContainer>
        <StyledScheduleMuscleContainer>
          <StyledPopupSpinIcon
            onClick={() => {
              setIsFront(!isFront);
            }}
          />
          {isFront ? (
            <ProfileFrontMuscle trainedMuscleGroups={trainedMuscleGroups} />
          ) : (
            <ProfileBackMuscle trainedMuscleGroups={trainedMuscleGroups} />
          )}
        </StyledScheduleMuscleContainer>
      </StyledScheduleCompleteContainer>
    </StyledScheduleRecordContainer>
  );
}

const StyledScheduleRecordContainer = styled.div`
  margin: 30px 0;
  background-color: #e8f7ff;
  padding: 20px 40px;
  border-radius: 10px;
  @media (min-width: 800px) {
    max-height: 600px;
  }
`;

const StyledScheduleRecordTitle = styled.div`
  font-size: 25px;
  margin-bottom: 10px;

  @media (min-width: 800px) {
    font-size: 35px;
  }
`;

const StyledScheduleCompleteContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

const StyledScheduleCompleteListContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  max-height: 500px;
  padding: 15px;
  margin-bottom: 10px;
  align-self: flex-start;

  @media (min-width: 800px) {
    width: 40%;
    margin-bottom: 0px;
  }
`;

const StyledScheduleCompleteListItem = styled.div`
  background-color: white;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  word-break: keep-all;
`;

const StyledScheduleCompleteListTime = styled.div`
  color: #9e9e9e;
  font-size: 20px;
  margin-bottom: 5px;
`;

const StyledScheduleCompleteListTitle = styled.div`
  color: #525252;
  font-size: 22px;
`;

const StyledScheduleMuscleContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledPopupSpinIcon = styled.div`
  position: absolute;
  cursor: pointer;
  bottom: 10px;
  right: -30px;
  width: 40px;
  height: 40px;
  background-image: url(${SpinHover});
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotate(0.5turn);

  @media (min-width: 800px) {
    width: 60px;
    height: 60px;
    bottom: 10px;
    right: 20px;
  }
`;
