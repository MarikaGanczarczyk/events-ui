import React, { useEffect, useState } from 'react'
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import "./EditEvent.css";

const EditCategory = ({ visible, category, onHide, onSaved }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const [form, setForm] = useState({
    category: "",
    domain: "",
    owner: "",
  });

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    fetch("http://localhost:3001/categories/" + category)
      .then((res) => res.json())
      .then((data) => {
        setCategoryId(data.id ?? category);
        setForm({
          category: data.category || "",
          domain: data.domain || "",
          owner: data.owner || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [visible, category]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    const payload = {
      ...form,
      category,
    };

    setSaving(true);
    fetch("http://localhost:3001/categories/" + (categoryId ?? category), {
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
      header="Update category"
      visible={visible}
      style={{ width: '50vw' }}
      onHide={onHide}
      className="edit-event-dialog"
    >
      {loading ? (
        <p className="details-status">Loading category...</p>
      ) : (
        <>
          <div className="form-field">
            <label htmlFor="category">Category *</label>
            <InputText
              id="category"
              value={form.category}
              disabled
              placeholder="Example: Financial"
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="domain">Domain</label>
              <InputText
                id="domain"
                value={form.domain}
                onChange={(e) => updateField("domain", e.target.value)}
                placeholder="Enter domain"
              />
            </div>

            <div className="form-field">
              <label htmlFor="owner">Owner</label>
              <InputText
                id="owner"
                value={form.owner}
                onChange={(e) => updateField("owner", e.target.value)}
                placeholder="Enter owner"
              />
            </div>
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

export default EditCategory