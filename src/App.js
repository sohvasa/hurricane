import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, InputLabel, FormControl, Input, TextField } from '@mui/material';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Results from './Results'; // Import Results component


const MobileResponsiveApp = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [fileName, setFileName] = useState(null);
  const [zipCode, setZipCode] = useState(''); // zipcode
  const navigate = useNavigate(); // Hook to navigate between screens
  const [base64Image, setBase64Image] = useState('');  // Store base64 image string
  const [apiResponse, setApiResponse] = useState('');  // Store API response

  // Convert image to base64
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    console.log('converting to base64')
  };

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file?.name || 'No file chosen');
    if (file) {
      convertToBase64(file);
    }
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleSubmit = () => {
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

    // console.log("Submitted: ", { selectedItem, fileName, zipCode });

    if (!base64Image || !selectedItem || !zipCode) {
      return;
    }
  
    // Make the API call to Flask
    fetch('http://127.0.0.1:5000/process-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64_image: base64Image,  // Make sure this contains the base64 string
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


      navigate('/results', { state: apiData });
    
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
        backgroundColor: '#ffe5b4',
      }}
    >
      {/* Header 1 */}
      <Box
        component="header"
        sx={{
          width: '100%',
          padding: '16px',
          backgroundColor: '#ffe5b4',
          color: '#000',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        Welcome to Milton: the AI-powered community rebuilder.
      </Box>

      {/* Header 2 */}
      <Box
        component="header"
        sx={{
          width: '100%',
          padding: '50px',
          backgroundColor: '#ffe5b4',
          color: '#000',
          textAlign: 'center',
          fontSize: '1.2rem',
          fontWeight: 'semi-bold',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        Upload your damages. Get your life back.
      </Box>

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
          <MenuItem value="option1">Allstate</MenuItem>
          <MenuItem value="option2">NFIP</MenuItem>
          <MenuItem value="option3">Allied Trust</MenuItem>
          <MenuItem value="option4">American Family</MenuItem>
          <MenuItem value="option5">Auto Club South Insurance</MenuItem>
          <MenuItem value="option6">Centauri Specialty</MenuItem>
          <MenuItem value="option7">Fire Insurance Exchange</MenuItem>
          <MenuItem value="option8">Hartfort Fire Insurance</MenuItem>
          <MenuItem value="option9">Liberty Mutual</MenuItem>
          <MenuItem value="option10">People's Trust</MenuItem>
          <MenuItem value="option11">USAA</MenuItem>
          <MenuItem value="option12">Wright National Flood</MenuItem>
        </Select>
      </FormControl>


       {/* Zip Code Input */} 
       <TextField

        fullWidth
        label="Input your zipcode"
        variant="outlined"
        value={zipCode}
        onChange={handleZipCodeChange}
        sx={{ mb: 2 }}
      />

      {/* File Upload */}
      <Button variant="contained" component="label" fullWidth>
        Upload File
        <Input type="file" hidden onChange={handleFileChange} />
      </Button>

      {/* Display Selected File Name */}
      <Box sx={{ mt: 2, fontSize: '14px', textAlign: 'center' }}>
        {fileName ? `Selected File: ${fileName}` : 'No file chosen'}
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={!selectedItem || !fileName || !zipCode}
      >
        Submit
      </Button>

      {/* Display API Response */}
      {apiResponse && (
        <Box sx={{ mt: 4, fontSize: '16px', textAlign: 'center', color: '#333' }}>
          <p>{apiResponse}</p>
        </Box>
      )}
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
