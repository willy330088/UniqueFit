import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import ScheduleForm from './ScheduleForm';
import ScheduleDetails from './ScheduleDetails';
import Calendar from '../../images/AddCalendar-2.png';
import { useSelector } from 'react-redux';
import ScheduleRecord from './ScheduleRecord';

export default function ScheduleCalendar() {
  const [open, setOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState('');
  const [selectedEvent, setSelectedEvent] = useState();
  const plans = useSelector((state) => state.plans);
  const currentUser = useSelector((state) => state.currentUser);
  const eventsId = useSelector((state) => state.users).filter(
    (user) => user.id === currentUser?.uid
  )[0]?.events;

  const events = eventsId?.map((events) => {
    const targetPlan = plans.filter(
      (plan) => plan.id === events.extendedProps.planId
    )[0];
    events.title = targetPlan?.title;
    return events;
  });

  let initialDate = new Date().toISOString();

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

  function closeModal() {
    setOpen(false);
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
      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
        {selectedModal === 'ScheduleForm' ? (
          <ScheduleForm closeModal={closeModal} />
        ) : selectedModal === 'ScheduleDetails' ? (
          <ScheduleDetails
            selectedEvent={selectedEvent}
            closeModal={closeModal}
          />
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
  }
`;
