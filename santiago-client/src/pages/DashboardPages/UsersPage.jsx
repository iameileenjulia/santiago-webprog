// UsersPage.jsx
import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Paper, Button, Stack, IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Chip, alpha, InputAdornment, MenuItem, FormControl, InputLabel, Select, FormHelperText,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const initialRows = [
  { id: 1, firstName: 'John',    lastName: 'Doe',      username: 'johndoe',     email: 'john@example.com',    role: 'Admin',  gender: 'Male',   status: 'Active',    age: 28, contactNumber: '09123456789', lastActive: '2025-04-28' },
  { id: 2, firstName: 'Jane',    lastName: 'Smith',    username: 'janesmith',   email: 'jane@example.com',    role: 'Editor', gender: 'Female', status: 'Active',    age: 34, contactNumber: '09234567890', lastActive: '2025-04-30' },
  { id: 3, firstName: 'Bob',     lastName: 'Johnson',  username: 'bobjohnson',  email: 'bob@example.com',     role: 'Viewer', gender: 'Male',   status: 'Inactive',  age: 22, contactNumber: '09345678901', lastActive: '2025-04-15' },
  { id: 4, firstName: 'Alice',   lastName: 'Brown',    username: 'alicebrown',  email: 'alice@example.com',   role: 'Editor', gender: 'Female', status: 'Active',    age: 29, contactNumber: '09456789012', lastActive: '2025-05-01' },
  { id: 5, firstName: 'Charlie', lastName: 'Wilson',   username: 'charliew',    email: 'charlie@example.com', role: 'Viewer', gender: 'Male',   status: 'Suspended', age: 45, contactNumber: '09567890123', lastActive: '2025-03-20' },
];

const statusColors = { Active: 'success', Inactive: 'default', Suspended: 'error' };
const roleColors   = { Admin: '#10b981', Editor: '#3b82f6', Viewer: '#f59e0b' };

const emptyForm = {
  firstName: '', lastName: '', username: '', email: '',
  password: '', age: '', contactNumber: '', gender: '', role: 'Viewer', status: 'Active',
};

