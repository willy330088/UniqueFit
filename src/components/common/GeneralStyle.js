import styled from 'styled-components';

import { blurring } from '../../utils/animation';

const StyledHorizontalContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledVerticalContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledGeneralBtn = styled.div`
  cursor: pointer;
  color: #1face1;
  border-radius: 5px;
  background-color: transparent;
  text-align: center;
  border: 2px solid #1face1;

  &:hover {
    color: white;
    background-color: #1face1;
  }
`;

const StyledCommentEditSaveBtn = styled.div`
  cursor: pointer;
  color: ${(props) => (props.commentContent === '' ? '#d1d1d1' : 'white')};
  font-size: 15px;
  height: 20px;
  width: 50px;
  border-radius: 5px;
  text-align: center;
  line-height: 20px;
  margin-left: 10px;
  background-color: ${(props) =>
    props.commentContent === '' ? '#969696' : '#1face1'};
  cursor: ${(props) =>
    props.commentContent === '' ? 'not-allowed' : 'pointer'};

  &:hover {
    color: ${(props) => (props.commentContent === '' ? '#d1d1d1' : 'white')};
    background-color: ${(props) =>
      props.commentContent === '' ? '#969696' : 'hsla(196, 76%, 60%)'};
  }
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
    props.commentContent === '' ? '#969696' : '#1face1'};
  cursor: ${(props) =>
    props.commentContent === '' ? 'not-allowed' : 'pointer'};

  &:hover {
    color: ${(props) => (props.commentContent === '' ? '#d1d1d1' : 'white')};
    background-color: ${(props) =>
      props.commentContent === '' ? '#969696' : 'hsla(196, 76%, 60%)'};
  }
`;

const StyledSubmitWorkoutAndPlanBtn = styled.div`
  font-size: 20px;
  height: 40px;
  width: 120px;
  cursor: ${(props) => (props.submitDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.submitDisabled ? '#d1d1d1' : '#1face1')};
  border-radius: 5px;
  background-color: ${(props) =>
    props.submitDisabled ? '#969696' : 'transparent'};
  text-align: center;
  line-height: 40px;
  margin: 10px 0;
  border: ${(props) => (props.submitDisabled ? 'none' : '2px solid #1face1')};

  &:hover {
    color: ${(props) => (props.submitDisabled ? '#d1d1d1' : 'white')};
    background-color: ${(props) =>
      props.submitDisabled ? '#969696' : '#1face1'};
  }

  @media (min-width: 500px) {
    font-size: 35px;
    height: 50px;
    width: 200px;
    line-height: 46px;
  }
`;

const StyledBlurringEffectContainer = styled.div`
  div:nth-child(1) {
    animation: ${blurring} 1.2s linear 0s infinite alternate;
  }
  div:nth-child(2) {
    animation: ${blurring} 1.2s linear 0.15s infinite alternate;
  }
  div:nth-child(3) {
    animation: ${blurring} 1.2s linear 0.3s infinite alternate;
  }
  div:nth-child(4) {
    animation: ${blurring} 1.2s linear 0.45s infinite alternate;
  }
  div:nth-child(5) {
    animation: ${blurring} 1.2s linear 0.6s infinite alternate;
  }
  div:nth-child(6) {
    animation: ${blurring} 1.2s linear 0.75s infinite alternate;
  }
  div:nth-child(7) {
    animation: ${blurring} 1.2s linear 0.9s infinite alternate;
  }
  div:nth-child(8) {
    animation: ${blurring} 1.2s linear 1.05s infinite alternate;
  }
  div:nth-child(9) {
    animation: ${blurring} 1.2s linear 1.2s infinite alternate;
  }
`;

export {
  StyledHorizontalContainer,
  StyledVerticalContainer,
  StyledGeneralBtn,
  StyledCommentEditSaveBtn,
  StyledLeaveCommentBtn,
  StyledSubmitWorkoutAndPlanBtn,
  StyledBlurringEffectContainer,
};
