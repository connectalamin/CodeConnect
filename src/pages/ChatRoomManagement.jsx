import { useEffect, useMemo, useState } from 'react';
import { useChatRooms } from '../hooks/useChatRooms';
import { useCategoryManagement } from '../hooks/useCategoryManagement';
import { useAuth } from '../hooks/useAuth';
import { Trash2, Plus, Search, Users, MessageSquareText, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const ChatRoomManagement = () => {
  const { role } = useAuth();
  const isAdmin = role?.toLowerCase() === 'admin';
  const {
    publicRooms,
    isLoading,
    error,
    createRoom,
    deleteRoom,
    fetchPublicRooms,
  } = useChatRooms();
  const { categories } = useCategoryManagement();

  const [filters, setFilters] = useState({ category: 'all', search: '' });
  const [form, setForm] = useState({ name: '', category: '', description: '', maxMembers: 100 });
  const [deleting, setDeleting] = useState(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchPublicRooms(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category]);

  const onSearch = (e) => {
    const value = e.target.value;
    setFilters((f) => ({ ...f, search: value }));
    const params = { ...filters, search: value };
    fetchPublicRooms(params);
  };

  const onCreate = async (e) => {
    e.preventDefault();
    if (!isAdmin) return toast.error('Admin only');
    if (!form.name?.trim() || !form.category?.trim()) {
      return toast.error('Name and category are required');
    }
    try {
      await createRoom({
        name: form.name.trim(),
        category: form.category,
        description: form.description?.trim() || '',
        maxMembers: Number(form.maxMembers) || 100,
      });
      toast.success('Room created');
      setForm({ name: '', category: '', description: '', maxMembers: 100 });
      // Refresh using current filters
      await fetchPublicRooms(filters);
    } catch (err) {
      toast.error(err.message || 'Failed to create room');
    }
  };

  const onDelete = async (roomId) => {
    if (!isAdmin) return toast.error('Admin only');
    setDeleting(roomId);
    try {
      await deleteRoom(roomId);
      toast.success('Room deleted');
      await fetchPublicRooms(filters);
    } catch (err) {
      toast.error(err.message || 'Failed to delete room');
    } finally {
      setDeleting(null);
    }
  };

  const categoryOptions = useMemo(() => {
    const list = categories || [];
    return list.map((c) => ({ value: c.name, label: c.name }));
  }, [categories]);

  const syncFromCategories = async () => {
    if (!isAdmin) return toast.error('Admin only');
    setSyncing(true);
    try {
      // Refresh rooms with a large limit to compare
      await fetchPublicRooms({ category: 'all', limit: 500 });
      const existingByCategory = new Set((publicRooms || []).map((r) => r.category));
      const toCreate = (categories || []).filter((c) => !existingByCategory.has(c.name));
      for (const c of toCreate) {
        try {
          await createRoom({ name: `${c.name} Discussions`, category: c.name, description: `${c.name} chat room` });
        } catch (e) {
          // continue
        }
      }
      await fetchPublicRooms(filters);
      toast.success('Sync complete');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f9eb] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="border-b border-slate-200 p-4 md:p-6 bg-white rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Chat Rooms</h2>
              <p className="text-sm text-slate-500">Create and manage public chat rooms by category. Only admins can modify rooms.</p>
            </div>
          </div>

      {/* Create Room */}
  <form onSubmit={onCreate} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-3">
          <label className="block text-sm text-slate-600 mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g., Frontend Discussions"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm text-slate-600 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-4">
          <label className="block text-sm text-slate-600 mb-1">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Optional description"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm text-slate-600 mb-1">Max</label>
          <input
            type="number"
            min={2}
            max={1000}
            value={form.maxMembers}
            onChange={(e) => setForm((f) => ({ ...f, maxMembers: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          />
        </div>
        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            disabled={!isAdmin}
            className="inline-flex items-center gap-2 rounded-lg bg-[#7ED957] px-3 py-2 text-sm font-medium text-white shadow hover:bg-[#6cc149] disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Create
          </button>
        </div>
      </form>

      {/* Filters */}
  <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <select
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          >
            <option value="all">All categories</option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={filters.search}
            onChange={onSearch}
            placeholder="Search rooms..."
            className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          />
        </div>
        <div className="md:ml-auto">
          <button
            type="button"
            onClick={syncFromCategories}
            disabled={!isAdmin || syncing}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Sync from categories
          </button>
        </div>
      </div>

      {/* Rooms List */}
  <div className="mt-4">
        {isLoading ? (
          <div className="text-sm text-slate-500">Loading...</div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : publicRooms.length === 0 ? (
          <div className="text-sm text-slate-500">No rooms found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publicRooms.map((room) => (
              <div key={room.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-slate-900 font-semibold">{room.name}</div>
                    <div className="text-xs text-slate-500">{room.category}</div>
                  </div>
                  <button
                    onClick={() => onDelete(room.id)}
                    disabled={!isAdmin || deleting === room.id}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 disabled:opacity-50"
                    title="Delete room"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> {room.memberCount ?? room._count?.members ?? 0}</span>
                  <span className="inline-flex items-center gap-1"><MessageSquareText className="w-3 h-3" /> {room.messageCount ?? room._count?.messages ?? 0}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(room.createdAt).toLocaleDateString()}</span>
                </div>
                {room.description ? (
                  <p className="mt-3 text-sm text-slate-700 line-clamp-2">{room.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
      </div>
    </>
  );
};

export default ChatRoomManagement;
