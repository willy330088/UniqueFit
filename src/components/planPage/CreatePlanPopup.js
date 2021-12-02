import React, { useState } from 'react';

import PlanPopupContent from '../common/PlanPopupContent';

export default function CreatePlanPopup({ paging, setPaging, close }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMuscleGroup, setTargetMuscleGroup] = useState('');
  const [estimatedTrainingTime, setEstimatedTrainingTime] = useState();
  const [publicity, setPublicity] = useState(false);
  const [plan, setPlan] = useState({
    workoutSet: [],
  });

  return (
    <PlanPopupContent
      type={'Create'}
      paging={paging}
      setPaging={setPaging}
      title={title}
      setTitle={setTitle}
      targetMuscleGroup={targetMuscleGroup}
      setTargetMuscleGroup={setTargetMuscleGroup}
      estimatedTrainingTime={estimatedTrainingTime}
      setEstimatedTrainingTime={setEstimatedTrainingTime}
      description={description}
      setDescription={setDescription}
      publicity={publicity}
      setPublicity={setPublicity}
      plan={plan}
      setPlan={setPlan}
      close={close}
      originalPlan={{}}
    />
  );
}
