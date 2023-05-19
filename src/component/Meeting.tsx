import React from 'react';
import { useState, useEffect } from 'react';
import './Meetings.css';

interface Meeting {
  clientName: string;
  time: string;
  duration: string;
  cost: number;
}

interface Props {
  meetings: Meeting[];
  updateMeetings: (updatedMeetings: Meeting[]) => void;
}

function Meetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const getUser =async () =>{
    const  response =await fetch('http://localhost:8080/collection', {
      method: 'GET' ,
    })
    const data=await response.json();
    console.log(data ,"ye save ho raha");
    setMeetings(data);
  }

  useEffect( () =>{
    getUser();
  },[meetings.length])

  return (
    <>
      <div style={{ fontWeight: "570",fontSize: '19px', display: 'flex', justifyContent: 'left',color:"#333" , marginLeft: "70px"}}>
        Clients and contacts
      </div>
      <br />
      <div className='App'>
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Start time</th>
              <th>Duration</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, i) => (
              <tr key={i}>
                <td>{meeting.clientName}</td>
                <td>{meeting.time}</td>
                <td>{meeting.duration}</td>
                <td>&#8377; {meeting.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Meetings;
