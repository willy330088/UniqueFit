import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import muscleGroups from '../utils/muscleGroup';
import { HiUserCircle } from 'react-icons/hi';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import WorkoutComment from './WorkoutComment';

const StyledVideo = styled.video`
  position: fixed;
  width: 700px;
  height: 400px;
  object-fit: cover;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0 35px 0px;
  padding-top: 20px;
`;

const StyledMuscleIcon = styled.img`
  width: 100px;
  margin-right: 30px;
`;

const StyledTitle = styled.div`
  color: #1face1;
  font-size: 60px;
`;

const StyledDetails = styled.div`
  background: #222d35;
  height: 550px;
  position: relative;
  top: 405px;
  padding: 0 5% 5%;
`;

const StyledPulisherContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 30px;
  margin: 0 0 20px 0px;
`;

const StyledTextContent = styled.div`
  color: white;
  font-size: 30px;
  margin: 0 0 20px 0px;
`;

const StyledPublisherIcon = styled(HiUserCircle)`
  font-size: 50px;
  margin-right: 10px;
`;

const StyledPublisherImage = styled.img`
  border-radius: 50%;
  width: 50px;
  margin-right: 10px;
`;

const StyledCollectIcon = styled(BsFillBookmarkHeartFill)``;

const StyledAddToCollectIcon = styled(BsBookmarkFill)`
  font-size: 50px;
  color: ${(props) => (props.isCollected ? '#1face1' : 'white')};
  position: absolute;
  right: 30px;
  bottom: 50px;
  z-index: 20;
  cursor: pointer;
`;

const StyledCommentContainer = styled.div`
  width: 100%;
  /* border-top: 2px white solid; */
  margin-top: 40px;
  padding-top: 30px;
`;

const StyledCommentIcon = styled(RiMessage2Fill)``;

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

const StyledContentContainer = styled.div`
  overflow-y: scroll;
  height: 330px;
  padding: 0 50px;
`;

const StyledLeaveCommentBtn = styled.button`
  align-items: flex-end;
`;

export default function WorkoutPopup({ workout }) {
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);

  const isCollected = workout.collectedBy?.includes(
    firebase.auth().currentUser.uid
  );

  useEffect(() => {
    firebase
      .firestore()
      .collection('workouts')
      .doc(workout.id)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          const id = doc.id
          return { ...doc.data(), id };
        });
        setComments(data);
      });
  }, []);

  function onSubmitComment() {
    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const planRef = firestore.collection('workouts').doc(workout.id);

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

  function toggleCollected() {
    const uid = firebase.auth().currentUser.uid;
    if (isCollected) {
      firebase
        .firestore()
        .collection('workouts')
        .doc(workout.id)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      firebase
        .firestore()
        .collection('workouts')
        .doc(workout.id)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    }
  }

  return (
    <>
      <input type="text" autofocus="autofocus" style={{ display: 'none' }} />
      <StyledAddToCollectIcon
        onClick={toggleCollected}
        isCollected={isCollected}
      />
      <StyledVideo
        src={workout.videoURL}
        autoPlay
        loop
        playsinline
        muted
      ></StyledVideo>
      <StyledDetails>
        <StyledTitleContainer>
          <StyledMuscleIcon
            src={
              muscleGroups.filter((muscleGroup) => {
                if (muscleGroup.name === workout.targetMuscleGroup)
                  return muscleGroup;
              })[0].src
            }
          />
          <StyledTitle>{workout.title}</StyledTitle>
        </StyledTitleContainer>
        <StyledContentContainer>
          <StyledPulisherContainer>
            {workout.publisher.photoURL ? (
              <StyledPublisherImage src={workout.publisher.photoURL} />
            ) : (
              <StyledPublisherIcon />
            )}
            {workout.publisher.displayName
              ? workout.publisher.displayName
              : 'User'}
          </StyledPulisherContainer>
          <StyledTextContent>
            Target Muscle Group : {workout.targetMuscleGroup}
          </StyledTextContent>
          <StyledTextContent>
            Description : {workout.description}
          </StyledTextContent>
          <StyledTextContent>
            <StyledCollectIcon /> {workout.collectedBy.length}
          </StyledTextContent>
          <StyledCommentContainer>
            <StyledTextContent>
              <StyledCommentIcon /> Comments
            </StyledTextContent>
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
                <WorkoutComment comment={comment} workoutId={workout.id}/>
              );
            })}
          </StyledCommentContainer>
        </StyledContentContainer>
      </StyledDetails>
    </>
  );
}
