import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Banner from './Banner';
import styled from 'styled-components';
import { HiUserCircle } from 'react-icons/hi';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { BsBookmarkFill } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { RiArticleLine } from 'react-icons/ri';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import muscleGroups from '../utils/muscleGroup';
import PlanComment from './PlanComment';
import StopWatch from './Timer/StopWatch';
import ProgressBar from '@ramonak/react-progress-bar';
import SpecificPlanWorkoutItem from './SpecificPlanWorkoutItem';
import SignInPopup from './SignInPopup';
import { useSelector } from 'react-redux';
import LogoDumbbell from '../images/logoDumbbell.png';

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
`;

const StyledPlanInfoImage = styled.img`
  width: 90px;
  margin-right: 20px;

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
`;

const StyledPlanMediaContainer = styled.div`
  display: flex;
  margin-top: 25px;
  align-items: center;
`;

const StyledPlanCollectionContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const StyledPlanCollectionIcon = styled(BsFillBookmarkHeartFill)`
  color: #222d35;
  font-size: 35px;
  margin-right: 5px;
`;

const StyledPlanCollectionNum = styled.div`
  color: #222d35;
  font-size: 50px;
`;

const StyledPlanCommentContainer = styled.div`
  display: flex;
  margin-left: 35px;
  align-items: baseline;
`;

const StyledPlanCommentIcon = styled(RiMessage2Fill)`
  color: #222d35;
  font-size: 35px;
  margin-right: 5px;
`;

const StyledPlanCommentNum = styled.div`
  color: #222d35;
  font-size: 50px;
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

const StyledPlanCollectIcon = styled(BsBookmarkFill)`
  color: ${(props) => (props.isCollected ? '#1face1' : '#808080')};
  font-size: 50px;
  position: absolute;
  top: 40px;
  left: 20px;
  cursor: pointer;

  &:hover {
    color: #1face1;
  }

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

const StyledLeaveCommentBtn = styled.button`
  align-items: flex-end;
  cursor: pointer;
  color: ${(props) => (props.commentContent === '' ? '#d1d1d1' : '#1c2d9c')};
  font-size: 15px;
  height: 30px;
  width: 100px;
  border-radius: 5px;
  border: ${(props) =>
    props.commentContent === '' ? 'none' : 'solid 3px #1c2d9c'};
  background-color: ${(props) =>
    props.commentContent === '' ? '#969696' : 'transparent'};
  cursor: ${(props) =>
    props.commentContent === '' ? 'not-allowed' : 'pointer'};

  &:hover {
    color: ${(props) => (props.commentContent === '' ? '#d1d1d1' : 'white')};
    background-color: ${(props) =>
      props.commentContent === '' ? '#969696' : '#1c2d9c'};
  }
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

  &:hover {
    color: white;
    background-color: #1c2d9c;
  }
`;

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222d35;
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;

  div:nth-child(1) {
    animation: blurring 1.2s linear 0s infinite alternate;
  }
  div:nth-child(2) {
    animation: blurring 1.2s linear 0.15s infinite alternate;
  }
  div:nth-child(3) {
    animation: blurring 1.2s linear 0.3s infinite alternate;
  }

  div:nth-child(4) {
    animation: blurring 1.2s linear 0.45s infinite alternate;
  }

  div:nth-child(5) {
    animation: blurring 1.2s linear 0.6s infinite alternate;
  }

  div:nth-child(6) {
    animation: blurring 1.2s linear 0.75s infinite alternate;
  }

  div:nth-child(7) {
    animation: blurring 1.2s linear 0.9s infinite alternate;
  }

  div:nth-child(8) {
    animation: blurring 1.2s linear 1.05s infinite alternate;
  }

  div:nth-child(9) {
    animation: blurring 1.2s linear 1.2s infinite alternate;
  }

  @keyframes blurring {
    0% {
      filter: blur(0);
    }
    100% {
      filter: blur(6px);
    }
  }
`;

const StyledLogoText1 = styled.div`
  font-size: 100px;
  color: #1face1;
  margin: 0 5px;
`;

const StyledLogoText2 = styled.div`
  font-size: 100px;
  color: white;
  margin: 0 5px;
`;

const StyledLogoDumbbell = styled.div`
  background-image: url(${LogoDumbbell});
  background-repeat: no-repeat;
  background-size: cover;
  width: 40px;
  height: 80px;
  margin: 0 5px;
`;

