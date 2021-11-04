import React from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import { BsBookmarkFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import muscleGroups from '../utils/muscleGroup';

const StyledPlanContainer = styled.div`
  width: 47%;
  background: white;
  padding: 30px 50px;
  position: relative;
  margin-bottom: 50px;
`;

const StyledPlanInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanInfoImage = styled.img`
  width: 70px;
`;

const StyledPlanInfoContentContainer = styled.div`
  margin-left: 10px;
`;

const StyledPlanInfoTitle = styled.div`
  color: #1face1;
  font-size: 30px;
`;

const StyledPlanInfoPublisherContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanInfoPublisherName = styled.div`
  color: #222d35;
  font-size: 20px;
`;

const StyledPlanInfoPublisherIcon = styled(HiUserCircle)`
  color: #222d35;
  font-size: 25px;
`;

const StyledPlanInfoPublisherImage = styled.img`
  width: 25px;
  border-radius: 50%;
  margin-right: 10px;
`;

const StyledPlanMediaContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const StyledPlanCollectionContainer = styled.div`
  display: flex;
`;

const StyledPlanCollectionIcon = styled(BsFillBookmarkHeartFill)`
  color: #222d35;
  font-size: 25px;
`;

const StyledPlanCollectionNum = styled.div`
  color: #222d35;
  font-size: 25px;
`;

const StyledPlanCommentContainer = styled.div`
  display: flex;
  margin-left: 20px;
`;

const StyledPlanCommentIcon = styled(RiMessage2Fill)`
  color: #222d35;
  font-size: 25px;
`;

const StyledPlanCommentNum = styled.div`
  color: #222d35;
  font-size: 25px;
`;

const StyledPlanText = styled.div`
  margin: 10px 0;
  color: #222d35;
  font-size: 16px;
`;

const StyledPlanWorkouts = styled.div`
  margin: 10px 0;
  color: #222d35;
  font-size: 20px;
`;

const StyledPlanWorkoutsContainer = styled.div``;

const StyledPlanMainContentContainer = styled.div`
  overflow-y: scroll;
  height: 60%;
`;

const StyledPlanWorkoutItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e3e3e3;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledPlanWorkoutName = styled.div`
  font-size: 18px;
  color: #1face1;
`;

const StyledPlanWorkoutItemDetailContainer = styled.div`
  display: flex;
`;

const StyledPlanWorkoutItemWeightIcon = styled(FaWeightHanging)`
  color: #222d35;
  font-size: 15px;
  margin-left: 10px;
`;

const StyledPlanWorkoutItemWeightNum = styled.div`
  color: #222d35;
  font-size: 15px;
  margin-left: 5px;
`;

const StyledPlanWorkoutItemDumbbellIcon = styled(FaDumbbell)`
  color: #222d35;
  font-size: 17px;
  margin-left: 10px;
`;

const StyledPlanCollectIcon = styled(BsBookmarkFill)`
  color: #1face1;
  font-size: 40px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const StyledPlanWorkoutItemDumbbellNum = styled.div`
  color: #222d35;
  font-size: 15px;
  margin-left: 5px;
`;

const StyledPlanMoreDetailBtn = styled.button`
  font-size: 20px;
  position: absolute;
  bottom: 30px;
  width: 150px;
  left: calc(50% - 75px);
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
              {plan.publisher.displayName}
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
                <StyledPlanWorkoutItemDetailContainer>
                  <StyledPlanWorkoutItemWeightIcon />
                  <StyledPlanWorkoutItemWeightNum>
                    {workout.weight}kg
                  </StyledPlanWorkoutItemWeightNum>
                  <StyledPlanWorkoutItemDumbbellIcon />
                  <StyledPlanWorkoutItemDumbbellNum>
                    {workout.reps}reps
                  </StyledPlanWorkoutItemDumbbellNum>
                </StyledPlanWorkoutItemDetailContainer>
              </StyledPlanWorkoutItemContainer>
            );
          })}
        </StyledPlanWorkoutsContainer>
      </StyledPlanMainContentContainer>
      <StyledPlanMoreDetailBtn as={Link} to={`/plans/${plan.id}`}>
        More Details
      </StyledPlanMoreDetailBtn>
    </StyledPlanContainer>
  );
}
