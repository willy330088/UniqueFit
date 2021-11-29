import React from 'react';
import styled from 'styled-components';
import HippoGif from '../../images/hippo.gif';
import { useHistory } from 'react-router-dom';
import { StyledGeneralBtn } from '../common/GeneralStyle';

export default function NoResult({ type }) {
  const history = useHistory();

  return (
    <StyledNoResultContainer>
      <StyledNoResultGif src={HippoGif} />
      <StyledNoResultTextContainer>
        <StyledNoResultText>
          {type === 'workout' ? 'No Workouts Yet...' : 'No Plans Yet...'}
        </StyledNoResultText>
        <StyledNoResultLink
          onClick={() => {
            if (type === 'workout') {
              history.push('/workouts');
            } else {
              history.push('/plans');
            }
          }}
        >
          Checkout More
        </StyledNoResultLink>
      </StyledNoResultTextContainer>
    </StyledNoResultContainer>
  );
}

const StyledNoResultContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  background-color: hsla(205, 22%, 30%);
  border-radius: 5px;
`;

const StyledNoResultGif = styled.img`
  width: 350px;

  @media (min-width: 500px) {
    width: 450px;
  }
`;

const StyledNoResultTextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledNoResultText = styled.div`
  font-size: 35px;
  color: #1face1;
  margin: 10px 0 30px 0;
`;

const StyledNoResultLink = styled(StyledGeneralBtn)`
  font-size: 25px;
  height: 40px;
  width: fit-content;
  line-height: 40px;
  padding: 0 10px;
`;
