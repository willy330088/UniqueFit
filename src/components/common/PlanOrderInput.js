import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GoListUnordered } from 'react-icons/go';
import { FaTrashAlt } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';

import muscleGroups from '../../utils/muscleGroup';

export default function DragAndDrop({ plan, setPlan }) {
  const [gymWorkoutTypeSelected, setGymWorkoutTypeSelected] = useState(true);
  const workouts = useSelector((state) => state.workouts);
  const currentUser = useSelector((state) => state.currentUser);

  const collectedWorkouts = workouts.filter((workout) =>
    workout.collectedBy.includes(currentUser?.uid)
  );

  const modifiedWorkouts = collectedWorkouts.map((workout, index) => {
    return { ...workout, index };
  });

  function showCollectionWorkout() {
    if (gymWorkoutTypeSelected) {
      return modifiedWorkouts.filter(
        (workout) => workout.type === 'Gymworkout'
      );
    } else {
      return modifiedWorkouts.filter(
        (workout) => workout.type === 'Homeworkout'
      );
    }
  }

  function showMuscleImage(item) {
    return muscleGroups.filter(
      (muscleGroup) => muscleGroup.name === item.targetMuscleGroup
    )[0].src;
  }

  function setPlanNumValue(e, item, type) {
    setPlan({
      workoutSet: plan.workoutSet.reduce((arr, cur) => {
        if (cur === item) {
          if (e.target.value === '') {
            cur[type] = e.target.value;
          } else if (Number(e.target.value)) cur[type] = Number(e.target.value);
        }
        return arr;
      }, plan.workoutSet),
    });
  }

  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function copy(source, destination, droppableSource, droppableDestination) {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, {
      title: item.title,
      targetMuscleGroup: item.targetMuscleGroup,
      id: uuid(),
      workoutId: item.id,
      weight: '',
      reps: '',
    });
    return destClone;
  }

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      setPlan({
        workoutSet: reorder(
          plan[source.droppableId],
          source.index,
          destination.index
        ),
      });
    } else {
      setPlan({
        workoutSet: copy(
          modifiedWorkouts,
          plan[destination.droppableId],
          source,
          destination
        ),
      });
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledDnDContainer>
        <StyledContent>
          <Droppable key={1} droppableId={'workoutSet'}>
            {(provided, snapshot) => (
              <StyledContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {plan.workoutSet.length
                  ? plan.workoutSet.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <StyledItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            isDragging={snapshot.isDragging}
                          >
                            <StyledHandle {...provided.dragHandleProps}>
                              <StyledDragIcon />
                            </StyledHandle>
                            <StyledExerciseTitle>
                              <StyledMuscleGroupIcon
                                src={showMuscleImage(item)}
                              />
                              <StyledExerciseName>
                                {item.title}
                              </StyledExerciseName>
                            </StyledExerciseTitle>
                            <StyledWeightSet>
                              <StyledWeightInput
                                placeholder={'1'}
                                value={item.weight}
                                onChange={(e) => {
                                  setPlanNumValue(e, item, 'weight');
                                }}
                              />
                              <StyledWeightLabel>kg</StyledWeightLabel>
                              <StyledWeightInput
                                placeholder={'1'}
                                value={item.reps}
                                onChange={(e) => {
                                  setPlanNumValue(e, item, 'reps');
                                }}
                              />
                              <StyledWeightLabel>reps</StyledWeightLabel>
                            </StyledWeightSet>
                            <StyledRemoveIcon
                              onClick={() => {
                                setPlan({
                                  workoutSet: plan.workoutSet.filter(
                                    (single) => single !== item
                                  ),
                                });
                              }}
                            />
                          </StyledItem>
                        )}
                      </Draggable>
                    ))
                  : !snapshot.isDraggingOver && (
                      <StyledNotice>
                        Drag Your Workouts From Collections
                      </StyledNotice>
                    )}
                {provided.placeholder}
              </StyledContainer>
            )}
          </Droppable>
        </StyledContent>
        <Droppable droppableId="workoutData" isDropDisabled={true}>
          {(provided, snapshot) => (
            <StyledKiosk
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <StyledCollectionTitle>Collections</StyledCollectionTitle>
              <StyledBookmark>
                <StyledWorkoutTypeTag
                  selected={gymWorkoutTypeSelected}
                  onClick={() => {
                    setGymWorkoutTypeSelected(true);
                  }}
                >
                  Gym Workout
                </StyledWorkoutTypeTag>
                <StyledWorkoutTypeSeparator>|</StyledWorkoutTypeSeparator>
                <StyledWorkoutTypeTag
                  selected={!gymWorkoutTypeSelected}
                  onClick={() => {
                    setGymWorkoutTypeSelected(false);
                  }}
                >
                  Home Workout
                </StyledWorkoutTypeTag>
              </StyledBookmark>
              {showCollectionWorkout().map((item) => {
                return (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={item.index}
                  >
                    {(provided, snapshot) => (
                      <>
                        <StyledItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        >
                          <StyledExerciseTitle>
                            <StyledMuscleGroupIcon
                              src={showMuscleImage(item)}
                            />
                            <StyledExerciseName>
                              {item.title}
                            </StyledExerciseName>
                          </StyledExerciseTitle>
                        </StyledItem>
                        {snapshot.isDragging && (
                          <StyledClone>
                            <StyledExerciseTitle>
                              <StyledMuscleGroupIcon
                                src={showMuscleImage(item)}
                              />
                              <StyledExerciseName>
                                {item.title}
                              </StyledExerciseName>
                            </StyledExerciseTitle>
                          </StyledClone>
                        )}
                      </>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </StyledKiosk>
          )}
        </Droppable>
      </StyledDnDContainer>
    </DragDropContext>
  );
}

const StyledContent = styled.div`
  width: 550px;
  overflow-y: scroll;
`;

const StyledDnDContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 480px;
`;

const StyledItem = styled.div`
  display: flex;
  height: 70px;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
  justify-content: space-between;
  align-items: center;
  align-content: flex-start;
  line-height: 1.5;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const StyledClone = styled(StyledItem)`
  ~ div {
    transform: none !important;
  }
`;

const StyledHandle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem 0.5rem -0.5rem -0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  border-radius: 3px 0 0 3px;
  background: #fff;
  border-right: 1px solid #ddd;
  color: #000;
`;

const StyledList = styled.div`
  border: 1px solid #ddd;
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
`;

const StyledKiosk = styled(StyledList)`
  width: 350px;
  overflow-y: scroll;
  background: #ddd;
  border: none;
  border-radius: 5px;
`;

const StyledContainer = styled(StyledList)`
  width: 100%;
  margin: auto;
`;

const StyledNotice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  font-size: 20px;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const StyledRemoveIcon = styled(FaTrashAlt)`
  font-size: 20px;
  cursor: pointer;
  color: hsla(0, 0%, 70%);
  &:hover {
    color: hsla(0, 0%, 50%);
  }
`;

const StyledExerciseTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
  align-items: center;
`;

const StyledExerciseName = styled.div`
  margin-left: 20px;
  font-size: 20px;
`;

const StyledMuscleGroupIcon = styled.img`
  width: 50px;
`;

const StyledCollectionTitle = styled.div`
  color: #222d35;
  font-size: 30px;
  text-align: center;
  margin-bottom: 15px;
`;

const StyledWeightInput = styled.input`
  width: 40px;
  margin-right: 10px;
  outline: none;
`;

const StyledWeightLabel = styled.label`
  font-size: 20px;
  margin-right: 10px;
`;

const StyledWeightSet = styled.div`
  margin-left: auto;
`;

const StyledDragIcon = styled(GoListUnordered)`
  font-size: 20px;
`;

const StyledBookmark = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-around;
`;

const StyledWorkoutTypeTag = styled.div`
  color: ${(props) => (props.selected ? '#1face1' : '#808080')};
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #1face1;
  }
`;

const StyledWorkoutTypeSeparator = styled.div`
  color: #222d35;
  font-size: 20px;
  margin: 0 10px;
`;
