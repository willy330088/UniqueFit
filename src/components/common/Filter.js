import React, { useState } from 'react';
import styled from 'styled-components';
import { ImCancelCircle } from 'react-icons/im';
import { FaFilter } from 'react-icons/fa';
import Popup from 'reactjs-popup';

import usePopup from '../../hooks/usePopup';
import FrontMuscle from './FrontMuscle';
import BackMuscle from './BackMuscle';
import SpinHover from '../../images/spin-icon-hover.png';
import Spin from '../../images/spin-icon.png';

export default function Filter({
  filteredMuscleGroups,
  setFilteredMuscleGroups,
}) {
  const [open, setOpen, close] = usePopup();
  const [isFront, setIsFront] = useState(true);
  const [popupTitle, setPopupTitle] = useState('');

  function removeFilter(name) {
    setFilteredMuscleGroups(
      filteredMuscleGroups.filter((muscle) => muscle !== name)
    );
  }

  return (
    <StyledFilterContainer filteredMuscleGroups={filteredMuscleGroups}>
      <StyledPopup open={open} closeOnDocumentClick onClose={close}>
        <StyledPopupTitle>
          {popupTitle === '' ? 'Select Muscle Groups' : popupTitle}
        </StyledPopupTitle>
        <StyledPopupIconContainer>
          <StyledPopupSpinIcon
            onClick={() => {
              setIsFront(!isFront);
            }}
          />
          {isFront ? (
            <FrontMuscle
              filteredMuscleGroups={filteredMuscleGroups}
              setFilteredMuscleGroups={setFilteredMuscleGroups}
              setPopupTitle={setPopupTitle}
            />
          ) : (
            <BackMuscle
              filteredMuscleGroups={filteredMuscleGroups}
              setFilteredMuscleGroups={setFilteredMuscleGroups}
              setPopupTitle={setPopupTitle}
            />
          )}
        </StyledPopupIconContainer>
        <StyledPopupFilterTagContainer>
          {filteredMuscleGroups.map((item) => {
            return (
              <StyledFilterTag key={item}>
                <StyledFilterTagTitle>{item}</StyledFilterTagTitle>
                <StyledCancelIcon
                  onClick={() => {
                    removeFilter(item);
                  }}
                />
              </StyledFilterTag>
            );
          })}
        </StyledPopupFilterTagContainer>
      </StyledPopup>
      <StyledFilterContentContainer
        onClick={() => {
          setOpen(true);
        }}
      >
        <StyledFilterIcon />
        <StyledFilterContentTitle>
          Filter by Muscle Groups
        </StyledFilterContentTitle>
      </StyledFilterContentContainer>
      <StyledFilterTagContainer>
        {filteredMuscleGroups.map((item) => {
          return (
            <StyledFilterTag key={item}>
              <StyledFilterTagTitle>{item}</StyledFilterTagTitle>
              <StyledCancelIcon
                onClick={() => {
                  removeFilter(item);
                }}
              />
            </StyledFilterTag>
          );
        })}
      </StyledFilterTagContainer>
    </StyledFilterContainer>
  );
}

const StyledFilterContainer = styled.div`
  width: fit-content;
  height: 50px;
  margin: 20px 0 30px 0;
  transition: ease-in-out 0.3s;

  @media (min-width: 520px) {
    margin: 50px 0 30px 0;
    height: ${(props) =>
      props.filteredMuscleGroups.length === 0 ? '50px' : '150px'};
  }

  @media (min-width: 1050px) {
    height: ${(props) =>
      props.filteredMuscleGroups.length === 0 ? '50px' : '110px'};
  }
`;

const StyledFilterContentTitle = styled.div`
  color: white;
  font-size: 25px;
`;

const StyledFilterIcon = styled(FaFilter)`
  color: white;
  font-size: 22px;
  margin-right: 10px;
`;

const StyledFilterContentContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover ${StyledFilterContentTitle} {
    color: hsla(196, 76%, 70%);
  }

  &:hover ${StyledFilterIcon} {
    color: hsla(196, 76%, 70%);
  }
`;

const StyledFilterTagContainer = styled.div`
  display: none;

  @media (min-width: 520px) {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }
`;

const StyledPopupFilterTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  height: 80px;
  overflow-y: scroll;
`;

const StyledFilterTag = styled.div`
  background-color: #1face1;
  height: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  margin-right: 10px;
  margin-bottom: 10px;

  @media (min-width: 600px) {
    margin-right: 20px;
    height: 30px;
  }
`;

const StyledFilterTagTitle = styled.div`
  color: white;
  font-size: 15px;
  margin-right: 10px;

  @media (min-width: 600px) {
    font-size: 20px;
  }
`;

const StyledCancelIcon = styled(ImCancelCircle)`
  color: white;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    color: black;
  }

  @media (min-width: 600px) {
    font-size: 20px;
  }
`;

const StyledPopupTitle = styled.div`
  color: #1face1;
  font-size: 25px;
  text-align: center;

  @media (min-width: 600px) {
    font-size: 40px;
  }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 350px;
    height: 400px;
    padding: 20px 20px;
    position: relative;
    border-radius: 5px;
    @media (min-width: 600px) {
      width: 550px;
      height: 580px;
      padding: 30px 60px;
    }
  }
`;

const StyledPopupIconContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: solid 3px hsla(196, 76%, 30%);
`;

const StyledPopupSpinIcon = styled.div`
  position: absolute;
  bottom: 125px;
  left: 60px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-image: url(${Spin});
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotate(0.5turn);

  &:hover {
    background-image: url(${SpinHover});
  }

  @media (min-width: 600px) {
    width: 60px;
    height: 60px;
    bottom: 150px;
    left: 100px;
  }
`;
