import React from 'react'
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import AbsIcon from '../images/abs-blue.png'

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

const StyledVideo = styled.video`
  position: fixed;
  width: 700px;
  height: 400px;
  object-fit: cover;
`

const StyledTitleContainer = styled.div`
  display: flex;
  align-items:center;
  margin: 0px 0 35px 0px;
  padding-top: 20px;
`

const StyledMuscleIcon = styled.img`
  width: 100px;
  margin-right: 30px;
`

const StyledTitle = styled.div`
  color: #1face1;
  font-size: 80px;
`

const StyledDetails = styled.div`
  background: #222d35;
  height: 550px;
  position: relative;
  top: 405px;
  padding: 0 5% 5%;
`

const StyledTextContent = styled.div`
  color: white;
  font-size: 30px;
  margin: 0 0 20px 20px;
`


export default function ExercisePopup() {
  return (
    <StyledPopup
      trigger={<button>hi</button>}
      modal
      nested
    >
      <StyledVideo src={'https://firebasestorage.googleapis.com/v0/b/uniquefit-william.appspot.com/o/flutter_kicks.mov?alt=media&token=cc0427dd-bb02-4936-80bb-032ef964e027'} autoPlay loop playsinline muted></StyledVideo>
      <StyledDetails>
        <StyledTitleContainer>
          <StyledMuscleIcon src={AbsIcon} />
          <StyledTitle>Flutter Kicks</StyledTitle>
        </StyledTitleContainer>
        <StyledTextContent>Publisher : Victor Chen Muscle Man</StyledTextContent>
        <StyledTextContent>Target Muscle Group : Abs</StyledTextContent>
        <StyledTextContent>Details : Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?</StyledTextContent>
      </StyledDetails>
    </StyledPopup>
  )
}
