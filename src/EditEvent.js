import React, { useEffect, useState } from 'react'
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import "./EditEvent.css";

const isYes = (value) => value === "Y" || value === true || value === 1;

const EditEvent = ({ visible, eventtype, onHide, onSaved }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [eventId, setEventId] = useState(null);

  const [form, setForm] = useState({
    eventtype: "",
    eventdescription: "",
    eventowner: "",
    ipfstage: "",
    isactive: false,
    criticalevent: false,
    isreusable: false,
  });

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    fetch("http://localhost:3001/events/" + eventtype)
      .then((res) => res.json())
      .then((data) => {
        setEventId(data.id ?? eventtype);
        setForm({
          eventtype: data.eventtype || "",
          eventdescription: data.eventdescription || "",
          eventowner: data.eventowner || "",
          ipfstage: data.ipfstage || "",
          isactive: isYes(data.isactive),
          criticalevent: isYes(data.criticalevent),
          isreusable: isYes(data.isreusable),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [visible, eventtype]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleField = (field) => setForm((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSave = () => {
    const payload = {
      ...form,
      isactive: form.isactive ? "Y" : "N",
      criticalevent: form.criticalevent ? "Y" : "N",
      isreusable: form.isreusable ? "Y" : "N",
    };

    setSaving(true);
    fetch("http://localhost:3001/events/" + (eventId ?? eventtype), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => onSaved(data))
      .catch((err) => console.log(err.message))
      .finally(() => setSaving(false));
  };

  return (
    <Dialog
      header="Update event"
      visible={visible}
      style={{ width: '50vw' }}
      onHide={onHide}
      className="edit-event-dialog"
    >
      {loading ? (
        <p className="details-status">Loading event...</p>
      ) : (
        <>
          <div className="form-field">
            <label htmlFor="eventtype">Event type *</label>
            <InputText
              id="eventtype"
              value={form.eventtype}
              onChange={(e) => updateField("eventtype", e.target.value)}
              placeholder="Example: Incident escalation"
            />
          </div>

          <div className="form-field">
            <label htmlFor="eventdescription">Description</label>
            <InputTextarea
              id="eventdescription"
              value={form.eventdescription}
              onChange={(e) => updateField("eventdescription", e.target.value)}
              rows={3}
              placeholder="Describe when this event should be used."
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="eventowner">Owner</label>
              <InputText
                id="eventowner"
                value={form.eventowner}
                onChange={(e) => updateField("eventowner", e.target.value)}
                placeholder="Select team"
              />
            </div>

            <div className="form-field">
              <label htmlFor="ipfstage">IPF stage</label>
              <InputText
                id="ipfstage"
                value={form.ipfstage}
                onChange={(e) => updateField("ipfstage", e.target.value)}
                placeholder="Select stage"
              />
            </div>
          </div>

          <div className="toggle-row">
            <Button
              label="Enabled"
              className={form.isactive ? "toggle-btn toggle-active" : "toggle-btn"}
              onClick={() => toggleField("isactive")}
            />
            <Button
              label="High priority"
              className={form.criticalevent ? "toggle-btn toggle-priority" : "toggle-btn"}
              onClick={() => toggleField("criticalevent")}
            />
            <Button
              label="Reusable"
              className={form.isreusable ? "toggle-btn toggle-reusable" : "toggle-btn"}
              onClick={() => toggleField("isreusable")}
            />
          </div>

          <div className="form-actions">
            <Button label="Cancel" severity="secondary" outlined onClick={onHide} />
            <Button label="Save" className="save-btn" loading={saving} onClick={handleSave} />
          </div>
        </>
      )}
    </Dialog>
  )
}

export default EditEvent
