import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box, 
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  alpha,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  AccountCircle,
  Logout
} from '@mui/icons-material';
import { logout } from '../../features/auth/authSlice';

interface TopBarProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ isSidebarCollapsed, onToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #14b8a6 100%)',
        boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)',
        borderBottom: 'none',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          edge="start"
          onClick={onToggleSidebar}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          sx={{ 
            mr: 2,
            backgroundColor: alpha('#14b8a6', 0.1),
            color: '#14b8a6',
            '&:hover': {
              backgroundColor: alpha('#14b8a6', 0.2),
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {isSidebarCollapsed ? <MenuIcon /> : <MenuIcon />}
        </IconButton>
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 700,
            fontSize: '1.5rem',
            background: 'linear-gradient(45deg, #1e293b 0%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Travel Management System
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 500,
              color: '#64748b',
              fontSize: '0.95rem'
            }}
          >
            Welcome, Admin
          </Typography>
          
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{ 
              p: 0.5,
              backgroundColor: alpha('#14b8a6', 0.1),
              '&:hover': {
                backgroundColor: alpha('#14b8a6', 0.2),
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)', 
                width: 36, 
                height: 36,
                color: '#14b8a6',
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              A
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 8,
              sx: {
                mt: 1.5,
                minWidth: 200,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem 
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: alpha('#ef4444', 0.1),
                },
              }}
            >
              <ListItemIcon>
                <Logout 
                  fontSize="small" 
                  sx={{ color: '#ef4444' }}
                />
              </ListItemIcon>
              <ListItemText 
                primary="Logout"
                sx={{ 
                  '& .MuiListItemText-primary': {
                    color: '#ef4444',
                    fontWeight: 600,
                  }
                }}
              />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
