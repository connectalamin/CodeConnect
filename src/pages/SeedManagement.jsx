import { useState } from 'react';
import { Database, AlertTriangle, CheckCircle, Loader2, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import adminService from '../services/adminService';

const SeedManagement = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);

  const handleSeedDatabase = async () => {
    if (!token) {
      toast.error('Authentication required');
      return;
    }

    setLoading(true);
    try {
      const response = await adminService.seedDatabase(token);
      toast.success('Database seeded successfully!');
      console.log('Seed response:', response.data);
      
      // Refresh the page after successful seeding
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Seed error:', error);
      toast.error(error.response?.data?.error || 'Failed to seed database');
    } finally {
      setLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    if (!token) {
      toast.error('Authentication required');
      return;
    }

    const confirmed = window.confirm(
      '⚠️ WARNING: This will delete ALL data from the database!\n\n' +
      'This action cannot be undone. Are you sure you want to continue?'
    );

    if (!confirmed) return;

    setClearLoading(true);
    try {
      const response = await adminService.clearDatabase(token);
      toast.success('Database cleared successfully!');
      console.log('Clear response:', response.data);
      
      // Refresh the page after successful clearing
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Clear error:', error);
      toast.error(error.response?.data?.error || 'Failed to clear database');
    } finally {
      setClearLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#7ED957] rounded-xl flex items-center justify-center">
          <Database className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Database Seed Management</h1>
          <p className="text-slate-600">Manage your database with sample data</p>
        </div>
      </div>

      {/* Warning Card */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-orange-800 mb-1">Important Notice</h3>
            <p className="text-sm text-orange-700">
              These actions will affect your production database. Use with caution and only when necessary.
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Seed Database Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Seed Database</h3>
              <p className="text-sm text-slate-600">Add sample data to your database</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="text-sm text-slate-600">
              <p className="font-medium mb-2">This will create:</p>
              <ul className="space-y-1 text-xs">
                <li>• 8 sample users (including 1 admin)</li>
                <li>• 8 categories</li>
                <li>• 8 sample posts with comments</li>
                <li>• Votes and interactions</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleSeedDatabase}
            disabled={loading}
            className="w-full bg-[#7ED957] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#6cc149] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Seeding Database...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Seed Database</span>
              </>
            )}
          </button>
        </div>

        {/* Clear Database Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Clear Database</h3>
              <p className="text-sm text-slate-600">Remove all data from database</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="text-sm text-red-600">
              <p className="font-medium mb-2">⚠️ This will delete:</p>
              <ul className="space-y-1 text-xs">
                <li>• All users and their data</li>
                <li>• All posts and comments</li>
                <li>• All categories</li>
                <li>• All votes and interactions</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleClearDatabase}
            disabled={clearLoading}
            className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {clearLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Clearing Database...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Clear Database</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-800 mb-2">How to use:</h3>
        <ol className="text-sm text-blue-700 space-y-1">
          <li>1. <strong>Seed Database:</strong> Use this to populate your database with sample data for testing or demonstration</li>
          <li>2. <strong>Clear Database:</strong> Use this to reset your database to a clean state</li>
          <li>3. Both actions will automatically refresh the page after completion</li>
        </ol>
      </div>
    </div>
  );
};

export default SeedManagement;
