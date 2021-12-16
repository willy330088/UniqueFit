import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import PlanPopupContent from '../Common/PlanPopupContent';

export default function EditPlanPopup({
  paging,
  setPaging,
  originalPlan,
  close,
}) {
  const [title, setTitle] = useState(originalPlan.title);
  const [description, setDescription] = useState(originalPlan.description);
  const [targetMuscleGroup, setTargetMuscleGroup] = useState(
    originalPlan.targetMuscleGroup
  );
  const [estimatedTrainingTime, setEstimatedTrainingTime] = useState(
    originalPlan.estimatedTrainingTime
  );
  const [publicity, setPublicity] = useState(originalPlan.public);
  const [plan, setPlan] = useState({
    workoutSet: [],
  });
  const workouts = useSelector((state) => state.workouts);

  useEffect(() => {
    const planWorkouts = originalPlan.workoutSet.map((workoutMove) => {
      return workouts.filter(
        (workout) => workout.id === workoutMove.workoutId
      )[0];
    });

    setPlan({
      workoutSet: planWorkouts.map((planWorkout, index) => {
        const reps = originalPlan.workoutSet[index].reps;
        const weight = originalPlan.workoutSet[index].weight;
        const workoutId = planWorkout.id;
        const id = uuid();
        return { ...planWorkout, workoutId, reps, weight, id };
      }),
    });
  }, []);

  return (
    <PlanPopupContent
      type={'Edit'}
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
      originalPlan={originalPlan}
    />
  );
}
