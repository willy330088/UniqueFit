import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';
import firebase from '../utils/firebase';
import styled from 'styled-components';

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
`;

const StyledDateContainer = styled.div`
  margin-bottom: 50px;
`;

const StyledPlanContainer = styled.div`
  margin-bottom: 70px;
`;

const StyledPlanSelect = styled.select`
  font-size: 22px;
`;

const StyledAddTrainingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledAddTrainingBtn = styled.button`
  font-size: 20px;
`;

export default function ScheduleForm({ closeModal }) {
  // Date Picker State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();

  // Add start and end date time when state changes
  useEffect(() => {
    let formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setStartDateTime(formattedDate);
  }, [selectedDate]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('plans')
      .where('collectedBy', 'array-contains', firebase.auth().currentUser.uid)
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPlans(data);
      });
  }, []);

  // onSubmit Function
  const onSubmit = () => {
    const planId = selectedPlan.split(',')[0];
    const planTitle = selectedPlan.split(',')[1];
    const eventContent = {
      title: planTitle,
      id: planId,
      start: startDateTime,
    };

    const scheduleRef = firebase
      .firestore()
      .collection('schedules')
      .doc(firebase.auth().currentUser.uid);

    scheduleRef
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          scheduleRef.update({
            events: firebase.firestore.FieldValue.arrayUnion(eventContent),
          });
        } else {
          scheduleRef.set({ events: [eventContent] });
        }
      })
      .then(() => {
        alert('Add successfully!');
        setStartDateTime(new Date());
        closeModal();
      });
  };

  console.log(selectedDate);
  console.log(startDateTime);
  console.log(plans);
  console.log(selectedPlan);
  return (
    <>
      <StyledDateContainer>
        <StyledLabel>Choose Training Date</StyledLabel>
        <StyledDatePicker selected={selectedDate} onChange={setSelectedDate} />
      </StyledDateContainer>
      <StyledPlanContainer>
        <StyledLabel>Choose Training Plan</StyledLabel>
        <StyledPlanSelect
          onChange={(e) => {
            setSelectedPlan(e.target.value);
          }}
        >
          <option selected="true" disabled="disabled">
            Choose A Plan
          </option>
          {plans.map((plan) => {
            return <option value={[plan.id, plan.title]}>{plan.title}</option>;
          })}
        </StyledPlanSelect>
      </StyledPlanContainer>
      <StyledAddTrainingContainer>
        <StyledAddTrainingBtn onClick={onSubmit}>
          Add Training
        </StyledAddTrainingBtn>
      </StyledAddTrainingContainer>
    </>
  );
}
