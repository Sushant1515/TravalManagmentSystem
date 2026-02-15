import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";

export const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar 
        isSidebarCollapsed={isSidebarCollapsed} 
        onToggleSidebar={toggleSidebar} 
      />
      
      <Box sx={{ display: 'flex', flex: 1, mt: '64px' }}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            backgroundColor: 'grey.50',
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
