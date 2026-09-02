import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const menuRef = useRef(null);
  const [activeRow, setActiveRow] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const navigate = useNavigate();

  const menuItems = [
    {
      label: "View details",
      icon: "pi pi-eye",
      command: () => navigate(`/categories/${activeRow.category}`),
    },
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        setEditCategoryName(activeRow.category);
        setEditVisible(true);
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        fetch(
          "http://localhost:3001/categories/" +
            (activeRow.id ?? activeRow.category),
          {
            method: "DELETE",
          },
        )
          .then(() =>
            setCategories((prev) =>
              prev.filter((c) => c.category !== activeRow.category),
            ),
          )
          .catch((err) => console.log(err.message));
      },
    },
  ];

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

  const handleCategoryCreated = (created) => {
    setCategories((prev) => [...prev, created]);
  };

  return (
    <div className="container">
      <Button
        label="Back"
        icon="pi pi-arrow-left"
        className="back-btn"
        text
        onClick={() => navigate(-1)}
      />
      <div className="page-header">
        <h2>Categories</h2>
        <p className="page-subtitle">Search and manage categories</p>
      </div>

      <div className="search-container">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search category" />
        </span>

        <div>
          <div>
            <CreateCategory onCategoryCreated={handleCategoryCreated} />
          </div>
        </div>
      </div>

      <div className="table-container">
        <DataTable
          value={categories}
          className="categories-table"
          onRowClick={(e) => navigate(`/categories/${e.data.category}`)}
        >
          <Column field="category" header="Category" sortable />
          <Column field="domain" header="Domain" sortable />
          <Column field="owner" header="Owner" sortable />
          <Column header="Actions" body={actionBodyTemplate} />
        </DataTable>
      </div>

      <Menu model={menuItems} popup ref={menuRef} />

      <EditCategory
        visible={editVisible}
        category={editCategoryName}
        onHide={() => setEditVisible(false)}
        onSaved={(updated) => {
          setEditVisible(false);
          setCategories((prev) =>
            prev.map((c) => (c.category === editCategoryName ? updated : c)),
          );
        }}
      />
    </div>
  );
};

export default Categories;
