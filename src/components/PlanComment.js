import React, { useState } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

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
  background: #969696;
  position: absolute;
  right: 0;
  top: 30px;
  display: ${(props) => (props.showTool ? 'block' : 'none')};
`;

const StyledCommentToolBtn = styled.div`
  height: 40px;
  width: 100%;
  color: black;
  text-align: center;
  line-height: 40px;
  cursor: pointer;

  &:hover {
    background: #1face1;
  }
`;

const StyledCommentEditInput = styled.textarea`
  height: 50px;
  width: 100%;
  outline: none;
  font-size: 20px;
`;

const StyledCommentEditSaveBtn = styled.button`
  height: 20px;
`;

export default function PlanComment({ comment, planId }) {
  const [showTool, setShowTool] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);

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
    setShowTool(false)
    const firestore = firebase.firestore();
    const batch = firestore.batch();

    const planRef = firestore.collection('plans').doc(planId);

    batch.update(planRef, {
      commentsCount: firebase.firestore.FieldValue.increment(-1),
    });

    const commentRef = planRef.collection('comments').doc(comment.id);
    batch.delete(commentRef);

    batch.commit().then(() => {
      alert('Successfully deleted!');
    });
  }

  return (
    <StyledCommentWrap>
      {comment.publisher.photoURL ? (
        <StyledCommentUserImage src={comment.publisher.photoURL} />
      ) : (
        <StyledPlanInfoPublisherIcon />
      )}
      <StyledNameCommentWrap>
        <StyledCommentUserName>
          {comment.publisher.displayName}
        </StyledCommentUserName>
        {isEditing ? (
          <>
            {' '}
            <StyledCommentEditInput
              value={commentContent}
              onChange={(e) => {
                setCommentContent(e.target.value);
              }}
            />
            <StyledCommentEditSaveBtn onClick={onSaveComment}>
              Save
            </StyledCommentEditSaveBtn>
          </>
        ) : (
          <StyledCommentUserContext>{comment.content}</StyledCommentUserContext>
        )}
        <StyledCommentTimeStamp>
          {comment.createdAt.toDate().toLocaleString()}
        </StyledCommentTimeStamp>
        {comment.publisher.uid === firebase.auth().currentUser.uid ? (
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
