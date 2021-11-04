import React from 'react';
import styled from 'styled-components';
import muscleGroupImage from '../utils/muscleGroup';
import FrontMuscle from './FrontMuscle';
import BackMuscle from './BackMuscle';
import Popup from 'reactjs-popup';

const StyledFilterContainer = styled.div`
  display: none;
  @media (min-width: 800px) {
    width: 100%;
    height: 200px;
    background-color: #ddd;
    display: flex;
    margin: 30px auto 30px;
    align-items: center;
    justify-content: space-around;
  }
`;

const StyledFilterMuscleGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 450px;
  height: 180px;
  background: #ddd;
  margin: 20px;
  border-radius: 5px;
`;

const StyledMuscleGroupImage = styled.img`
  flex: 1 20%;
  width: 50px;
  cursor: pointer;
  border-radius: 50%;
  border: ${(props) => (props.selected ? '3px solid #1face1' : 'none')};

  &:hover {
    border: 3px solid #a2dff5;
  }
`;

const StyledFilterMuscleIcons = styled.div`
  background: #ddd;
  border-radius: 5px;
  padding: 5px;
  margin: 20px;
  z-index: 10;
  cursor: pointer;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    background: #ddd;
    width: 700px;
    height: 550px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

export default function Filter({
  filteredMuscleGroups,
  setFilteredMuscleGroups,
}) {

  function toggleMuscleClick(name) {
    if (filteredMuscleGroups.includes(name)) {
      setFilteredMuscleGroups(
        filteredMuscleGroups.filter((muscle) => {
          if (muscle !== name) return muscle;
        })
      );
    } else {
      setFilteredMuscleGroups([...filteredMuscleGroups, name]);
    }
  }

  return (
    <StyledFilterContainer>
      <StyledFilterMuscleGroups>
        {muscleGroupImage.map((muscle) => {
          return (
            <StyledMuscleGroupImage
              key={muscle.name}
              src={muscle.src}
              onClick={() => {
                toggleMuscleClick(muscle.name);
              }}
              selected={filteredMuscleGroups.includes(muscle.name)}
            />
          );
        })}
      </StyledFilterMuscleGroups>
      <StyledPopup
        trigger={
          <StyledFilterMuscleIcons>
            <FrontMuscle
              width={'100px'}
              filteredMuscleGroups={filteredMuscleGroups}
              setFilteredMuscleGroups={setFilteredMuscleGroups}
              clickDisabled={true}
            />
            <BackMuscle
              width={'100px'}
              filteredMuscleGroups={filteredMuscleGroups}
              setFilteredMuscleGroups={setFilteredMuscleGroups}
              clickDisabled={true}
            />
          </StyledFilterMuscleIcons>
        }
        modal
        nested
      >
        {(close) => (
          <>
            <FrontMuscle
              width={'300px'}
              filteredMuscleGroups={filteredMuscleGroups}
              setFilteredMuscleGroups={setFilteredMuscleGroups}
              clickDisabled={false}
            />
            <BackMuscle
              width={'300px'}
              filteredMuscleGroups={filteredMuscleGroups}
              setFilteredMuscleGroups={setFilteredMuscleGroups}
              clickDisabled={false}
            />
          </>
        )}
      </StyledPopup>
    </StyledFilterContainer>
  );
}
