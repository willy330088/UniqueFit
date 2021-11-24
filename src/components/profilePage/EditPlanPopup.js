import React, { useState, useEffect } from 'react';
import DragandDrop from '../common/Drag&Drop';
import styled from 'styled-components';
import { AiOutlineRightCircle, AiOutlineLeftCircle } from 'react-icons/ai';
import PlanDetailsInputP1 from '../common/PlanDetailsInputP1';
import PlanDetailsInputP2 from '../common/PlanDetailsInputP2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebase } from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import { v4 as uuid } from 'uuid';

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

const StyledCreateWorkoutBtn = styled.div`
  font-size: 20px;
  height: 40px;
  width: 120px;
  cursor: ${(props) => (props.createDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.createDisabled ? '#d1d1d1' : '#1face1')};
  border-radius: 5px;
  background-color: ${(props) =>
    props.createDisabled ? '#969696' : 'transparent'};
  text-align: center;
  line-height: 40px;
  margin: 10px 0;
  border: ${(props) => (props.createDisabled ? 'none' : '2px solid #1face1')};

  &:hover {
    color: ${(props) => (props.createDisabled ? '#d1d1d1' : 'white')};
    background-color: ${(props) =>
      props.createDisabled ? '#969696' : '#1face1'};
  }

  @media (min-width: 500px) {
    font-size: 35px;
    height: 50px;
    width: 200px;
    line-height: 46px;
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

export default function CreatePlanPage({
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
  const [createDisabled, setCreateDisabled] = useState(false);
  const [plan, setPlan] = useState({
    workoutSet: [],
  });

  useEffect(() => {
    console.log('hi');
    Promise.all(
      originalPlan.workoutSet.map((workout) => {
        return firebase
          .firestore()
          .collection('workouts')
          .doc(workout.workoutId)
          .get();
      })
    ).then((values) => {
      setPlan({
        workoutSet: values.map((value, index) => {
          const reps = originalPlan.workoutSet[index].reps;
          const weight = originalPlan.workoutSet[index].weight;
          const workoutId = value.id;
          const id = uuid();
          return { ...value.data(), workoutId, reps, weight, id };
        }),
      });
    });
  }, []);

  function savePlan() {
    if (createDisabled) {
      return;
    } else {
      setCreateDisabled(true);
      const documentRef = firebase
        .firestore()
        .collection('plans')
        .doc(originalPlan.id);
      let checked = false;

      if (title === '') {
        toast.error('Please fill in title', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      } else if (!estimatedTrainingTime) {
        toast.error('Please fill in estimated training time', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      } else if (description === '') {
        toast.error('Please fill in description', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      } else if (plan.workoutSet.length === 0) {
        toast.error('Please add workouts', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        return;
      }

      plan.workoutSet.every((workout) => {
        checked = false;
        if (!workout.reps || !workout.weight) {
          toast.error(`Please fill in weights and reps`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          return false;
        }
        checked = true;
        return true;
      });

      if (checked) {
        const planEditing = toast.loading('Editing Plan...', {
          position: toast.POSITION.TOP_CENTER,
        });

        documentRef
          .update({
            title: title,
            public: publicity,
            description: description,
            targetMuscleGroup: targetMuscleGroup,
            estimatedTrainingTime: estimatedTrainingTime,
            workoutSet: plan.workoutSet.map((item) => {
              return {
                workoutId: item.workoutId,
                reps: item.reps,
                weight: item.weight,
                title: item.title,
              };
            }),
          })
          .then(() => {
            toast.update(planEditing, {
              render: 'Edited Successfully',
              type: 'success',
              isLoading: false,
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
            close();
            setCreateDisabled(false);
          });
      }
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
    } else if (paging === 2) {
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
          <DragandDrop plan={plan} setPlan={setPlan} />
          <StyledChangeWorkoutBtnContainer>
            <StyledCreateWorkoutBtn
              onClick={savePlan}
              createDisabled={createDisabled}
            >
              Save
            </StyledCreateWorkoutBtn>
          </StyledChangeWorkoutBtnContainer>
        </>
      );
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
