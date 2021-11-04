import React, { useState } from 'react';
import Header from './Header';
import DragandDrop from './Drag&Drop';
import Banner from './Banner';
import styled from 'styled-components';
import PlanDetailsInput from './PlanDetailsInput';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import { useHistory } from 'react-router-dom';

const StyledBody = styled.div`
  background: #222d35;
  min-height: 100vh;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function CreatePlanPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMuscleGroup, setTargetMuscleGroup] = useState('');
  const [estimatedTrainingTime, setEstimatedTrainingTime] = useState(0);
  const [publicity, setPublicity] = useState(false);
  const [plan, setPlan] = useState({
    workoutSet: [],
  });
  const history = useHistory();

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
        history.push('/plans');
      });
  }

  return (
    <StyledBody>
      <Header />
      <Banner slogan={'Create Your Plan'} />
      <StyledContainer>
        <PlanDetailsInput
          setTitle={setTitle}
          setDescription={setDescription}
          setTargetMuscleGroup={setTargetMuscleGroup}
          setEstimatedTrainingTime={setEstimatedTrainingTime}
          targetMuscleGroup={targetMuscleGroup}
          publicity={publicity}
          setPublicity={setPublicity}
        />
        <DragandDrop plan={plan} setPlan={setPlan} createPlan={createPlan} />
      </StyledContainer>
    </StyledBody>
  );
}
