import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import ScheduleForm from './ScheduleForm'
import ScheduleDetails from './ScheduleDetails'
import firebase from '../utils/firebase';
import CalendarHover from '../images/AddCalendar.png'
import Calendar from '../images/AddCalendar-2.png'

const StyledCalendarContainer = styled.div`
  background: white;
  padding: 20px;
  position: relative;
`;

const StyledAddTrainingBtn = styled.button`
  position: absolute;
  top: 25px;
  left: 220px;
  cursor: pointer;
  font-size: 20px;
`;

const StyledAddTrainingIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 220px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-image: url(${Calendar});
  background-repeat: no-repeat;
  background-size: contain;

  &:hover {
    background-image: url(${CalendarHover});
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
    padding: 20px 30px
  }
`;

export default function ScheduleCalendar() {
  // States
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);
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
      <StyledAddTrainingIcon onClick={openForm}/>
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
      <StyledPopup open={open} closeOnDocumentClick onClose={closeModal}>
        {selectedModal === "ScheduleForm" ? 
          <ScheduleForm closeModal={closeModal}/> : 
          selectedModal === "ScheduleDetails" ? 
          <ScheduleDetails selectedEvent={selectedEvent} closeModal={closeModal}/> :
          null
        }
      </StyledPopup>
      {/* {modalOpen && (
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
      )} */}
    </StyledCalendarContainer>
  );
};
