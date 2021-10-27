import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RemoveIcon from '../images/remove.png';
import AbsImage from '../images/muscle group/abs.png';

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
    ...item,
    id: uuid(),
    exercise_id: item.id,
  });
  return destClone;
};

const Content = styled.div`
  margin-right: 400px;
  padding: 30px 15% 200px;
`;

const Item = styled.div`
  display: flex;
  height: 70px;
  user-select: none;
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
  position: absolute;
  top: 430px;
  right: 0;
  bottom: 0;
  width: 400px;
  overflow-y: scroll;
  background: #ddd;
  border: none;
  border-radius: 0;
  height: 100vh;
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
  border: 1px solid transparent;
  line-height: 1.5;
  color: #aaa;
`;

const StyledRemoveIcon = styled.img`
  width: 50px;
  cursor: pointer;
  margin-left: auto;
`;

const StyledExerciseTitle = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledExerciseName = styled.div`
  margin-left: 20px;
  font-size: 30px;
`;

const StyledMuscleGroupIcon = styled.img`
  width: 50px;
`;

const StyledCollectionTitle = styled.div`
  color:#222d35;
  font-size: 30px;
  text-align:center;
`;

const ITEMS = [
  {
    id: '1',
    content: 'Push up',
  },
  {
    id: '2',
    content: 'Dumbell curl',
  },
  {
    id: '3',
    content: 'Biceps',
  },
  {
    id: '4',
    content: 'Triceps',
  },
  {
    id: '5',
    content: 'Back',
  },
];

function DragAndDrop() {
  const [items, setItems] = useState(ITEMS);
  const [plan, setPlan] = useState({
    order: [],
  });
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      setPlan({
        order: reorder(
          plan[source.droppableId],
          source.index,
          destination.index
        ),
      });
    } else {
      setPlan({
        order: copy(items, plan[destination.droppableId], source, destination),
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="ITEMS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <Kiosk
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <StyledCollectionTitle>Collections</StyledCollectionTitle>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <>
                    <Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      // style={provided.draggableProps.style}
                    >
                      <StyledExerciseTitle>
                        <StyledMuscleGroupIcon src= {AbsImage} />
                        <StyledExerciseName>{item.content}</StyledExerciseName>
                      </StyledExerciseTitle>
                      <StyledRemoveIcon
                        src={RemoveIcon}
                        onClick={() => {
                          setItems(
                            items.filter((single) => {
                              if (single !== item) return single;
                            })
                          );
                        }}
                      />
                    </Item>
                    {snapshot.isDragging && (
                      <Clone>
                        <StyledExerciseTitle>
                          <StyledMuscleGroupIcon src= {AbsImage} />
                          <StyledExerciseName>{item.content}</StyledExerciseName>
                        </StyledExerciseTitle>
                        <StyledRemoveIcon
                          src={RemoveIcon}
                        />
                      </Clone>
                    )}
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Kiosk>
        )}
      </Droppable>
      <Content>
        <Droppable key={1} droppableId={'order'}>
          {(provided, snapshot) => (
            <Container
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {plan.order.length
                ? plan.order.map((item, index) => (
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
                          // style={provided.draggableProps.style}
                        >
                          <Handle {...provided.dragHandleProps}>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                              />
                            </svg>
                          </Handle>
                          <StyledExerciseTitle>
                            <StyledMuscleGroupIcon src= {AbsImage} />
                            <StyledExerciseName>{item.content}</StyledExerciseName>
                          </StyledExerciseTitle>
                          <StyledRemoveIcon
                            src={RemoveIcon}
                            onClick={() => {
                              setPlan({
                                order: plan.order.filter((single) => {
                                  if (single !== item) return single;
                                }),
                              });
                            }}
                          />
                        </Item>
                      )}
                    </Draggable>
                  ))
                : !snapshot.isDraggingOver && <Notice>Drag Your Favorite Exercises</Notice>}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </Content>
      {/* <button
        onClick={() => {
          console.log(plan);
        }}
      >
        click
      </button> */}
    </DragDropContext>
  );
}

export default DragAndDrop;