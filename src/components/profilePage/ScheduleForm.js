import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import {
  StyledGeneralBtn,
  StyledHorizontalContainer,
} from '../Common/GeneralStyle';
import { addScheduleEvent } from '../../utils/firebase';
import { successToast, errorToast } from '../../utils/toast';

export default function ScheduleForm({ closeModal }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDateTime, setStartDateTime] = useState(new Date());
  const plans = useSelector((state) => state.plans).filter((plan) =>
    plan.collectedBy.includes(currentUser?.uid)
  );
  const [selectedPlan, setSelectedPlan] = useState();

  useEffect(() => {
    let formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setStartDateTime(formattedDate);
  }, [selectedDate]);

  async function onSubmit() {
    if (!selectedPlan) {
      errorToast('Please select a plan!');
      return;
    }

    const eventContent = {
      id: uuid(),
      start: startDateTime,
      extendedProps: {
        planId: selectedPlan,
        completed: false,
      },
    };

    await addScheduleEvent(currentUser.uid, eventContent);
    successToast('Added Successfully');
    setStartDateTime(new Date());
    closeModal();
  }

  return (
    <>
      <input type="text" autofocus="autofocus" style={{ display: 'none' }} />
      <StyledDateAndPlanContainer>
        <StyledLabel>Choose Training Date</StyledLabel>
        <StyledDatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          minDate={new Date()}
        />
      </StyledDateAndPlanContainer>
      <StyledDateAndPlanContainer>
        <StyledLabel>Choose Training Plan</StyledLabel>
        <StyledPlanSelect
          onChange={(e) => {
            setSelectedPlan(e.target.value);
          }}
        >
          <option selected="true" disabled="disabled">
            Choose A Collected Plan
          </option>
          {plans.map((plan) => {
            return (
              <option value={plan.id} key={plan.id}>
                {plan.title}
              </option>
            );
          })}
        </StyledPlanSelect>
      </StyledDateAndPlanContainer>
      <StyledHorizontalContainer>
        <StyledAddTrainingBtn onClick={onSubmit}>
          Add Training
        </StyledAddTrainingBtn>
      </StyledHorizontalContainer>
    </>
  );
}

const StyledLabel = styled.div`
  color: #1face1;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 3px solid #1face1;
  margin-bottom: 20px;
  width: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
  font-size: 22px;
  width: 150px;
  text-align: center;
  outline: none;
  border-radius: 20px;
  border: none;
`;

const StyledDateAndPlanContainer = styled.div`
  margin-bottom: 50px;
`;

const StyledPlanSelect = styled.select`
  font-size: 22px;
  outline: none;
  border-radius: 3px;
  border: none;
  padding: 0 10px;
  width: 100%;
`;

const StyledAddTrainingBtn = styled(StyledGeneralBtn)`
  font-size: 20px;
  height: 40px;
  line-height: 40px;
  width: 150px;
`;
