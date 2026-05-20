// UsersPage.jsx
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Stack, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, Avatar, alpha } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const initialRows = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2025-04-28' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastActive: '2025-04-30' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive', lastActive: '2025-04-15' },
  { id: 4, firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', role: 'Editor', status: 'Active', lastActive: '2025-05-01' },
  { id: 5, firstName: 'Charlie', lastName: 'Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Suspended', lastActive: '2025-03-20' },
];

const statusColors = { Active: 'success', Inactive: 'default', Suspended: 'error' };
const roleColors = { Admin: '#10b981', Editor: '#3b82f6', Viewer: '#f59e0b' };

const UsersPage = () => {
  const [rows, setRows] = useState(initialRows);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', role: 'Viewer', status: 'Active' });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center' },
    { field: 'firstName', headerName: 'First Name', width: 130, editable: true },
    { field: 'lastName', headerName: 'Last Name', width: 130, editable: true },
    { field: 'email', headerName: 'Email', width: 220, editable: true },
    { field: 'role', headerName: 'Role', width: 120, renderCell: (params) => <Chip label={params.value} size="small" sx={{ bgcolor: alpha(roleColors[params.value], 0.12), color: roleColors[params.value], fontWeight: 500, borderRadius: '12px' }} /> },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => <Chip label={params.value} color={statusColors[params.value]} size="small" variant="filled" sx={{ borderRadius: '20px', fontWeight: 500 }} /> },
    { field: 'lastActive', headerName: 'Last Active', width: 130 },
    { field: 'actions', headerName: 'Actions', width: 140, sortable: false, renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit"><IconButton size="small" onClick={() => handleEdit(params.row)} sx={{ color: '#3b82f6' }}><EditIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title={params.row.status === 'Active' ? 'Suspend' : 'Activate'}>
            <IconButton size="small" onClick={() => toggleUserStatus(params.row.id)} sx={{ color: params.row.status === 'Active' ? '#f97316' : '#10b981' }}>
              {params.row.status === 'Active' ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handleEdit = (user) => { setEditingUser(user); setFormData(user); setOpenDialog(true); };
  const handleDelete = (id) => { if (window.confirm('Delete this user permanently?')) setRows(rows.filter(row => row.id !== id)); };
  const toggleUserStatus = (id) => setRows(rows.map(row => row.id === id ? { ...row, status: row.status === 'Active' ? 'Suspended' : 'Active' } : row));
  const handleOpenAdd = () => { setEditingUser(null); setFormData({ firstName: '', lastName: '', email: '', role: 'Viewer', status: 'Active' }); setOpenDialog(true); };
  const handleCloseDialog = () => { setOpenDialog(false); setEditingUser(null); };
  const handleSaveUser = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) return alert('Please fill all required fields');
    if (editingUser) setRows(rows.map(row => row.id === editingUser.id ? { ...row, ...formData } : row));
    else setRows([...rows, { id: Math.max(...rows.map(r => r.id), 0) + 1, ...formData, lastActive: new Date().toISOString().slice(0,10) }]);
    handleCloseDialog();
  };
  const handleProcessRowUpdate = (newRow, oldRow) => { setRows(rows.map(row => row.id === newRow.id ? newRow : row)); return newRow; };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, letterSpacing: '-0.02em', color: '#18181b' }}>User Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd} sx={{ borderRadius: '40px', textTransform: 'none', bgcolor: '#10b981', '&:hover': { bgcolor: '#0d9668' }, px: 3, fontWeight: 500 }}>Add User</Button>
      </Stack>
      <Paper sx={{ height: 550, width: '100%', borderRadius: '28px', overflow: 'hidden', border: '1px solid #eef2f6' }}>
        <DataGrid 
          rows={rows} 
          columns={columns} 
          pageSizeOptions={[5, 10, 25]} 
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }} 
          checkboxSelection 
          disableRowSelectionOnClick 
          processRowUpdate={handleProcessRowUpdate}
          sx={{
            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#fafbfc', fontWeight: 600, color: '#27272a', borderBottom: '1px solid #e9eef3' },
            '& .MuiDataGrid-row:hover': { backgroundColor: alpha('#10b981', 0.03) },
            '& .MuiDataGrid-cell': { borderBottom: '1px solid #f1f5f9' },
          }}
        />
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '32px', p: 1 } }}>
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 600, pb: 1 }}>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent dividers sx={{ borderTop: 'none', borderBottom: 'none' }}>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField label="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName:e.target.value})} fullWidth required InputProps={{ sx: { borderRadius: '20px' } }} />
            <TextField label="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName:e.target.value})} fullWidth required InputProps={{ sx: { borderRadius: '20px' } }} />
            <TextField label="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})} fullWidth required InputProps={{ sx: { borderRadius: '20px' } }} />
            <TextField select label="Role" value={formData.role} onChange={e => setFormData({...formData, role:e.target.value})} fullWidth SelectProps={{ native: true, sx: { borderRadius: '20px' } }}>
              {['Admin','Editor','Viewer'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </TextField>
            <TextField select label="Status" value={formData.status} onChange={e => setFormData({...formData, status:e.target.value})} fullWidth SelectProps={{ native: true }}>
              {['Active','Inactive','Suspended'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button onClick={handleCloseDialog} sx={{ borderRadius: '40px', textTransform: 'none' }}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveUser} sx={{ borderRadius: '40px', textTransform: 'none', bgcolor: '#10b981', '&:hover': { bgcolor: '#0d9668' } }}>Save User</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;