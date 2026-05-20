// ReportsPage.jsx
import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Stack, Paper, alpha } from '@mui/material';
import { BarChart, LineChart, PieChart, Gauge } from '@mui/x-charts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ConversionIcon from '@mui/icons-material/Percent';

const salesData = [
  { month: 'Jan', revenue: 12500, orders: 420 },
  { month: 'Feb', revenue: 15200, orders: 510 },
  { month: 'Mar', revenue: 18400, orders: 620 },
  { month: 'Apr', revenue: 16700, orders: 580 },
  { month: 'May', revenue: 20100, orders: 790 },
  { month: 'Jun', revenue: 22300, orders: 850 },
];

const categoryData = [
  { id: 0, value: 35, label: 'Electronics', color: '#10b981' },
  { id: 1, value: 28, label: 'Clothing', color: '#3b82f6' },
  { id: 2, value: 22, label: 'Home & Living', color: '#f59e0b' },
  { id: 3, value: 15, label: 'Books', color: '#ef4444' },
];

const ReportsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, letterSpacing: '-0.02em', color: '#18181b', mb: 3 }}>
        Analytics & Reports
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { title: 'Total Revenue', value: '$105,200', change: '+23%', icon: <AttachMoneyIcon />, color: '#10b981', trend: 'up' },
          { title: 'Total Orders', value: '3,770', change: '+18%', icon: <ShoppingCartIcon />, color: '#3b82f6', trend: 'up' },
          { title: 'Conversion Rate', value: '3.2%', change: '-0.5%', icon: <ConversionIcon />, color: '#ef4444', trend: 'down' },
          { title: 'Avg. Order Value', value: '$27.90', change: '+5%', icon: <TrendingUpIcon />, color: '#f59e0b', trend: 'up' },
        ].map((kpi, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ borderRadius: '28px', boxShadow: '0 6px 14px rgba(0,0,0,0.02)', border: '1px solid #edf2f7', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 30px -12px rgba(0,0,0,0.08)' } }}>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.3px' }}>{kpi.title}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, color: '#18181b' }}>{kpi.value}</Typography>
                    <Typography variant="caption" color={kpi.trend === 'up' ? 'success.main' : 'error.main'} sx={{ fontWeight: 500 }}>{kpi.change}</Typography>
                  </Box>
                  <Box sx={{ bgcolor: alpha(kpi.color, 0.1), p: 1.2, borderRadius: '18px' }}>
                    {React.cloneElement(kpi.icon, { sx: { color: kpi.color, fontSize: 28 } })}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ borderRadius: '28px', border: '1px solid #edf2f7', p: 2, bgcolor: '#ffffff' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, px: 1 }}>Monthly Revenue & Orders</Typography>
            <BarChart 
              xAxis={[{ data: salesData.map(d => d.month), scaleType: 'band' }]} 
              series={[
                { data: salesData.map(d => d.revenue), label: 'Revenue ($)', color: '#10b981', valueFormatter: (v) => `$${v}` },
                { data: salesData.map(d => d.orders), label: 'Orders', color: '#f59e0b' }
              ]} 
              height={350} 
              borderRadius={6}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ borderRadius: '28px', border: '1px solid #edf2f7', p: 2, bgcolor: '#ffffff' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, px: 1 }}>Sales Trend (Revenue)</Typography>
            <LineChart 
              xAxis={[{ data: salesData.map(d => d.month), scaleType: 'point' }]} 
              series={[{ data: salesData.map(d => d.revenue), label: 'Revenue ($)', color: '#3b82f6', curve: 'natural', area: true }]} 
              height={350} 
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ borderRadius: '28px', border: '1px solid #edf2f7', p: 2, bgcolor: '#ffffff' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, textAlign: 'center' }}>Sales by Category</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart 
                series={[{ data: categoryData, innerRadius: 35, outerRadius: 100, highlightScope: { faded: 'global', highlighted: 'item' }, paddingAngle: 2 }]} 
                width={500} 
                height={270} 
                slotProps={{ legend: { position: { vertical: 'bottom', horizontal: 'middle' }, labelStyle: { fontSize: 11 } } }} 
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ borderRadius: '28px', border: '1px solid #edf2f7', p: 3, bgcolor: '#ffffff' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Performance Gauges</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5} justifyContent="space-around" alignItems="center">
              <Box textAlign="center">
                <Gauge value={85} text="85%" width={130} height={130} sx={{ '& text': { fontWeight: 600 } }} />
                <Typography variant="body2" fontWeight={500} mt={1}>Goal Completion</Typography>
              </Box>
              <Box textAlign="center">
                <Gauge value={62} text="62%" width={130} height={130} />
                <Typography variant="body2" fontWeight={500} mt={1}>Customer Satisfaction</Typography>
              </Box>
              <Box textAlign="center">
                <Gauge value={94} text="94%" width={130} height={130} />
                <Typography variant="body2" fontWeight={500} mt={1}>System Uptime</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage;