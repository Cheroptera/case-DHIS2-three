import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard'; // Adjust the path accordingly

const DashboardList = () => {
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    // Fetch the list of dashboards
    fetch('https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json')
      .then((response) => response.json())
      .then((data) => setDashboards(data.dashboards))
      .catch((error) => console.error('Error fetching dashboards:', error));
  }, []); // Empty dependency array to run the effect only once on mount
  return (
    <div>
      {dashboards.map((dashboard) => (
        <Dashboard key={dashboard.id} dashboard={dashboard} />
      ))}
    </div>
  );
};

export default DashboardList;
