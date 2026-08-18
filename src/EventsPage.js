import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const EventsPage = () => {
const [events, setEvents] =useState("")


useEffect(()=>{
fetch('http://localhost:3001/events')
.then((res)=>res.json())
.then((data)=>setEvents(data))
.catch((err)=>console.log(err.message))
},[])

const actionBodyTemplate = () => {
return (
<Button icon="pi pi-ellipsis-v" className='action-btn'
/>
);
};

  return (
    <div className='container'>
 <div className="page-header">
        <h2>Events Dashboard</h2>
        <p className="page-subtitle">Search and manage events</p>
      </div>

<div className='table-container'>
<DataTable value={events}>
<Column field="eventtype" header="Event Type"/>
<Column field="eventdescription" header="Description"/>
<Column field="eventowner" header="Owner"/>
<Column field="ipfstage" header="Stage"/>
<Column field="isactive" header="Active" />
<Column field="criticalevent" header="Critical" />
<Column field="isreusable" header="Reusable" />
<Column header="Actions" body={actionBodyTemplate} />
</DataTable>

</div>

    </div>
  )
}

export default EventsPage