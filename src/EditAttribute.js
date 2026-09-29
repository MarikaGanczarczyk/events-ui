import React, { useEffect, useState } from 'react'
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { attributesApi } from './Api';
import "./EditEvent.css";

const EditAttribute = ({ visible, attributeName, onHide, onSaved }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [createdDate, setCreatedDate] = useState(null);
  const [lastUpdatedBy, setLastUpdatedBy] = useState(null);

  const [form, setForm] = useState({
    attributeName: "",
    dataType: "",
  });

  useEffect(() => {
    if (!visible) return;

    setLoading(true);

    attributesApi
      .getOne(attributeName)
      .then((response) => {
        const data = response.data;

        setCreatedDate(data.createdDate ?? null);
        setLastUpdatedBy(data.lastUpdatedBy ?? null);

        setForm({
          attributeName: data.attributeName || "",
          dataType: data.dataType || "",
        });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [visible, attributeName]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const payload = {
      ...form,
      attributeName,
      createdDate: createdDate ?? new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      lastUpdatedBy: lastUpdatedBy ?? "",
    };

    setSaving(true);

    fetch("http://localhost:3001/attributes/" + attributeName, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
      style={{ width: "50vw" }}
      onHide={onHide}
      className="edit-event-dialog"
    >
      {loading ? (
        <p className="details-status">
          Loading attribute...
        </p>
      ) : (
        <>
          <div className="form-field">
            <label htmlFor="attributeName">
              Attribute name *
            </label>

            <InputText
              id="attributeName"
              value={form.attributeName}
              disabled
              placeholder="Example: customer_id"
            />
          </div>

          <div className="form-field">
            <label htmlFor="dataType">
              Data type
            </label>

            <InputText
              id="dataType"
              value={form.dataType}
              onChange={(e) =>
                updateField("dataType", e.target.value)
              }
              placeholder="Example: String"
            />
          </div>

          <div className="form-actions">
            <Button
              label="Cancel"
              severity="secondary"
              outlined
              onClick={onHide}
            />

            <Button
              label="Save"
              className="save-btn"
              loading={saving}
              onClick={handleSave}
            />
          </div>
        </>
      )}
    </Dialog>
  );
};


export default EditAttribute
