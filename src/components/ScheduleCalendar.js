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
      width: '500px',
      height: '500px'
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
        setEvents(data.events)
      });
  }, []);

  const handleEventClick = (clickInfo) => {
    if(clickInfo.event) {
      setSelectedModal("ScheduleDetails");
      setSelectedEvent(clickInfo.event._def)
      openModal();
      console.log(clickInfo.event._def)
    }
  }

  return (
    <StyledCalendarContainer>
      <button onClick={openForm}>
        Add Training Plan
      </button>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        headerToolbar={{
          left: 'title',
          right: 'prevYear,prev,today,next,nextYear'
        }}
        initialView="dayGridMonth"
        initialDate={initialDate}
        editable={true}
        selectable={false}
        selectMirror={true}
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
          <button onClick={closeModal}>X</button>
          {selectedModal === "ScheduleForm" ? 
            <ScheduleForm closeModal={closeModal}/> : 
            selectedModal === "ScheduleDetails" ? 
            <ScheduleDetails selectedEvent={selectedEvent}/> :
            null
          }
        </Modal>
      )}
    </StyledCalendarContainer>
  );
};
