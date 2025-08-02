import { useEffect } from "react";
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useUserManagement } from "../hooks/useUserManagement";
import { Users, Trash2, Shield, User, Mail, Loader2 } from "lucide-react";

const UserManagement = () => {
  const { token } = useAuth();
  const { users, isLoading, isError, error, handleDelete, isDeleting } = useUserManagement(token);

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
                <Users className="w-6 h-6 text-[#7ED957]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
                <p className="text-slate-600">Manage user accounts and permissions</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <div className="flex flex-col items-center justify-center space-y-4 h-64">
                <Loader2 className="w-8 h-8 text-[#7ED957] animate-spin" />
                <p className="text-slate-600">Loading users...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-center space-x-3 text-red-600">
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">!</span>
                </div>
                <p>Error loading users: {error}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Table Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">Manage Users</h2>
                <p className="text-sm text-slate-600 mt-1">Total users: {users.length}</p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Name</span>
                        </div>
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </div>
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Role</span>
                        </div>
                      </th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#7ED957]/10 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-[#7ED957]" />
                            </div>
                            <span className="font-medium text-slate-900">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{user.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin'
                                ? "bg-[#7ED957]/10 text-slate-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {user.role === "Admin" && <Shield className="w-3 h-3 mr-1" />}
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={isDeleting}
                            className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete user"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {users.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No users found</h3>
                  <p className="text-slate-600">There are no users to display at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserManagement;