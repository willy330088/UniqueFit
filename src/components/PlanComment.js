import React, { useState } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { firebase } from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledCommentWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  min-height: 120px;
  position: relative;
`;

const StyledCommentUserImage = styled.img`
  width: 50px;
  border-radius: 50%;
  height: 50px;
`;

const StyledNameCommentWrap = styled.div`
  margin-left: 20px;
  width: 100%;
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
  cursor: pointer;
`;

const StyledPlanInfoPublisherIcon = styled(HiUserCircle)`
  color: #222d35;
  font-size: 50px;
`;

const StyledCommentToolContainer = styled.div`
  width: 120px;
  height: 80px;
  background: #d1d1d1;
  position: absolute;
  right: 0;
  top: 30px;
  border-radius: 3px;
  display: ${(props) => (props.showTool ? 'block' : 'none')};
`;

const StyledCommentToolBtn = styled.div`
  height: 40px;
  width: 100%;
  color: black;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background: #5cc1e6;
    color: white;
  }
`;

const StyledCommentEditInput = styled.textarea`
  height: 50px;
  width: 100%;
  outline: none;
  font-size: 18px;
  padding: 5px;
`;

const StyledCommentEditSaveBtn = styled.button`
  cursor: pointer;
  color: ${(props) => (props.commentContent === '' ? '#d1d1d1' : '#1c2d9c')};
  font-size: 15px;
  height: 25px;
  width: 60px;
  border-radius: 5px;
  border: ${(props) =>
    props.commentContent === '' ? 'none' : 'solid 3px #1c2d9c'};
  background-color: ${(props) =>
    props.commentContent === '' ? '#969696' : 'transparent'};
  cursor: ${(props) =>
    props.commentContent === '' ? 'not-allowed' : 'pointer'};

  &:hover {
    color: ${(props) => (props.commentContent === '' ? '#d1d1d1' : 'white')};
    background-color: ${(props) =>
      props.commentContent === '' ? '#969696' : '#1c2d9c'};
  }
`;

export default function PlanComment({ comment, planId, currentUser }) {
  const [showTool, setShowTool] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const users = useSelector((state) => state.users);
  const publisher = users.filter((user) => user.id === comment.publisher)[0];

  function onSaveComment() {
    firebase
      .firestore()
      .collection('plans')
      .doc(planId)
      .collection('comments')
      .doc(comment.id)
      .update({
        content: commentContent,
      })
      .then(() => {
        setIsEditing(false);
      });
  }

  function onDeleteComment() {
    setShowTool(false);
    const firestore = firebase.firestore();
    const batch = firestore.batch();

    const planRef = firestore.collection('plans').doc(planId);

    batch.update(planRef, {
      commentsCount: firebase.firestore.FieldValue.increment(-1),
    });

    const commentRef = planRef.collection('comments').doc(comment.id);
    batch.delete(commentRef);

    batch.commit().then(() => {
      toast.success('Deleted Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    });
  }

  return (
    <StyledCommentWrap>
      {publisher?.photoURL ? (
        <StyledCommentUserImage src={publisher?.photoURL} />
      ) : (
        <StyledPlanInfoPublisherIcon />
      )}
      <StyledNameCommentWrap>
        <StyledCommentUserName>{publisher?.displayName}</StyledCommentUserName>
        {isEditing ? (
          <>
            {' '}
            <StyledCommentEditInput
              value={commentContent}
              onChange={(e) => {
                setCommentContent(e.target.value);
              }}
            />
            <StyledCommentEditSaveBtn
              onClick={onSaveComment}
              commentContent={commentContent}
            >
              Save
            </StyledCommentEditSaveBtn>
          </>
        ) : (
          <StyledCommentUserContext>{comment.content}</StyledCommentUserContext>
        )}
        <StyledCommentTimeStamp>
          {comment.createdAt.toDate().toLocaleString()}
        </StyledCommentTimeStamp>
        {publisher?.id === currentUser?.uid ? (
          <StyledCommentThreeDot
            onClick={() => {
              setShowTool(!showTool);
            }}
          />
        ) : null}
        <StyledCommentToolContainer showTool={showTool}>
          <StyledCommentToolBtn
            onClick={() => {
              setIsEditing(true);
              setShowTool(false);
            }}
          >
            Edit
          </StyledCommentToolBtn>
          <StyledCommentToolBtn onClick={onDeleteComment}>
            Delete
          </StyledCommentToolBtn>
        </StyledCommentToolContainer>
      </StyledNameCommentWrap>
    </StyledCommentWrap>
  );
}
