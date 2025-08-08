import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle, 
  Users, 
  Award, 
  TrendingUp,
  MessageCircle,
  Settings,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import faqData from '../data/faqData.json';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState(new Set());
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [paginatedFAQs, setPaginatedFAQs] = useState([]);

  const categories = [
    { id: 'all', name: 'All Topics', icon: <BookOpen className="w-4 h-4" />, color: 'bg-slate-500' },
    { id: 'general', name: 'Getting Started', icon: <HelpCircle className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'features', name: 'Features & Usage', icon: <Settings className="w-4 h-4" />, color: 'bg-green-500' },
    { id: 'karma', name: 'Karma Points', icon: <Award className="w-4 h-4" />, color: 'bg-yellow-500' },
    { id: 'ranking', name: 'Rankings & Leaderboard', icon: <TrendingUp className="w-4 h-4" />, color: 'bg-purple-500' },
    { id: 'community', name: 'Community', icon: <Users className="w-4 h-4" />, color: 'bg-indigo-500' },
    { id: 'technical', name: 'Technical Support', icon: <MessageCircle className="w-4 h-4" />, color: 'bg-red-500' }
  ];

  useEffect(() => {
    let allFAQs = [];
    
    // Flatten all FAQ items with category info
    Object.keys(faqData).forEach(categoryKey => {
      faqData[categoryKey].forEach(item => {
        allFAQs.push({
          ...item,
          category: categoryKey,
          categoryName: categories.find(cat => cat.id === categoryKey)?.name || categoryKey
        });
      });
    });

    // Filter by category
    if (selectedCategory !== 'all') {
      allFAQs = allFAQs.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      allFAQs = allFAQs.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFAQs(allFAQs);
  }, [searchTerm, selectedCategory]);

  // Pagination effect
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedFAQs(filteredFAQs.slice(startIndex, endIndex));
  }, [filteredFAQs, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredFAQs.length / itemsPerPage);
  const totalItems = filteredFAQs.length;

  const toggleItem = (itemId) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const expandAll = () => {
    const allIds = new Set(paginatedFAQs.map(item => item.id));
    setOpenItems(allIds);
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white to-[#f0f9eb]">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#7ED957]/10 to-[#6cc149]/5 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#7ED957]/20 rounded-full mb-6">
                <HelpCircle className="w-8 h-8 text-[#7ED957]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Frequently Asked <span className="text-[#7ED957]">Questions</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Find answers to common questions about CodeConnect, learn how to maximize your experience, 
                and discover everything you need to know about our developer community platform.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Search and Controls */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] transition-colors"
                />
              </div>

              {/* Quick Actions and Items Per Page */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                    className="px-3 py-1 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] transition-colors"
                  >
                    <option value={5}>5 items</option>
                    <option value={10}>10 items</option>
                    <option value={15}>15 items</option>
                    <option value={20}>20 items</option>
                  </select>
                </div>
                <button
                  onClick={expandAll}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-[#7ED957] text-white shadow-lg'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${category.color}`}></div>
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          {totalItems > 0 && (
            <div className="mb-6">
              <p className="text-sm text-slate-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
                {selectedCategory !== 'all' && (
                  <span className="ml-2 px-2 py-1 bg-[#7ED957]/10 text-[#7ED957] rounded-md text-xs font-medium">
                    {categories.find(cat => cat.id === selectedCategory)?.name}
                  </span>
                )}
              </p>
            </div>
          )}

          {/* FAQ Content */}
          <div className="space-y-4">
            {paginatedFAQs.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No results found</h3>
                <p className="text-slate-500">
                  Try adjusting your search terms or browse different categories.
                </p>
              </div>
            ) : (
              paginatedFAQs.map((item, index) => {
                const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-6 h-6 rounded-full ${
                            categories.find(cat => cat.id === item.category)?.color || 'bg-slate-500'
                          } flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">{globalIndex}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {item.question}
                          </h3>
                          <span className="text-sm text-[#7ED957] font-medium">
                            {item.categoryName}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {openItems.has(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {openItems.has(item.id) && (
                      <div className="px-6 pb-6 animate-fadeIn">
                        <div className="pl-10">
                          <div className="bg-[#7ED957]/5 rounded-xl p-4 border-l-4 border-[#7ED957]">
                            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                        : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {/* First page */}
                    {currentPage > 3 && (
                      <>
                        <button
                          onClick={() => goToPage(1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          1
                        </button>
                        {currentPage > 4 && (
                          <span className="px-2 text-slate-400">...</span>
                        )}
                      </>
                    )}

                    {/* Current page and neighbors */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      if (pageNum < 1 || pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                            pageNum === currentPage
                              ? 'bg-[#7ED957] text-white'
                              : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <span className="px-2 text-slate-400">...</span>
                        )}
                        <button
                          onClick={() => goToPage(totalPages)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                        : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Jump */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Go to:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        goToPage(page);
                      }
                    }}
                    className="w-16 px-2 py-1 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#7ED957]/20 focus:border-[#7ED957] transition-colors text-center"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Still Have Questions Section */}
          <div className="mt-12 bg-gradient-to-r from-[#7ED957]/10 to-[#6cc149]/5 rounded-2xl p-8 text-center border border-[#7ED957]/20">
            <MessageCircle className="w-12 h-12 text-[#7ED957] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              Still have questions?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/feed"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#7ED957] text-white font-medium rounded-xl hover:bg-[#6cc149] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Ask the Community
              </a>
              <a
                href="/chat-rooms"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#7ED957] font-medium rounded-xl border-2 border-[#7ED957] hover:bg-[#7ED957] hover:text-white transition-colors"
              >
                <Users className="w-4 h-4" />
                Join Chat Rooms
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default FAQ;
