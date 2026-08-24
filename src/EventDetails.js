import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const EventDetails = () => {
const [eventData, setEventData] = useState([])
const { eventtype } = useParams();

 useEffect(() => {
    fetch("http://localhost:3001/events/" + eventtype)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEventData(data);
      })
      .catch((err) => console.log(err.message));
  }, []);


  return (
    <div>
    <p>Event Details</p>
    {eventData && <div className='details'>
      <p><strong>Event Type: </strong>{eventData.eventtype}</p>
      
      </div>}

    </div>
  )
}

export default EventDetails