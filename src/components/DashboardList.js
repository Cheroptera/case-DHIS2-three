import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';

const DashboardList = () => {
  const [dashboards, setDashboards] = useState([]);
  const [expandedDashboardId, setExpandedDashboardId] = useState(null);

  useEffect(() => {
    // Fetches the list of dashboards
    fetch('https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json')
      .then((response) => response.json())
      .then((data) => setDashboards(data.dashboards))
      .catch((error) => console.error('Error fetching dashboards:', error));
  }, []); // Empties dependency array to run the effect only once on mount

  // Expands the first dashboard by default
  useEffect(() => {
    if (dashboards && dashboards.length > 0) {
      setExpandedDashboardId(dashboards[0].id);
    }
  }, [dashboards]);

  // Toggles the expanded dashboard ID when clicking on a dashboard
  const handleDashboardClick = (dashboardId) => {
    setExpandedDashboardId((prevId) => (prevId === dashboardId ? null : dashboardId));
  };

  return (
    <div className="main-wrapper">
      <div className="header">
        <h1>Dashboards</h1>
      </div>
      {dashboards.map((dashboard) => (
        <Dashboard
          key={dashboard.id}
          dashboard={dashboard}
          isExpanded={dashboard.id === expandedDashboardId}
          onDashboardClick={handleDashboardClick} />
      ))}
    </div>
  );
};

export default DashboardList;
