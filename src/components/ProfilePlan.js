import React, { useState } from 'react';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { RiMessage2Fill } from 'react-icons/ri';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import muscleGroups from '../utils/muscleGroup';
import CheckoutIcon from '../images/details.png';
import GymBackground from '../images/gym.jpeg';
import { useSelector } from 'react-redux';

const StyledPlanContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 30px 20px;
  position: relative;
  margin-bottom: 50px;
  height: 650px;
  /* box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22); */
  cursor: pointer;
  z-index: 1;

  &:before {
    content: '';
    background-image: url(${GymBackground});
    background-position-x: 7%;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: ease-in-out 0.2s;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    &::after {
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
    }
  }

  @media (min-width: 800px) {
    padding: 30px 20px;
    width: 80%;
  }

  @media (min-width: 800px) {
    padding: 30px 50px;
    width: 550px;
  }
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
  align-items: center;
`;

const StyledPlanCollectionIcon = styled(FaDumbbell)`
  color: #222d35;
  font-size: 27px;
  margin-right: 5px;
`;

const StyledPlanCollectionNum = styled.div`
  color: #222d35;
  font-size: 35px;
  padding-top: 3px;
`;

const StyledPlanCommentContainer = styled.div`
  display: flex;
  margin-left: 20px;
  align-items: center;
`;

const StyledPlanCommentIcon = styled(RiMessage2Fill)`
  color: #222d35;
  font-size: 25px;
  margin-right: 5px;
`;

const StyledPlanCommentNum = styled.div`
  color: #222d35;
  font-size: 35px;
  padding-top: 3px;
`;

const StyledPlanText = styled.div`
  margin: 10px 0;
  color: #222d35;
  font-size: 16px;
  word-break: break-all;
`;

const StyledPlanWorkouts = styled.div`
  margin: 20px 0 10px 0;
  color: #222d35;
  font-size: 22px;
`;

const StyledPlanWorkoutsContainer = styled.div``;

const StyledPlanMainContentContainer = styled.div`
  overflow-y: scroll;
  height: 360px;
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

const StyledCheckoutPlanContainer = styled.div`
  position: absolute;
  display: flex;
  background-color: transparent;
  align-items: center;
  height: 100px;
  width: 400px;
  top: calc(50% - 50px);
  right: calc(50% - 200px);
  justify-content: center;
  z-index: 100;
  display: ${(props) => (props.hover ? 'flex' : 'none')};
`;

const StyledCheckoutPlanIcon = styled.img`
  width: 50px;
  margin-right: 20px;
`;

const StyledCheckoutPlanText = styled.div`
  color: white;
  font-size: 35px;
`;

const StyledAndMoreText = styled.div`
  color: #1c2d9c;
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
`;

export default function PlanItem({ plan }) {
  const [hover, setHover] = useState(false);
  const users = useSelector((state) => state.users);
  const publisher = users.filter((user) => user.id === plan.publisher)[0];

  console.log(plan.workoutSet.length);

  return (
    <StyledPlanContainer
      onClick={() => {
        window.open(`/plans/${plan.id}`);
      }}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <StyledCheckoutPlanContainer hover={hover}>
        <StyledCheckoutPlanIcon src={CheckoutIcon} />
        <StyledCheckoutPlanText>Checkout More Details</StyledCheckoutPlanText>
      </StyledCheckoutPlanContainer>
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
            {publisher.photoURL ? (
              <StyledPlanInfoPublisherImage src={publisher.photoURL} />
            ) : (
              <StyledPlanInfoPublisherIcon />
            )}
            <StyledPlanInfoPublisherName>
              {publisher.displayName}
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
          {plan.workoutSet.map((workout, index) => {
            if (index < 5) {
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
            }
          })}
        </StyledPlanWorkoutsContainer>
      </StyledPlanMainContentContainer>
      {plan.workoutSet.length > 5 ? (
        <StyledAndMoreText>And More</StyledAndMoreText>
      ) : null}
    </StyledPlanContainer>
  );
}
