import React, { useState } from 'react';
import "./Style.css"
export {}
interface Meeting {
  clientName: string;
  duration: number;
  time: string;
  cost: number;
  start: Date;
}

interface MeetingFormProps {
  onScheduleMeeting: {
    handleScheduleMeeting: (data: { start: Date } & Meeting) => void;
    showForm: boolean;
    setShowForm: (show: boolean) => void;
  };
}

export function MeetingForm({ onScheduleMeeting }: MeetingFormProps) {
  const { handleScheduleMeeting, showForm, setShowForm } = onScheduleMeeting;
  const [clientName, setClientName] = useState('');
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState('00:00 pm');
  const [cost, setCost] = useState(0);
  const [start, setStart] = useState(new Date());

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const meeting: Meeting = { clientName, duration, time, cost, start };
    handleScheduleMeeting(meeting);
    setClientName('');
    setDuration(0);
    setTime('00:00 pm');
    setCost(0);
  }

  return (
    <div className="popup-container">
  {showForm && (
    <form className="popup-form" onSubmit={handleSubmit}>
      <h4>New Appointment</h4>
      <div className="appointment-container">
        <div className='checkbox-display'>
        </div>
        <div className="c-appointment">Client Appointment</div>
      </div>
      <div className="input-container">
        <input
          className="popup-clientname"
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
        />
        <div className="time-container">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            min="1"
            required
          />
          <h5 className="minute">min</h5>
        </div>
        <div className="cost-container">
          <input
            type="number"
            placeholder="Cost"
            value={cost}
            className="meeting-cost"
            onChange={(e) => setCost(parseInt(e.target.value))}
            min="0"
            required
          />
        </div>
      </div>
      <div className="button-container">
        <button className="closeho" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close' : 'Schedule Meeting'}
        </button>
        <button className="submitho" type="submit">Done</button>
      </div>
    </form>
  )}
</div>

  );
}
