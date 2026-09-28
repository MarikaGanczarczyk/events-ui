import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { eventsApi } from "./Api";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";

import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";
import { useNavigate } from "react-router-dom";



const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const menuRef = useRef(null);

  const [activeRow, setActiveRow] = useState(null);
  const [editEventType, setEditEventType] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
  eventsApi.getAll()
    .then((res) => setEvents(res.data))
    .catch((err) => console.log(err.message));
}, []);

  const navigate = useNavigate();

  const menuItems = [
    {
      label: "View details",
      icon: "pi pi-eye",
      command: () => navigate(`/events/${activeRow.eventType}`),
    },
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        setEditEventType(activeRow.eventType);
        setEditVisible(true);
      },
    },
   {
  label: "Delete",
  icon: "pi pi-trash",
  command: () => {
    eventsApi
      .delete(activeRow.id ?? activeRow.eventType)
      .then(() => setEvents((prev) => prev.filter((e) => e.eventType !== activeRow.eventType)))
      .catch((err) => console.log(err.message));
  },
},
  ];

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-ellipsis-v"
        className="action-btn"
        onClick={(e) => {
          e.stopPropagation();
          setActiveRow(rowData);
          menuRef.current.toggle(e);
        }}
      />
    );
  };

const handleEventCreated = (created) => {
  setEvents((prev) => [...prev, created]);
};

  return (
    <div className="container">
         <Button
              label="Back"
              icon="pi pi-arrow-left"
              className="back-btn"
              text
              onClick={() => navigate(-1)}
            />
      <div className="page-header">
        <h2>Events </h2>
        <p className="page-subtitle">Search and manage events</p>
      </div>

      <div className="search-container">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search even type" />
        </span>

        <div>
          <div>
            <CreateEvent onEventCreated={handleEventCreated}/>
          </div>
        </div>
      </div>

      <div className="table-container">

        <DataTable value={events} className="events-table" onRowClick={(e) => navigate(`/events/${e.data.eventType}`)}>

          <Column field="eventType" header="Event Type" sortable />
    <Column field="eventDescription" header="Description" sortable />
    <Column field="eventOwner" header="Owner" sortable />
    <Column field="gifStage" header="Stage" sortable />
    <Column field="isActive" header="Active" sortable />
    <Column field="critical" header="Critical" sortable />
    <Column field="isReusable" header="Reusable" sortable />
    <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>

      <Menu model={menuItems} popup ref={menuRef} />

      <EditEvent
        visible={editVisible}
        eventtype={editEventType}
        onHide={() => setEditVisible(false)}
        onSaved={(updated) => {
          setEditVisible(false);
          setEvents((prev) =>
            prev.map((e) => (e.eventType === editEventType ? updated : e))
          );
        }}
      />
    </div>
  );
};
export default EventsPage;
