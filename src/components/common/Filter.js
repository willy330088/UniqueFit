import React, { useState } from 'react';
import styled from 'styled-components';
import FrontMuscle from './FrontMuscle';
import BackMuscle from './BackMuscle';
import Popup from 'reactjs-popup';
import { ImCancelCircle } from 'react-icons/im';
import { FaFilter } from 'react-icons/fa';
import SpinHover from '../../images/spin-hover.png';
import Spin from '../../images/spin.png';

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

const StyledFilterContentContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StyledFilterContentTitle = styled.div`
  color: ${(props) => (props.hover ? 'hsla(196, 76%, 70%)' : 'white')};
  font-size: 25px;
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
  height: 30px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const StyledFilterTagTitle = styled.div`
  color: white;
  font-size: 20px;
  margin-right: 10px;
`;

const StyledCancelIcon = styled(ImCancelCircle)`
  color: white;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const StyledFilterIcon = styled(FaFilter)`
  color: ${(props) => (props.hover ? 'hsla(196, 76%, 70%)' : 'white')};
  font-size: 22px;
  margin-right: 10px;
`;

const StyledPopupTitle = styled.div`
  color: #1face1;
  font-size: 40px;
  text-align: center;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 550px;
    height: 580px;
    padding: 30px 60px;
    position: relative;
    border-radius: 5px;
  }
`;

const StyledPopupIconContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: solid 3px hsla(196, 76%, 30%);
`;

const StyledPopupSpinIcon = styled.div`
  position: absolute;
  bottom: 150px;
  left: 100px;
  cursor: pointer;
  width: 60px;
  height: 60px;
  background-image: url(${Spin});
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotate(0.5turn);

  &:hover {
    background-image: url(${SpinHover});
  }
`;

export default function Filter({
  filteredMuscleGroups,
  setFilteredMuscleGroups,
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [isFront, setIsFront] = useState(true);
  const [popupTitle, setPopupTitle] = useState('');
  const [hover, setHover] = useState(false);

  function removeFilter(name) {
    setFilteredMuscleGroups(
      filteredMuscleGroups.filter((muscle) => {
        if (muscle !== name) return muscle;
      })
    );
  }

  return (
    <StyledFilterContainer filteredMuscleGroups={filteredMuscleGroups}>
      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
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
              width={'200px'}
              filteredMuscleGroups={filteredMuscleGroups}
              setFilteredMuscleGroups={setFilteredMuscleGroups}
              clickDisabled={false}
              setPopupTitle={setPopupTitle}
            />
          ) : (
            <BackMuscle
              width={'200px'}
              filteredMuscleGroups={filteredMuscleGroups}
              setFilteredMuscleGroups={setFilteredMuscleGroups}
              clickDisabled={false}
              setPopupTitle={setPopupTitle}
            />
          )}
        </StyledPopupIconContainer>
        <StyledPopupFilterTagContainer>
          {filteredMuscleGroups.map((item) => {
            return (
              <StyledFilterTag>
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
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <StyledFilterIcon hover={hover} />
        <StyledFilterContentTitle hover={hover}>
          Filter by Muscle Groups
        </StyledFilterContentTitle>
      </StyledFilterContentContainer>
      <StyledFilterTagContainer>
        {filteredMuscleGroups.map((item) => {
          return (
            <StyledFilterTag>
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
