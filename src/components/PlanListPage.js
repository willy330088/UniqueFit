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
`;

const StyledPlanContainer = styled.div`
  width: 47%;
  background: white;
  padding: 30px 50px;
  position: relative;
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
`;

const StyledPlanInfoPublisherName = styled.div`
  color: #222d35;
  font-size: 25px;
`;

const StyledPlanInfoPublisherIcon = styled(HiUserCircle)`
  color: #222d35;
  font-size: 25px;
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

const StyledPlanWorkoutsContainer = styled.div`
`;

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
          <StyledPlanContainer>
            <StyledPlanCollectIcon/>
            <StyledPlanInfoContainer>
              <StyledPlanInfoImage src={muscleGroupImage[7].src} />
              <StyledPlanInfoContentContainer>
                <StyledPlanInfoTitle>Full Shoulder Workout in 60 mins</StyledPlanInfoTitle>
                <StyledPlanInfoPublisherContainer>
                  <StyledPlanInfoPublisherIcon/>
                  <StyledPlanInfoPublisherName>Anna</StyledPlanInfoPublisherName>
                </StyledPlanInfoPublisherContainer>
              </StyledPlanInfoContentContainer>
            </StyledPlanInfoContainer>
            <StyledPlanMediaContainer>
              <StyledPlanCollectionContainer>
                <StyledPlanCollectionIcon/>
                <StyledPlanCollectionNum>15</StyledPlanCollectionNum>
              </StyledPlanCollectionContainer>
              <StyledPlanCommentContainer>
                <StyledPlanCommentIcon/>
                <StyledPlanCommentNum>15</StyledPlanCommentNum>
              </StyledPlanCommentContainer>
            </StyledPlanMediaContainer>
            <StyledPlanMainContentContainer>
              <StyledPlanText>
                Estimated Training Time: 60 mins
              </StyledPlanText>
              <StyledPlanText>
                Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium ante erat, vitae sodales mi varius quis. Etiam vestibulum lorem vel urna tempor, eu fermentum odio aliquam. Aliquam consequat urna vitae ipsum pulvinar, in blandit purus eleifend.
              </StyledPlanText>
              <StyledPlanWorkouts>Workouts</StyledPlanWorkouts>
              <StyledPlanWorkoutsContainer>
                <StyledPlanWorkoutItemContainer>
                  <StyledPlanWorkoutName>Shoulder Press</StyledPlanWorkoutName>
                  <StyledPlanWorkoutItemDetailContainer>
                    <StyledPlanWorkoutItemWeightIcon />
                    <StyledPlanWorkoutItemWeightNum>15kg</StyledPlanWorkoutItemWeightNum>
                    <StyledPlanWorkoutItemDumbbellIcon />
                    <StyledPlanWorkoutItemDumbbellNum>20reps</StyledPlanWorkoutItemDumbbellNum>
                  </StyledPlanWorkoutItemDetailContainer>
                </StyledPlanWorkoutItemContainer>
                <StyledPlanWorkoutItemContainer>
                  <StyledPlanWorkoutName>Shoulder Press</StyledPlanWorkoutName>
                  <StyledPlanWorkoutItemDetailContainer>
                    <StyledPlanWorkoutItemWeightIcon />
                    <StyledPlanWorkoutItemWeightNum>15kg</StyledPlanWorkoutItemWeightNum>
                    <StyledPlanWorkoutItemDumbbellIcon />
                    <StyledPlanWorkoutItemDumbbellNum>20reps</StyledPlanWorkoutItemDumbbellNum>
                  </StyledPlanWorkoutItemDetailContainer>
                </StyledPlanWorkoutItemContainer>
                <StyledPlanWorkoutItemContainer>
                  <StyledPlanWorkoutName>Shoulder Press</StyledPlanWorkoutName>
                  <StyledPlanWorkoutItemDetailContainer>
                    <StyledPlanWorkoutItemWeightIcon />
                    <StyledPlanWorkoutItemWeightNum>15kg</StyledPlanWorkoutItemWeightNum>
                    <StyledPlanWorkoutItemDumbbellIcon />
                    <StyledPlanWorkoutItemDumbbellNum>20reps</StyledPlanWorkoutItemDumbbellNum>
                  </StyledPlanWorkoutItemDetailContainer>
                </StyledPlanWorkoutItemContainer>
                <StyledPlanWorkoutItemContainer>
                  <StyledPlanWorkoutName>Shoulder Press</StyledPlanWorkoutName>
                  <StyledPlanWorkoutItemDetailContainer>
                    <StyledPlanWorkoutItemWeightIcon />
                    <StyledPlanWorkoutItemWeightNum>15kg</StyledPlanWorkoutItemWeightNum>
                    <StyledPlanWorkoutItemDumbbellIcon />
                    <StyledPlanWorkoutItemDumbbellNum>20reps</StyledPlanWorkoutItemDumbbellNum>
                  </StyledPlanWorkoutItemDetailContainer>
                </StyledPlanWorkoutItemContainer>
              </StyledPlanWorkoutsContainer>
            </StyledPlanMainContentContainer>
            <StyledPlanMoreDetailBtn>More Details</StyledPlanMoreDetailBtn>
          </StyledPlanContainer>
        </StyledPlanListContainer>
      </StyledPlanListPageContainer>
    </StyledBody>
  );
}
