import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ScheduleDetails({ selectedEvent }) {
  const history = useHistory();

  return (
    <>
      <div>{selectedEvent.title}</div>
      <button onClick={() => {
        history.push(`/plans/${selectedEvent.publicId}`)
      }}>
        Checkout the Plan
      </button>
    </>
  );
}
