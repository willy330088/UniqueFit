import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import muscleGroups from '../utils/muscleGroup';
import { HiUserCircle } from 'react-icons/hi';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import WorkoutComment from './WorkoutComment';
import { Waypoint } from 'react-waypoint';
import Logo from '../images/logo.png';

const StyledVideo = styled.video`
  position: fixed;
  width: 350px;
  height: 200px;
  object-fit: cover;

  @media (min-width: 500px) {
    width: 500px;
    height: 300px;
  }

  @media (min-width: 700px) {
    width: 700px;
    height: 400px;
  } ;
`;
//

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0 25px 0px;
  padding-top: 20px;

  @media (min-width: 500px) {
    margin: 0px 0 20px 0px;
    padding-top: 20px;
  }

  @media (min-width: 700px) {
    margin: 0px 0 35px 0px;
    padding-top: 20px;
  } ;
`;

const StyledMuscleIcon = styled.img`
  width: 55px;
  margin-right: 30px;

  @media (min-width: 500px) {
    width: 60px;
    margin-right: 20px;
  }

  @media (min-width: 700px) {
    width: 100px;
    margin-right: 30px;
  } ;
`;
//

const StyledTitle = styled.div`
  color: #1face1;
  font-size: 30px;

  @media (min-width: 500px) {
    font-size: 40px;
  }

  @media (min-width: 700px) {
    font-size: 60px;
  } ;
`;
//

const StyledDetails = styled.div`
  background: #222d35;
  height: 300px;
  position: relative;
  top: 200px;
  padding: 0 5% 5%;

  @media (min-width: 500px) {
    height: 400px;
    top: 300px;
  }

  @media (min-width: 700px) {
    height: 550px;
    top: 400px;
  } ;
`;

const StyledPulisherContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  margin: 0 0 20px 0px;

  @media (min-width: 500px) {
    font-size: 20px;
  }

  @media (min-width: 700px) {
    font-size: 30px;
  } ;
`;

const StyledTextContent = styled.div`
  color: white;
  font-size: 18px;
  margin: 0 0 20px 0px;

  @media (min-width: 500px) {
    font-size: 20px;
  }

  @media (min-width: 700px) {
    font-size: 30px;
  } ;
`;

const StyledPublisherIcon = styled(HiUserCircle)`
  font-size: 25px;
  margin-right: 10px;
  @media (min-width: 500px) {
    width: 30px;
  }

  @media (min-width: 700px) {
    width: 50px;
  } ;
`;

const StyledPublisherImage = styled.img`
  border-radius: 50%;
  width: 25px;
  margin-right: 10px;
  @media (min-width: 500px) {
    width: 30px;
  }

  @media (min-width: 700px) {
    width: 50px;
  } ;
`;

const StyledCollectionContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;

  @media (min-width: 500px) {
    margin-bottom: 10px;
  }

  @media (min-width: 700px) {
    margin-bottom: 20px;
  } ;
`;

const StyledCollectIcon = styled(BsFillBookmarkHeartFill)`
  color: white;
  font-size: 20px;

  @media (min-width: 500px) {
    font-size: 25px;
  }

  @media (min-width: 700px) {
    font-size: 30px;
  } ;
`;

const StyledCollectionNum = styled.div`
  color: white;
  font-size: 30px;
  margin-left: 10px;

  @media (min-width: 500px) {
    font-size: 35px;
  }

  @media (min-width: 700px) {
    font-size: 45px;
  } ;
`;

const StyledAddToCollectIcon = styled(BsBookmarkFill)`
  font-size: 30px;
  color: ${(props) => (props.isCollected ? '#1face1' : 'white')};
  position: absolute;
  right: 15px;
  bottom: 40px;
  z-index: 20;
  cursor: pointer;

  @media (min-width: 500px) {
    font-size: 40px;
    right: 30px;
    bottom: 30px;
  }

  @media (min-width: 700px) {
    font-size: 50px;
    right: 30px;
    bottom: 50px;
  } ;
`;

const StyledCommentContainer = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const StyledCommentTitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
  @media (min-width: 500px) {
    margin-bottom: 10px;
  }

  @media (min-width: 700px) {
    margin-bottom: 20px;
  } ;
`;

