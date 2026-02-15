import React, { useState } from "react";
import { useLoading } from "../contexts/LoadingContext";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Divider,
  Avatar,
  Tooltip,
  Collapse,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  DateRange,
  AccessTime,
  Public,
  LocationOn,
  Business,
  InfoOutlined,
  PhoneAndroid,
  DirectionsCar,
  CheckCircleOutline,
  CancelOutlined,
  HourglassEmpty,
  FilterList,
  ExpandMore,
  ExpandLess,
  Person,
  Map as MapIcon,
  GpsFixed,
  Speed,
  BatteryFull,
  SignalCellularAlt,
} from "@mui/icons-material";

const MapPage: React.FC = () => {
  const { showLoader, hideLoader } = useLoading();
  const theme = useTheme();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState('2026-01-10');
  const [tripType, setTripType] = useState('Both');
  const [shiftTime, setShiftTime] = useState('');
  const [tripFlags, setTripFlags] = useState('');
  const [tripStatus, setTripStatus] = useState('');
  const [zone, setZone] = useState('');
  const [locality, setLocality] = useState('');
  const [officeLocation, setOfficeLocation] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  // Mock vehicle data
  const [vehicles] = useState([
    {
      id: 'VTT-WX1387',
      driver: 'John Doe',
      vehicle: 'MH-12-AB-1234',
      status: 'Active',
      location: { lat: 19.0760, lng: 72.8777 },
      speed: 45,
      battery: 85,
      signal: 4,
      lastUpdate: '2 mins ago',
      trip: 'Active - Going to Airport',
      passenger: 'Alice Smith'
    },
    {
      id: 'VTT-WJ0335',
      driver: 'Jane Smith',
      vehicle: 'MH-12-XY-5678',
      status: 'Idle',
      location: { lat: 19.0860, lng: 72.8877 },
      speed: 0,
      battery: 92,
      signal: 3,
      lastUpdate: '5 mins ago',
      trip: 'No active trip',
      passenger: 'None'
    },
    {
      id: 'VTT-VF9934',
      driver: 'Mike Wilson',
      vehicle: 'MH-12-ZZ-9999',
      status: 'Active',
      location: { lat: 19.0660, lng: 72.8677 },
      speed: 38,
      battery: 67,
      signal: 4,
      lastUpdate: '1 min ago',
      trip: 'Active - Pickup at Station',
      passenger: 'Carol Davis'
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Idle': return '#f59e0b';
      case 'Offline': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <GpsFixed sx={{ fontSize: 16 }} />;
      case 'Idle': return <HourglassEmpty sx={{ fontSize: 16 }} />;
      case 'Offline': return <CancelOutlined sx={{ fontSize: 16 }} />;
      default: return <CancelOutlined sx={{ fontSize: 16 }} />;
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVehicleSelect = (vehicleId: string) => {
    showLoader('Loading vehicle details...');
    setSelectedVehicle(vehicleId);
    setTimeout(() => {
      hideLoader();
    }, 500);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="#14b8a6">
          Live Vehicle Tracking
        </Typography>
        <Button
          variant="outlined"
          startIcon={showFilters ? <ExpandLess /> : <ExpandMore />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{ borderColor: '#14b8a6', color: '#14b8a6' }}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Box>

      {/* Filters Section */}
      <Collapse in={showFilters}>
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterList sx={{ mr: 1, color: '#14b8a6' }} />
            <Typography variant="h6" fontWeight="bold" color="#14b8a6">
              Filters
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 25%' } }}>
              <TextField
                fullWidth
                placeholder="Search by Vehicle ID, Driver..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: '#14b8a6' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: '#14b8a6' },
                    '&.Mui-focused fieldset': { borderColor: '#14b8a6' },
                  },
                }}
              />
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': { borderColor: '#14b8a6' },
                    '&.Mui-focused fieldset': { borderColor: '#14b8a6' },
                  },
                }}
              />
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={tripStatus}
                  onChange={(e) => setTripStatus(e.target.value)}
                  label="Status"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Idle">Idle</MenuItem>
                  <MenuItem value="Offline">Offline</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <FormControl fullWidth>
                <InputLabel>Zone</InputLabel>
                <Select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  label="Zone"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                  }}
                >
                  <MenuItem value="">All Zones</MenuItem>
                  <MenuItem value="north">North Zone</MenuItem>
                  <MenuItem value="south">South Zone</MenuItem>
                  <MenuItem value="east">East Zone</MenuItem>
                  <MenuItem value="west">West Zone</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
              <FormControl fullWidth>
                <InputLabel>Shift Time</InputLabel>
                <Select
                  value={shiftTime}
                  onChange={(e) => setShiftTime(e.target.value)}
                  label="Shift Time"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="night">Night</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 8%' } }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ 
                  height: 56,
                  backgroundColor: '#14b8a6',
                  '&:hover': { backgroundColor: '#0d9488' }
                }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Paper>
      </Collapse>

      {/* Map and Vehicle List */}
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Map Section */}
        <Box sx={{ flex: { xs: '1 1 100%', lg: '2 1 0' } }}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: 600, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <MapIcon sx={{ fontSize: 64, color: '#14b8a6', mb: 2 }} />
              <Typography variant="h6" color="#14b8a6" fontWeight="bold" gutterBottom>
                Interactive Map View
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Real-time vehicle tracking with GPS coordinates
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Chip 
                  icon={<GpsFixed sx={{ fontSize: 16 }} />}
                  label={`${vehicles.filter(v => v.status === 'Active').length} Active`}
                  sx={{ backgroundColor: alpha('#10b981', 0.1), color: '#10b981' }}
                />
                <Chip 
                  icon={<HourglassEmpty sx={{ fontSize: 16 }} />}
                  label={`${vehicles.filter(v => v.status === 'Idle').length} Idle`}
                  sx={{ backgroundColor: alpha('#f59e0b', 0.1), color: '#f59e0b' }}
                />
                <Chip 
                  icon={<DirectionsCar sx={{ fontSize: 16 }} />}
                  label={`${vehicles.length} Total`}
                  sx={{ backgroundColor: alpha('#14b8a6', 0.1), color: '#14b8a6' }}
                />
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Vehicle List Section */}
        <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 0' } }}>
          <Box sx={{ height: 600, overflow: 'auto' }}>
            <Typography variant="h6" fontWeight="bold" color="#14b8a6" gutterBottom>
              Vehicle Status ({filteredVehicles.length})
            </Typography>
            
            {filteredVehicles.map((vehicle) => (
              <Card 
                key={vehicle.id}
                elevation={2}
                sx={{ 
                  mb: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: selectedVehicle === vehicle.id ? `2px solid #14b8a6` : '1px solid #e5e7eb',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
                onClick={() => handleVehicleSelect(vehicle.id)}
              >
                <CardContent sx={{ p: 2 }}>
                  {/* Vehicle Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="#14b8a6">
                        {vehicle.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {vehicle.vehicle}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      icon={getStatusIcon(vehicle.status)}
                      label={vehicle.status}
                      sx={{
                        backgroundColor: alpha(getStatusColor(vehicle.status), 0.1),
                        color: getStatusColor(vehicle.status),
                        fontWeight: 'bold'
                      }}
                    />
                  </Box>

                  {/* Driver Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: 12, backgroundColor: '#14b8a6' }}>
                      {vehicle.driver.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                      {vehicle.driver}
                    </Typography>
                  </Box>

                  {/* Vehicle Metrics */}
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Speed sx={{ fontSize: 16, mr: 0.5, color: '#6b7280' }} />
                      <Typography variant="caption" color="text.secondary">
                        {vehicle.speed} km/h
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BatteryFull sx={{ fontSize: 16, mr: 0.5, color: '#6b7280' }} />
                      <Typography variant="caption" color="text.secondary">
                        {vehicle.battery}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SignalCellularAlt sx={{ fontSize: 16, mr: 0.5, color: '#6b7280' }} />
                      <Typography variant="caption" color="text.secondary">
                        {vehicle.signal}/4
                      </Typography>
                    </Box>
                  </Box>

                  {/* Trip Info */}
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {vehicle.trip}
                    </Typography>
                    {vehicle.passenger !== 'None' && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ fontSize: 16, mr: 1, color: '#6b7280' }} />
                        <Typography variant="caption" color="text.secondary">
                          {vehicle.passenger}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Last Update */}
                  <Typography variant="caption" color="#14b8a6">
                    Last update: {vehicle.lastUpdate}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default MapPage;
