import { useEffect } from "react";
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useCategoryManagement } from "../hooks/useCategoryManagement";
import { 
  Tag, 
  Trash2, 
  Edit3, 
  Plus, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";

const CategoryManagement = () => {
  const { token } = useAuth();
  const {
    categories,
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
    isMutating,
    deleteModalOpen,
    categoryToDelete,
    confirmDelete,
    cancelDelete,
  } = useCategoryManagement(token);

  useEffect(() => {
    if (isError && error) {
      toast.error(error);
    }
  }, [isError, error]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f9eb] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[#7ED957]/10 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-[#7ED957]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Category Management</h1>
                <p className="text-slate-600">Manage post categories and topics</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <div className="flex flex-col items-center justify-center space-y-4 h-64">
                <Loader2 className="w-8 h-8 text-[#7ED957] animate-spin" />
                <p className="text-slate-600">Loading categories...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-center space-x-3 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <p>Error loading categories: {error}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Add Category Form */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Add New Category</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter category name..."
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-[#7ED957] transition-colors duration-200"
                      disabled={isMutating}
                    />
                  </div>
                  <button
                    onClick={() => (editingCategory ? handleUpdate() : handleAddCategory())}
                    disabled={!newCategory.trim() || isMutating}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#7ED957] text-white font-medium rounded-lg hover:bg-[#6cc149] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isMutating ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    {editingCategory ? "Update Category" : "Add Category"}
                  </button>
                </div>
              </div>

              {/* Categories Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4" />
                          <span>Category Name</span>
                        </div>
                      </th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-slate-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#7ED957]/10 rounded-full flex items-center justify-center">
                              <Tag className="w-4 h-4 text-[#7ED957]" />
                            </div>
                            <span className="font-medium text-slate-900">{category.name}</span>
                            {editingCategory?.id === category.id && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#7ED957]/10 text-slate-800">
                                <Edit3 className="w-3 h-3 mr-1" />
                                Editing
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(category)}
                              disabled={isMutating}
                              className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Edit category"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(category.id)}
                              disabled={isMutating}
                              className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {categories.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No categories found</h3>
                  <p className="text-slate-600">Add your first category to get started.</p>
                </div>
              )}
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {deleteModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Confirm Deletion</h3>
                    <p className="text-sm text-slate-600">This action cannot be undone</p>
                  </div>
                </div>
                
                <p className="text-slate-700 mb-6">
                  Are you sure you want to delete the category{" "}
                  <span className="font-semibold text-slate-900">"{categoryToDelete?.name}"</span>?
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isMutating}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isMutating ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryManagement;