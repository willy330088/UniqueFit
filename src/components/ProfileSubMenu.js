import React, { useState } from 'react';
import styled from 'styled-components';

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
  &:hover {
    background: white;
    border-left: 4px solid #1face1;
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
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 20px;
  &:hover {
    background: #1face1;
    cursor: pointer;
  }
`;

export default function ProfileSubMenu({ item, setMainContent }) {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <StyledSidebarLink onClick={item.subNav && showSubnav}>
        <div>
          <StyledSidebarLabel
            onClick={() => {
              setMainContent(item.state);
            }}
          >
            {item.title}
          </StyledSidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </StyledSidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <StyledDropdownLink
              onClick={() => {
                setMainContent(item.state);
              }}
              key={index}
            >
              <StyledSidebarLabel>{item.title}</StyledSidebarLabel>
            </StyledDropdownLink>
          );
        })}
    </>
  );
}
