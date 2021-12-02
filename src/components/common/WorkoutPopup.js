import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HiUserCircle } from 'react-icons/hi';
import { FaDumbbell } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';
import { Waypoint } from 'react-waypoint';
import Popup from 'reactjs-popup';

import WorkoutComment from './WorkoutComment';
import {
  StyledHorizontalContainer,
  StyledLeaveCommentBtn,
  StyledBlurringEffectContainer,
} from './GeneralStyle';
import {
  getWorkoutComment,
  addWorkoutComment,
  removeWorkoutCollection,
  addWorkoutCollection,
} from '../../utils/firebase';
import { down, anvil } from '../../utils/animation';
import muscleGroups from '../../utils/muscleGroup';
import LogoDumbbell from '../../images/logo-dumbbell.png';

export default function WorkoutPopup({ workout, close, setSignInOpen, open }) {
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [scrollDown, setScrollDown] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);
  const publisher = users.filter((user) => user.id === workout.publisher)[0];
  const isCollected = workout.collectedBy?.includes(currentUser?.uid);

  useEffect(() => {
    getWorkoutComment(workout.id, setComments);
  }, []);

  async function onSubmitComment() {
    if (currentUser) {
      if (commentContent === '') {
        return;
      } else {
        await addWorkoutComment(workout.id, commentContent);
        setCommentContent('');
      }
    } else {
      close();
      setSignInOpen(true);
    }
  }

  function toggleCollected() {
    if (currentUser) {
      const uid = currentUser.uid;
      if (isCollected) {
        removeWorkoutCollection(workout.id, uid);
      } else {
        addWorkoutCollection(workout.id, uid);
      }
    } else {
      close();
      setSignInOpen(true);
    }
  }

  function popupClose() {
    close();
    setVideoReady(false);
  }

  return (
    <StyledPopup open={open} closeOnDocumentClick onClose={popupClose}>
      <input type="text" autofocus="autofocus" style={{ display: 'none' }} />
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
                muscleGroups.filter(
                  (muscleGroup) =>
                    muscleGroup.name === workout.targetMuscleGroup
                )[0].src
              }
            />
            <StyledTitle>{workout.title}</StyledTitle>
            <StyledCollectIconContainer onClick={toggleCollected}>
              <StyledAddToCollectIcon isCollected={isCollected} />
              <StyledCollectIconText isCollected={isCollected}>
                Collect
              </StyledCollectIconText>
            </StyledCollectIconContainer>
          </StyledTitleContainer>
          <Waypoint
            onEnter={() => {
              setScrollDown(false);
            }}
          />
          <StyledContentContainer>
            <StyledPulisherContainer>
              {publisher.photoURL ? (
                <StyledPublisherImage src={publisher.photoURL} />
              ) : (
                <StyledPublisherIcon />
              )}
              {publisher.displayName}
            </StyledPulisherContainer>
            <StyledCollectionContainer>
              <StyledCollectIcon />{' '}
              <StyledCollectionNum>
                {workout.collectedBy.length}
              </StyledCollectionNum>
            </StyledCollectionContainer>
            <StyledTextTitle>Target Muscle Group</StyledTextTitle>
            <StyledTextContent>{workout.targetMuscleGroup}</StyledTextContent>
            <StyledTextTitle>Description</StyledTextTitle>
            <StyledTextContent>{workout.description}</StyledTextContent>
            <StyledCommentContainer>
              <StyledCommentTitleContainer>
                <StyledCommentIcon />{' '}
                <StyledCommentTitleText>
                  Comments ({workout.commentsCount || 0})
                </StyledCommentTitleText>
              </StyledCommentTitleContainer>
              <StyledHorizontalContainer>
                <StyledCommentInput
                  value={commentContent}
                  onChange={(e) => {
                    setCommentContent(e.target.value);
                  }}
                  placeholder="your comment..."
                />
              </StyledHorizontalContainer>
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
                    currentUser={currentUser}
                  />
                );
              })}
            </StyledCommentContainer>
          </StyledContentContainer>
        </StyledDetails>
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
      )}
    </StyledPopup>
  );
}

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

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 0 25px 0px;
  padding-top: 20px;
  position: relative;

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
  margin-right: 10px;

  @media (min-width: 500px) {
    width: 60px;
    margin-right: 20px;
  }

  @media (min-width: 700px) {
    width: 100px;
    margin-right: 30px;
  } ;
