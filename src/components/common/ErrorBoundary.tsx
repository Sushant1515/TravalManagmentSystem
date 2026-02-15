import React from "react";
import { Box, Typography, Alert, AlertTitle } from "@mui/material";

interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            <AlertTitle>Something went wrong</AlertTitle>
            An unexpected error occurred. Please try refreshing the page.
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" component="pre" sx={{ 
                  backgroundColor: 'grey.100', 
                  p: 1, 
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  overflow: 'auto'
                }}>
                  {this.state.error.message}
                </Typography>
              </Box>
            )}
          </Alert>
        </Box>
      );
    }
    return this.props.children;
  }
}
