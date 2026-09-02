import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";

import EditAtribute from "./EditAtribute";

const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
};

const Atributes = () => {
  const [attributes, setAttributes] = useState([]);

  const [activeRow, setActiveRow] = useState(null);
  const [editAttributeName, setEditAttributeName] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3001/attributes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAttributes(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const menuItems = [
    {
      label: "View details",
      icon: "pi pi-eye",
    },
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        setEditAttributeName(activeRow.attributename);
        setEditVisible(true);
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        fetch("http://localhost:3001/attributes/" + (activeRow.id ?? activeRow.attributename), {
          method: "DELETE",
        })
          .then(() =>
            setAttributes((prev) => prev.filter((a) => a.attributename !== activeRow.attributename))
          )
          .catch((err) => console.log(err.message));
      },
    },
  ];

  const createdBodyTemplate = (rowData) => formatDate(rowData.createddate) || "—";
  const updatedBodyTemplate = (rowData) => formatDate(rowData.updateddate) || "—";

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-ellipsis-v"
        className="action-btn"
        onClick={(e) => {
          e.stopPropagation();
          setActiveRow(rowData);
          menuRef.current.toggle(e);
        }}
      />
    );
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Attributes </h2>
        <p className="page-subtitle">Search and manage attributes</p>
      </div>

      <div className="search-container">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search attribute name" />
        </span>
      </div>

      <div className="table-container">
        <DataTable value={attributes} className="attributes-table">
          <Column field="attributename" header="Attribute Name" sortable />
          <Column field="datatype" header="Data Type" sortable />
          <Column field="createddate" header="Created" body={createdBodyTemplate} sortable />
          <Column field="updateddate" header="Last Updated" body={updatedBodyTemplate} sortable />
          <Column field="lastupdatedby" header="Updated By" sortable />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>

      <Menu model={menuItems} popup ref={menuRef} />

      <EditAtribute
        visible={editVisible}
        attributename={editAttributeName}
        onHide={() => setEditVisible(false)}
        onSaved={(updated) => {
          setEditVisible(false);
          setAttributes((prev) =>
            prev.map((a) => (a.attributename === editAttributeName ? updated : a))
          );
        }}
      />
    </div>
  );
};

export default Atributes;
