// DashboardPage.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, Card, CardContent, Button, Grid, Paper, alpha } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const columns = [
  { field: 'id', headerName: 'ID', width: 90, headerAlign: 'center' },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  { field: 'fullName', headerName: 'Full name', sortable: false, width: 160, valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}` },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DashboardPage() {
  const location = useLocation();
  const avgAge = (rows.reduce((sum, row) => sum + (row.age || 0), 0) / rows.filter((row) => row.age !== null).length).toFixed(1);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, letterSpacing: '-0.02em', color: '#18181b', mb: 3 }}>
        Dashboard
      </Typography>
      
      {/* Summary Cards with icons & gradients */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.03)', border: '1px solid #e9e9ef', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 16px 28px -8px rgba(0,0,0,0.1)' } }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.5px' }}>TOTAL USERS</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#10b981', mt: 1 }}>{rows.length}</Typography>
                  <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>+2 this month</Typography>
                </Box>
                <Box sx={{ bgcolor: alpha('#10b981', 0.1), p: 1.5, borderRadius: '20px' }}>
                  <PeopleAltIcon sx={{ fontSize: 40, color: '#10b981' }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.03)', border: '1px solid #e9e9ef', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 16px 28px -8px rgba(0,0,0,0.1)' } }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.5px' }}>AVERAGE AGE</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#3b82f6', mt: 1 }}>{avgAge}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>Across active profiles</Typography>
                </Box>
                <Box sx={{ bgcolor: alpha('#3b82f6', 0.1), p: 1.5, borderRadius: '20px' }}>
                  <TrendingUpIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    
      {/* Gauges with improved labels */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: '28px', border: '1px solid #eef2f6', mb: 4, bgcolor: '#ffffff' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Performance Metrics</Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} justifyContent="center" alignItems="center">
          <Box textAlign="center">
            <Gauge width={140} height={140} value={50} valueMin={0} valueMax={100} text="50%" sx={{ '& text': { fontWeight: 600, fill: '#18181b' } }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Completion Rate</Typography>
          </Box>
          <Box textAlign="center">
            <Gauge width={140} height={140} value={50} valueMin={10} valueMax={60} text="50%" sx={{ '& text': { fontWeight: 600, fill: '#18181b' } }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Quality Index</Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: '28px', border: '1px solid #eef2f6', bgcolor: '#ffffff' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, px: 1 }}>Quarterly Performance</Typography>
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Revenue (k$)', color: '#10b981', id: 'rev' },
                { data: [51, 6, 49, 30], label: 'Expenses (k$)', color: '#f97316', id: 'exp' },
              ]}
              height={320}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
              margin={{ left: 50, right: 30, top: 40, bottom: 30 }}
              borderRadius={8}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: '28px', border: '1px solid #eef2f6', bgcolor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Category Split</Typography>
            <PieChart
              series={[{ data: [{ id: 0, value: 10, label: 'Series A', color: '#10b981' }, { id: 1, value: 15, label: 'Series B', color: '#f59e0b' }, { id: 2, value: 20, label: 'Series C', color: '#3b82f6' }], innerRadius: 20, outerRadius: 80, highlightScope: { faded: 'global', highlighted: 'item' } }]}
              width={350}
              height={240}
              slotProps={{ legend: { position: { vertical: 'bottom', horizontal: 'middle' }, direction: 'row', labelStyle: { fontSize: 12, fill: '#3f3f46' } } }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* DataGrid with polished styling */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>Users Overview</Typography>
      <Paper sx={{ height: 450, width: '100%', borderRadius: '24px', overflow: 'hidden', border: '1px solid #eef2f6', mb: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f9fafb', fontWeight: 600, color: '#27272a', borderBottom: '1px solid #e2e8f0' },
            '& .MuiDataGrid-row:hover': { backgroundColor: alpha('#10b981', 0.04) },
            '& .MuiDataGrid-cell': { borderBottom: '1px solid #f1f5f9' },
            '& .MuiCheckbox-root.Mui-checked': { color: '#10b981' },
          }}
        />
      </Paper>

      {/* Map with improved container */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>Location Map</Typography>
      <Paper elevation={0} sx={{ borderRadius: '28px', overflow: 'hidden', border: '1px solid #eef2f6', height: 460 }}>
        <MapContainer center={[14.604253, 120.994314]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>
              <strong>National University-Manila</strong><br />
              <em>551 F Jhocson St, Sampaloc, Manila</em>
            </Popup>
          </Marker>
        </MapContainer>
      </Paper>
    </Box>
  );
}

export default DashboardPage;