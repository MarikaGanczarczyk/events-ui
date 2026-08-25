import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import CreateEvent from "./CreateEvent";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCriticality, setSelectedCriticality] = useState(null);

  

  const statusOptions = [
    { label: "Active", value: true },
    { label: "Non Active", value: false },
  ];
  const criticalityOptions = [
    { label: "Critical", value: true },
    { label: "Non Critical", value: false },
  ];

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const actionBodyTemplate = () => {
    return <Button icon="pi pi-ellipsis-v" className="action-btn" />;
  };

const handleEventCreated = (created) => {
  setEvents((prev) => [...prev, created]);
};

  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="page-header">
        <h2>Events </h2>
        <p className="page-subtitle">Search and manage events</p>
      </div>

      <div className="search-container">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search even type" />
        </span>

        <Dropdown
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.value)}
          options={statusOptions}
          optionLabel="label"
          placeholder="Status"
          className="dropdown-filter"
        />

        <Dropdown
          value={selectedCriticality}
          onChange={(e) => setSelectedCriticality(e.value)}
          options={criticalityOptions}
          optionLabel="label"
          placeholder="Criticality"
          className="dropdown-filter"
        />
        <div>
          <div>
            <CreateEvent onEventCreated={handleEventCreated}/>
          </div>
        </div>
      </div>

      <div className="table-container">
        <DataTable value={events} className="events-table" onRowClick={(e) => navigate(`/events/${e.data.eventtype}`)}>
          <Column field="eventtype" header="Event Type" />
          <Column field="eventdescription" header="Description" />
          <Column field="eventowner" header="Owner" />
          <Column field="ipfstage" header="Stage" />
          <Column field="isactive" header="Active" />
          <Column field="criticalevent" header="Critical" />
          <Column field="isreusable" header="Reusable" />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
};

export default EventsPage;
