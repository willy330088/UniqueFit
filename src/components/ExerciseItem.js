import React from 'react'
import styled from 'styled-components';

const StyledExerciseItemContainer = styled.div`
  display: flex;
`;

const StyledExerciseItemImage = styled.img`
  width: 100px;
`;

export default function ExerciseItem(props) {
  return (
    <StyledExerciseItemContainer>
      <StyledExerciseItemImage src={props.img}/>
    </StyledExerciseItemContainer>
  )
}
