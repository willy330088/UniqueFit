import React, { useState } from 'react';

import WorkoutPopupContent from '../common/WorkoutPopupContent';

export default function CreateWorkoutPage({ close }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetMuscleGroup, setTargetMuscleGroup] = useState('');
  const [type, setType] = useState('Gymworkout');
  const [videoFile, setVideoFile] = useState('');
  const [source, setSource] = useState();
  const [paging, setPaging] = useState(1);

  return (
    <WorkoutPopupContent
      changeType={'Create'}
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
      workoutId={''}
    />
  );
}
