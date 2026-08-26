import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

import EditEvent from "./EditEvent";
import "./EventDetail.css";

const isYes = (value) => value === "Y" || value === true || value === 1;

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
};

const EventDetails = () => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const { eventtype } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/events/" + eventtype)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [eventtype]);

  const handleDelete = () => {
    fetch("http://localhost:3001/events/" + (eventData?.id ?? eventtype), {
      method: "DELETE",
    })
      .then(() => navigate("/events"))
      .catch((err) => console.log(err.message));
  };

  if (loading) {
    return (
      <div className="container">
        <p className="details-status">Loading event...</p>
      </div>
    );
  }

  if (!eventData || !eventData.eventtype) {
    return (
      <div className="container">
        <p className="details-status">Event not found.</p>
      </div>
    );
  }

  const created = formatDate(eventData.createdAt);
  const updated = formatDate(eventData.updatedAt);

  return (
    <div className="container">
      <Button
        label="Back"
        icon="pi pi-arrow-left"
        className="back-btn"
        text
        onClick={() => navigate(-1)}
      />
      <div className="details-card">
        <div className="details-header">
          <h2>Event details</h2>
          <div className="details-actions">
            <Button label="Edit" className="edit-btn" outlined onClick={() => setEditVisible(true)} />
            <Button label="Delete" className="delete-btn" severity="danger" outlined onClick={handleDelete} />
          </div>
        </div>

        <p className="details-title">{eventData.eventtype}</p>

        <div className="details-tags">
          <Tag
            value={isYes(eventData.isactive) ? "Enabled" : "Disabled"}
            className={isYes(eventData.isactive) ? "tag-enabled" : "tag-neutral"}
          />
          <Tag
            value={isYes(eventData.criticalevent) ? "High priority" : "Normal priority"}
            className={isYes(eventData.criticalevent) ? "tag-priority" : "tag-neutral"}
          />
          <Tag
            value={isYes(eventData.isreusable) ? "Reusable" : "Single use"}
            className="tag-neutral"
          />
          <Tag value={`Stage: ${eventData.ipfstage || "—"}`} className="tag-stage" />
          <Tag value={`Category: ${eventData.category || "General"}`} className="tag-category" />
        </div>

        <div className="details-section">
          <h4>Description</h4>
          <p className="details-description">{eventData.eventdescription || "No description provided."}</p>
        </div>

        <div className="details-grid">
          <div>
            <h4>Owner</h4>
            <p>{eventData.eventowner || "—"}</p>
          </div>
          <div>
            <h4>Attribute</h4>
            <p>{eventData.attribute || "—"}</p>
          </div>
        </div>

        {(created || updated) && (
          <div className="details-footer">
            {created && <span>Created {created}</span>}
            {created && updated && <span className="details-footer-sep">•</span>}
            {updated && <span>Updated {updated}</span>}
          </div>
        )}
      </div>

      <EditEvent
        visible={editVisible}
        eventtype={eventtype}
        onHide={() => setEditVisible(false)}
        onSaved={(updated) => {
          setEditVisible(false);
          if (updated.eventtype && updated.eventtype !== eventtype) {
            navigate(`/events/${updated.eventtype}`);
          } else {
            setEventData(updated);
          }
        }}
      />
    </div>
  )
}

export default EventDetails
