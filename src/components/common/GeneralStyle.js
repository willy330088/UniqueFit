import styled from 'styled-components';

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

export {
  StyledHorizontalContainer,
  StyledVerticalContainer,
  StyledGeneralBtn,
  StyledCommentEditSaveBtn,
  StyledLeaveCommentBtn,
};