const StyledCommentIcon = styled(RiMessage2Fill)`
  color: white;
  font-size: 18px;
  @media (min-width: 500px) {
    font-size: 20px;
  }

  @media (min-width: 700px) {
    font-size: 23px;
  } ;
`;

const StyledCommentTitleText = styled.div`
  color: white;
  font-size: 23px;
  margin-left: 10px;
  @media (min-width: 500px) {
    font-size: 25px;
  }

  @media (min-width: 700px) {
    font-size: 30px;
  } ;
`;

const StyledCommentInput = styled.textarea`
  height: 40px;
  font-size: 20px;
  outline: none;
  width: 100%;
  padding: 10px;

  @media (min-width: 500px) {
    height: 50px;
  }

  @media (min-width: 700px) {
    height: 70px;
  } ;
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
  height: 180px;
  padding: 0 50px;

  @media (min-width: 500px) {
    height: 250px;
  }

  @media (min-width: 700px) {
    height: 330px;
  } ;
`;

const StyledLeaveCommentBtn = styled.div`
  cursor: pointer;
  color: ${(props) => (props.commentContent === '' ? '#d1d1d1' : 'white')};
  font-size: 15px;
  height: 30px;
  width: 100px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;
  background-color: ${(props) =>
    props.commentContent === '' ? '#969696' : '#1c2d9c'};
  cursor: ${(props) =>
    props.commentContent === '' ? 'not-allowed' : 'pointer'};

  &:hover {
    color: ${(props) => (props.commentContent === '' ? '#d1d1d1' : 'white')};
    background-color: ${(props) =>
      props.commentContent === '' ? '#969696' : '#5160c4'};
  }
`;

const StyledScrollDown = styled.span`
  position: absolute;
  top: 90px;
  left: 50%;
  width: 24px;
  height: 24px;
  margin-left: -12px;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  transform: rotate(-45deg);
  animation: down 3s infinite;
  box-sizing: border-box;
  display: ${(props) => (props.scrollDown ? 'block' : 'none')};

  @keyframes down {
    0% {
      transform: rotate(-45deg) translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotate(-45deg) translate(-20px, 20px);
      opacity: 0;
    }
  }

  @media (min-width: 500px) {
    top: 50px;
    width: 16px;
    height: 16px;
    margin-left: -8px;
  }

  @media (min-width: 700px) {
    top: 90px;
    width: 24px;
    height: 24px;
    margin-left: -12px;
  } ;
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

const StyledLogo = styled.img`
  width: 50%;
`;

export default function WorkoutPopup({ workout }) {
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [scrollDown, setScrollDown] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

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
          const id = doc.id;
          return { ...doc.data(), id };
        });
        setComments(data);
      });
  }, []);

  function onSubmitComment() {
    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const planRef = firestore.collection('workouts').doc(workout.id);

    if (commentContent === '') {
      return;
    } else {
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
        onCanPlay={() => {
          setVideoReady(true);
        }}
      ></StyledVideo>
      {videoReady ? (
        <StyledDetails>
          <StyledScrollDown scrollDown={scrollDown}></StyledScrollDown>
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
          <Waypoint
            onEnter={() => {
              setScrollDown(false);
            }}
          />
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
            <StyledCollectionContainer>
              <StyledCollectIcon />{' '}
              <StyledCollectionNum>
                {workout.collectedBy.length}
              </StyledCollectionNum>
            </StyledCollectionContainer>
            <StyledTextContent>
              Target Muscle Group : {workout.targetMuscleGroup}
            </StyledTextContent>
            <StyledTextContent>
              Description : {workout.description}
            </StyledTextContent>
            <StyledCommentContainer>
              <StyledCommentTitleContainer>
                <StyledCommentIcon />{' '}
                <StyledCommentTitleText>
                  Comments ({workout.commentsCount || 0})
                </StyledCommentTitleText>
              </StyledCommentTitleContainer>
              <StyledCommentInputContainer>
                <StyledCommentInput
                  value={commentContent}
                  onChange={(e) => {
                    setCommentContent(e.target.value);
                  }}
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
                  <WorkoutComment
                    comment={comment}
                    workoutId={workout.id}
                    key={comment.id}
                  />
                );
              })}
            </StyledCommentContainer>
          </StyledContentContainer>
        </StyledDetails>
      ) : (
        <StyledOverlay>
          <StyledLogo src={Logo} />
        </StyledOverlay>
      )}
    </>
  );
}
