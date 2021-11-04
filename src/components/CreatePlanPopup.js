import React, { useState } from 'react';
import DragandDrop from './Drag&Drop';
import styled from 'styled-components';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';
import PlanDetailsInputP1 from './PlanDetailsInputP1';
import PlanDetailsInputP2 from './PlanDetailsInputP2';
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
`;

const StyledArrowLeftIcon = styled(AiOutlineLeftCircle)`
  font-size: 40px;
  cursor: pointer;
  color: white;
  position: absolute;
  bottom: 30px;
  left: 40px;
  display: ${(props) => (props.paging === 1 ? 'none' : 'block')};
`;

const StyledCreateWorkoutBtn = styled.button`
  width: 200px;
  font-size: 30px;
  margin-left: calc(50% - 100px);
  margin-top: 30px;
  cursor: pointer;
`;

const StyledCreateLabel = styled.div`
  color: #1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;
  width: 100%;
`;

export default function CreatePlanPage({paging, setPaging}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMuscleGroup, setTargetMuscleGroup] = useState('');
  const [estimatedTrainingTime, setEstimatedTrainingTime] = useState(0);
  const [publicity, setPublicity] = useState(false);
  const [plan, setPlan] = useState({
    workoutSet: [],
  });

  function createPlan() {
    const documentRef = firebase.firestore().collection('plans').doc();
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
      })
      .then(() => {
        alert('Created Successfully!');
      });
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
          <StyledCreateWorkoutBtn onClick={createPlan}>
            Create
          </StyledCreateWorkoutBtn>
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