const validate = (data, isEdit) => {
  const errors = {};
  if (!data.firstName.trim())   errors.firstName = 'First name is required.';
  if (!data.lastName.trim())    errors.lastName  = 'Last name is required.';

  if (!data.username.trim())    errors.username = 'Username is required.';
  else if (/\s/.test(data.username)) errors.username = 'Username must not contain spaces.';

  if (!data.email.trim())       errors.email = 'Email is required.';

  if (!isEdit && !data.password) {
    errors.password = 'Password is required.';
  } else if (data.password && data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (!String(data.age).trim()) {
    errors.age = 'Age is required.';
  } else if (!/^\d+$/.test(String(data.age))) {
    errors.age = 'Age must be a number only.';
  }

  if (!data.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!/^\d{11}$/.test(data.contactNumber)) {
    errors.contactNumber = 'Contact number must be exactly 11 digits.';
  }

  if (!data.gender) errors.gender = 'Gender is required.';

  return errors;
};

const UsersPage = () => {
  const [rows, setRows]               = useState(initialRows);
  const [openDialog, setOpenDialog]   = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData]       = useState(emptyForm);
  const [formErrors, setFormErrors]   = useState({});

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter]   = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredRows = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return rows.filter(row => {
      const matchesSearch =
        !q ||
        row.firstName.toLowerCase().includes(q) ||
        row.lastName.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q) ||
        row.username.toLowerCase().includes(q);
      const matchesRole   = !roleFilter   || row.role   === roleFilter;
      const matchesGender = !genderFilter || row.gender === genderFilter;
      const matchesStatus = !statusFilter || row.status === statusFilter;
      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [rows, searchQuery, roleFilter, genderFilter, statusFilter]);

  const columns = [
    { field: 'id',            headerName: 'ID',             width: 60  },
    { field: 'firstName',     headerName: 'First Name',     width: 110 },
    { field: 'lastName',      headerName: 'Last Name',      width: 110 },
    { field: 'username',      headerName: 'Username',       width: 120 },
    { field: 'email',         headerName: 'Email',          width: 200 },
    { field: 'gender',        headerName: 'Gender',         width: 90  },
    { field: 'age',           headerName: 'Age',            width: 70  },
    { field: 'contactNumber', headerName: 'Contact No.',    width: 130 },
    {
      field: 'role', headerName: 'Role', width: 110,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{ bgcolor: alpha(roleColors[params.value], 0.12), color: roleColors[params.value], fontWeight: 500, borderRadius: '12px' }}
        />
      ),
    },
    {
      field: 'status', headerName: 'Status', width: 110,
      renderCell: (params) => (
        <Chip label={params.value} color={statusColors[params.value]} size="small" sx={{ borderRadius: '20px', fontWeight: 500 }} />
      ),
    },
    {
      field: 'actions', headerName: 'Actions', width: 130, sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(params.row)} sx={{ color: '#3b82f6' }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={params.row.status === 'Active' ? 'Suspend' : 'Activate'}>
            <IconButton
              size="small"
              onClick={() => toggleUserStatus(params.row.id)}
              sx={{ color: params.row.status === 'Active' ? '#f97316' : '#10b981' }}
            >
              {params.row.status === 'Active' ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...emptyForm, ...user, password: '' });
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this user permanently?')) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const toggleUserStatus = (id) =>
    setRows(rows.map(row =>
      row.id === id ? { ...row, status: row.status === 'Active' ? 'Suspended' : 'Active' } : row
    ));

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setFormErrors({});
  };

  const handleSaveUser = () => {
    const errors = validate(formData, !!editingUser);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const { password, ...rest } = formData;
    if (editingUser) {
      setRows(rows.map(row => row.id === editingUser.id ? { ...row, ...rest } : row));
    } else {
      setRows([...rows, { id: Math.max(...rows.map(r => r.id), 0) + 1, ...rest, lastActive: new Date().toISOString().slice(0, 10) }]);
    }
    handleCloseDialog();
  };

  const setField = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setFormErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const hasActiveFilters = roleFilter || genderFilter || statusFilter;

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, letterSpacing: '-0.02em', color: '#18181b' }}>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ borderRadius: '40px', textTransform: 'none', bgcolor: '#10b981', '&:hover': { bgcolor: '#0d9668' }, px: 3, fontWeight: 500 }}
        >
          Add User
        </Button>
      </Stack>

      {/* Search + Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }} alignItems="center">
        <TextField
          placeholder="Search by name, username, or email…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          size="small"
          sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '40px' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#71717a', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={1.5} alignItems="center">
          <FilterListIcon sx={{ color: '#71717a', fontSize: 20 }} />

          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} label="Role" onChange={e => setRoleFilter(e.target.value)} sx={{ borderRadius: '20px' }}>
              <MenuItem value=""><em>All</em></MenuItem>
              {['Admin', 'Editor', 'Viewer'].map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 110 }}>
            <InputLabel>Gender</InputLabel>
            <Select value={genderFilter} label="Gender" onChange={e => setGenderFilter(e.target.value)} sx={{ borderRadius: '20px' }}>
              <MenuItem value=""><em>All</em></MenuItem>
              {['Male', 'Female', 'Other'].map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={e => setStatusFilter(e.target.value)} sx={{ borderRadius: '20px' }}>
              <MenuItem value=""><em>All</em></MenuItem>
              {['Active', 'Inactive', 'Suspended'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>

          {hasActiveFilters && (
            <Button
              size="small"
              onClick={() => { setRoleFilter(''); setGenderFilter(''); setStatusFilter(''); }}
              sx={{ textTransform: 'none', color: '#71717a', borderRadius: '20px' }}
            >
              Clear
            </Button>
          )}
        </Stack>
      </Stack>

      {/* DataGrid */}
      <Paper sx={{ height: 520, width: '100%', borderRadius: '28px', overflow: 'hidden', border: '1px solid #eef2f6' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#fafbfc', fontWeight: 600, color: '#27272a', borderBottom: '1px solid #e9eef3' },
            '& .MuiDataGrid-row:hover': { backgroundColor: alpha('#10b981', 0.03) },
            '& .MuiDataGrid-cell': { borderBottom: '1px solid #f1f5f9' },
          }}
        />
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '32px', p: 1 } }}>
        <DialogTitle sx={{ fontSize: '1.4rem', fontWeight: 600, pb: 1 }}>
          {editingUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>

        <DialogContent dividers sx={{ borderTop: 'none', borderBottom: 'none' }}>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="First Name" value={formData.firstName} onChange={setField('firstName')}
                fullWidth required
                error={!!formErrors.firstName} helperText={formErrors.firstName}
                InputProps={{ sx: { borderRadius: '20px' } }}
              />
              <TextField
                label="Last Name" value={formData.lastName} onChange={setField('lastName')}
                fullWidth required
                error={!!formErrors.lastName} helperText={formErrors.lastName}
                InputProps={{ sx: { borderRadius: '20px' } }}
              />
            </Stack>

            <TextField
              label="Username" value={formData.username} onChange={setField('username')}
              fullWidth required
              error={!!formErrors.username} helperText={formErrors.username || 'No spaces allowed.'}
              InputProps={{ sx: { borderRadius: '20px' } }}
            />

            <TextField
              label="Email" type="email" value={formData.email} onChange={setField('email')}
              fullWidth required
              error={!!formErrors.email} helperText={formErrors.email}
              InputProps={{ sx: { borderRadius: '20px' } }}
            />

            <TextField
              label={editingUser ? 'New Password (leave blank to keep)' : 'Password'}
              type="password" value={formData.password} onChange={setField('password')}
              fullWidth required={!editingUser}
              error={!!formErrors.password} helperText={formErrors.password || 'Minimum 8 characters.'}
              InputProps={{ sx: { borderRadius: '20px' } }}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Age" value={formData.age} onChange={setField('age')}
                fullWidth required
                error={!!formErrors.age} helperText={formErrors.age || 'Numbers only.'}
                InputProps={{ sx: { borderRadius: '20px' } }}
              />

              <TextField
                label="Contact Number" value={formData.contactNumber} onChange={setField('contactNumber')}
                fullWidth required
                error={!!formErrors.contactNumber} helperText={formErrors.contactNumber || 'Must be 11 digits (e.g. 09XXXXXXXXX).'}
                InputProps={{ sx: { borderRadius: '20px' } }}
              />
            </Stack>

            <FormControl fullWidth required error={!!formErrors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select value={formData.gender} label="Gender" onChange={setField('gender')} sx={{ borderRadius: '20px' }}>
                {['Male', 'Female', 'Other'].map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
              </Select>
              {formErrors.gender && <FormHelperText>{formErrors.gender}</FormHelperText>}
            </FormControl>

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select value={formData.role} label="Role" onChange={setField('role')} sx={{ borderRadius: '20px' }}>
                  {['Admin', 'Editor', 'Viewer'].map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={formData.status} label="Status" onChange={setField('status')} sx={{ borderRadius: '20px' }}>
                  {['Active', 'Inactive', 'Suspended'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button onClick={handleCloseDialog} sx={{ borderRadius: '40px', textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained" onClick={handleSaveUser}
            sx={{ borderRadius: '40px', textTransform: 'none', bgcolor: '#10b981', '&:hover': { bgcolor: '#0d9668' } }}
          >
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
