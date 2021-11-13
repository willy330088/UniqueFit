import React, { useState } from 'react';
import DragandDrop from './Drag&Drop';
import styled from 'styled-components';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';
import PlanDetailsInputP1 from './PlanDetailsInputP1';
import PlanDetailsInputP2 from './PlanDetailsInputP2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';

const StyledArrowRightIcon = styled(AiOutlineRightCircle)`
  font-size: 40px;
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 30px;
  right: 40px;
  display: ${(props) => (props.paging === 3 ? 'none' : 'block')};

  &:hover {
    color: #1face1;
  }
`;

const StyledArrowLeftIcon = styled(AiOutlineLeftCircle)`
  font-size: 40px;
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 30px;
  left: 40px;
  display: ${(props) => (props.paging === 1 ? 'none' : 'block')};

  &:hover {
    color: #1face1;
  }
`;

const StyledCreateWorkoutBtn = styled.div`
  font-size: 20px;
  height: 40px;
  width: 120px;
  cursor: pointer;
  color: #1c2d9c;
  border-radius: 5px;
  background-color: white;
  text-align: center;
  line-height: 40px;
  margin: 10px 0;

  &:hover {
    color: white;
    background-color: #1c2d9c;
  }

  @media (min-width: 500px) {
    font-size: 35px;
    height: 50px;
    width: 200px;
    line-height: 50px;
  }
`;

const StyledChangeWorkoutBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media (min-width: 500px) {
    margin-top: 25px;
  }
`;

const StyledCreateLabel = styled.div`
  color: #1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;
  width: 100%;
`;

export default function CreatePlanPage({paging, setPaging, close}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMuscleGroup, setTargetMuscleGroup] = useState('');
  const [estimatedTrainingTime, setEstimatedTrainingTime] = useState();
  const [publicity, setPublicity] = useState(false);
  const [plan, setPlan] = useState({
    workoutSet: [],
  });

  function createPlan() {
    const documentRef = firebase.firestore().collection('plans').doc();
    let checked = false

    if (title === '') {
      toast.error('Please fill in title', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return
    } else if (targetMuscleGroup === '') {
      toast.error('Please choose target muscle group', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return
    } else if (!estimatedTrainingTime) {
      toast.error('Please fill in estimated training time', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return
    } else if (description === '') {
      toast.error('Please fill in description', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return
    } else if (plan.workoutSet.length === 0) {
      toast.error('Please add workouts', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return
    }

    plan.workoutSet.every((workout) => {
      checked = false;
      if (!workout.reps || !workout.weight) {
        toast.error(`Please fill in weights and reps`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return false
      }
      checked = true;
      return true
    })

    if (checked) {
      const planCreating = toast.loading('Creating Plan...', {
        position: toast.POSITION.TOP_CENTER,
      });

      documentRef
        .set({
          title: title,
          publisher: {
            displayName: firebase.auth().currentUser.displayName || '',
            photoURL: firebase.auth().currentUser.photoURL || '',
            uid: firebase.auth().currentUser.uid,
          },
          public: publicity,
          description: description,
          targetMuscleGroup: targetMuscleGroup,
          estimatedTrainingTime: estimatedTrainingTime,
          workoutSet: plan.workoutSet.map((item) => {
            return {
              workoutId: item.workoutId,
              reps: item.reps,
              weight: item.weight,
              title: item.title
            };
          }),
          collectedBy: [],
          createdAt: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
          toast.update(planCreating, {
            render: 'Created Successfully',
            type: 'success',
            isLoading: false,
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          close()
        });
    }
  }

  function showMainContent() {
    if (paging === 1) {
      return (
        <PlanDetailsInputP1
          title={title}
          setTitle={setTitle}
          targetMuscleGroup={targetMuscleGroup}
          setTargetMuscleGroup={setTargetMuscleGroup}
          estimatedTrainingTime={estimatedTrainingTime}
          setEstimatedTrainingTime={setEstimatedTrainingTime}
        />
      );
    } else if (paging === 2){
      return (
        <PlanDetailsInputP2
          description={description}
          setDescription={setDescription}
          publicity={publicity}
          setPublicity={setPublicity}
        />
      );
    } else {
      return (
        <>
          <StyledCreateLabel>Order Your Workouts</StyledCreateLabel>
          <DragandDrop plan={plan} setPlan={setPlan} createPlan={createPlan} />
          <StyledChangeWorkoutBtnContainer>
            <StyledCreateWorkoutBtn onClick={createPlan}>
              Create
            </StyledCreateWorkoutBtn>
          </StyledChangeWorkoutBtnContainer>
        </>  
      )
    }
  }

  return (
    <>
      <StyledArrowRightIcon
        onClick={() => {
          setPaging(paging + 1);
        }}
        paging={paging}
      />
      <StyledArrowLeftIcon
        onClick={() => {
          setPaging(paging - 1);
        }}
        paging={paging}
      />
      {showMainContent()}
    </>
  );
}
