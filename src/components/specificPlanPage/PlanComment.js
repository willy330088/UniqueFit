import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import { HiUserCircle } from 'react-icons/hi';

import { StyledCommentEditSaveBtn } from '../Common/GeneralStyle';
import { deletePlanComment, editPlanComment } from '../../utils/firebase';
import { successToast } from '../../utils/toast';

export default function PlanComment({ comment, planId, currentUser }) {
  const [showTool, setShowTool] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const users = useSelector((state) => state.users);
  const publisher = users.filter((user) => user.id === comment.publisher)[0];

  async function onSaveComment() {
    await editPlanComment(planId, comment.id, commentContent);
    setIsEditing(false);
  }

  async function onDeleteComment() {
    setShowTool(false);
    await deletePlanComment(planId, comment.id);
    successToast('Deleted Successfully');
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
          <StyledCommentEditInputContainer>
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
          </StyledCommentEditInputContainer>
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

const StyledCommentWrap = styled.div`
  display: flex;
  align-items: center;
  min-height: 140px;
  position: relative;
  border-radius: 5px;
`;

const StyledCommentUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
  object-fit: cover;
`;

const StyledNameCommentWrap = styled.div`
  margin: 20px 20px 30px 20px;
  width: calc(100% - 70px);
`;

const StyledCommentUserName = styled.div`
  color: #1face1;
  font-size: 20px;
  margin-bottom: 10px;
`;

const StyledCommentUserContext = styled.div`
  color: #222d35;
  font-size: 18px;
  margin-top: 10px;
  word-wrap: break-word;
  width: 100%;
`;

const StyledCommentTimeStamp = styled.div`
  color: #969696;
  position: absolute;
  right: 15px;
  bottom: 10px;
`;

const StyledCommentThreeDot = styled(BsThreeDots)`
  color: #222d35;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 20px;
  cursor: pointer;
`;

const StyledPlanInfoPublisherIcon = styled(HiUserCircle)`
  color: #d6d6d6;
  font-size: 50px;
  margin-left: 5px;
`;

const StyledCommentToolContainer = styled.div`
  width: 120px;
  height: 80px;
  background: #d1d1d1;
  position: absolute;
  right: 15px;
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

const StyledCommentEditInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCommentEditInput = styled.textarea`
  height: 25px;
  width: 100%;
  outline: none;
  font-size: 18px;
  padding-left: 10px;
  resize: none;
`;
