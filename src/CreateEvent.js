import React from 'react'
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';

import { Checkbox } from "primereact/checkbox";
import  './CreateEvent.css'

const ownerOptions = [
  { label: "Security", value: "Security" },
  { label: "Platform", value: "Platform" },
  { label: "Compliance", value: "Compliance" },
];

const stageOptions = [
  { label: "Draft", value: "Draft" },
  { label: "Live", value: "Live" },
  { label: "Retired", value: "Retired" },
];


const CreateEvent = ({onEventCreated}) => {
const [visible, setVisible] = useState(false);
const [eventType, setEventType] = useState("");
const [description, setDescription] = useState("");
const [owner, setOwner] = useState(null);
const [stage, setStage] = useState(null);
const [isActive, setIsActive] = useState(true);
const [isCritical, setIsCritical] = useState(false);
const [isReusable, setIsReusable] = useState(false);

  const resetForm = () => {
    setEventType("");
    setDescription("");
    setOwner(null);
    setStage(null);
    setIsActive(true);
    setIsCritical(false);
    setIsReusable(false);
  };


 const handleCreateEvent = (e) => {
  e.preventDefault();

  const newEvent = {
    eventtype: eventType,
    eventdescription: description,
    eventowner: owner,
    ipfstage: stage,
    isactive: isActive ? "Y" : "N",
    criticalevent: isCritical ? "Y" : "N",
    isreusable: isReusable ? "Y" : "N",
  };

  fetch("http://localhost:3001/events", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newEvent),
  })
    .then((res) => res.json())
    .then((created) => {
      onEventCreated?.(created); 
      setVisible(false);
      resetForm();
    })
    .catch((err) => console.log(err.message));
};

  return (
    <>
   <Button
   label="+ New Event"
   className="new-event-btn" onClick={()=> setVisible(true)}/>
   <Dialog className='dialog' header="Create New Event" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
              <div className="form-field">
   
             <label htmlFor="eventName">Event type</label>
             <InputText
               id="eventtype"
               value={eventType}
               onChange={(e) => setEventType(e.target.value)}
               placeholder=""
             />
           </div>
   
           <div className="form-field">
             <label htmlFor="description">Description</label>
             <InputText
               id="description"
               value={description }
               onChange={(e) => setDescription(e.target.value)}
               placeholder=""
             />
           </div>
         
 <div className="form-field">
          <label htmlFor="owner">Owner</label>
          <Dropdown
            id="owner"
            value={owner}
            options={ownerOptions}
            onChange={(e) => setOwner(e.value)}
            placeholder="Select owner"
          />
        </div>

<div className="form-field">
          <label htmlFor="stage">Stage</label>
          <Dropdown
            id="stage"
            value={stage}
            options={stageOptions}
            onChange={(e) => setStage(e.value)}
            placeholder="Select stage"
          />
        </div>

 <div className="form-field-checkbox">
          <Checkbox
            inputId="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.checked)}
          />
          <label htmlFor="isActive">Active</label>
        </div>

<div className="form-field-checkbox">
          <Checkbox
            inputId="isCritical"
            checked={isCritical}
            onChange={(e) => setIsCritical(e.checked)}
          />
          <label htmlFor="isCritical">Critical</label>
        </div>

<div className="form-field-checkbox">
          <Checkbox
            inputId="isReusable"
            checked={isReusable}
            onChange={(e) => setIsReusable(e.checked)}
          />
          <label htmlFor="isReusable">Reusable</label>
        </div>


   
           <div className="form-actions">
             <Button
             className='cancel-btn'
               label="Cancel"
               severity="secondary"
               onClick={() => setVisible(false)}
             /> 
   
             <Button
             className='new-event-btn '
               label="Create Event"
               icon="pi pi-check"
               onClick={handleCreateEvent}
             />
           </div>
           </Dialog>
           </>
          
  )}

export default CreateEvent