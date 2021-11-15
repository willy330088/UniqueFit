import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import Logo from '../images/logo.png';
import Burger from './Burger';

const StyledHeader = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  background-color: ${(props) => (props.headerColor ? 'hsla(205, 22%, 25%)' : 'hsla(205, 22%, 17%)')};
  opacity: ${(props) => (props.headerColor ? '0.9' : '1')};
  align-items: center;
  justify-content: center;
  @media (min-width: 700px) {
    justify-content: space-between;
  }
`;

const StyledLogo = styled.img`
  height: 40px;
  cursor: pointer;
  @media (min-width: 700px) {
    margin-left: 60px;
    height: 50px;
  }
`;

const StyledLink = styled(NavLink)`
  color: white;
  font-size: 25px;
  text-decoration: none;
  margin: 0 20px 0 20px;
  &:hover {
    color: #1face1;
    border-bottom: #1face1 4px solid; 
  }
`;

const StyledNavBar = styled.div`
  display: none;
  @media (min-width: 700px) {
    display: block;
  }
`;

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ddd;
  width: 100%;
  height: 210px;
  position: absolute;
  opacity: 0.9;
  top: 80px;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 5;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};

  @media (min-width: 700px) {
    display: none;
  }
`;

const StyledMenuLink = styled(NavLink)`
  color: #222d35;
  font-size: 30px;
  text-decoration: none;
  line-height: 70px;
  margin: 0 20px 0 20px;
  height: 70px;
  width: 100%;
  text-align: center;
  &:hover {
    color: white;
    background: #1face1;
  }
`;

export default function Header() {
  const [headerColor, setHeaderColor] = useState('false')
  const changeBackground = () => {
    if (window.scrollY >= 300) {
      setHeaderColor(true);
    } else {
      setHeaderColor(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  const history = useHistory();
  const activeStyle = {
    color: '#1face1',
    borderBottom: '#1face1 4px solid'
  }

  const activeMenuStyle = { color: 'white', background: '#1face1' }

  const [open, setOpen] = useState(false);
  return (
    <StyledHeader headerColor={headerColor}>
      <Burger open={open} setOpen={setOpen}/>
      <StyledMenu  open={open}>
        <StyledMenuLink to="/workouts" activeStyle={activeMenuStyle}>
          Workouts
        </StyledMenuLink>
        <StyledMenuLink to="/plans" activeStyle={activeMenuStyle}>
          Plans
        </StyledMenuLink>
        <StyledMenuLink to="/profile" activeStyle={activeMenuStyle}>
          Profile
        </StyledMenuLink>
      </StyledMenu>
      <StyledLogo src={Logo} onClick={() => {
        history.push('/home')
      }}/>
      <StyledNavBar>
        <StyledLink to="/workouts" activeStyle={activeStyle}>
          Workouts
        </StyledLink>
        <StyledLink to="/plans" activeStyle={activeStyle}>
          Plans
        </StyledLink>
        <StyledLink to="/profile" activeStyle={activeStyle}>
          Profile
        </StyledLink>
      </StyledNavBar>
    </StyledHeader>
  );
}
