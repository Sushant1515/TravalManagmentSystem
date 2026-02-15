import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateKPIs } from "../features/dashboard/dashboardSlice";
import { getSocket } from "../services/socket";
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
  Badge,
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
  DoneAll,
  FilterList,
  ExpandMore,
  ExpandLess,
  Person,
  Speed,
  Map,
  Flag,
  AssignmentTurnedIn,
} from "@mui/icons-material";

// Define Trip type to avoid circular reference
interface Trip {
  id: string;
  count: number;
  status: 'Completed' | 'In Progress' | 'Not Started';
  driver: string;
  vehicle: string;
  startTime: string;
  endTime: string | null;
  distance: string;
  duration: string;
  icons: string[];
  rating: number | null;
  passenger: string;
}

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showLoader, hideLoader } = useLoading();
  const theme = useTheme();
  const kpis = useAppSelector(s => s.dashboard) || {
    activeTrips: 0,
    totalTrips: 0,
    driversOnline: 0
  };

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

  // Mock trip data
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 'VTT-WX1387',
      count: 1,
      status: 'Completed',
      driver: 'John Doe',
      vehicle: 'MH-12-AB-1234',
      startTime: '10 Jan 00:00',
      endTime: '10 Jan 01:30',
      distance: '15.2 km',
      duration: '1h 30m',
      icons: ['phone', 'car', 'completed'],
      rating: 4.8,
      passenger: 'Alice Smith'
    },
    {
      id: 'VTT-WJ0335',
      count: 2,
      status: 'Completed',
      driver: 'Jane Smith',
      vehicle: 'MH-12-XY-5678',
      startTime: '10 Jan 02:00',
      endTime: '10 Jan 03:45',
      distance: '22.5 km',
      duration: '1h 45m',
      icons: ['phone', 'car', 'completed'],
      rating: 4.9,
      passenger: 'Bob Johnson'
    },
    {
      id: 'VTT-VF9934',
      count: 1,
      status: 'In Progress',
      driver: 'Mike Wilson',
      vehicle: 'MH-12-ZZ-9999',
      startTime: '10 Jan 04:00',
      endTime: null,
      distance: '8.7 km',
      duration: '45m',
      icons: ['phone', 'car', 'inprogress'],
      rating: null,
      passenger: 'Carol Davis'
    },
    {
      id: 'VTT-AB1234',
      count: 3,
      status: 'Not Started',
      driver: 'Sarah Brown',
      vehicle: 'MH-12-AA-1111',
      startTime: '10 Jan 06:00',
      endTime: null,
      distance: '0 km',
      duration: '0m',
      icons: ['phone', 'car', 'notstarted'],
      rating: null,
      passenger: 'David Lee'
    },
  ]);

  useEffect(() => {
    try {
      const socket = getSocket();
      socket.on("kpis", (data) => {
        if (data && typeof data === 'object') {
          dispatch(updateKPIs({
            activeTrips: data.activeTrips || 0,
            totalTrips: data.totalTrips || 0,
            driversOnline: data.driversOnline || 0
          }));
        }
      });
      
      return () => { 
        socket.off("kpis"); 
      };
    } catch (error) {
      console.error("Socket connection error:", error);
    }
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#f59e0b';
      case 'Not Started': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircleOutline sx={{ fontSize: 16 }} />;
      case 'In Progress': return <HourglassEmpty sx={{ fontSize: 16 }} />;
      case 'Not Started': return <CancelOutlined sx={{ fontSize: 16 }} />;
      default: return <CancelOutlined sx={{ fontSize: 16 }} />;
    }
  };

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'phone': return <PhoneAndroid sx={{ fontSize: 18 }} />;
      case 'car': return <DirectionsCar sx={{ fontSize: 18 }} />;
      case 'completed': return <CheckCircleOutline sx={{ fontSize: 18 }} />;
      case 'inprogress': return <HourglassEmpty sx={{ fontSize: 18 }} />;
      case 'notstarted': return <CancelOutlined sx={{ fontSize: 18 }} />;
      default: return <InfoOutlined sx={{ fontSize: 18 }} />;
    }
  };

  const filteredTrips = trips.filter(trip => 
    trip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedTrips = filteredTrips.reduce((acc, trip) => {
    const key = trip.startTime;
    if (!acc[key]) acc[key] = [];
    acc[key].push(trip);
    return acc;
  }, {} as Record<string, Trip[]>);

  const getStatusCounts = (trips: Trip[]) => {
    return {
      notStarted: trips.filter(t => t.status === 'Not Started').length,
      inProgress: trips.filter(t => t.status === 'In Progress').length,
      completed: trips.filter(t => t.status === 'Completed').length,
    };
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="#14b8a6">
          Dashboard
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

      {/* KPI Cards */}
      <Box 
        sx={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          mb: 3
        }}
      >
        <Card 
          elevation={3}
          sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' },
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            color: 'white'
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <DirectionsCar sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant="h6">
                Active Trips
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {kpis.activeTrips || 0}
            </Typography>
          </CardContent>
        </Card>
        
        <Card 
          elevation={3}
          sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' },
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white'
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <AssignmentTurnedIn sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant="h6">
                Total Trips
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {kpis.totalTrips || 0}
            </Typography>
          </CardContent>
        </Card>
        
        <Card 
          elevation={3}
          sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' },
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white'
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Person sx={{ mr: 2, fontSize: 32 }} />
              <Typography variant="h6">
                Drivers Online
              </Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {kpis.driversOnline || 0}
            </Typography>
          </CardContent>
        </Card>
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
                placeholder="Search by Trip ID, Driver, Vehicle..."
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
                <InputLabel>Trip Type</InputLabel>
                <Select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  label="Trip Type"
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                  }}
                >
                  <MenuItem value="Both">Both</MenuItem>
                  <MenuItem value="Pickup">Pickup</MenuItem>
                  <MenuItem value="Drop">Drop</MenuItem>
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
            
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 12%' } }}>
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
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Not Started">Not Started</MenuItem>
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

      {/* Trip Cards */}
      <Box>
        {Object.entries(groupedTrips).map(([timeKey, timeTrips]) => {
          const statusCounts = getStatusCounts(timeTrips);
          return (
            <Box key={timeKey} sx={{ mb: 4 }}>
              {/* Time Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTime sx={{ mr: 1, color: '#14b8a6' }} />
                <Typography variant="h6" fontWeight="bold" color="#14b8a6">
                  Logout - {timeKey}
                </Typography>
                <Divider sx={{ flexGrow: 1, ml: 2 }} />
              </Box>

              {/* Status Summary */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Chip
                  icon={<CancelOutlined sx={{ fontSize: 16 }} />}
                  label={`Not Started: ${statusCounts.notStarted}`}
                  sx={{ 
                    backgroundColor: alpha('#6b7280', 0.1),
                    color: '#6b7280',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Chip
                  icon={<HourglassEmpty sx={{ fontSize: 16 }} />}
                  label={`In Progress: ${statusCounts.inProgress}`}
                  sx={{ 
                    backgroundColor: alpha('#f59e0b', 0.1),
                    color: '#f59e0b',
                    border: '1px solid #fbbf24'
                  }}
                />
                <Chip
                  icon={<CheckCircleOutline sx={{ fontSize: 16 }} />}
                  label={`Completed: ${statusCounts.completed}`}
                  sx={{ 
                    backgroundColor: alpha('#10b981', 0.1),
                    color: '#10b981',
                    border: '1px solid #34d399'
                  }}
                />
              </Box>

              {/* Trip Cards Grid */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {timeTrips.map((trip) => (
                  <Box key={trip.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(33.333% - 12px)', lg: '1 1 calc(25% - 12px)' } }}>
                    <Card 
                      elevation={3}
                      sx={{ 
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows[8]
                        },
                        border: `2px solid ${alpha(getStatusColor(trip.status), 0.2)}`
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        {/* Trip Header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" fontWeight="bold" color="#14b8a6">
                              {trip.id}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ({trip.count} trips)
                            </Typography>
                          </Box>
                          <Chip
                            size="small"
                            icon={getStatusIcon(trip.status)}
                            label={trip.status}
                            sx={{
                              backgroundColor: alpha(getStatusColor(trip.status), 0.1),
                              color: getStatusColor(trip.status),
                              fontWeight: 'bold',
                              border: `1px solid ${alpha(getStatusColor(trip.status), 0.3)}`
                            }}
                          />
                        </Box>

                        {/* Trip Icons */}
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          {trip.icons.map((icon, index) => (
                            <Tooltip title={icon} key={index}>
                              <Box
                                sx={{
                                  p: 1,
                                  borderRadius: 1,
                                  backgroundColor: alpha('#14b8a6', 0.1),
                                  color: '#14b8a6',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                {getIconComponent(icon)}
                              </Box>
                            </Tooltip>
                          ))}
                        </Box>

                        {/* Trip Details */}
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Person sx={{ fontSize: 16, mr: 1, color: '#6b7280' }} />
                            <Typography variant="body2" color="text.secondary">
                              {trip.driver}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <DirectionsCar sx={{ fontSize: 16, mr: 1, color: '#6b7280' }} />
                            <Typography variant="body2" color="text.secondary">
                              {trip.vehicle}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOn sx={{ fontSize: 16, mr: 1, color: '#6b7280' }} />
                            <Typography variant="body2" color="text.secondary">
                              {trip.distance}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTime sx={{ fontSize: 16, mr: 1, color: '#6b7280' }} />
                            <Typography variant="body2" color="text.secondary">
                              {trip.duration}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Rating (for completed trips) */}
                        {trip.rating && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid #f3f4f6' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                              Rating:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" fontWeight="bold" color="#f59e0b">
                                {trip.rating}
                              </Typography>
                              <Typography variant="body2" color="#f59e0b" sx={{ ml: 0.5 }}>
                                ★
                              </Typography>
                            </Box>
                          </Box>
                        )}

                        {/* Passenger Info */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: 12, backgroundColor: '#14b8a6' }}>
                            {trip.passenger.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Typography variant="caption" color="text.secondary">
                            {trip.passenger}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
export default DashboardPage;
