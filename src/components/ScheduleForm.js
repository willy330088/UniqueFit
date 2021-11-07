import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';
import firebase from '../utils/firebase';

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

    firebase
      .firestore()
      .collection('schedules')
      .doc(firebase.auth().currentUser.uid)
      .update({
        events: firebase.firestore.FieldValue.arrayUnion(eventContent),
      }).then(() => {
        alert('Add successfully!')
        setStartDateTime(new Date())
        closeModal()
      });
  };

  console.log(selectedDate);
  console.log(startDateTime);
  console.log(plans);
  console.log(selectedPlan);
  return (
    <>
      <DatePicker selected={selectedDate} onChange={setSelectedDate} />
      <select
        onChange={(e) => {
          setSelectedPlan(e.target.value);
        }}
      >
        <option selected="true" disabled="disabled">Choose A Plan</option>    
        {plans.map((plan) => {
          return <option value={[plan.id, plan.title]}>{plan.title}</option>;
        })}
      </select>
      <button onClick={onSubmit}>Add Training</button>
    </>
  );
}
