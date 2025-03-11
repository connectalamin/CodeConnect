import { Card, Text, Stack, Select, Button } from '@mantine/core';
import { useCategoryManagement } from '../../hooks/useCategoryManagement';

const FilterComponent = ({
  selectedDateRange,
  setSelectedDateRange,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
}) => {
  const { categories, isLoading, error } = useCategoryManagement();

  const categoryOptions = categories?.map((category) => ({
    value: category.id.toString(), // Ensure string value for consistent comparison
    label: category.name,
  })) || [];         
  return (
    <Card
      shadow="lg"
      radius="xl"
      className="p-6 bg-gradient-to-b from-white to-gray-50 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[#94d2bd]"
    >
      <Stack spacing="md">
        <Text
          size="lg"
          weight={700}
          className="text-gray-900 bg-[#F6FBF5] px-3 py-1 rounded-full text-center"
          style={{ lineHeight: '1.2' }}
        >
          Filters
        </Text>
        
        {isLoading ? (
          <Text size="sm" color="gray" className="text-center">
            Loading filters...
          </Text>
        ) : error ? (
          <Text size="sm" color="red" className="text-center">
            Error loading categories: {error}
          </Text>
        ) : (
          <Stack spacing="xs">
            {/* Date Filter (Dropdown/Select) */}
            <Select
              label={<Text size="sm" weight={500} color="gray-700">Date</Text>}
              placeholder="Select date range"
              data={[
                { value: 'Last 24 Hours', label: 'Last 24 Hours' },
                { value: 'Last 7 days', label: 'Last 7 days' },
                { value: 'Last 30 days', label: 'Last 30 days' },
                { value: 'All time', label: 'All time' },
              ]}
              radius="md"
              className="w-full"
              value={selectedDateRange}
              onChange={setSelectedDateRange}
              clearable
              styles={{
                input: {
                  backgroundColor: 'rgba(240, 249, 235, 0.5)',
                  borderColor: '#e2e8f0',
                  '&:hover': { borderColor: '#94d2bd' },
                  color: '#4a5568',
                },
                label: { color: '#4a5568' },
              }}
            />

            {/* Category Filter (Dropdown/Select) */}
            <Select
              label={<Text size="sm" weight={500} color="gray-700">Category</Text>}
              placeholder="Select category"
              // CHANGED: Added 'all' option at the start with consistent value
              data={[{ value: 'all', label: 'All Categories' }, ...categoryOptions]}
              radius="md"
              className="w-full"
              value={selectedCategory}
              onChange={setSelectedCategory}
              clearable
              searchable
              nothingfound="No categories found" // CHANGED: Fixed prop name
              styles={{
                input: {
                  backgroundColor: 'rgba(240, 249, 235, 0.5)',
                  borderColor: '#e2e8f0',
                  '&:hover': { borderColor: '#94d2bd' },
                  color: '#4a5568',
                },
                label: { color: '#4a5568' },
              }}
            />

            {/* Sort Options (Buttons) */}
            <Stack spacing="xs" className="pl-2">
              <Text size="sm" weight={500} color="gray-700">
                Sort By
              </Text>
              <Button
                variant="subtle"
                radius="md"
                className={`text-gray-700 hover:bg-[#94d2bd]/20 hover:text-[#94d2bd] transition-all duration-200 ${
                  selectedSort === 'Top' ? 'bg-[#94d2bd]/20 text-[#94d2bd]' : ''
                }`}
                onClick={() => setSelectedSort('Top')}
              >
                Top
              </Button>
              <Button
                variant="subtle"
                radius="md"
                className={`text-gray-700 hover:bg-[#94d2bd]/20 hover:text-[#94d2bd] transition-all duration-200 ${
                  selectedSort === 'Recent' ? 'bg-[#94d2bd]/20 text-[#94d2bd]' : ''
                }`}
                onClick={() => setSelectedSort('Recent')}
              >
                Recent
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default FilterComponent;