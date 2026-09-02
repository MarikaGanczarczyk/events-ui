import React from 'react'
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import './CreateEvent.css'

const CreateCategory = ({ onCategoryCreated }) => {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [domain, setDomain] = useState("");
  const [owner, setOwner] = useState("");

  const resetForm = () => {
    setCategory("");
    setDomain("");
    setOwner("");
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();

    const newCategory = {
      category: category,
      domain: domain,
      owner: owner,
    };

    fetch("http://localhost:3001/categories", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((created) => {
        onCategoryCreated?.(created);
        setVisible(false);
        resetForm();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Button
        label="+ New Category"
        className="new-event-btn"
        onClick={() => setVisible(true)}
      />
      <Dialog
        className="dialog"
        header="Create New Category"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <InputText
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder=""
          />
        </div>

        <div className="form-field">
          <label htmlFor="domain">Domain</label>
          <InputText
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder=""
          />
        </div>

        <div className="form-field">
          <label htmlFor="owner">Owner</label>
          <InputText
            id="owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder=""
          />
        </div>

        <div className="form-actions">
          <Button
            className="cancel-btn"
            label="Cancel"
            severity="secondary"
            onClick={() => setVisible(false)}
          />

          <Button
            className="new-event-btn"
            label="Create Category"
            icon="pi pi-check"
            onClick={handleCreateCategory}
          />
        </div>
      </Dialog>
    </>
  );
};

export default CreateCategory