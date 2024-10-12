import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider, Button } from '@mui/material';
import { useLocation, useNavigate  } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/poppins'; // Import professional fonts

// Create a custom theme with a professional font
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

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate
  const { damages, totalDamage, totalInsuranceClaim, totalInsuranceSavePercentage } = location.state || {}; // Extract data from state

  const handleBackClick = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '32px',
          backgroundColor: '#f9f9f9',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Results Summary
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ width: '100%', maxWidth: '800px' }}>
          {/* List the damages and details in a card */}
          {damages && damages.map((damage, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ backgroundColor: '#ffffff', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{damage.name}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography>Cost: <strong>${damage.cost}</strong></Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Damage Score: <strong>{damage.damageScore}</strong></Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Insurance Claim: <strong>${damage.insuranceClaim}</strong></Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Likelihood: <strong>{damage.likelihood}</strong></Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Total summary in a card */}
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#ffffff', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Total Summary</Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography>Total Damages:</Typography>
                    <Typography><strong>${totalDamage}</strong></Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Total Insurance Claim:</Typography>
                    <Typography><strong>${totalInsuranceClaim}</strong></Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>Insurance Save Percentage:</Typography>
                    <Typography><strong>{totalInsuranceSavePercentage}%</strong></Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Back to Home Button */}
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 4 }} 
          onClick={handleBackClick}
        >
          Back to Home
        </Button>
      </Box>
            

    </ThemeProvider>
  );
};

export default Results;