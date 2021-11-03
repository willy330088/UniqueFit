import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Banner from './Banner';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import { HiUserCircle } from 'react-icons/hi';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { FaWeightHanging } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa';
import { BsBookmarkFill } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { RiArticleLine } from 'react-icons/ri';
import { ImPlay } from 'react-icons/im';
import { BsThreeDots } from 'react-icons/bs';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import muscleGroups from '../utils/muscleGroup';
import WorkoutPopup from './WorkoutPopup';

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledSpecificPlanPageContainer = styled.div`
  padding: 100px 20% 100px;
`;

const StyledPlanContainer = styled.div`
  width: 100%;
  background: white;
  padding: 60px 12%;
  position: relative;
`;

const StyledPlanInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanInfoImage = styled.img`
  width: 120px;
`;

const StyledPlanInfoContentContainer = styled.div`
  margin-left: 10px;
`;

const StyledPlanInfoTitle = styled.div`
  color: #1face1;
  font-size: 50px;
`;

const StyledPlanInfoPublisherContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanInfoPublisherName = styled.div`
  color: #222d35;
  font-size: 30px;
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
  margin-top: 20px;
`;

const StyledPlanCollectionContainer = styled.div`
  display: flex;
`;

const StyledPlanCollectionIcon = styled(BsFillBookmarkHeartFill)`
  color: #222d35;
  font-size: 30px;
`;

const StyledPlanCollectionNum = styled.div`
  color: #222d35;
  font-size: 30px;
`;

const StyledPlanCommentContainer = styled.div`
  display: flex;
  margin-left: 30px;
`;

const StyledPlanCommentIcon = styled(RiMessage2Fill)`
  color: #222d35;
  font-size: 30px;
`;

const StyledPlanCommentNum = styled.div`
  color: #222d35;
  font-size: 30px;
`;

const StyledPlanText = styled.div`
  margin: 35px 0;
  color: #222d35;
  font-size: 25px;
`;

const StyledPlanWorkouts = styled.div`
  margin: 10px 0;
  color: #222d35;
  font-size: 30px;
`;

const StyledPlanWorkoutsContainer = styled.div``;

const StyledPlanWorkoutItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e3e3e3;
  height: 70px;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

const StyledPlanWorkoutItemTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanWorkoutName = styled.div`
  font-size: 30px;
  color: #1face1;
  margin-left: 15px;
`;

const StyledPlanWorkoutImage = styled.img`
  width: 40px;
`;

const StyledPlanWorkoutItemDetailContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPlanWorkoutItemWeightIcon = styled(FaWeightHanging)`
  color: #222d35;
  font-size: 20px;
  margin-left: 10px;
`;

const StyledPlanWorkoutItemWeightNum = styled.div`
  color: #222d35;
  font-size: 20px;
  margin-left: 5px;
`;

const StyledPlanWorkoutItemDumbbellIcon = styled(FaDumbbell)`
  color: #222d35;
  font-size: 22px;
  margin-left: 10px;
`;

const StyledPlanCollectIcon = styled(BsBookmarkFill)`
  color: ${(props) => (props.isCollected ? '#1face1' : '#222d35')};
  font-size: 60px;
  position: absolute;
  top: 25px;
  left: 20px;
  cursor: pointer;
`;

const StyledPlanWorkoutItemDumbbellNum = styled.div`
  color: #222d35;
  font-size: 20px;
  margin-left: 5px;
`;

const StyledPlanPlayIcon = styled(ImPlay)`
  color: #222d35;
  font-size: 40px;
  margin-right: 20px;
  cursor: pointer;
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
  height: 70px;
  font-size: 20px;
  outline: none;
  width: 100%;
`;

const StyledCommentInputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLeaveCommentBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const StyledLeaveCommentBtn = styled.button`
  align-items: flex-end;
  cursor: pointer;
`;

const StyledCommentWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 120px;
  position: relative;
`;

const StyledCommentUserImage = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const StyledNameCommentWrap = styled.div`
  margin-left: 20px;
`;

const StyledCommentUserName = styled.div`
  color: #1face1;
  font-size: 25px;
`;

const StyledCommentUserContext = styled.div`
  color: #222d35;
  font-size: 18px;
  margin-top: 10px;
  word-break: break-all;
`;

const StyledCommentTimeStamp = styled.div`
  color: #969696;
  position: absolute;
  right: 0;
`;

const StyledCommentThreeDot = styled(BsThreeDots)`
  color: #222d35;
  position: absolute;
  right: 0;
  top: 15px;
  font-size: 20px;
