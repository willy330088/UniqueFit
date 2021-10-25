import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Logo from '../images/logo.png';
import HamIcon from '../images/menu.png';
import Sidebar from 'react-sidebar';

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 0 20px;
  background-color: #222d35;
  align-items: center;
  justify-content: center;
  @media (min-width: 950px) {
    height: 130px;
    justify-content: space-between;
  }
`;

const StyledLogo = styled.img`
  height: 40px;
  margin-left: 20px;
  @media (min-width: 950px) {
    height: 60px;
  }
`;

const StyledHamIcon = styled.img`
  height: 30px;
  position: absolute;
  left: 40px;
  top: 35px;
  @media (min-width: 950px) {
    display: none;
  }
`;

const StyledLink = styled(NavLink)`
  color: white;
  font-size: 20px;
  text-decoration: none;
  margin: 0 20px 0 20px;
  &:hover {
    color: #1face1;
  }
`;

const StyledNavBar = styled.div`
  display: none;
  @media (min-width: 950px) {
    display: block;
  }
`;

const StyledSidebar = styled(Sidebar)`
  @media (min-width: 950px) {
    display: none;
  }
`;

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <StyledHeader>
      <StyledLogo src={Logo} />
      <StyledNavBar>
        <StyledLink to="/gymworkout" activeStyle={{ color: '#1face1' }}>
          Gym Workout
        </StyledLink>
        <StyledLink to="/homeworkout" activeStyle={{ color: '#1face1' }}>
          Home Workout
        </StyledLink>
        <StyledLink to="/createplan" activeStyle={{ color: '#1face1' }}>
          Create A Plan
        </StyledLink>
        <StyledLink to="/createworkout" activeStyle={{ color: '#1face1' }}>
          Create A Workout
        </StyledLink>
        <StyledLink to="/profile" activeStyle={{ color: '#1face1' }}>
          Profile
        </StyledLink>
      </StyledNavBar>
      {/* <StyledSidebar
        sidebar={
          <>
            <StyledLink to="/gymworkout" activeStyle={{ color: '#1face1' }}>
              Gym Workout
            </StyledLink>
            <StyledLink to="/homeworkout" activeStyle={{ color: '#1face1' }}>
              Home Workout
            </StyledLink>
            <StyledLink to="/createplan" activeStyle={{ color: '#1face1' }}>
              Create A Plan
            </StyledLink>
          </>
        }
        open={sidebarOpen}
        styles={{ sidebar: { background: 'white' } }}
      >
        <StyledHamIcon
          src={HamIcon}
          onClick={() => {
            setSidebarOpen(true)
          }}
        />
      </StyledSidebar> */}
    </StyledHeader>
  );
}
