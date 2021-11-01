import React, { useState } from 'react';
import Header from './Header';
import Banner from './Banner';
import GoogleMap from './GoogleMap';
import WorkoutCreation from './WorkoutCreation';
import styled from 'styled-components';
import firebase from '../utils/firebase';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiOutlineDownCircle } from 'react-icons/ai';
import Popup from 'reactjs-popup';
import 'firebase/auth';
import * as RiIcons from 'react-icons/ri';
import ProfileSubMenu from './ProfileSubMenu';

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledProfilePageContainer = styled.div`
  padding: 50px 10% 100px;
`;

const StyledPersonalInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 3px solid #1face1;
`;

const StyledPersonalImage = styled.img`
  width: 120px;
  border-radius: 50%;
  margin-right: 40px;
`;

const StyledPersonalInfo = styled.div``;

const StyledPersonalName = styled.div`
  color: #1face1;
  font-size: 50px;
  margin-bottom: 10px;
`;

const StyledPersonalEmail = styled.div`
  color: white;
  font-size: 30px;
`;

const StyledPencilIcon = styled(BsFillPencilFill)`
  font-size: 30px;
  margin-left: 10px;
  color: #7d7d7d;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    background: #222d35;
    width: 400px;
    height: 250px;
    border-radius: 20px;
    padding: 0px 50px;
  }
`;

const StyledPopupTitle = styled.div`
  font-size: 40px;
  color: white;
  text-align: center;
  width: 100%;
  padding-bottom: 15px;
  margin: 20px 0px;
  border-bottom: 3px white solid;
`;

const StyledPopupInput = styled.input`
  width: 100%;
  height: 50px;
  outline: none;
  font-size: 30px;
  margin-bottom: 30px;
`;

const StyledPopupBtn = styled.button`
  width: 100px;
  height: 40px;
  font-size: 30px;
  margin-left: calc(50% - 50px);
  cursor: pointer;
`;

const StyledSideBar = styled.aside`
  float: left;
`;

const StyledSideBarContainer = styled.div`
  margin-top: 50px;
  width: 300px;
`;

const StyledProfileContentContainer = styled.div`
  padding: 50px 0px 50px 50px;
  margin-left: 200px;
  @media (min-width: 1280px) {
    margin-left: 30%;
  }
`;

const StyledProfileContentTitle = styled.div`
  color: #1face1;
  font-size: 50px;
  margin-bottom: 30px;
`;

const StyledBookmark = styled.div`
  display: flex;
`;

const StyledWorkoutTypeTag = styled.div`
  color: ${(props) => (props.selected ? '#1face1' : '#808080')};
  font-size: 30px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const StyledWorkoutTypeSeparator = styled.div`
  color: white;
  font-size: 30px;
  margin-right: 20px;
`;

const SidebarData = [
  {
    title: 'My Workouts',
    state: 'myworkouts',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'My Workout Creations',
        state: 'myworkoutcreations',
      },
      {
        title: 'My Workout Collections',
        state: 'myworkoutcollections',
      },
    ],
  },
  {
    title: 'My Plans',
    state: 'myplans',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'My plan Creations',
        state: 'myplancreations',
      },
      {
        title: 'My plan Collections',
        state: 'myplancollections',
      },
    ],
  },
  {
    title: 'My Nearby Gyms',
    state: 'mynearbygyms',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

export default function CreateWorkoutPage() {
  const [mainContent, setMainContent] = useState('');

  function showMainContent() {
    if (mainContent === 'mynearbygyms') {
      return (
        <>
          <StyledProfileContentTitle>My Nearby Gyms</StyledProfileContentTitle>
          <GoogleMap />
        </>
      );
    } else {
      return (
        <>
          <StyledProfileContentTitle>
            My Workout Creations
          </StyledProfileContentTitle>
          <StyledBookmark>
            <StyledWorkoutTypeTag>Gym Workout</StyledWorkoutTypeTag>
            <StyledWorkoutTypeSeparator>|</StyledWorkoutTypeSeparator>
            <StyledWorkoutTypeTag>Home Workout</StyledWorkoutTypeTag>
          </StyledBookmark>
          <WorkoutCreation />
        </>
      );
    }
  }

  return (
    <StyledBody>
      <Header />
      <Banner slogan={'My Profile'} />
      <StyledProfilePageContainer>
        <StyledPersonalInfoContainer>
          <StyledPersonalImage src={firebase.auth().currentUser.photoURL} />
          <StyledPersonalInfo>
            <StyledPersonalName>
              {firebase.auth().currentUser.displayName}
              <StyledPopup trigger={<StyledPencilIcon />} modal nested>
                <StyledPopupTitle>Edit Your Name</StyledPopupTitle>
                <StyledPopupInput />
                <StyledPopupBtn>Save</StyledPopupBtn>
              </StyledPopup>
            </StyledPersonalName>
            <StyledPersonalEmail>
              {firebase.auth().currentUser.email}
            </StyledPersonalEmail>
          </StyledPersonalInfo>
        </StyledPersonalInfoContainer>
        <StyledSideBar>
          <StyledSideBarContainer>
            {SidebarData.map((item, index) => {
              return <ProfileSubMenu item={item} setMainContent={setMainContent}/>;
            })}
          </StyledSideBarContainer>
        </StyledSideBar>
        <StyledProfileContentContainer>
          {showMainContent()}
        </StyledProfileContentContainer>
      </StyledProfilePageContainer>
    </StyledBody>
  );
}
