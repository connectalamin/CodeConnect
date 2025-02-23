import { Card, Text, Stack, Select,Button } from '@mantine/core';

const FilterComponent = () => {
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
          className="text-gray-900 bg-gray-100/50 px-3 py-1 rounded-full text-center"
          style={{ lineHeight: '1.2' }}
        >
          Filters
        </Text>
        <Stack spacing="xs">
          {/* Date Filter (Dropdown/Select) */}
          <Select
            label={<Text size="sm" weight={500} color="gray-700">Date</Text>}
            placeholder="Select date range"
            data={['Last 7 days', 'Last 30 days', 'All time']}
            radius="md"
            className="w-full"
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
            data={['Technology', 'Education', 'Health', 'Other']}
            radius="md"
            className="w-full"
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
              className="text-gray-700 hover:bg-[#94d2bd]/20 hover:text-[#94d2bd] transition-all duration-200"
            >
              Top
            </Button>
            <Button
              variant="subtle"
              radius="md"
              className="text-gray-700 hover:bg-[#94d2bd]/20 hover:text-[#94d2bd] transition-all duration-200"
            >
              Recent
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default FilterComponent;