/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { ReactComponent as MapIcon } from '../assets/map.svg';
import { ReactComponent as DataVisIcon } from '../assets/data-visualization.svg';
import { ReactComponent as TextIcon } from '../assets/text.svg';

const Dashboard = ({ dashboard, isExpanded, onDashboardClick }) => {
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    // Fetch specific dashboard details when expanded and details are not already fetched
    if (isExpanded && dashboard && dashboard.id && !dashboardDetails) {
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
  }, [isExpanded, dashboard, dashboardDetails]);

  // Toggle the expanded state when clicking on the accordion
  const handleAccordionChange = () => {
    onDashboardClick(dashboard.id);
  };

  const handleStarClick = () => {
    // Toggle the starred state
    setIsStarred((prevIsStarred) => !prevIsStarred);
    // You can add logic to update the backend with the starred state
  };

  // Render individual dashboard item content with checks
  const renderDashboardItems = () => {
    if (dashboardDetails && dashboardDetails.dashboardItems) {
      return dashboardDetails.dashboardItems.map((item, index, array) => (
        <React.Fragment key={item.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Conditional rendering based on item type */}
            {item.type === 'TEXT' && (
              <TextIcon width={24} height={24} style={{ marginRight: '8px' }} />
            )}
            {item.type === 'MAP' && (
              <MapIcon width={24} height={24} style={{ marginRight: '8px' }} />
            )}
            {item.type === 'VISUALIZATION' && (
              <DataVisIcon width={24} height={24} style={{ marginRight: '8px' }} />
            )}
            <div>
              {/* Split after colon and only render second part of array */}
              {item.visualization && item.visualization.name && (
                <Typography>{item.visualization.name.split(':')[1]}</Typography>
              )}
              {item.map && item.map.name && (
                <Typography>{item.map.name.split(':')[1]}</Typography>
              )}
            </div>
          </div>
          {index < array.length - 1 && <Divider />} {/* Add Divider for all items except the last one */}
        </React.Fragment>
      ));
    } else {
      return <Typography>Loading...</Typography>;
    }
  };

  console.log('Dashboard details:', dashboardDetails);

  return (
    <Accordion style={{ width: '50%', border: '1px solid green' }} expanded={isExpanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon onClick={handleAccordionChange} />} // Add onClick handler here
        aria-controls="panel1a-content"
        id="panel1a-header">
        <div>
          <Typography style={{ fontSize: '24px', color: 'hotpink' }}>{dashboard ? dashboard.displayName : 'Loading...'}</Typography>
        </div>
        <div className="StarIconBtn">
          <IconButton onClick={handleStarClick}>
            <StarIcon color={isStarred ? 'primary' : 'inherit'} />
          </IconButton>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {renderDashboardItems()}
      </AccordionDetails>
    </Accordion>
  );
};

export default Dashboard;
