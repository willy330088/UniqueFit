import React from 'react'
import styled from 'styled-components';
import BannerImg from '../images/banner-1.jpeg'

const StyledBanner = styled.div`
  background-image: url(${BannerImg});
  background-size: cover;
  height: 300px;
  width: 100%;
`;

const StyledBannerTitle = styled.div`
  font-size: 45px;
  color: white;
  position: absolute;
  top: 250px;
  left: 80px
`;

export default function Banner({slogan}) {
  return (
    <StyledBanner>
      <StyledBannerTitle>{slogan}</StyledBannerTitle>
    </StyledBanner>
  )
}