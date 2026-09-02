import React from 'react';
import { Card } from "primereact/card";

import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const StatCard = ({ label, value, icon, subtext, onClick}) => (
  <Card className="stat-card"  onClick={onClick}>
    <div className="stat-card-header">
      <span className="stat-label">{label}</span>
      <i className={`pi ${icon} stat-icon`} />
    </div>
    <div className="stat-value">{value}</div>
    {subtext && <div className="stat-subtext">{subtext}</div>}
  </Card>
);



const Dashboard = ({
  totalEvents = 87,
  totalAttributes = 312,
  totalCategories = 6,
  pendingRequests = 3,
  eventsSubtext = "+4 this month",
  attributesSubtext = "+18 this month",
  categoriesSubtext = "1 in draft",
  requestsSubtext = "2 over 48h SLA"
}) => {

const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="breadcrumb">Home / Dashboard</div>
        <h1>My dashboard</h1>
        <p className="dashboard-subtitle">
          Reference data domain overview for the current period.
        </p>
      </div>

      <div className="stat-cards-row">
        <StatCard

          label="TOTAL EVENTS"
          value={totalEvents}
          icon="pi pi-bolt"
          subtext={eventsSubtext}
          onClick={() => navigate("/events")}
        />
        <StatCard
          label="TOTAL ATTRIBUTES"
          value={totalAttributes}
          icon="pi pi-book"
          subtext={attributesSubtext}
          onClick={() => navigate("/attributes")}
        />
        <StatCard
          label="TOTAL CATEGORIES"
          value={totalCategories}
          icon="pi pi-tags"
          subtext={categoriesSubtext}
          onClick={() => navigate("/categories")}
        />
        <StatCard
          label="PENDING REQUESTS"
          value={pendingRequests}
          icon="pi pi-clock"
          subtext={requestsSubtext}
        />
      </div>

     
       <div className="cards-row">
    <Card title="Recent activity">
        Content
    </Card>

    <Card title="My requests">
        Content
    </Card>
</div>
      </div>
   
  );
};

export default Dashboard;