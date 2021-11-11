import React from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import muscleGroups from '../utils/muscleGroup';

const StyledPlanContainer = styled.div`
  width: 100%;
  background: white;
  padding: 30px 20px;
  position: relative;
  margin-bottom: 50px;
  height: 650px;


  @media (min-width: 800px) {
    padding: 30px 50px;
  };

  @media (min-width: 800px) {
    padding: 30px 120px;
  };

  @media (min-width: 1200px) {
    padding: 30px 50px;
    width: 48%;
  };
`;

const StyledPlanInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanInfoImage = styled.img`
  width: 80px;
`;

const StyledPlanInfoContentContainer = styled.div`
  margin-left: 10px;
`;

const StyledPlanInfoTitle = styled.div`
  color: #1face1;
  font-size: 30px;
  margin-bottom: 10px;
`;

const StyledPlanInfoPublisherContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanInfoPublisherName = styled.div`
  color: #222d35;
  font-size: 18px;
`;

const StyledPlanInfoPublisherIcon = styled(HiUserCircle)`
  color: #222d35;
  font-size: 25px;
  margin-right: 5px;
`;

const StyledPlanInfoPublisherImage = styled.img`
  width: 25px;
  border-radius: 50%;
  margin-right: 5px;
`;

const StyledPlanMediaContainer = styled.div`
  display: flex;
  margin: 20px 0 5px 0;
  align-items: center;
`;

const StyledPlanCollectionContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const StyledPlanCollectionIcon = styled(BsFillBookmarkHeartFill)`
  color: #222d35;
  font-size: 25px;
  margin-right: 5px;
`;

const StyledPlanCollectionNum = styled.div`
  color: #222d35;
  font-size: 35px;
`;

const StyledPlanCommentContainer = styled.div`
  display: flex;
  margin-left: 20px;
  align-items: baseline;
`;

const StyledPlanCommentIcon = styled(RiMessage2Fill)`
  color: #222d35;
  font-size: 25px;
  margin-right: 5px;
`;

const StyledPlanCommentNum = styled.div`
  color: #222d35;
  font-size: 35px;
`;

const StyledPlanText = styled.div`
  margin: 10px 0;
  color: #222d35;
  font-size: 16px;
`;

const StyledPlanWorkouts = styled.div`
  margin: 20px 0 10px 0;
  color: #222d35;
  font-size: 22px;
`;

const StyledPlanWorkoutsContainer = styled.div``;

const StyledPlanMainContentContainer = styled.div`
  overflow-y: scroll;
  height: 350px;
`;

const StyledPlanWorkoutItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e3e3e3;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const StyledPlanWorkoutName = styled.div`
  font-size: 18px;
  color: #1face1;
  margin-right: auto;
  width: 200px;
`;

const StyledPlanWorkoutItemWeightContainer = styled.div`
  width: 70px;
  display: flex;
`;

const StyledPlanWorkoutItemDumbbellContainer = styled.div`
  width: 70px;
  display: flex;
`;

const StyledPlanWorkoutItemWeightIcon = styled(FaWeightHanging)`
  color: #222d35;
  font-size: 15px;
`;

const StyledPlanWorkoutItemWeightNum = styled.div`
  color: #222d35;
  font-size: 15px;
  margin-left: 5px;
`;

const StyledPlanWorkoutItemDumbbellIcon = styled(FaDumbbell)`
  color: #222d35;
  font-size: 17px;
`;

const StyledPlanWorkoutItemDumbbellNum = styled.div`
  color: #222d35;
  font-size: 15px;
  margin-left: 5px;
`;

const StyledPlanMoreDetailBtn = styled.div`
  font-size: 25px;
  position: absolute;
  bottom: 40px;
  width: 150px;
  left: calc(50% - 75px);
  text-align: center;
  color: #1c2d9c;
  cursor: pointer;

  &:hover{
    text-decoration: underline;
  }
`;

export default function PlanItem({plan}) {
  return (
    <StyledPlanContainer>
      <StyledPlanInfoContainer>
        <StyledPlanInfoImage
          src={
            muscleGroups.filter((muscleGroup) => {
              if (muscleGroup.name === plan.targetMuscleGroup)
                return muscleGroup;
            })[0].src
          }
        />
        <StyledPlanInfoContentContainer>
          <StyledPlanInfoTitle>{plan.title}</StyledPlanInfoTitle>
          <StyledPlanInfoPublisherContainer>
            {plan.publisher.photoURL ? (
              <StyledPlanInfoPublisherImage src={plan.publisher.photoURL} />
            ) : (
              <StyledPlanInfoPublisherIcon />
            )}
            <StyledPlanInfoPublisherName>
              {plan.publisher.displayName ? plan.publisher.displayName : 'User'}
            </StyledPlanInfoPublisherName>
          </StyledPlanInfoPublisherContainer>
        </StyledPlanInfoContentContainer>
      </StyledPlanInfoContainer>
      <StyledPlanMediaContainer>
        <StyledPlanCollectionContainer>
          <StyledPlanCollectionIcon />
          <StyledPlanCollectionNum>
            {plan.collectedBy.length}
          </StyledPlanCollectionNum>
        </StyledPlanCollectionContainer>
        <StyledPlanCommentContainer>
          <StyledPlanCommentIcon />
          <StyledPlanCommentNum>{plan.commentsCount || 0}</StyledPlanCommentNum>
        </StyledPlanCommentContainer>
      </StyledPlanMediaContainer>
      <StyledPlanMainContentContainer>
        <StyledPlanText>
          Estimated Training Time: {plan.estimatedTrainingTime} mins
        </StyledPlanText>
        <StyledPlanText>Description: {plan.description}</StyledPlanText>
        <StyledPlanWorkouts>Workouts</StyledPlanWorkouts>
        <StyledPlanWorkoutsContainer>
          {plan.workoutSet.map((workout) => {
            return (
              <StyledPlanWorkoutItemContainer>
                <StyledPlanWorkoutName>{workout.title}</StyledPlanWorkoutName>
                <StyledPlanWorkoutItemWeightContainer>
                  <StyledPlanWorkoutItemWeightIcon />
                  <StyledPlanWorkoutItemWeightNum>
                    {workout.weight}kg
                  </StyledPlanWorkoutItemWeightNum>
                </StyledPlanWorkoutItemWeightContainer>
                <StyledPlanWorkoutItemDumbbellContainer>
                  <StyledPlanWorkoutItemDumbbellIcon />
                  <StyledPlanWorkoutItemDumbbellNum>
                    {workout.reps}reps
                  </StyledPlanWorkoutItemDumbbellNum>
                </StyledPlanWorkoutItemDumbbellContainer>
              </StyledPlanWorkoutItemContainer>
            );
          })}
        </StyledPlanWorkoutsContainer>
      </StyledPlanMainContentContainer>
      <StyledPlanMoreDetailBtn onClick={() => {
          window.open(`/plans/${plan.id}`)
        }}>More Details</StyledPlanMoreDetailBtn>
    </StyledPlanContainer>
  );
}
