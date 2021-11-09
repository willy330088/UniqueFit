import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import Modal from "react-modal";
import ScheduleForm from './ScheduleForm'
import ScheduleDetails from './ScheduleDetails'
import firebase from '../utils/firebase';

const StyledCalendarContainer = styled.div`
  background: white;
  padding: 20px;
  position: relative;
`;

const StyledCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const StyledAddTrainingBtn = styled.button`
  position: absolute;
  top: 25px;
  left: 220px;
  cursor: pointer;
  font-size: 20px;
`;

export default function ScheduleCalendar() {
  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
      backgroundColor: '#222d35',
      width: '350px',
      height: '400px',
      border: 'none'
    },
    overlay: {
      zIndex: 1000,
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
  };

  // States
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedEvent, setSelectedEvent] = useState();
  const [events, setEvents] = useState([])

  // Initial Date
  let initialDate = new Date().toISOString();

  // Open appointment form
  const openForm = () => {
    setSelectedModal("ScheduleForm");
    openModal();
  }

  // Open Modal Function
  const openModal = () => {
    setModalOpen(true);
  };

  // Close Modal Function
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('schedules')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((docSnapshot) => {
        const data = docSnapshot.data()
        if (data) {
          setEvents(data.events)
        }
      });
  }, []);

  const handleEventClick = (clickInfo) => {
    if(clickInfo.event) {
      setSelectedModal("ScheduleDetails");
      setSelectedEvent(clickInfo.event)
      openModal();
      console.log(clickInfo.event._instance.range.start)
    }
  }

  return (
    <StyledCalendarContainer>
      <StyledAddTrainingBtn onClick={openForm}>
        Add Training Plan
      </StyledAddTrainingBtn>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        headerToolbar={{
          left: 'title',
          right: 'prevYear,prev,today,next,nextYear'
        }}
        initialView="dayGridMonth"
        initialDate={initialDate}
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        views= {{
          dayGrid: {
            dayMaxEventRows: 4
          }
        }}
      />
      {modalOpen && (
        <Modal 
          isOpen={true}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={customModalStyles}
        >
          <StyledCloseBtn onClick={closeModal}>X</StyledCloseBtn>
          {selectedModal === "ScheduleForm" ? 
            <ScheduleForm closeModal={closeModal}/> : 
            selectedModal === "ScheduleDetails" ? 
            <ScheduleDetails selectedEvent={selectedEvent} closeModal={closeModal}/> :
            null
          }
        </Modal>
      )}
    </StyledCalendarContainer>
  );
};
