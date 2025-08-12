import { useState } from 'react';
import { Database, AlertTriangle, CheckCircle, Loader2, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import adminService from '../services/adminService';

const SeedManagement = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

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



  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#7ED957] rounded-xl flex items-center justify-center">
          <Database className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Database Sample Data Management</h1>
          <p className="text-slate-600">Add sample data while preserving existing users</p>
        </div>
      </div>



      {/* Action Cards */}
      <div className="max-w-md mx-auto">
        {/* Seed Database Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Add Sample Data</h3>
              <p className="text-sm text-slate-600">Add sample data (preserves existing users)</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="text-sm text-slate-600">
              <p className="font-medium mb-2">This will add:</p>
              <ul className="space-y-1 text-xs">
                <li>• 20 Bangladeshi sample users (regular users only)</li>
                <li>• Students from BUET, DU, Comilla University, etc.</li>
                <li>• 58+ sample posts with realistic programming content</li>
                <li>• 150+ comments and interactions</li>
                <li>• Preserves your existing admin users</li>
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
                <span>Adding Sample Data...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Add Sample Data</span>
              </>
            )}
          </button>
        </div>


      </div>


    </div>
  );
};

export default SeedManagement;
