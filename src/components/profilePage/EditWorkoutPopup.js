import React, { useState } from 'react';
import WorkoutPopupContent from '../common/WorkoutPopupContent';

export default function CreateWorkoutPage({ workout, close }) {
  const [title, setTitle] = useState(workout.title);
  const [description, setDescription] = useState(workout.description);
  const [targetMuscleGroup, setTargetMuscleGroup] = useState(
    workout.targetMuscleGroup
  );
  const [type, setType] = useState(workout.type);
  const [videoFile, setVideoFile] = useState('');
  const [source, setSource] = useState(workout.videoURL);
  const [paging, setPaging] = useState(1);

  return (
    <WorkoutPopupContent
      changeType={'Edit'}
      paging={paging}
      setPaging={setPaging}
      title={title}
      setTitle={setTitle}
      targetMuscleGroup={targetMuscleGroup}
      setTargetMuscleGroup={setTargetMuscleGroup}
      description={description}
      setDescription={setDescription}
      type={type}
      setType={setType}
      videoFile={videoFile}
      setVideoFile={setVideoFile}
      source={source}
      setSource={setSource}
      close={close}
      workoutId={workout.id}
    />
  );
}
