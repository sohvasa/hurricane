import React, { useState } from 'react';

import { Box, Button, Select, MenuItem, InputLabel, FormControl, Input, TextField, Card, CardContent, Typography, Grid, Divider, IconButton } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Results from './Results'; // Import Results component
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/poppins'; // Import professional fonts

// Create a custom theme for the app
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

const MobileResponsiveApp = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const navigate = useNavigate(); // Hook to navigate between screens
  const [base64Image, setBase64Image] = useState('');  // Store base64 image string
  const [apiResponse, setApiResponse] = useState('');  // Store API response

  // Convert image to base64
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];  // Remove the metadata part
      setBase64Image(base64String);  // Only send the base64 data
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
      totalDamage: totalEstimatedDamage,  // Using the total from the string
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
        base64_image: base64Image,  // Make sure this contains the base64 string
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
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
          padding: '32px',
        }}
      >
        <Card sx={{ maxWidth: '600px', width: '100%', boxShadow: 3 }}>
          <CardContent>
            {/* Main Heading */}
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
              Hurric<strong>ai</strong>d
            </Typography>



            {/* Subheading: Short, Professional Statement */}
            <Typography variant="h6" sx={{ mb: 4, textAlign: 'center' }}>
              AI-powered insights for smarter claim recovery.
            </Typography>

            {/* Short Instruction */}
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
              Upload your damages. Get your life back.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Dropdown Menu */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="dropdown-label">Select your insurance provider</InputLabel>
              <Select
                labelId="dropdown-label"
                id="dropdown"
                value={selectedItem}
                label="Select your insurance provider"
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
              sx={{ mb: 3 }}
            />

            {/* Custom File Upload */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                component="label"
                sx={{ mr: 2 }}
              >
                Upload Files
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  multiple
                />
              </Button>
              <IconButton color="primary" component="label">
                <AddCircleOutline />
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  multiple
                />
              </IconButton>
            </Box>

            {/* Display Selected File Names */}
            <Box sx={{ mb: 3, fontSize: '0.9rem', textAlign: 'center' }}>
              {fileNames.length > 0 ? (
                <ul>
                  {fileNames.map((fileName, index) => (
                    <li key={index}>{fileName}</li>
                  ))}
                </ul>
              ) : (
                'No files chosen'
              )}
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={!selectedItem || fileNames.length === 0 || !zipCode} // Disable button until all fields are filled
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>

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
