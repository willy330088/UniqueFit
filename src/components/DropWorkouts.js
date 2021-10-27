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
  display: none;
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
  color: #222d35;
  font-size: 30px;
  text-align: center;
`;

export default function DropWorkouts() {
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
                        <StyledMuscleGroupIcon src={AbsImage} />
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
                          <StyledMuscleGroupIcon src={AbsImage} />
                          <StyledExerciseName>
                            {item.content}
                          </StyledExerciseName>
                        </StyledExerciseTitle>
                        <StyledRemoveIcon src={RemoveIcon} />
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
    </DragDropContext>
  )
}
