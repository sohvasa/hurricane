import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, InputLabel, FormControl, Input, TextField } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Results from './Results'; // Import Results component


const MobileResponsiveApp = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [fileName, setFileName] = useState(null);
  const [zipCode, setZipCode] = useState(''); // zipcode
  const navigate = useNavigate(); // Hook to navigate between screens

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleFileChange = (event) => {
    setFileName(event.target.files[0]?.name || 'No file chosen');
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value); // Update zip code state
  };

  const handleSubmit = () => { // CHANGED
    // Handle form submission logic
    const apiData = {
      damages: [
        { name: 'Roof Damage', cost: 5000, damageScore: 7, insuranceClaim: 3000, likelihood: 'High' },
        { name: 'Water Damage', cost: 2000, damageScore: 5, insuranceClaim: 1500, likelihood: 'Medium' },
      ],
      totalDamage: 7000,
      totalInsuranceClaim: 4500,
      totalInsuranceSavePercentage: 64,
    };
    navigate('/results', { state: apiData });
    // console.log("Submitted: ", { selectedItem, fileName, zipCode });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* Dropdown Menu */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="dropdown-label">Select an option</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          value={selectedItem}
          label="Select an option"
          onChange={handleSelectChange}
        >
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>

        {/* Zip Code Input */} 
        <TextField
        fullWidth
        label="Input your zipcode"
        variant="outlined"
        value={zipCode}
        onChange={handleZipCodeChange}
        sx={{ mb: 2 }} // Add margin for spacing
      />

      {/* File Upload */}
      <Button variant="contained" component="label" fullWidth>
        Upload File
        <Input type="file" hidden onChange={handleFileChange} />
      </Button>

      {/* Display Selected File Name */}
      <Box sx={{ mt: 2, fontSize: '14px', textAlign: 'center' }}>
        {fileName ? `Selected File: ${fileName}` : 'No file chosen'}

        {/* Submit Button */} 
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={!selectedItem || !fileName || !zipCode} // Disable button until all fields are filled
      >
        Submit
        </Button>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MobileResponsiveApp />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