`;

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

export default function SpecificPlanPage() {
  const { planId } = useParams();
  const [plan, setPlan] = useState({
    publisher: {},
    collectedBy: [],
    comments: [],
  });
  const [workoutSet, setWorkoutSet] = useState([]);
  const [workoutSetDetails, setWorkoutSetDetails] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);

  function toggleCollected() {
    const uid = firebase.auth().currentUser.uid;
    if (isCollected) {
      firebase
        .firestore()
        .collection('plans')
        .doc(planId)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      firebase
        .firestore()
        .collection('plans')
        .doc(planId)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    }
    console.log(isCollected);
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('plans')
      .doc(planId)
      .onSnapshot((docSnapshot) => {
        const data = docSnapshot.data();
        setPlan(data);
        console.log(data.workoutSet);
        setWorkoutSet(data.workoutSet);
        Promise.all(
          data.workoutSet.map((workout) => {
            return firebase
              .firestore()
              .collection('workouts')
              .doc(workout.workoutId)
              .get();
          })
        ).then((values) => {
          setWorkoutSetDetails(
            values.map((value) => {
              return value.data();
            })
          );
        });
      });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection('plans')
      .doc(planId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setComments(data);
      });
  }, []);

  const isCollected = plan.collectedBy?.includes(
    firebase.auth().currentUser.uid
  );

  function onSubmitComment() {
    const firestore = firebase.firestore();

    const batch = firestore.batch();

    const planRef = firestore.collection('plans').doc(planId);

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

  return (
    <StyledBody>
      <Header />
      <Banner slogan={'Explore Your Plan'} />
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
          <StyledPlanText>
            <BiTimeFive /> Estimated Training Time: {plan.estimatedTrainingTime}{' '}
            mins
          </StyledPlanText>
          <StyledPlanText>
            <RiArticleLine /> Description: {plan.description}
          </StyledPlanText>
          <StyledPlanWorkouts>Workouts</StyledPlanWorkouts>
          <StyledPlanWorkoutsContainer>
            {workoutSet.map((workout, index) => {
              return (
                <StyledPlanWorkoutItemContainer>
                  <StyledPlanWorkoutItemTitleContainer>
                    <StyledPlanWorkoutImage
                      src={
                        workoutSetDetails[index]
                          ? muscleGroups.filter((muscleGroup) => {
                              if (
                                muscleGroup.name ===
                                workoutSetDetails[index].targetMuscleGroup
                              )
                                return muscleGroup;
                            })[0].src
                          : null
                      }
                    />
                    <StyledPlanWorkoutName>
                      {workout.title}
                    </StyledPlanWorkoutName>
                  </StyledPlanWorkoutItemTitleContainer>
                  <StyledPlanWorkoutItemDetailContainer>
                    <StyledPopup trigger={<StyledPlanPlayIcon />} modal nested>
                      <WorkoutPopup workout={workoutSetDetails[index]} />
                    </StyledPopup>
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
          <StyledCommentContainer>
            <StyledPlanComments>Comments ({plan.commentsCount || 0})</StyledPlanComments>
            <StyledCommentInputContainer>
              <StyledCommentInput
                value={commentContent}
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
              />
            </StyledCommentInputContainer>
            <StyledLeaveCommentBtnContainer>
              <StyledLeaveCommentBtn onClick={onSubmitComment}>
                Leave Comment
              </StyledLeaveCommentBtn>
            </StyledLeaveCommentBtnContainer>
            {comments.map((comment) => {
              return (
                <StyledCommentWrap>
                  {comment.publisher.photoURL ? (
                    <StyledCommentUserImage src={comment.publisher.photoURL} />
                  ) : (
                    <StyledPlanInfoPublisherIcon />
                  )}
                  <StyledNameCommentWrap>
                    <StyledCommentUserName>
                      {comment.publisher.displayName}
                    </StyledCommentUserName>
                    <StyledCommentUserContext>
                      {comment.content}
                    </StyledCommentUserContext>
                    <StyledCommentTimeStamp>
                      {comment.createdAt.toDate().toLocaleString()}
                    </StyledCommentTimeStamp>
                    <StyledCommentThreeDot />
                  </StyledNameCommentWrap>
                </StyledCommentWrap>
              );
            })}
          </StyledCommentContainer>
        </StyledPlanContainer>
      </StyledSpecificPlanPageContainer>
    </StyledBody>
  );
}
