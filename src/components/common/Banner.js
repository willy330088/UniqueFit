import React from 'react';
import styled from 'styled-components';
import BannerImg from '../../images/banner-1.jpeg';

export default function Banner({ slogan }) {
  return (
    <StyledBanner>
      <StyledBannerTitle>{slogan}</StyledBannerTitle>
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  background-image: url(${BannerImg});
  background-size: cover;
  height: 210px;
  width: 100%;
  position: relative;
  margin-top: 80px;

  @media (min-width: 700px) {
    height: 300px;
  }
`;

const StyledBannerTitle = styled.div`
  font-size: 45px;
  color: white;
  position: absolute;
  top: 90px;
  left: 60px;

  @media (min-width: 700px) {
    top: 160px;
    left: 80px;
  }
`;
