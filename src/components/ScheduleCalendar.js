import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import ScheduleForm from './ScheduleForm';
import ScheduleDetails from './ScheduleDetails';
import firebase from '../utils/firebase';
import CalendarHover from '../images/AddCalendar.png';
import Calendar from '../images/AddCalendar-2.png';
import { useSelector } from 'react-redux';

const StyledCalendarContainer = styled.div`
  background: white;
  padding: 20px;
  position: relative;
`;

const StyledAddTrainingContainer = styled.div`
  width: 200px;
  height: 40px;
  position: absolute;
  top: 20px;
  left: 250px;
  display: flex;
  align-items: center;
  transition: ease-in-out 0.1s;
  cursor: pointer;
`;

const StyledAddTrainingIcon = styled.div`
  cursor: pointer;
  width: ${(props) =>props.calendarHover ? '45px' : '40px'};
  height: ${(props) =>props.calendarHover ? '45px' : '40px'};
  background-image: ${(props) =>props.calendarHover ? `url(${CalendarHover})` : `url(${Calendar})`};
  background-repeat: no-repeat;
  background-size: contain;
  transition: ease-in-out 0.1s;
`;

const StyledAddTrainingText = styled.div`
  margin-left: 10px;
  font-size: ${(props) =>props.calendarHover ? '27px' : '25px'};
  color: ${(props) => (props.calendarHover ? '#1face1' : 'black')};
  transition: ease-in-out 0.3s;
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

export default function ScheduleCalendar() {
  // States
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);
  const [selectedModal, setSelectedModal] = useState('');
  const [selectedEvent, setSelectedEvent] = useState();
  const [calendarHover, setCalendarHover] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const events = useSelector((state) => state.users).filter((user)=> user.id === currentUser.uid)[0].events;

  let initialDate = new Date().toISOString();

  const openForm = () => {
    setSelectedModal('ScheduleForm');
    openModal();
  };

  const handleEventClick = (clickInfo) => {
    if (clickInfo.event) {
      setSelectedModal('ScheduleDetails');
      setSelectedEvent(clickInfo.event);
      openModal();
      console.log(clickInfo.event);
    }
  };

  return (
    <StyledCalendarContainer>
      <StyledAddTrainingContainer
        onMouseOver={() => {
          setCalendarHover(true);
        }}
        onMouseLeave={() => {
          setCalendarHover(false);
        }}
        calendarHover={calendarHover}
        onClick={openForm}
      >
        <StyledAddTrainingIcon calendarHover={calendarHover} />
        <StyledAddTrainingText calendarHover={calendarHover}>
          Add Training
        </StyledAddTrainingText>
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
    </StyledCalendarContainer>
  );
}
