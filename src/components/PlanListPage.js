import React, { useState, useEffect } from 'react';
import Header from './Header';
import Banner from './Banner';
import styled from 'styled-components';
import muscleGroupImage from '../utils/muscleGroup';
import FrontMuscle from './FrontMuscle';
import BackMuscle from './BackMuscle';
import Popup from 'reactjs-popup';
import { HiUserCircle } from 'react-icons/hi';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import { BsBookmarkFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import muscleGroups from '../utils/muscleGroup';

const StyledFilterContainer = styled.div`
  display: none;
  @media (min-width: 800px) {
    width: 100%;
    height: 200px;
    background-color: #ddd;
    display: flex;
    margin: 30px auto 30px;
    align-items: center;
    justify-content: space-around;
  }
`;

const StyledFilterMuscleGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 450px;
  height: 180px;
  background: #ddd;
  margin: 20px;
  border-radius: 5px;
`;

const StyledMuscleGroupImage = styled.img`
  flex: 1 20%;
  width: 50px;
  cursor: pointer;
  padding: 5px;
`;

const StyledFilterMuscleIcons = styled.div`
  background: #ddd;
  border-radius: 5px;
  padding: 5px;
  margin: 20px;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    background: #ddd;
    width: 700px;
    height: 550px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledPlanListPageContainer = styled.div`
  padding: 50px 16% 100px;
`;

const StyledPlanListContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

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

export default function PlanListPage() {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('plans')
      .where('public', '==', true)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPlans(data);
      });
  }, []);

  return (
    <StyledBody>
      <Header />
      <Banner slogan={'Collect Your Plans'} />
      <StyledPlanListPageContainer>
        <StyledFilterContainer>
          <StyledFilterMuscleGroups>
            {muscleGroupImage.map((muscle) => {
              return (
                <StyledMuscleGroupImage key={muscle.name} src={muscle.src} />
              );
            })}
          </StyledFilterMuscleGroups>
          <StyledPopup
            trigger={
              <StyledFilterMuscleIcons>
                <FrontMuscle width={'100px'} />
                <BackMuscle width={'100px'} />
              </StyledFilterMuscleIcons>
            }
            modal
            nested
          >
            {(close) => (
              <>
                <FrontMuscle width={'300px'} />
                <BackMuscle width={'300px'} />
              </>
            )}
          </StyledPopup>
        </StyledFilterContainer>
        <StyledPlanListContainer>
          {plans.map((plan) => {
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
                        <StyledPlanInfoPublisherImage
                          src={plan.publisher.photoURL}
                        />
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
                    <StyledPlanCommentNum>
                      {plan.commentsCount || 0}
                    </StyledPlanCommentNum>
                  </StyledPlanCommentContainer>
                </StyledPlanMediaContainer>
                <StyledPlanMainContentContainer>
                  <StyledPlanText>
                    Estimated Training Time: {plan.estimatedTrainingTime} mins
                  </StyledPlanText>
                  <StyledPlanText>
                    Description: {plan.description}
                  </StyledPlanText>
                  <StyledPlanWorkouts>Workouts</StyledPlanWorkouts>
                  <StyledPlanWorkoutsContainer>
                    {plan.workoutSet.map((workout) => {
                      return <StyledPlanWorkoutItemContainer>
                        <StyledPlanWorkoutName>
                          {workout.title}
                        </StyledPlanWorkoutName>
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
                      </StyledPlanWorkoutItemContainer>;
                    })}
                  </StyledPlanWorkoutsContainer>
                </StyledPlanMainContentContainer>
                <StyledPlanMoreDetailBtn as={Link} to={`/plans/${plan.id}`}>More Details</StyledPlanMoreDetailBtn>
              </StyledPlanContainer>
            );
          })}
        </StyledPlanListContainer>
      </StyledPlanListPageContainer>
    </StyledBody>
  );
}
