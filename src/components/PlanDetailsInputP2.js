import React from 'react';
import styled from 'styled-components';
import { MdPublic, MdPublicOff } from 'react-icons/md';

const StyledPlanDetails = styled.div`
  width: 100%;
`;

const StyledCreateLabel = styled.div`
  color: #1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;
`;

const StyledDescriptionInput = styled.textarea`
  width: 100%;
  height: 150px;
  font-size: 20px;
  outline: none;
  margin-bottom: 50px;
`;

const StyledToggle = styled.button`
  width: 80px;
  height: 40px;
  position: relative;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  background-color: ${(props) => (props.public ? '#1face1' : '#353b48')};
  border: 3px solid white;

  &::after {
    content: '';
    position: absolute;
    top: 0px;
    right: 5px;
    will-change: transform;
    transform: translate(${(props) => (props.public ? 5.5 : -35)}px);
    transition: transform 0.2s ease-out;
    width: 30px;
    height: 30px;
    background: white;
    border: 2px solid #7f8fa6;
    outline: none;
    border-radius: 50%;
  }
`;

const StyledToggleSet = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const StyledPublicOnIcon = styled(MdPublic)`
  color: white;
  font-size: 40px;
  margin-right: 20px;
`;

const StyledPublicOffIcon = styled(MdPublicOff)`
  color: white;
  font-size: 40px;
  margin-right: 20px;
`;

export default function PlanDetailsInput({
  description,
  setDescription,
  publicity,
  setPublicity,
}) {

  return (
    <StyledPlanDetails>
      <StyledCreateLabel>Description</StyledCreateLabel>
      <StyledDescriptionInput
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      />
      <StyledCreateLabel>Public</StyledCreateLabel>
      <StyledToggleSet>
        {publicity? <StyledPublicOnIcon/> : <StyledPublicOffIcon/> }
        <StyledToggle public={publicity} onClick={() => setPublicity(!publicity)} />
      </StyledToggleSet>
    </StyledPlanDetails>
  );
}