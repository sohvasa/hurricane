import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, InputLabel, FormControl, Input, TextField } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Results from './Results'; // Import Results component


const MobileResponsiveApp = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [fileName, setFileName] = useState(null);
  const [zipCode, setZipCode] = useState(''); // zipcode
  const navigate = useNavigate(); // Hook to navigate between screens
  const [base64Image, setBase64Image] = useState('');  // Store base64 image string
  const [apiResponse, setApiResponse] = useState('');  // Store API response

  // Convert image to base64
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];  // Remove the metadata part
      setBase64Image(base64String);  // Only send the base64 data
    };
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

  function parseDamageReport(inputString) {
    // Regular expression to match names surrounded by **
    const nameMatches = inputString.match(/\*\*(.*?)\*\*/g)?.map(name => name.replace(/\*\*/g, '').trim()) || [];
  
    // Regular expression to match all dollar values (after $)
    const costMatches = inputString.match(/\$(\d+[,.]?\d*)/g)?.map(cost => parseFloat(cost.replace(/[$,]/g, ''))) || [];
  
    const damages = [];
    let totalDamage = 0;
  
    // Iterate over both name and cost matches (excluding the last cost, which is the total)
    for (let i = 0; i < nameMatches.length && i < costMatches.length - 1; i++) {
      damages.push({
        name: nameMatches[i],
        cost: costMatches[i],
      });
      totalDamage += costMatches[i]; // Add to total damage
    }
  
    // The last cost match is the total estimated damage
    const totalEstimatedDamage = costMatches[costMatches.length - 1];
  
    // Construct the final apiData object
    const apiData = {
      damages,
      totalDamage: totalEstimatedDamage,  // Using the total from the string
    };
  
    return apiData;
  }
  

  const handleSubmit = () => {
    // Handle form submission logic
  
    // Check if required fields are provided
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
        base64_image: base64Image,  // Make sure this contains the base64 string
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Once the API response is received, set the inputStr and navigate
        console.log('Success:', data);
  
        const apiData = parseDamageReport(data.report);
        console.log('report:', data.report);
        console.log('API Data:', apiData);

        // Ensure navigation happens only after data is processed
        navigate('/results', { state: apiData });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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