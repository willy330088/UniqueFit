import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import { HiUserCircle } from 'react-icons/hi';
import { FaDumbbell } from 'react-icons/fa';
import { RiMessage2Fill, RiArticleLine } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';

import Header from '../common/Header';
import Banner from '../common/Banner';
import PlanComment from './PlanComment';
import SpecificPlanWorkoutItem from './SpecificPlanWorkoutItem';
import SignInPopup from '../common/SignInPopup';
import FullPageLoading from '../common/FullPageLoading';
import { StyledLeaveCommentBtn } from '../common/GeneralStyle';
import {
  getPlanComment,
  addPlanComment,
  removePlanCollection,
  addPlanCollection,
} from '../../utils/firebase';
import muscleGroups from '../../utils/muscleGroup';

export default function SpecificPlanPage() {
  const { planId } = useParams();
  const currentUser = useSelector((state) => state.currentUser);
  const plans = useSelector((state) => state.plans);
  const workouts = useSelector((state) => state.workouts);
  const users = useSelector((state) => state.users);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [completeNum, setCompleteNum] = useState(0);
  const [trainingMode, setTrainingMode] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const plan = plans.filter((plan) => plan.id === planId)[0];
  const publisher = users.filter((user) => user.id === plan.publisher)[0];
  const workoutSet = plan?.workoutSet;
  const workoutSetDetails = plan?.workoutSet.map((workoutSet) => {
    return workouts.filter((workout) => workout.id === workoutSet.workoutId)[0];
  });
  const isCollected = plan?.collectedBy.includes(currentUser?.uid);

  useEffect(() => {
    getPlanComment(planId, setComments);
  }, []);

  if (plans.length !== 0 && !plan) {
    return <Redirect to="/pageNotFound" />;
  }

  function closeSignIn() {
    setSignInOpen(false);
  }

  function toggleCollected() {
    if (currentUser) {
      const uid = currentUser.uid;
      if (isCollected) {
        removePlanCollection(planId, uid);
      } else {
        addPlanCollection(planId, uid);
      }
    } else {
      setSignInOpen(true);
    }
  }

  async function onSubmitComment() {
    if (currentUser) {
      if (commentContent === '') {
        return;
      } else {
        addPlanComment(planId, commentContent);
        setCommentContent('');
      }
    } else {
      setSignInOpen(true);
    }
  }

  return plans.length !== 0 ? (
    <StyledBody>
      <Header />
      <Banner slogan={'Explore Your Plan'} />
      <SignInPopup open={signInOpen} closeModal={closeSignIn} />
      <StyledSpecificPlanPageContainer>
        <StyledPlanContainer>
          <StyledPlanInfoContainer>
            <StyledPlanInfoImage
              src={
                plan.targetMuscleGroup
                  ? muscleGroups.filter(
                      (muscleGroup) =>
                        muscleGroup.name === plan.targetMuscleGroup
                    )[0].src
                  : null
              }
            />
            <StyledPlanInfoContentContainer>
              <StyledPlanInfoTitle>{plan.title}</StyledPlanInfoTitle>
              <StyledPlanInfoPublisherContainer>
                {publisher?.photoURL ? (
                  <StyledPlanInfoPublisherImage src={publisher?.photoURL} />
                ) : (
                  <StyledPlanInfoPublisherIcon />
                )}
                <StyledPlanInfoPublisherName>
                  {publisher?.displayName}
                </StyledPlanInfoPublisherName>
              </StyledPlanInfoPublisherContainer>
            </StyledPlanInfoContentContainer>
          </StyledPlanInfoContainer>
          <StyledMediaTrainingCollectContainer>
            <StyledMediaTrainingContainer>
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
              <StyledTrainingBtn
                onClick={() => {
                  setTrainingMode(!trainingMode);
                }}
              >
                {trainingMode ? 'End Training' : 'Start Training'}
              </StyledTrainingBtn>
            </StyledMediaTrainingContainer>
            <StyledCollectIconContainer onClick={toggleCollected}>
              <StyledPlanCollectIcon iscollected={isCollected} />
              <StyledCollectIconText iscollected={isCollected}>
                Collect
              </StyledCollectIconText>
            </StyledCollectIconContainer>
          </StyledMediaTrainingCollectContainer>
          {trainingMode ? (
            <>
              <StyledProgressText>Progress</StyledProgressText>
              <ProgressBar
                completed={Math.round((completeNum / workoutSet.length) * 100)}
                bgColor={'#1face1'}
                height={'30px'}
                margin={'10px 0 40px'}
              />
            </>
          ) : (
            <>
              <StyledPlanText>
                <StyledTimeIcon />{' '}
                <StyledPlanTextContent>
                  Estimated Training Time{' '}
                  <StyledPlanTextContentContext>
                    {plan.estimatedTrainingTime} mins
                  </StyledPlanTextContentContext>
                </StyledPlanTextContent>
              </StyledPlanText>
              <StyledPlanText>
                <StyledTextIcon />{' '}
                <StyledPlanTextContent>
                  Description{' '}
                  <StyledPlanTextContentContext>
                    {plan.description}
                  </StyledPlanTextContentContext>
                </StyledPlanTextContent>
              </StyledPlanText>
            </>
          )}
          <StyledPlanWorkouts>Workouts</StyledPlanWorkouts>
          <StyledPlanWorkoutsContainer>
            {workoutSet.map((workout, index) => {
              return (
                <SpecificPlanWorkoutItem
                  key={index}
                  workout={workout}
                  index={index}
                  workoutSetDetails={workoutSetDetails}
                  muscleGroups={muscleGroups}
                  completeNum={completeNum}
                  setCompleteNum={setCompleteNum}
                  trainingMode={trainingMode}
                  setSignInOpen={setSignInOpen}
                />
              );
            })}
          </StyledPlanWorkoutsContainer>
          <StyledCommentContainer>
            <StyledPlanComments>
              Comments ({plan.commentsCount || 0})
            </StyledPlanComments>
            <StyledCommentInputContainer>
              <StyledCommentInput
                value={commentContent}
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
                placeholder="your comment..."
              />
            </StyledCommentInputContainer>
            <StyledLeaveCommentBtnContainer>
              <StyledLeaveCommentBtn
                onClick={onSubmitComment}
                commentContent={commentContent}
              >
                Comment
              </StyledLeaveCommentBtn>
            </StyledLeaveCommentBtnContainer>
            {comments.map((comment) => {
              return (
                <PlanComment
                  comment={comment}
                  planId={planId}
                  key={comment.id}
                  currentUser={currentUser}
                />
              );
            })}
          </StyledCommentContainer>
        </StyledPlanContainer>
      </StyledSpecificPlanPageContainer>
    </StyledBody>
  ) : (
    <FullPageLoading />
  );
}

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledSpecificPlanPageContainer = styled.div`
  padding: 50px 0;

  @media (min-width: 550px) {
    padding: 100px 5% 100px;
  }

  @media (min-width: 1250px) {
    padding: 100px 20% 100px;
  }
`;

