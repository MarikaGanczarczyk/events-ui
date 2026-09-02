import React, { useEffect, useState } from 'react'
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import "./EditEvent.css";

const EditAttribute = ({ visible, attributename, onHide, onSaved }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [attributeId, setAttributeId] = useState(null);
  const [createddate, setCreateddate] = useState(null);
  const [lastupdatedby, setLastupdatedby] = useState(null);

  const [form, setForm] = useState({
    attributename: "",
    datatype: "",
  });

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    fetch("http://localhost:3001/attributes/" + attributename)
      .then((res) => res.json())
      .then((data) => {
        setAttributeId(data.id ?? attributename);
        setCreateddate(data.createddate ?? null);
        setLastupdatedby(data.lastupdatedby ?? null);
        setForm({
          attributename: data.attributename || "",
          datatype: data.datatype || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [visible, attributename]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    const payload = {
      ...form,
      attributename,
      createddate: createddate ?? new Date().toISOString(),
      updateddate: new Date().toISOString(),
      lastupdatedby: lastupdatedby ?? "",
    };

    setSaving(true);
    fetch("http://localhost:3001/attributes/" + (attributeId ?? attributename), {
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
      header="Update attribute"
      visible={visible}
      style={{ width: '50vw' }}
      onHide={onHide}
      className="edit-event-dialog"
    >
      {loading ? (
        <p className="details-status">Loading attribute...</p>
      ) : (
        <>
          <div className="form-field">
            <label htmlFor="attributename">Attribute name *</label>
            <InputText
              id="attributename"
              value={form.attributename}
              disabled
              placeholder="Example: customer_id"
            />
          </div>

          <div className="form-field">
            <label htmlFor="datatype">Data type</label>
            <InputText
              id="datatype"
              value={form.datatype}
              onChange={(e) => updateField("datatype", e.target.value)}
              placeholder="Example: String"
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

export default EditAttribute
