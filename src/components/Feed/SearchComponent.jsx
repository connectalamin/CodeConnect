import { TextInput } from '@mantine/core';

const SearchComponent = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextInput
      placeholder="Search posts by title or category..."
      radius="lg"
      className="w-full"
      icon={<span className="text-[#94d2bd]">🔍</span>}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      styles={{
        input: {
          backgroundColor: '#ffffff',
          borderColor: '#e2e8f0',
          '&:hover': { borderColor: '#94d2bd', backgroundColor: '#f8faf9' },
          '&:focus': { borderColor: '#94d2bd', boxShadow: '0 0 0 3px rgba(148, 210, 189, 0.2)' },
          paddingLeft: '2.75rem',
          paddingRight: '1rem',
          color: '#2d3748',
          fontSize: '0.875rem',
          fontWeight: 600,
          height: '3rem',
          transition: 'all 0.3s ease',
        },
        icon: {
          marginRight: '0.875rem',
          fontSize: '1.25rem',
        },
        label: { color: '#4a5568' },
      }}
    />
  );
};

export default SearchComponent;