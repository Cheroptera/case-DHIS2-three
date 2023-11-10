import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Dashboard = ({ dashboard }) => {
  const [expanded, setExpanded] = useState(false);
  const [dashboardDetails, setDashboardDetails] = useState(null);

  useEffect(() => {
    // Fetch specific dashboard details when expanded
    if (expanded && dashboard && dashboard.id) {
      const url = `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${dashboard.id}.json`;

      console.log('Fetching dashboard details for URL:', url);

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched dashboard details successfully:', data);
          if (data && data.dashboardItems) {
            setDashboardDetails(data);
          } else {
            console.error('Invalid dashboard details format:', data);
          }
        })
        .catch((error) => console.error('Error fetching dashboard details:', error));
    }
  }, [expanded, dashboard]);
  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleAccordionChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>{dashboard ? dashboard.displayName : 'Loading...'}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {dashboardDetails ? (
          dashboardDetails.dashboardItems.map((item) => (
            <div key={item.id}>
              {/* Render individual dashboard item content */}
              {/* You can use item.type to determine the type and render accordingly */}
              <Typography>{item.visualization.name}</Typography>
            </div>
          ))
        ) : (
          <Typography>Loading...</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default Dashboard;
