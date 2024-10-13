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

  const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).map(file => file.name);
    setFileNames((prevFiles) => [...prevFiles, ...selectedFiles]); // Append new files to the existing list 
    // Store array of selected file names
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleSubmit = () => {
    // Simulated API data
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
  };

  return (
    <ThemeProvider theme={theme}>
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
