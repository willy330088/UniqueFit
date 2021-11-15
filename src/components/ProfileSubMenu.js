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
  transition: ease-in-out 0.2s;
  &:hover {
    background: white;
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
  display:${(props) => (props.subnav ? 'flex' : 'none')};;
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

export default function ProfileSubMenu({ item, setMainContent }) {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <StyledSidebarLink onClick={() => {
        if (item.subNav) {
          showSubnav()
        } else {
          setMainContent(item.title); 
        }
      }}>
        <div>
          <StyledSidebarLabel>
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
      {item.subNav ? 
        item.subNav.map((item, index) => {
          return (
            <StyledDropdownLinkContainer subnav={subnav}>
              <StyledDropdownLink
                onClick={() => {
                  setMainContent(item.title);
                }}
                key={index}
                subnav={subnav}
              >
                <StyledSidebarLabel>{item.title}</StyledSidebarLabel>
              </StyledDropdownLink>
            </StyledDropdownLinkContainer>
          );
        }): null}
    </>
  );
}
