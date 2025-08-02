import { FaSearch } from 'react-icons/fa';

const SearchComponent = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="h-5 w-5 text-[#7ed957]" />
      </div>
      <input
        type="text"
        placeholder="Search posts by title or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-2xl bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#7ed957]/20 focus:border-[#7ed957] transition-all duration-200 hover:border-[#7ed957]/50"
      />
    </div>
  );
};

export default SearchComponent;