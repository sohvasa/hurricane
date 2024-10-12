import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const { damages, totalDamage, totalInsuranceClaim, totalInsuranceSavePercentage } = location.state || {}; // Extract data from state

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
      <Typography variant="h4" sx={{ mb: 4 }}>
        Results
      </Typography>

      {/* List the damages and details */}
      {damages && damages.map((damage, index) => (
        <Box key={index} sx={{ mb: 2, width: '100%' }}>
          <Typography>
            {damage.name}: ${damage.cost} | Damage Score: {damage.damageScore} | Insurance Claim: ${damage.insuranceClaim} | Likelihood: {damage.likelihood}
          </Typography>
        </Box>
      ))}

      {/* Total summary at the bottom */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Total Damages: ${totalDamage}</Typography>
        <Typography variant="h6">Total Insurance Claim: ${totalInsuranceClaim}</Typography>
        <Typography variant="h6">Total Insurance Save Percentage: {totalInsuranceSavePercentage}%</Typography>
      </Box>
    </Box>
  );
};

export default Results;
