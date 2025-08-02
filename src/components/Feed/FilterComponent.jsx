import { useState } from 'react';
import { useCategoryManagement } from '../../hooks/useCategoryManagement';
import { FaFilter, FaCalendar, FaList, FaSort, FaChevronDown } from 'react-icons/fa';

const FilterComponent = ({
  selectedDateRange,
  setSelectedDateRange,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
}) => {
  const { categories, isLoading, error } = useCategoryManagement();
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const dateOptions = ['All time', 'Last 24 Hours', 'Last 7 days', 'Last 30 days'];
  const sortOptions = ['Recent', 'Top'];

  const categoryOptions = categories?.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  })) || [];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-3xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-[#7ed957] rounded-xl mr-3">
          <FaFilter className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Smart Filters</h3>
      </div>
      
      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#7ed957] mx-auto"></div>
          <p className="text-sm text-slate-600 mt-2">Loading filters...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-sm text-red-500">Error loading categories: {error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Date Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              <FaCalendar className="mr-2 text-[#7ed957]" />
              Date Range
            </label>
            <div className="relative">
              <button
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-[#7ed957] transition-colors"
              >
                <span className="text-slate-700">{selectedDateRange}</span>
                <FaChevronDown className={`text-slate-400 transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showDateDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg">
                  {dateOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedDateRange(option);
                        setShowDateDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-[#7ed957]/10 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              <FaList className="mr-2 text-[#7ed957]" />
              Category
            </label>
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-[#7ed957] transition-colors"
              >
                <span className="text-slate-700">
                  {selectedCategory === 'all' || !selectedCategory 
                    ? 'All Categories' 
                    : categoryOptions.find(cat => cat.value === selectedCategory)?.label || 'Select category'
                  }
                </span>
                <FaChevronDown className={`text-slate-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showCategoryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setShowCategoryDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#7ed957]/10 transition-colors"
                  >
                    All Categories
                  </button>
                  {categoryOptions.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-[#7ed957]/10 transition-colors"
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
              <FaSort className="mr-2 text-[#7ed957]" />
              Sort By
            </label>
            <div className="flex space-x-2">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedSort(option)}
                  className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all duration-200 ${
                    selectedSort === option
                      ? 'bg-[#7ed957] text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-[#7ed957] hover:text-[#7ed957]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;