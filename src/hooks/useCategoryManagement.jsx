// src/hooks/useCategoryManagement.js
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getCategories, createCategory, updateCategory, deleteCategory } from "../services/adminService";
import { useAuth } from './useAuth';

export const useCategoryManagement = (token) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const effectiveToken = token || getToken?.();
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(effectiveToken).catch(err => { throw err; }), // Ensure error is thrown
    retry: 1, // Limit retries
    onError: (err) => setError(err.message || 'Failed to fetch categories'),
  });

  const createMutation = useMutation({
    mutationFn: ({ categoryData }) => createCategory(categoryData, effectiveToken),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      setNewCategory("");
      toast.success('Category created successfully');
      setError(null);
    },
    onError: (err) => setError(err.message || 'Failed to create category'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ categoryId, categoryData }) => updateCategory(categoryId, categoryData, effectiveToken),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      setEditingCategory(null);
      setNewCategory("");
      toast.success('Category updated successfully');
      setError(null);
    },
    onError: (err) => setError(err.message || 'Failed to update category'),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ categoryId }) => deleteCategory(categoryId, effectiveToken),
    onSuccess: () => {
      queryClient.invalidateQueries(['categories']);
      toast.success('Category deleted successfully');
      setError(null);
    },
    onError: (err) => setError(err.message || 'Cannot delete category with existing posts'),
  });

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      createMutation.mutate({ categoryData: { name: newCategory } });
    } else {
      toast.error('Category name is required');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
  };

  const handleUpdate = () => {
    if (editingCategory && newCategory.trim()) {
      updateMutation.mutate({
        categoryId: editingCategory.id,
        categoryData: { name: newCategory },
      });
    } else {
      toast.error('Category name is required');
    }
  };

  const handleDelete = (categoryId) => {
    // Find the category to get its name
    const category = categories?.categories?.find(c => c.id === categoryId) || { id: categoryId, name: 'this category' };
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteMutation.mutate({ categoryId: categoryToDelete.id });
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return {
    categories: categories?.categories || [],
    isLoading,
    isError,
    error,
    newCategory,
    setNewCategory,
    editingCategory,
    handleAddCategory,
    handleEdit,
    handleUpdate,
    handleDelete,
    isMutating: createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading,
    // Modal props
    deleteModalOpen,
    categoryToDelete,
    confirmDelete,
    cancelDelete,
  };
};