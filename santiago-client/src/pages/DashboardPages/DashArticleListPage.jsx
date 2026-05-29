import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Stack, Button, Modal, Switch,
  FormControl, TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArticleIcon from '@mui/icons-material/Article';
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../services/ArticleService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const emptyArticle = { slug: '', title: '', content: '', isActive: true };

const DashArticleListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArticle, setNewArticle] = useState(emptyArticle);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle(emptyArticle);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((a) => a._id === id);
    if (articleToEdit) {
      setNewArticle(articleToEdit);
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveArticle = async () => {
    try {
      if (isEditing) {
        await updateArticle(editArticleId, newArticle);
      } else {
        await createArticle(newArticle);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateArticle(id, { isActive: !isActive });
      loadArticles();
    } catch (error) {
      console.error('Error toggling article status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this article permanently?')) {
      try {
        await deleteArticle(id);
        loadArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const columns = [
    { field: 'slug', headerName: 'Slug', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      flex: 1,
      valueGetter: (value, row) =>
        row.content ? row.content.split('\n').filter((s) => s.trim()).length : 0,
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 2,
      valueGetter: (value, row) =>
        row.content ? row.content.substring(0, 60) + '...' : '',
    },
    {
      field: 'isActive',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.row.isActive}
          onChange={() => handleToggleActive(params.row._id, params.row.isActive)}
          color="primary"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" size="small" onClick={() => handleEdit(params.row._id)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(params.row._id)}>
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Stack direction="row" sx={{ marginBottom: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2" fontWeight="bold">
          Articles
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{ position: 'fixed', right: '20px', top: '100px', zIndex: 1000 }}
        >
          Add Article
        </Button>
      </Stack>

      {/* Modal for Add/Edit Article */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="add-article-modal"
        aria-describedby="add-article-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
            {isEditing ? 'Edit Article' : 'Add Article'}
          </Typography>
          <FormControl fullWidth variant="standard">
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
                <ArticleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth label="Slug" variant="standard"
                  value={newArticle.slug}
                  onChange={(e) => setNewArticle({ ...newArticle, slug: e.target.value })}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
                <ArticleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  fullWidth label="Title" variant="standard"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <ArticleIcon sx={{ color: 'action.active', mr: 1, mt: 1 }} />
                <TextField
                  fullWidth label="Content" variant="standard"
                  multiline rows={5}
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  helperText="Each new line counts as a paragraph."
                />
              </Box>
            </Stack>
          </FormControl>
          <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveArticle}>
              {isEditing ? 'Save Changes' : 'Add'}
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box sx={{ height: 500, width: '100%', mb: 5 }}>
        <DataGrid
          rows={articles}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default DashArticleListPage;
