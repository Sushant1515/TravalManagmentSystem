import React, { Suspense } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LoaderWrapper } from "./components/common/LoaderWrapper";
import { Box, Typography } from "@mui/material";

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <ErrorBoundary>
        <Suspense fallback={
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '100vh',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <LoaderWrapper />
          </Box>
        }>
          <AppRoutes />
          <LoaderWrapper />
        </Suspense>
      </ErrorBoundary>
    </LoadingProvider>
  );
};

export default App;
