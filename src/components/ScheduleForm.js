import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';
import firebase from '../utils/firebase';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const StyledDateContainer = styled.div`
  margin-bottom: 50px;
`;

const StyledPlanContainer = styled.div`
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

const StyledAddTrainingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledAddTrainingBtn = styled.button`
  font-size: 20px;
  height: 40px;
  cursor: pointer;
  color: #1face1;
  border-radius: 5px;
  background-color: transparent;
  border: solid 2px #1face1;

  &:hover {
    color: white;
    background-color: #1face1;
  }
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
    if (!selectedPlan) {
      toast.error('Please select a plan!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return
    }

    const planId = selectedPlan.split(',')[0];
    const planTitle = selectedPlan.split(',')[1];
    const eventContent = {
      title: planTitle,
      id: planId,
      start: startDateTime,
    };

    const scheduleRef = firebase
      .firestore()
      .collection('users')
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
        toast.success('Added Successfully', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
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
            Choose A Collected Plan
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
