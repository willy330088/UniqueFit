import React, { useState } from 'react';
import styled from 'styled-components';

export default function ProfileSubMenu({ item, setMainContent, mainContent }) {
  const [subnav, setSubnav] = useState(false);

  function defineSelected() {
    if (
      mainContent === 'My Workout Creations' ||
      mainContent === 'My Workout Collections'
    ) {
      if (item.title === 'My Workouts') {
        return true;
      } else {
        return false;
      }
    } else if (
      mainContent === 'My Plan Creations' ||
      mainContent === 'My Plan Collections'
    ) {
      if (item.title === 'My Plans') {
        return true;
      } else {
        return false;
      }
    } else if (mainContent === item.title) {
      return true;
    }
  }

  return (
    <>
      <StyledSidebarLink
        onClick={() => {
          if (item.subNav) {
            setSubnav(!subnav);
          } else {
            setMainContent(item.title);
          }
        }}
        selected={defineSelected()}
      >
        <div>
          <StyledSidebarLabel>{item.title}</StyledSidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </StyledSidebarLink>
      {item.subNav
        ? item.subNav.map((item, index) => {
            return (
              <StyledDropdownLinkContainer subnav={subnav} key={index}>
                <StyledDropdownLink
                  onClick={() => {
                    setMainContent(item.title);
                  }}
                  key={index}
                  subnav={subnav}
                  selected={mainContent === item.title}
                >
                  <StyledSidebarLabel>{item.title}</StyledSidebarLabel>
                </StyledDropdownLink>
              </StyledDropdownLinkContainer>
            );
          })
        : null}
    </>
  );
}

const StyledSidebarLink = styled.div`
  display: flex;
  color: #222d35;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 25px;
  background: white;
  transition: ease-in-out 0.2s;
  border-left: ${(props) => (props.selected ? '6px solid #1face1' : 'none')};
  &:hover {
    border-left: 6px solid #1face1;
    cursor: pointer;
  }
`;

const StyledSidebarLabel = styled.span`
  margin-left: 16px;
`;

const StyledDropdownLink = styled.div`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: ${(props) => (props.subnav ? 'flex' : 'none')};
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 20px;
  &:hover {
    background: #1face1;
    cursor: pointer;
  }
`;

const StyledDropdownLinkContainer = styled.div`
  height: ${(props) => (props.subnav ? '60px' : '0px')};
  transition: ease-in-out 0.3s;
  background: #414757;
`;
