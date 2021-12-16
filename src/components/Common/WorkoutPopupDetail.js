import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { HiUserCircle } from 'react-icons/hi';
import { FaDumbbell } from 'react-icons/fa';
import { RiMessage2Fill } from 'react-icons/ri';

import WorkoutComment from './WorkoutComment';
import {
  StyledHorizontalContainer,
  StyledLeaveCommentBtn,
} from './GeneralStyle';
import { addWorkoutComment } from '../../utils/firebase';

export default function WorkoutPopupDetail({
  currentUser,
  workout,
  close,
  setSignInOpen,
  comments,
}) {
  const users = useSelector((state) => state.users);
  const [commentContent, setCommentContent] = useState('');
  const publisher = users.filter((user) => user.id === workout.publisher)[0];

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
  return (
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
        <StyledCollectionNum>{workout.collectedBy.length}</StyledCollectionNum>
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
  );
}

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
  object-fit: cover;

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
  resize: none;

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
