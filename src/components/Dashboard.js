import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactComponent as MapIcon } from '../assets/map.svg';
import { ReactComponent as DiagramIcon } from '../assets/diagram.svg';
import { ReactComponent as TableIcon } from '../assets/table.svg';
import { ReactComponent as DataVisIcon } from '../assets/data-visualization.svg';
import { ReactComponent as TextIcon } from '../assets/text.svg';
import { ReactComponent as StatisticsIcon } from '../assets/statistics.svg';

const Dashboard = ({ dashboard, isExpanded, onDashboardClick }) => {
  const [dashboardDetails, setDashboardDetails] = useState(null);

  useEffect(() => {
    // Fetch specific dashboard details when expanded
    if (isExpanded && dashboard && dashboard.id) {
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
  }, [isExpanded, dashboard]);

  const handleAccordionChange = () => {
    onDashboardClick(dashboard.id);
  };

  // Render individual dashboard item content with checks
  const renderDashboardItems = () => {
    if (dashboardDetails && dashboardDetails.dashboardItems) {
      return dashboardDetails.dashboardItems.map((item) => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
          {/* Conditional rendering based on item type */}
          {item.visualization && item.visualization.type === 'COLUMN' && (
            <DiagramIcon width={24} height={24} style={{ marginRight: '8px' }} />
          )}
          {item.visualization && item.visualization.type === 'PIVOT_TABLE' && (
            <TableIcon width={24} height={24} style={{ marginRight: '8px' }} />
          )}
          {item.visualization && item.visualization.type === 'TEXT' && (
            <TextIcon width={24} height={24} style={{ marginRight: '8px' }} />
          )}
          {item.visualization && item.visualization.type === 'MAP' && (
            <MapIcon width={24} height={24} style={{ marginRight: '8px' }} />
          )}
          {item.visualization && item.visualization.type === 'STACKED_COLUMN' && (
            <StatisticsIcon width={24} height={24} style={{ marginRight: '8px' }} />
          )}
          {item.visualization && item.visualization.type === 'PIE' && (
            <StatisticsIcon width={24} height={24} style={{ marginRight: '8px' }} />
          )}
          {item.visualization && item.visualization.type === 'VISUALIZATION' && (
            <DataVisIcon width={24} height={24} style={{ marginRight: '8px' }} />
          )}
          {/* Add similar checks for other item types */}
          <div>
            {item.visualization && item.visualization.name && (
              <Typography>{item.visualization.name}</Typography>
            )}
            {item.map && item.map.name && (
              <Typography>{item.map.name}</Typography>
            )}
            {/* Add similar checks for other item types */}
          </div>
        </div>
      ));
    } else {
      return <Typography>Loading...</Typography>;
    }
  };

  console.log('Dashboard details:', dashboardDetails);

  return (
    <Accordion expanded={isExpanded} onChange={handleAccordionChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>{dashboard ? dashboard.displayName : 'Loading...'}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {renderDashboardItems()}
      </AccordionDetails>
    </Accordion>
  );
};

export default Dashboard;
