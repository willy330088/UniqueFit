import { v4 as uuid } from 'uuid';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RemoveIcon from '../images/remove.png';
import { GoListUnordered } from 'react-icons/go';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import 'firebase/auth';
import muscleGroups from '../utils/muscleGroup';

const Content = styled.div`
`;

const StyledDnDContainer = styled.div`
  display: flex;
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
  border: 1px ${(props) => (props.isDragging ? 'dashed #000' : 'solid #ddd')};
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
  border: 1px
    ${(props) => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
  background: #fff;
  padding: 0.5rem 0.5rem 0;
  border-radius: 3px;
  /* flex: 0 0 150px; */
`;

const Kiosk = styled(List)`
  overflow-y: scroll;
  background: #ddd;
  border: none;
  border-radius: 0;
  padding: 40px;
`;

const Container = styled(List)`
  width: 520px;
  margin: auto;
`;

const Notice = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0 0.5rem 0.5rem;
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const StyledRemoveIcon = styled.img`
  width: 50px;
  cursor: pointer;
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

  destClone.splice(droppableDestination.index, 0, {
    title: item.title,
    targetMuscleGroup: item.targetMuscleGroup,
    id: uuid(),
    workoutId: item.id,
    weight: 0,
    reps: 0,
  });
  return destClone;
};

function DragAndDrop({ plan, setPlan }) {
  const [workoutData, setWorkoutData] = useState([]);
  const [gymWorkoutTypeSelected, setGymWorkoutTypeSelected] = useState(true);

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
      console.log([source.droppableId]);
    } else {
      setPlan({
        workoutSet: copy(
          workoutData,
          plan[destination.droppableId],
          source,
          destination
        ),
      });
    }
  }

  useEffect(() => {
    firebase
      .firestore()
      .collection('workouts')
      .where('collectedBy', 'array-contains', firebase.auth().currentUser.uid)
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setWorkoutData(data);
      });
  }, []);

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
                            <StyledWeightSet>
                              <StyledWeightInput
                                placeholder={'0'}
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
                              src={RemoveIcon}
                              onClick={() => {
                                setPlan({
                                  workoutSet: plan.workoutSet.filter((single) => {
                                    if (single !== item) return single;
                                  }),
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
              {workoutData.map((item, index) => {
                if (gymWorkoutTypeSelected) {
                  if (item.type === 'Gymworkout') {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
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
                  }
                } else {
                  if (item.type === 'Homeworkout') {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
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
                  }
                }
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
