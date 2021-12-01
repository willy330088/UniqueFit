import React from 'react';
import styled from 'styled-components';

import { StyledBlurringEffectContainer } from './GeneralStyle';
import LogoDumbbell from '../../images/logo-dumbbell.png';

export default function FullPageLoading() {
  return (
    <StyledOverlay>
      <StyledLogoContainer>
        <StyledLogoText1>U</StyledLogoText1>
        <StyledLogoText1>N</StyledLogoText1>
        <StyledLogoText1>I</StyledLogoText1>
        <StyledLogoText1>Q</StyledLogoText1>
        <StyledLogoText1>U</StyledLogoText1>
        <StyledLogoText1>E</StyledLogoText1>
        <StyledLogoText2>F</StyledLogoText2>
        <StyledLogoDumbbell src={LogoDumbbell} />
        <StyledLogoText2>T</StyledLogoText2>
      </StyledLogoContainer>
    </StyledOverlay>
  );
}

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222d35;
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogoContainer = styled(StyledBlurringEffectContainer)`
  display: flex;
  align-items: center;
`;

const StyledLogoText1 = styled.div`
  font-size: 100px;
  color: #1face1;
  margin: 0 5px;
`;

const StyledLogoText2 = styled.div`
  font-size: 100px;
  color: white;
  margin: 0 5px;
`;

const StyledLogoDumbbell = styled.div`
  background-image: url(${LogoDumbbell});
  background-repeat: no-repeat;
  background-size: cover;
  width: 40px;
  height: 80px;
  margin: 0 5px;
`;
