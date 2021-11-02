import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import muscleGroups from '../utils/muscleGroup';
import { HiUserCircle } from 'react-icons/hi';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import firebase from '../utils/firebase';
import 'firebase/firestore';

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
  font-size: 70px;
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
  color: white;
  font-size: 18px;
  margin-top: 10px;
`;

const StyledCommentTimeStamp = styled.div`
  color: #969696;
  position: absolute;
  right: 0;
`;

const StyledCommentThreeDot = styled(BsThreeDots)`
  color: white;
  position: absolute;
  right: 0;
  top: 15px;
  font-size: 20px;
`;

export default function WorkoutPopup({ workout, gymWorkoutTypeSelected }) {
  const isCollected = workout.collectedBy?.includes(
    firebase.auth().currentUser.uid
  );

  function updateCollected(type) {
    const uid = firebase.auth().currentUser.uid;
    if (isCollected) {
      firebase
        .firestore()
        .collection(type)
        .doc(workout.id)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      firebase
        .firestore()
        .collection(type)
        .doc(workout.id)
        .update({
          collectedBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    }
  }

  function toggleCollected() {
    if (gymWorkoutTypeSelected) {
      updateCollected('gym-workouts')
    } else {
      updateCollected('home-workouts')
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
            <StyledCollectIcon /> 15
          </StyledTextContent>
          <StyledCommentContainer>
            <StyledTextContent>
              <StyledCommentIcon /> Comments
            </StyledTextContent>
            <StyledCommentInputContainer>
              <StyledCommentInput />
            </StyledCommentInputContainer>
            <StyledLeaveCommentBtnContainer>
              <StyledLeaveCommentBtn>Leave Comment</StyledLeaveCommentBtn>
            </StyledLeaveCommentBtnContainer>
            <StyledCommentWrap>
              <StyledCommentUserImage src={workout.publisher.photoURL} />
              <StyledNameCommentWrap>
                <StyledCommentUserName>哈拉哈拉哈哈哈</StyledCommentUserName>
                <StyledCommentUserContext>
                  This is a good workout! This is a good workout! This is a good
                  workout! This is a good workout!
                </StyledCommentUserContext>
                <StyledCommentTimeStamp>
                  2021/12/10 05:20
                </StyledCommentTimeStamp>
                <StyledCommentThreeDot />
              </StyledNameCommentWrap>
            </StyledCommentWrap>
            <StyledCommentWrap>
              <StyledCommentUserImage src={workout.publisher.photoURL} />
              <StyledNameCommentWrap>
                <StyledCommentUserName>哈拉哈拉哈哈哈</StyledCommentUserName>
                <StyledCommentUserContext>
                  This is a good workout! This is a good workout! This is a good
                  workout! This is a good workout!
                </StyledCommentUserContext>
                <StyledCommentTimeStamp>
                  2021/12/10 05:20
                </StyledCommentTimeStamp>
                <StyledCommentThreeDot />
              </StyledNameCommentWrap>
            </StyledCommentWrap>
          </StyledCommentContainer>
        </StyledContentContainer>
      </StyledDetails>
    </>
  );
}
