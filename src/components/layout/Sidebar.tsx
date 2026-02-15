import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  LocationOn as LocationIcon, 
  People as PeopleIcon, 
  DirectionsCar as CarIcon, 
  Schedule as ScheduleIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { useLoading } from '../../contexts/LoadingContext';

interface SidebarProps {
  isCollapsed: boolean;
}

const drawerWidth = 240;
const collapsedWidth = 75;

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoading();
  const theme = useTheme();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon, message: 'Loading Dashboard...' },
    { path: '/tracking', label: 'Live Tracking', icon: LocationIcon, message: 'Loading Live Tracking...' },
    { path: '/drivers', label: 'Drivers', icon: PeopleIcon, message: 'Loading Drivers...' },
    { path: '/vehicles', label: 'Vehicles', icon: CarIcon, message: 'Loading Vehicles...' },
    { path: '/shifts', label: 'Shifts', icon: ScheduleIcon, message: 'Loading Shifts...' },
  ];

  const handleNavigation = (path: string, message: string) => {
    if (location.pathname === path) return;
    
    showLoader(message);
    
    // Simulate navigation delay
    setTimeout(() => {
      navigate(path);
      hideLoader();
    }, 800);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: isCollapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? collapsedWidth : drawerWidth,
          boxSizing: 'border-box',
          top: '64px', // Height of AppBar
          height: 'calc(100vh - 64px)', // Subtract AppBar height
          transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          background: '#ffffff',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {!isCollapsed && (
            <Typography 
              variant="h6" 
              sx={{ 
                flexGrow: 1,
                color: '#14b8a6',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
            >
              Navigation
            </Typography>
          )}
          <Box sx={{ color: '#14b8a6' }}>
            {isCollapsed ? (
              <ChevronRightIcon sx={{ fontSize: 20 }} />
            ) : (
              <ChevronLeftIcon sx={{ fontSize: 20 }} />
            )}
          </Box>
        </Box>
        
        <Divider sx={{ 
          mb: 2, 
          borderColor: 'rgba(0, 0, 0, 0.12)',
          opacity: 0.3
        }} />
        
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <ListItem key={item.path} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path, item.message)}
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: isCollapsed ? 'center' : 'initial',
                    px: 2.5,
                    borderRadius: 2,
                    mx: 1,
                    mb: 0.5,
                    color: '#64748b',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: alpha('#14b8a6', 0.1),
                      color: '#14b8a6',
                      '& .MuiListItemIcon-root': {
                        color: '#14b8a6',
                      },
                    },
                    '&.Mui-selected': {
                      backgroundColor: alpha('#14b8a6', 0.15),
                      color: '#14b8a6',
                      borderLeft: `3px solid #14b8a6`,
                      '&:hover': {
                        backgroundColor: alpha('#14b8a6', 0.2),
                      },
                      '& .MuiListItemIcon-root': {
                        color: '#14b8a6',
                      },
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isCollapsed ? 0 : 3,
                      justifyContent: 'center',
                      color: '#64748b',
                      fontSize: 20,
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText 
                      primary={item.label} 
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 600 : 400,
                        }
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};
