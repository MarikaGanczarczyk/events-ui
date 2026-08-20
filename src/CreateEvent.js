import React from 'react'
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";


const CreateEvent = () => {
const [visible, setVisible] = useState(false);
const [eventType, setEventType] = useState("");
const [description, setDescription] = useState("");




  return (
    <>
   <Button
   label="+ New Event"
   className="new-event-btn" onClick={()=> setVisible(true)}/>
   <Dialog header="Create New Event" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
              <div className="form-field">
   
             <label htmlFor="eventName"></label>
             <InputText
               id="eventtype"
               value={eventType}
               onChange={(e) => setEventType(e.target.value)}
               placeholder="Enter event type"
             />
           </div>
   
           <div className="form-field">
             <label htmlFor="description"></label>
             <InputText
               id="description"
               value={description }
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Enter description"
             />
           </div>
         
   
           <div className="form-actions">
             <Button
               label="Cancel"
               severity="secondary"
               onClick={() => setVisible(false)}
             /> 
   
             {/* <Button
               label="Create Event"
               icon="pi pi-check"
               onClick={handleCreateEvent}
             /> */}
           </div>
           </Dialog>
           </>
          
  )}

export default CreateEvent