const StyledPlanContainer = styled.div`
  width: 100%;
  background: white;
  padding: 60px 5%;
  position: relative;

  @media (min-width: 400px) {
    padding: 60px 12%;
  }
`;

const StyledPlanInfoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledPlanInfoImage = styled.img`
  width: 90px;
  margin-right: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 50%;

  @media (min-width: 550px) {
    width: 130px;
  }
`;

const StyledPlanInfoContentContainer = styled.div`
  margin-left: 10px;
`;

const StyledPlanInfoTitle = styled.div`
  color: #1face1;
  font-size: 40px;
  word-break: keep-all;

  @media (min-width: 550px) {
    font-size: 50px;
  }
`;

const StyledPlanInfoPublisherContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const StyledPlanInfoPublisherName = styled.div`
  color: #222d35;
  font-size: 25px;
`;

const StyledPlanInfoPublisherIcon = styled(HiUserCircle)`
  color: #222d35;
  font-size: 35px;
`;

const StyledPlanInfoPublisherImage = styled.img`
  width: 35px;
  border-radius: 50%;
  margin-right: 10px;
  height: 35px;
`;

const StyledPlanMediaContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanCollectionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanCollectionIcon = styled(FaDumbbell)`
  color: #222d35;
  font-size: 37px;
  margin-right: 5px;
`;

const StyledPlanCollectionNum = styled.div`
  color: #222d35;
  font-size: 50px;
  padding-top: 4px;
`;

const StyledPlanCommentContainer = styled.div`
  display: flex;
  margin-left: 35px;
  align-items: center;
`;

const StyledPlanCommentIcon = styled(RiMessage2Fill)`
  color: #222d35;
  font-size: 35px;
  margin-right: 5px;
`;

const StyledPlanCommentNum = styled.div`
  color: #222d35;
  font-size: 50px;
  padding-top: 4px;
`;

const StyledPlanText = styled.div`
  margin: 30px 0;
  color: #222d35;
  font-size: 25px;
  display: flex;
  align-items: flex-start;
`;

const StyledTimeIcon = styled(BiTimeFive)`
  font-size: 25px;
  margin-right: 5px;
`;

const StyledTextIcon = styled(RiArticleLine)`
  font-size: 25px;
  margin-right: 5px;
`;

const StyledPlanWorkouts = styled.div`
  margin: 10px 0;
  color: #222d35;
  font-size: 30px;
`;

const StyledPlanWorkoutsContainer = styled.div``;

const StyledCollectIconContainer = styled.div`
  letter-spacing: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  cursor: pointer;
`;

const StyledCollectIconText = styled.div`
  font-size: 15px;
  color: ${(props) => (props.iscollected ? '#1face1' : '#808080')};
  cursor: pointer;
`;

const StyledPlanCollectIcon = styled(FaDumbbell)`
  color: ${(props) => (props.iscollected ? '#1face1' : '#808080')};
  font-size: 50px;
  cursor: pointer;

  @media (min-width: 550px) {
    font-size: 70px;
  }
`;

const StyledPlanComments = styled.div`
  color: #222d35;
  font-size: 30px;
  margin-bottom: 10px;
`;

const StyledCommentContainer = styled.div`
  width: 100%;
  padding-top: 30px;
`;

const StyledCommentInput = styled.textarea`
  height: 90px;
  font-size: 20px;
  outline: none;
  width: 100%;
  padding: 15px;
`;

const StyledCommentInputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLeaveCommentBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const StyledProgressText = styled.div`
  color: #222d35;
  font-size: 25px;
  margin-top: 38px;
`;

const StyledTrainingBtn = styled.button`
  color: #1c2d9c;
  font-size: 20px;
  height: 40px;
  width: 150px;
  border-radius: 20px;
  border: solid 3px #1c2d9c;
  background-color: transparent;
  cursor: pointer;
  margin-top: 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;

  &:hover {
    color: white;
    background-color: #1c2d9c;
  }
`;

const StyledPlanTextContent = styled.div`
  word-break: break-all;
  width: calc(100% - 30px);
`;

const StyledPlanTextContentContext = styled.div`
  margin-top: 10px;
  color: #666666;
  font-weight: 600;
`;

const StyledMediaTrainingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMediaTrainingCollectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
`;
