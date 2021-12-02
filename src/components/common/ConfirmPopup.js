import React from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';

import { anvil } from '../../utils/animation';
import DeleteIcon from '../../images/delete-icon.png';
import SignOutIcon from '../../images/signout-icon.png';

export default function ConfirmPopup({
  confirmOpen,
  closeConfirm,
  action,
  type,
}) {
  function showIcon() {
    if (type === 'delete') {
      return <StyledConfirmDeleteIcon src={DeleteIcon} />;
    } else {
      return <StyledConfirmSignOutIcon src={SignOutIcon} />;
    }
  }

  return (
    <StyledConfirmDeletePopup
      open={confirmOpen}
      closeOnDocumentClick
      onClose={closeConfirm}
    >
      <StyledConfirmTextContainer>
        {showIcon()}
        <StyledConfirmDeleteText>
          {type === 'delete'
            ? 'Are you sure you want to delete?'
            : 'Are you sure you want to sign out?'}
        </StyledConfirmDeleteText>
      </StyledConfirmTextContainer>
      <StyledConfirmBtnContainer>
        <StyledConfirmYesBtn
          onClick={() => {
            action();
          }}
        >
          Yes
        </StyledConfirmYesBtn>
        <StyledConfirmNoBtn
          onClick={() => {
            closeConfirm();
          }}
        >
          No
        </StyledConfirmNoBtn>
      </StyledConfirmBtnContainer>
    </StyledConfirmDeletePopup>
  );
}

const StyledConfirmDeletePopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 350px;
    height: 200px;
    position: relative;
    border-radius: 5px;
    position: relative;
    animation: ${anvil} 0.6s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }
`;

const StyledConfirmTextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  position: absolute;
  right: calc(50% - 125px);
  top: 45px;
`;

const StyledConfirmDeleteIcon = styled.img`
  width: 35px;
  margin-right: 15px;
`;

const StyledConfirmSignOutIcon = styled.img`
  width: 40px;
  margin-right: 15px;
`;

const StyledConfirmDeleteText = styled.div`
  font-size: 25px;
  color: white;
`;

const StyledConfirmBtnContainer = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  display: flex;
`;

const StyledConfirmYesBtn = styled.div`
  width: 50%;
  height: 60px;
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  background-color: hsla(129, 40%, 35%);
  cursor: pointer;
  border-radius: 0 0 0 5px;
  &:hover {
    background-color: hsla(129, 40%, 40%);
  }
`;

const StyledConfirmNoBtn = styled.div`
  width: 50%;
  height: 60px;
  color: white;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  background-color: hsla(148, 0%, 35%);
  cursor: pointer;
  border-radius: 0 0 5px 0;

  &:hover {
    background-color: hsla(148, 0%, 40%);
  }
`;