`;

const StyledTitle = styled.div`
  color: #1face1;
  font-size: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;

  @media (min-width: 500px) {
    font-size: 40px;
    width: 300px;
  }

  @media (min-width: 700px) {
    font-size: 60px;
    width: 420px;
  } ;
`;

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
  margin: 0 0 10px 0px;

  @media (min-width: 500px) {
    font-size: 20px;
    margin: 0 0 10px 0px;
  }

  @media (min-width: 700px) {
    font-size: 30px;
    margin: 0 0 20px 0px;
  } ;
`;

const StyledTextTitle = styled.div`
  color: white;
  font-size: 18px;

  @media (min-width: 500px) {
    font-size: 20px;
  }

  @media (min-width: 700px) {
    font-size: 30px;
  } ;
`;

const StyledTextContent = styled.div`
  font-size: 18px;
  margin: 0 0 20px 0px;
  color: #b5b5b5;
  font-weight: 600;

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
  height: 25px;
  margin-right: 10px;

  @media (min-width: 500px) {
    width: 30px;
    height: 30px;
  }

  @media (min-width: 700px) {
    width: 50px;
    height: 50px;
  } ;
`;

const StyledCollectionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (min-width: 500px) {
    margin-bottom: 10px;
  }

  @media (min-width: 700px) {
    margin-bottom: 20px;
  } ;
`;

const StyledCollectIcon = styled(FaDumbbell)`
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
  font-size: 20px;
  margin-left: 10px;

  @media (min-width: 500px) {
    padding-top: 4px;
    font-size: 25px;
  }

  @media (min-width: 700px) {
    padding-top: 4px;
    font-size: 30px;
  } ;
`;

const StyledAddToCollectIcon = styled(FaDumbbell)`
  font-size: 30px;
  color: ${(props) => (props.isCollected ? '#1face1' : '#808080')};
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

const StyledScrollDown = styled.span`
  position: absolute;
  top: 90px;
  left: 50%;
  width: 100px;
  height: 24px;
  margin-left: -12px;
  border-left: 5px solid #fff;
  border-bottom: 5px solid #fff;
  transform: rotate(-45deg);
  animation: ${down} 3s infinite;
  box-sizing: border-box;
  display: ${(props) => (props.scrollDown ? 'block' : 'none')};

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

const StyledLogoContainer = styled(StyledBlurringEffectContainer)`
  display: flex;
  align-items: center;
`;

const StyledLogoText1 = styled.div`
  font-size: 40px;
  color: #1face1;
  margin: 0 5px;

  @media (min-width: 500px) {
    font-size: 80px;
  }
`;

const StyledLogoText2 = styled.div`
  font-size: 40px;
  color: white;
  margin: 0 5px;

  @media (min-width: 500px) {
    font-size: 80px;
  }
`;

const StyledLogoDumbbell = styled.div`
  background-image: url(${LogoDumbbell});
  background-repeat: no-repeat;
  background-size: cover;
  width: 17px;
  height: 36px;
  margin: 0 5px;

  @media (min-width: 500px) {
    width: 33px;
    height: 65px;
  }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 350px;
    height: 300px;
    overflow-y: scroll;
    animation: ${anvil} 0.6s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;

    @media (min-width: 500px) {
      width: 500px;
      height: 400px;
    }

    @media (min-width: 700px) {
      width: 700px;
      height: 550px;
    }
  }
`;

const StyledCollectIconContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 2px;
`;

const StyledCollectIconText = styled.div`
  font-size: 15px;
  color: ${(props) => (props.isCollected ? '#1face1' : '#808080')};
`;