export default function SpecificPlanPage() {
  const { planId } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);
  const [completeNum, setCompleteNum] = useState(0);
  const [trainingMode, setTrainingMode] = useState(false);
  const plans = useSelector((state) => state.plans);
  const workouts = useSelector((state) => state.workouts);
  let plan = plans.filter((plan) => plan.id === planId)[0];
  const [signInOpen, setSignInOpen] = useState(false);
  const closeSignIn = () => setSignInOpen(false);

  if (!plan) {
    plan = {
      collectedBy: [],
      publisher: [],
      workoutSet: [],
    };
  }
  const workoutSet = plan.workoutSet;
  const workoutSetDetails = plan.workoutSet.map((workoutSet) => {
    return workouts.filter((workout) => workout.id === workoutSet.workoutId)[0];
  });

  const isCollected = plan.collectedBy?.includes(currentUser?.uid);
  const planRef = firebase.firestore().collection('plans').doc(planId);

  function toggleCollected() {
    if (currentUser) {
      const uid = currentUser.uid;
      if (isCollected) {
        planRef.update({
          collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
      } else {
        planRef.update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
      }
    } else {
      setSignInOpen(true)
    }
  }

  useEffect(() => {
    planRef
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          const id = doc.id;
          return { ...doc.data(), id };
        });
        setComments(data);
      });
  }, []);

  function onSubmitComment() {
    if (currentUser) {
      if (commentContent === '') {
        return;
      } else {
        const firestore = firebase.firestore();

        const batch = firestore.batch();

        batch.update(planRef, {
          commentsCount: firebase.firestore.FieldValue.increment(1),
        });

        const commentRef = planRef.collection('comments').doc();
        batch.set(commentRef, {
          content: commentContent,
          createdAt: firebase.firestore.Timestamp.now(),
          publisher: {
            uid: firebase.auth().currentUser.uid,
            displayName: firebase.auth().currentUser.displayName || '',
            photoURL: firebase.auth().currentUser.photoURL || '',
          },
        });

        batch.commit().then(() => {
          setCommentContent('');
        });
      }
    } else {
      setSignInOpen(true)
    }
  }

  return plan.publisher.length !== 0 ? (
    <StyledBody>
      <Header />
      <Banner slogan={'Explore Your Plan'} />
      <SignInPopup open={signInOpen} closeModal={closeSignIn} />
      <StyledSpecificPlanPageContainer>
        <StyledPlanContainer>
          <StyledPlanCollectIcon
            onClick={toggleCollected}
            isCollected={isCollected}
          />
          <StyledPlanInfoContainer>
            <StyledPlanInfoImage
              src={
                plan.targetMuscleGroup
                  ? muscleGroups.filter((muscleGroup) => {
                      if (muscleGroup.name === plan.targetMuscleGroup)
                        return muscleGroup;
                    })[0].src
                  : null
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
                  {plan.publisher.displayName
                    ? plan.publisher.displayName
                    : 'User'}
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
          <StyledTrainingBtn
            onClick={() => {
              setTrainingMode(!trainingMode);
            }}
          >
            {trainingMode ? 'End Training' : 'Start Training'}
          </StyledTrainingBtn>
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
                <StyledTimeIcon /> Estimated Training Time:{' '}
                {plan.estimatedTrainingTime} mins
              </StyledPlanText>
              <StyledPlanText>
                <StyledTextIcon /> Description: {plan.description}
              </StyledPlanText>
            </>
          )}
          <StyledPlanWorkouts>Workouts</StyledPlanWorkouts>
          <StyledPlanWorkoutsContainer>
            {workoutSet.map((workout, index) => {
              return (
                <SpecificPlanWorkoutItem
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
                placeholder='your comment...'
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
      {/* <StopWatch /> */}
    </StyledBody>
  ) : (
    <StyledOverlay>
      <StyledLogoContainer>
        <StyledLogoText1>U</StyledLogoText1>
        <StyledLogoText1>N</StyledLogoText1>
        <StyledLogoText1>I</StyledLogoText1>
        <StyledLogoText1>Q</StyledLogoText1>
        <StyledLogoText1>U</StyledLogoText1>
        <StyledLogoText1>E</StyledLogoText1>
        <StyledLogoText2>F</StyledLogoText2>
        <StyledLogoDumbbell src={LogoDumbbell} />
        <StyledLogoText2>T</StyledLogoText2>
      </StyledLogoContainer>
    </StyledOverlay>
  );
}
