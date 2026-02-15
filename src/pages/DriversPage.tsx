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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
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
  Download as DownloadIcon,
  FileDownload,
  ViewList,
  ViewModule,
  Edit,
  Delete,
  MoreVert,
  Email,
  Phone,
  Star,
  StarBorder,
  Upload as UploadIcon,
  CloudUpload,
  FileUpload,
  Description,
  InsertDriveFile,
} from "@mui/icons-material";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  license: string;
  status: 'Active' | 'On Trip' | 'Offline' | 'On Leave';
  vehicle: string;
  tripsToday: number;
  totalTrips: number;
  rating: number;
  joinDate: string;
  lastActive: string;
  avatar: string;
}

const DriversPage: React.FC = () => {
  const { showLoader, hideLoader } = useLoading();
  const theme = useTheme();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState('2026-01-10');
  const [status, setStatus] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Mock driver data
  const [drivers] = useState<Driver[]>([
    {
      id: 'DRV001',
      name: 'John Doe',
      email: 'john.doe@travel.com',
      phone: '+91 98765 43210',
      license: 'MH-12-2023-001234',
      status: 'Active',
      vehicle: 'MH-12-AB-1234',
      tripsToday: 8,
      totalTrips: 1247,
      rating: 4.8,
      joinDate: '2022-03-15',
      lastActive: '2 mins ago',
      avatar: 'JD'
    },
    {
      id: 'DRV002',
      name: 'Jane Smith',
      email: 'jane.smith@travel.com',
      phone: '+91 98765 43211',
      license: 'MH-12-2021-005678',
      status: 'On Trip',
      vehicle: 'MH-12-XY-5678',
      tripsToday: 5,
      totalTrips: 987,
      rating: 4.9,
      joinDate: '2021-08-22',
      lastActive: 'Currently driving',
      avatar: 'JS'
    },
    {
      id: 'DRV003',
      name: 'Mike Wilson',
      email: 'mike.wilson@travel.com',
      phone: '+91 98765 43212',
      license: 'MH-12-2022-009999',
      status: 'Offline',
      vehicle: 'MH-12-ZZ-9999',
      tripsToday: 0,
      totalTrips: 756,
      rating: 4.6,
      joinDate: '2023-01-10',
      lastActive: '2 hours ago',
      avatar: 'MW'
    },
    {
      id: 'DRV004',
      name: 'Sarah Brown',
      email: 'sarah.brown@travel.com',
      phone: '+91 98765 43213',
      license: 'MH-12-2020-001111',
      status: 'On Leave',
      vehicle: 'MH-12-AA-1111',
      tripsToday: 0,
      totalTrips: 543,
      rating: 4.7,
      joinDate: '2020-11-05',
      lastActive: '3 days ago',
      avatar: 'SB'
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'On Trip': return '#3b82f6';
      case 'Offline': return '#ef4444';
      case 'On Leave': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircleOutline sx={{ fontSize: 16 }} />;
      case 'On Trip': return <DirectionsCar sx={{ fontSize: 16 }} />;
      case 'Offline': return <CancelOutlined sx={{ fontSize: 16 }} />;
      case 'On Leave': return <HourglassEmpty sx={{ fontSize: 16 }} />;
      default: return <CancelOutlined sx={{ fontSize: 16 }} />;
    }
  };

  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.phone.includes(searchQuery) ||
    driver.license.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedDrivers(filteredDrivers.map(driver => driver.id));
    } else {
      setSelectedDrivers([]);
    }
  };

  const handleSelectDriver = (driverId: string) => {
    setSelectedDrivers(prev => 
      prev.includes(driverId) 
        ? prev.filter(id => id !== driverId)
        : [...prev, driverId]
    );
  };

  const handleDownload = (format: 'csv' | 'excel' | 'pdf') => {
    showLoader(`Downloading ${format.toUpperCase()} file...`);
    
    setTimeout(() => {
      // Simulate download
      const data = filteredDrivers.map(driver => ({
        Name: driver.name,
        Email: driver.email,
        Phone: driver.phone,
        License: driver.license,
        Status: driver.status,
        Vehicle: driver.vehicle,
        'Trips Today': driver.tripsToday,
        'Total Trips': driver.totalTrips,
        Rating: driver.rating,
        'Join Date': driver.joinDate
      }));
      
      console.log(`Downloading ${format} with data:`, data);
      hideLoader();
    }, 1500);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBulkUploadOpen = () => {
    setBulkUploadOpen(true);
  };

  const handleBulkUploadClose = () => {
    setBulkUploadOpen(false);
    setUploadedFile(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleBulkUpload = () => {
    if (uploadedFile) {
      showLoader('Processing bulk upload...');
      
      setTimeout(() => {
        // Simulate processing the uploaded file
        console.log('Processing file:', uploadedFile.name);
        console.log('File size:', uploadedFile.size, 'bytes');
        console.log('File type:', uploadedFile.type);
        
        hideLoader();
        handleBulkUploadClose();
      }, 2000);
    }
  };

  const isSelected = (driverId: string) => selectedDrivers.includes(driverId);
  const isAllSelected = filteredDrivers.length > 0 && selectedDrivers.length === filteredDrivers.length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" color="#14b8a6">
          Drivers Management
        </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={handleBulkUploadOpen}
            sx={{ borderColor: '#14b8a6', color: '#14b8a6' }}
          >
            Bulk Data Upload
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleDownload('csv')}
            sx={{ borderColor: '#14b8a6', color: '#14b8a6' }}
          >
            Download CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownload />}
            onClick={() => handleDownload('excel')}
            sx={{ borderColor: '#14b8a6', color: '#14b8a6' }}
          >
            Download Excel
          </Button>
        </Box>
      </Box>

      {/* Filters and Controls */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterList sx={{ mr: 1, color: '#14b8a6' }} />
            <Typography variant="h6" fontWeight="bold" color="#14b8a6">
              Filters
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              startIcon={<ViewModule />}
              onClick={() => setViewMode('grid')}
              sx={{ 
                backgroundColor: viewMode === 'grid' ? '#14b8a6' : 'transparent',
                color: viewMode === 'grid' ? 'white' : '#14b8a6',
                borderColor: '#14b8a6'
              }}
            >
              Grid View
            </Button>
            <Button
              variant={viewMode === 'table' ? 'contained' : 'outlined'}
              startIcon={<ViewList />}
              onClick={() => setViewMode('table')}
              sx={{ 
                backgroundColor: viewMode === 'table' ? '#14b8a6' : 'transparent',
                color: viewMode === 'table' ? 'white' : '#14b8a6',
                borderColor: '#14b8a6'
              }}
            >
              Table View
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 25%' } }}>
            <TextField
              fullWidth
              placeholder="Search by name, email, phone, license..."
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
          
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 20%' } }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="On Trip">On Trip</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
                <MenuItem value="On Leave">On Leave</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 20%' } }}>
            <FormControl fullWidth>
              <InputLabel>Vehicle</InputLabel>
              <Select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                label="Vehicle"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#14b8a6' },
                }}
              >
                <MenuItem value="">All Vehicles</MenuItem>
                {Array.from(new Set(drivers.map(d => d.vehicle))).map(v => (
                  <MenuItem key={v} value={v}>{v}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 15%' } }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ 
                height: 56,
                backgroundColor: '#14b8a6',
                '&:hover': { backgroundColor: '#0d9488' }
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Selection Controls */}
      {selectedDrivers.length > 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2, backgroundColor: alpha('#14b8a6', 0.05) }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="#14b8a6">
              {selectedDrivers.length} driver{selectedDrivers.length > 1 ? 's' : ''} selected
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<FileDownload />}
                onClick={() => handleDownload('csv')}
                sx={{ borderColor: '#14b8a6', color: '#14b8a6' }}
              >
                Download Selected
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setSelectedDrivers([])}
                sx={{ borderColor: '#ef4444', color: '#ef4444' }}
              >
                Clear Selection
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {filteredDrivers.map((driver) => (
            <Card 
              key={driver.id}
              elevation={3}
              sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)', lg: '1 1 calc(25% - 20px)' },
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: isSelected(driver.id) ? `2px solid #14b8a6` : '1px solid #e5e7eb',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Driver Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox
                      checked={isSelected(driver.id)}
                      onChange={() => handleSelectDriver(driver.id)}
                      sx={{ mr: 2, color: '#14b8a6' }}
                    />
                    <Avatar sx={{ width: 48, height: 48, mr: 2, backgroundColor: '#14b8a6', fontSize: 18 }}>
                      {driver.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="#14b8a6">
                        {driver.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {driver.email}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton size="small" onClick={handleMenuClick}>
                    <MoreVert />
                  </IconButton>
                </Box>

                {/* Status */}
                <Box sx={{ mb: 2 }}>
                  <Chip
                    size="small"
                    icon={getStatusIcon(driver.status)}
                    label={driver.status}
                    sx={{
                      backgroundColor: alpha(getStatusColor(driver.status), 0.1),
                      color: getStatusColor(driver.status),
                      fontWeight: 'bold'
                    }}
                  />
                </Box>

                {/* Driver Details */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ fontSize: 14, mr: 1, color: '#6b7280' }} />
                    <Typography variant="body2" color="text.secondary">
                      {driver.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DirectionsCar sx={{ fontSize: 14, mr: 1, color: '#6b7280' }} />
                    <Typography variant="body2" color="text.secondary">
                      {driver.vehicle}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InfoOutlined sx={{ fontSize: 14, mr: 1, color: '#6b7280' }} />
                    <Typography variant="body2" color="text.secondary">
                      {driver.license}
                    </Typography>
                  </Box>
                </Box>

                {/* Stats */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Today's Trips
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="#14b8a6">
                      {driver.tripsToday}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Total Trips
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="#14b8a6">
                      {driver.totalTrips}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Rating
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6" fontWeight="bold" color="#f59e0b">
                        {driver.rating}
                      </Typography>
                      <Star sx={{ fontSize: 16, color: '#f59e0b' }} />
                    </Box>
                  </Box>
                </Box>

                {/* Footer */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid #f3f4f6' }}>
                  <Typography variant="caption" color="text.secondary">
                    Joined: {driver.joinDate}
                  </Typography>
                  <Typography variant="caption" color="#14b8a6">
                    Last active: {driver.lastActive}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #e5e7eb' }}>
            <Checkbox
              checked={isAllSelected}
              onChange={handleSelectAll}
              indeterminate={selectedDrivers.length > 0 && selectedDrivers.length < filteredDrivers.length}
              sx={{ color: '#14b8a6' }}
            />
            <Typography variant="body2" sx={{ ml: 2 }}>
              Select All ({selectedDrivers.length} of {filteredDrivers.length})
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: alpha('#14b8a6', 0.05) }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      sx={{ color: '#14b8a6' }}
                    />
                  </TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight="bold">Driver</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight="bold">Contact</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight="bold">License</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight="bold">Vehicle</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight="bold">Status</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight="bold">Today's Trips</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight="bold">Total Trips</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight="bold">Rating</Typography></TableCell>
                  <TableCell><Typography variant="subtitle2" fontWeight="bold">Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow
                    key={driver.id}
                    sx={{ 
                      '&:hover': { backgroundColor: alpha('#14b8a6', 0.05) },
                      '&:nth-of-type(odd)': { backgroundColor: alpha('#f9fafb', 0.5) }
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected(driver.id)}
                        onChange={() => handleSelectDriver(driver.id)}
                        sx={{ color: '#14b8a6' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, backgroundColor: '#14b8a6', fontSize: 12 }}>
                          {driver.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {driver.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {driver.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Phone sx={{ fontSize: 12, mr: 0.5, color: '#6b7280' }} />
                          <Typography variant="body2">{driver.phone}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{driver.license}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{driver.vehicle}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        icon={getStatusIcon(driver.status)}
                        label={driver.status}
                        sx={{
                          backgroundColor: alpha(getStatusColor(driver.status), 0.1),
                          color: getStatusColor(driver.status),
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="#14b8a6">
                        {driver.tripsToday}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{driver.totalTrips}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" fontWeight="bold" color="#f59e0b">
                          {driver.rating}
                        </Typography>
                        <Star sx={{ fontSize: 14, color: '#f59e0b' }} />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={handleMenuClick}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1, fontSize: 16 }} />
          Edit Driver
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Email sx={{ mr: 1, fontSize: 16 }} />
          Send Email
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Phone sx={{ mr: 1, fontSize: 16 }} />
          Call Driver
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Delete sx={{ mr: 1, fontSize: 16, color: '#ef4444' }} />
          Remove Driver
        </MenuItem>
      </Menu>

      {/* Bulk Upload Dialog */}
      <Dialog 
        open={bulkUploadOpen} 
        onClose={handleBulkUploadClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            backgroundColor: 'white'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: alpha('#14b8a6', 0.1),
          color: '#14b8a6',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <CloudUpload />
          Bulk Data Upload
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Upload driver data in bulk using CSV or Excel files. The system will automatically process and import the driver information.
            </Typography>
          </Box>

          {/* File Upload Area */}
          <Box 
            sx={{ 
              border: '2px dashed #14b8a6',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              backgroundColor: alpha('#14b8a6', 0.05),
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: alpha('#14b8a6', 0.1),
                borderColor: '#0d9488'
              }
            }}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
            
            <CloudUpload sx={{ fontSize: 48, color: '#14b8a6', mb: 2 }} />
            
            <Typography variant="h6" color="#14b8a6" fontWeight="bold" gutterBottom>
              {uploadedFile ? uploadedFile.name : 'Choose file or drag and drop'}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Supported formats: CSV, Excel (.xlsx, .xls)
            </Typography>
            
            {uploadedFile && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'white', borderRadius: 1, border: '1px solid #e5e7eb' }}>
                <Typography variant="body2" color="text.secondary">
                  File size: {(uploadedFile.size / 1024).toFixed(2)} KB
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {uploadedFile.type || 'Unknown'}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Instructions */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#14b8a6" gutterBottom>
              Instructions:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <InsertDriveFile sx={{ color: '#14b8a6', fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="File Format" 
                  secondary="CSV or Excel file with columns: Name, Email, Phone, License, Vehicle, Status"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Description sx={{ color: '#14b8a6', fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Data Validation" 
                  secondary="Email addresses must be valid, phone numbers in format: +91 XXXXX XXXXX"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutline sx={{ color: '#14b8a6', fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Duplicate Check" 
                  secondary="System will automatically detect and skip duplicate entries"
                />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, backgroundColor: alpha('#14b8a6', 0.05) }}>
          <Button 
            onClick={handleBulkUploadClose}
            sx={{ 
              borderColor: '#14b8a6', 
              color: '#14b8a6',
              '&:hover': { backgroundColor: alpha('#14b8a6', 0.05) }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBulkUpload}
            variant="contained"
            disabled={!uploadedFile}
            startIcon={<FileUpload />}
            sx={{ 
              backgroundColor: '#14b8a6',
              '&:hover': { backgroundColor: '#0d9488' },
              '&:disabled': { 
                backgroundColor: '#e5e7eb',
                color: '#9ca3af'
              }
            }}
          >
            Upload & Process
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default DriversPage;
