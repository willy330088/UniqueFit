import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaDumbbell } from 'react-icons/fa';
import { Waypoint } from 'react-waypoint';
import Popup from 'reactjs-popup';

import { StyledBlurringEffectContainer } from './GeneralStyle';
import {
  getWorkoutComment,
  removeWorkoutCollection,
  addWorkoutCollection,
} from '../../utils/firebase';
import { down } from '../../utils/animation';
import muscleGroups from '../../utils/muscleGroup';
import LogoDumbbell from '../../images/logo-dumbbell.png';
import WorkoutPopupDetail from './WorkoutPopupDetail';

export default function WorkoutPopup({ workout, close, setSignInOpen, open }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [comments, setComments] = useState([]);
  const [scrollDown, setScrollDown] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const isCollected = workout.collectedBy?.includes(currentUser?.uid);

  useEffect(() => {
    getWorkoutComment(workout.id, setComments);
  }, []);

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
      <StyledVideo
        src={workout.videoURL}
        autoPlay
        loop
        playsinline
        muted
        onCanPlay={() => {
          setVideoReady(true);
        }}
      />
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
          <WorkoutPopupDetail
            currentUser={currentUser}
            workout={workout}
            close={close}
            setSignInOpen={setSignInOpen}
            comments={comments}
          />
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
  cursor: pointer;
`;
