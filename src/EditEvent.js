import React, { useEffect, useState } from 'react'
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { eventsApi } from './Api';
import "./EditEvent.css";

const isYes = (value) => value === "Y" || value === true || value === 1;

const EditEvent = ({ visible, eventType, onHide, onSaved }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [eventId, setEventId] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  const [form, setForm] = useState({
  eventType: "", eventDescription: "", eventOwner: "", gifStage: "", isActive: false, critical: false, isReusable: false,
  });

 useEffect(() => {
    if (!visible) return;

    setLoading(true);

    eventsApi
      .getOne(eventType)
      .then((response) => {
        const data = response.data;

        setEventId(data.id ?? eventType);
        setCreatedAt(data.createdAt ?? null);
        setForm({
        eventType: data.eventType || "", eventDescription: data.eventDescription || "", eventOwner: data.eventOwner || "", gifStage: data.gifStage || "", isActive: isYes(data.isActive), critical: isYes(data.critical), isReusable: isYes(data.isReusable),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [visible, eventType]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleField = (field) => setForm((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSave = () => {
    const payload = {
      ...form,
      eventType,
      isActive: form.isActive ? "Y" : "N",
      critical: form.critical ? "Y" : "N",
      isReusable: form.isReusable ? "Y" : "N",
      createdAt: createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

   setSaving(true);
    eventsApi
      .update(eventId ?? eventType, payload)
      .then((response) => onSaved(response.data))
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
              value={form.eventType}
              disabled
              placeholder="Example: Incident escalation"
            />
          </div>

          <div className="form-field">
            <label htmlFor="eventdescription">Description</label>
            <InputTextarea
              id="eventdescription"
              value={form.eventDescription}
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
                value={form.eventOwner}
                onChange={(e) => updateField("eventowner", e.target.value)}
                placeholder="Select team"
              />
            </div>

            <div className="form-field">
              <label htmlFor="ipfstage">IPF stage</label>
              <InputText
                id="ipfstage"
                value={form.gifStage}
                onChange={(e) => updateField("ipfstage", e.target.value)}
                placeholder="Select stage"
              />
            </div>
          </div>

          <div className="toggle-row">
            <Button
              label="Enabled"
              className={form.isActive ? "toggle-btn toggle-active" : "toggle-btn"}
              onClick={() => toggleField("isactive")}
            />
            <Button
              label="High priority"
              className={form.critical ? "toggle-btn toggle-priority" : "toggle-btn"}
              onClick={() => toggleField("criticalevent")}
            />
            <Button
              label="Reusable"
              className={form.isReusable ? "toggle-btn toggle-reusable" : "toggle-btn"}
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
