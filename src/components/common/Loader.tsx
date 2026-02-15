import React from 'react';
import { Backdrop, CircularProgress, Box, Typography } from '@mui/material';

interface LoaderProps {
  open: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ open, message = 'Loading...' }) => {
  return (
    <Backdrop
      sx={{ 
        color: '#fff', 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
      }}
      open={open}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 3,
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: '#14b8a6',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress
              size={50}
              thickness={3}
              sx={{
                color: '#ffffff',
                animation: 'spin 1.5s linear infinite reverse',
              }}
            />
          </Box>
        </Box>
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            color: '#ffffff',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};
