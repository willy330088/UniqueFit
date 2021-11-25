import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GoListUnordered } from 'react-icons/go';
import { FaTrashAlt } from 'react-icons/fa';
import { firebase } from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/auth';
import muscleGroups from '../../utils/muscleGroup';
import { useSelector } from 'react-redux';

const Content = styled.div`
  width: 550px;
  overflow-y: scroll;
`;

const StyledDnDContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 480px;
`;

const Item = styled.div`
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

const Clone = styled(Item)`
  ~ div {
    transform: none !important;
  }
`;

const Handle = styled.div`
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

const List = styled.div`
  border: 1px solid #ddd;
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
`;

const Kiosk = styled(List)`
  width: 350px;
  overflow-y: scroll;
  background: #ddd;
  border: none;
  border-radius: 5px;
`;

const Container = styled(List)`
  width: 100%;
  margin: auto;
`;

const Notice = styled.div`
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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  console.log(item);

  destClone.splice(droppableDestination.index, 0, {
    title: item.title,
    targetMuscleGroup: item.targetMuscleGroup,
    id: uuid(),
    workoutId: item.id,
    weight: undefined,
    reps: undefined,
  });
  return destClone;
};

function DragAndDrop({ plan, setPlan }) {
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

  function onDragEnd(result) {
    const { source, destination } = result;
    console.log(result);

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

  console.log(plan.workoutSet);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledDnDContainer>
        <Content>
          <Droppable key={1} droppableId={'workoutSet'}>
            {(provided, snapshot) => (
              <Container
                ref={provided.innerRef}
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
                          <Item
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            isDragging={snapshot.isDragging}
                          >
                            <Handle {...provided.dragHandleProps}>
                              <StyledDragIcon />
                            </Handle>
                            <StyledExerciseTitle>
                              <StyledMuscleGroupIcon
                                src={
                                  muscleGroups.filter((muscleGroup) => {
                                    if (
                                      muscleGroup.name ===
                                      item.targetMuscleGroup
                                    )
                                      return muscleGroup;
                                  })[0].src
                                }
                              />
                              <StyledExerciseName>
                                {item.title}
                              </StyledExerciseName>
                            </StyledExerciseTitle>
                            <StyledWeightSet>
                              <StyledWeightInput
                                placeholder={'0'}
                                type="number"
                                min="0"
                                value={item.weight}
                                onChange={(e) => {
                                  setPlan({
                                    workoutSet: plan.workoutSet.filter(
                                      (single) => {
                                        if (single === item) {
                                          single.weight = parseInt(
                                            e.target.value,
                                            10
                                          );
                                          return single;
                                        } else {
                                          return single;
                                        }
                                      }
                                    ),
                                  });
                                }}
                              />
                              <StyledWeightLabel>kg</StyledWeightLabel>
                              <StyledWeightInput
                                placeholder={'0'}
                                type="number"
                                min="0"
                                value={item.reps}
                                onChange={(e) => {
                                  setPlan({
                                    workoutSet: plan.workoutSet.filter(
                                      (single) => {
                                        if (single === item) {
                                          single.reps = parseInt(
                                            e.target.value,
                                            10
                                          );
                                          return single;
                                        } else {
                                          return single;
                                        }
                                      }
                                    ),
                                  });
                                }}
                              />
                              <StyledWeightLabel>reps</StyledWeightLabel>
                            </StyledWeightSet>
                            <StyledRemoveIcon
                              onClick={() => {
                                setPlan({
                                  workoutSet: plan.workoutSet.filter(
                                    (single) => {
                                      if (single !== item) return single;
                                    }
                                  ),
                                });
                              }}
                            />
                          </Item>
                        )}
                      </Draggable>
                    ))
                  : !snapshot.isDraggingOver && (
                      <Notice>Drag Your Workouts From Collections</Notice>
                    )}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </Content>
        <Droppable droppableId="workoutData" isDropDisabled={true}>
          {(provided, snapshot) => (
            <Kiosk
              ref={provided.innerRef}
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
                        <Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        >
                          <StyledExerciseTitle>
                            <StyledMuscleGroupIcon
                              src={
                                muscleGroups.filter((muscleGroup) => {
                                  if (
                                    muscleGroup.name === item.targetMuscleGroup
                                  )
                                    return muscleGroup;
                                })[0].src
                              }
                            />
                            <StyledExerciseName>
                              {item.title}
                            </StyledExerciseName>
                          </StyledExerciseTitle>
                        </Item>
                        {snapshot.isDragging && (
                          <Clone>
                            <StyledExerciseTitle>
                              <StyledMuscleGroupIcon
                                src={
                                  muscleGroups.filter((muscleGroup) => {
                                    if (
                                      muscleGroup.name ===
                                      item.targetMuscleGroup
                                    )
                                      return muscleGroup;
                                  })[0].src
                                }
                              />
                              <StyledExerciseName>
                                {item.title}
                              </StyledExerciseName>
                            </StyledExerciseTitle>
                          </Clone>
                        )}
                      </>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Kiosk>
          )}
        </Droppable>
      </StyledDnDContainer>
    </DragDropContext>
  );
}

export default DragAndDrop;