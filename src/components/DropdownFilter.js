import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const DropdownFilter = () => {
  const [filterItems, setFilterItems] = useState('');

  const handleChange = (event) => {
    setFilterItems(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">All types</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterItems}
          label="Filter Items:"
          onChange={handleChange}>
          <MenuItem value={10}>All Types</MenuItem>
          <MenuItem value={20}>Visualization</MenuItem>
          <MenuItem value={30}>Map</MenuItem>
          <MenuItem value={30}>Text</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropdownFilter;