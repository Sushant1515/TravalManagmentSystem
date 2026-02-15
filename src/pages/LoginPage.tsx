import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { loginSuccess } from "../features/auth/authSlice";
import { useLoading } from "../contexts/LoadingContext";
import { 
  Button, 
  Container, 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock 
} from "@mui/icons-material";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showLoader, hideLoader } = useLoading();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    showLoader('Signing in...');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock login success
      dispatch(loginSuccess({ 
        token: "mock-jwt-token", 
        role: "Admin" 
      }));
      hideLoader();
    } catch (err) {
      hideLoader();
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 400,
            borderRadius: 2
          }}
        >
          {/* Logo/Icon */}
          <Box
            sx={{
              bgcolor: '#14b8a6',
              width: 64,
              height: 64,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}
          >
            <Typography variant="h3" component="div" color="white" fontWeight="bold">
              TM
            </Typography>
          </Box>

          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="#14b8a6">
            Travel Management
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
            Sign in to your account to access the dashboard
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#14b8a6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#14b8a6',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#14b8a6',
                  },
                },
                mb: 2
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#14b8a6' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              autoComplete="current-password"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#14b8a6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#14b8a6',
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#14b8a6',
                  },
                },
                mb: 3
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#14b8a6' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                      sx={{ color: '#14b8a6' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                py: 1.5, 
                mb: 2,
                textTransform: 'none',
                fontSize: '1rem',
                backgroundColor: '#14b8a6',
                '&:hover': {
                  backgroundColor: '#0d9488',
                },
              }}
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Demo: Use any email and password to login
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 Travel Management System. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
