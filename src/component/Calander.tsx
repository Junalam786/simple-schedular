import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import { MeetingForm } from './component./MeetingForm';
import  {MeetingForm } from './MeetingForm';
import { useState } from 'react';
import { useEffect } from 'react';
import './Calander.css';
interface Meeting {
  clientName: string;
  duration: number;
  time: string;
  cost: number;
  start: Date;
}

function convertToStandard(date: Date, time: string): Date {
  const res = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    parseInt(time.substring(0, 2)),
    parseInt(time.substring(3))
  );
  return res;
}

function Calander() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  function handleDateClick(info: any): void {
    setSelectedDate(info.date);
    setShowForm(true);
  }
   //send data to db
  async function handleScheduleMeeting({ start, ...formData }: Meeting & { start: Date }): Promise<void> {
    if (selectedDate === null) {
      return;
    }
    
    const actualDate = convertToStandard(selectedDate, formData.time);
    const newMeeting = { start: actualDate, ...formData };
    
    try {
      const response = await fetch('http://localhost:8080/collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeeting),
      });
  
      if (response.ok) {
        setShowForm(false);
        await getUser();
      } else {
        throw new Error('Failed to save the meeting.');
      }
      const data=await response.json();
      //console.log(data ,"this is data");
    } catch (error) {
      console.error(error);
    }

  }
  //get data from db server
  const getUser =async () =>{
    const  response =await fetch('http://localhost:8080/collection', {
      method: 'GET' ,
    })
    const data=await response.json();
    setMeetings(data);
  }
  useEffect( () =>{
    getUser();
  },[])

  return (
    <>
      {showForm && <MeetingForm onScheduleMeeting={{ handleScheduleMeeting, showForm, setShowForm }} />}
      <br />
      <div className="container"></div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
          right: 'title',
        }}
        initialView="dayGridMonth"
        editable={true}
        dateClick={handleDateClick}
        events={meetings.map((meeting: Meeting) => ({
          title: meeting.clientName,
          start: meeting.start,
          color: '#cdd5d9',
        }))}
      />
    </>
  );
}

export default Calander;
