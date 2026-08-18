import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const EventsPage = () => {
const [events, setEvents] =useState("")


useEffect(()=>{
fetch('http://localhost:3001/events')
.then((res)=>res.json())
.then((data)=>setEvents(data))
.catch((err)=>console.log(err.message))
},[])

  return (
    <div className='container'>
<h2>Events</h2>
<div className='table-container'>
<DataTable value={events}>
<Column field="eventtype" header="Event Type"/>
<Column field="eventdescription" header="Description"/>
<Column field="eventowner" header="Owner"/>
<Column field="ipfstage" header="Stage"/>
<Column field="isactive" header="Active" />
<Column field="criticalevent" header="Critical" />
<Column field="isreusable" header="Reusable" />
</DataTable>

</div>

    </div>
  )
}

export default EventsPage