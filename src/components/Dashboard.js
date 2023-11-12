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
import { Box } from '@mui/material';
import { ReactComponent as MapIcon } from '../assets/map.svg';
import { ReactComponent as DataVisIcon } from '../assets/data-visualization.svg';
import { ReactComponent as TextIcon } from '../assets/text.svg';

const Dashboard = ({ dashboard, isExpanded, onDashboardClick }) => {
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    // Fetches specific dashboard details when expanded and details are not already fetched
    if (isExpanded && dashboard && dashboard.id && !dashboardDetails) {
      const url = `https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/${dashboard.id}.json`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.dashboardItems) {
            setDashboardDetails(data);
          } else {
            console.error('Invalid dashboard details format:', data);
          }
        })
        .catch((error) => console.error('Error fetching dashboard details:', error));
    }
  }, [isExpanded, dashboard, dashboardDetails]);

  useEffect(() => {
    // Loads starred state from local storage
    const storedStarState = localStorage.getItem(`dashboardStar_${dashboard.id}`);
    if (storedStarState !== null) {
      setIsStarred(storedStarState === 'true');
    }
  }, [dashboard.id]);

  // Toggles the expanded state when clicking on the accordion
  const handleAccordionChange = () => {
    onDashboardClick(dashboard.id);
  };

  const handleStarClick = () => {
    // Toggles the starred state
    const newStarState = !isStarred;
    setIsStarred(newStarState);
    // Saves starred state to local storage
    localStorage.setItem(`dashboardStar_${dashboard.id}`, newStarState.toString());
  };

  // Renders individual dashboard item content with checks
  const renderDashboardItems = () => {
    if (dashboardDetails && dashboardDetails.dashboardItems) {
      return dashboardDetails.dashboardItems.map((item, index, array) => {
        // Check if there is either item.map.name or item.visualization.name
        if (!(item.map && item.map.name) && !(item.visualization && item.visualization.name) && !(item.text)) {
          return null; // Skip rendering if both are missing
        }

        const itemName = (item.visualization && item.visualization.name)
          || (item.map && item.map.name) || (item.text) || 'Unnamed Item';

        // Use a regular expression to match the text between '*'
        const matchResult = itemName.match(/\*(.*?)\*/);

        // Extract the matched text or use the entire itemName
        const displayedName = matchResult ? matchResult[1] : itemName;

        // Split after colon and only render second part of array
        const splitResult = displayedName.split(':');

        const renderedText = splitResult.length > 1 ? splitResult[1].trim() : displayedName;

        return (
          <React.Fragment key={item.id}>
            <div className="item-container">
              <div className="icon-container">
                {/* Conditional rendering based on item type */}
                {item.type === 'TEXT' && item.text && (
                  <TextIcon width={24} height={24} />
                )}
                {item.type === 'MAP' && (
                  <MapIcon width={24} height={24} />
                )}
                {item.type === 'VISUALIZATION' && (
                  <DataVisIcon width={24} height={24} />
                )}
              </div>
              <div>
                <Typography>{renderedText}</Typography>
              </div>
            </div>
            {index < array.length - 1 && <Divider />} {/* Add Divider for all items except the last one */}
          </React.Fragment>
        );
      });
    } else {
      return <Typography>Loading...</Typography>;
    }
  };

  return (
    <Box className="accordion-container">
      <Accordion style={{ width: '100%' }} expanded={isExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={handleAccordionChange} />} // Making sure the accordion is expanded only when clicking on the expand icon
          aria-controls="panel1a-content"
          id="panel1a-header">
          <div>
            <Typography className="item-text">{dashboard ? dashboard.displayName : 'Loading...'}</Typography>
          </div>
          <div className="StarIconBtn">
            <IconButton aria-label="star-icon" onClick={handleStarClick}>
              <StarIcon color={isStarred ? 'primary' : 'inherit'} />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails id="accordionDetails">
          {renderDashboardItems()}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Dashboard;
