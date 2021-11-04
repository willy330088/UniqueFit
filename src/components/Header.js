import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Logo from '../images/logo.png';
import Burger from './Burger';

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

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ddd;
  width: 100%;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 5;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};

  @media (min-width: 700px) {
    width: 50%;
  }
`;


export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <StyledHeader>
      <Burger open={open} setOpen={setOpen}/>
      <StyledMenu  open={open}>
        <StyledLink to="/workouts" activeStyle={{ color: '#1face1' }}>
          Workouts
        </StyledLink>
        <StyledLink to="/plans" activeStyle={{ color: '#1face1' }}>
          Plans
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
      </StyledMenu>
      <StyledLogo src={Logo} />
      <StyledNavBar>
        <StyledLink to="/workouts" activeStyle={{ color: '#1face1' }}>
          Workouts
        </StyledLink>
        <StyledLink to="/plans" activeStyle={{ color: '#1face1' }}>
          Plans
        </StyledLink>
        <StyledLink to="/createworkout" activeStyle={{ color: '#1face1' }}>
          Create A Workout
        </StyledLink>
        <StyledLink to="/createplan" activeStyle={{ color: '#1face1' }}>
          Create A Plan
        </StyledLink>
        <StyledLink to="/profile" activeStyle={{ color: '#1face1' }}>
          Profile
        </StyledLink>
      </StyledNavBar>
    </StyledHeader>
  );
}
