import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Popup from 'reactjs-popup';

import usePopup from '../../hooks/usePopup';
import ScheduleForm from './ScheduleForm';
import ScheduleDetails from './ScheduleDetails';
import ScheduleRecord from './ScheduleRecord';
import { anvil } from '../../utils/animation';
import Calendar from '../../images/add-calendar-icon.png';

export default function ScheduleCalendar() {
  const [selectedModal, setSelectedModal] = useState('');
  const [selectedEvent, setSelectedEvent] = useState();
  const plans = useSelector((state) => state.plans);
  const currentUser = useSelector((state) => state.currentUser);
  const userEvents = useSelector((state) => state.users).filter(
    (user) => user.id === currentUser?.uid
  )[0]?.events;
  const [open, setOpen, close] = usePopup();
  const initialDate = new Date().toISOString();

  const events = userEvents?.map((event) => {
    const targetPlan = plans.filter(
      (plan) => plan.id === event.extendedProps.planId
    )[0];
    event.title = targetPlan?.title;
    return event;
  });

  function openForm() {
    setSelectedModal('ScheduleForm');
    setOpen(true);
  }

  function handleEventClick(clickInfo) {
    if (clickInfo.event) {
      setSelectedModal('ScheduleDetails');
      setSelectedEvent(clickInfo.event);
      setOpen(true);
    }
  }

  return (
    <StyledCalendarContainer>
      <StyledAddTrainingContainer onClick={openForm}>
        <StyledAddTrainingIcon />
      </StyledAddTrainingContainer>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'title',
          right: 'prevYear,prev,today,next,nextYear',
        }}
        initialView="dayGridMonth"
        initialDate={initialDate}
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        views={{
          dayGrid: {
            dayMaxEventRows: 4,
          },
        }}
      />
      <StyledPopup open={open} closeOnDocumentClick onClose={close}>
        {selectedModal === 'ScheduleForm' ? (
          <ScheduleForm closeModal={close} />
        ) : selectedModal === 'ScheduleDetails' ? (
          <ScheduleDetails selectedEvent={selectedEvent} closeModal={close} />
        ) : null}
      </StyledPopup>
      <ScheduleRecord />
    </StyledCalendarContainer>
  );
}

const StyledCalendarContainer = styled.div`
  background: white;
  padding: 20px;
  position: relative;
  width: 100%;
  border-radius: 10px;

  .fc-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .fc-button {
    padding: 5px;
  }

  .fc-toolbar-chunk {
    margin-bottom: 5px;
  }

  .fc-toolbar-title {
    width: 250px;
    font-size: 35px;
  }

  .fc {
    width: 100%;
  }

  .fc-event {
    background: #1face1;
    border: none;
    cursor: pointer;
    font-size: 12px;
    padding-left: 5px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }

  .fc-event-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (min-width: 600px) {
    .fc-button {
      padding: 10px;
    }

    .fc-event {
      font-size: 15px;
    }
  }

  @media (min-width: 800px) {
    .fc-toolbar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }

    .fc-button {
      padding: 10px;
    }

    .fc-toolbar-chunk {
      margin-right: 10px;
      margin-bottom: 0px;
    }

    .fc-event {
      font-size: 20px;
    }
  }
`;

const StyledAddTrainingIcon = styled.div`
  cursor: pointer;
  margin-left: 5px;
  width: 40px;
  height: 40px;
  background-image: url(${Calendar});
  background-repeat: no-repeat;
  background-size: contain;
  transition: ease-in-out 0.1s;
`;

const StyledAddTrainingContainer = styled.div`
  height: 65px;
  width: 65px;
  position: absolute;
  right: 10px;
  top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #e5f0f5;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:hover ${StyledAddTrainingIcon} {
    width: 45px;
    height: 45px;
  }

  @media (min-width: 500px) {
    right: 40px;
    top: 40px;
  }

  @media (min-width: 800px) {
    right: 30px;
    top: 10px;
  }
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.6);
  }

  &-content {
    margin: auto;
    background: #222d35;
    width: 350px;
    height: 400px;
    position: relative;
    border-radius: 5px;
    padding: 20px 30px;
    animation: ${anvil} 0.6s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }
`;
