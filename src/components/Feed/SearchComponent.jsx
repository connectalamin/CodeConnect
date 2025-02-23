import { TextInput } from '@mantine/core';

const SearchComponent = () => {
  return (
    <TextInput
      placeholder="Search posts by title or category..."
      radius="lg" // Increased radius for a softer, modern look
      className="w-full"
      icon={<span className="text-[#94d2bd]">🔍</span>}
      styles={{
        input: {
          backgroundColor: '#ffffff', // Clean white background for contrast
          borderColor: '#e2e8f0',
          '&:hover': { 
            borderColor: '#94d2bd', 
            backgroundColor: '#f8faf9', // Slightly lighter background on hover
          },
          '&:focus': { 
            borderColor: '#94d2bd', 
            boxShadow: '0 0 0 3px rgba(148, 210, 189, 0.2)', // Subtle, elegant focus ring
            backgroundColor: '#f8faf9',
          },
          paddingLeft: '2.75rem', // Slightly more padding for better spacing
          paddingRight: '1rem', // Balanced padding
          color: '#2d3748', // Darker, more readable text
          fontSize: '0.875rem', // Slightly smaller, modern font size
          fontWeight: 600, // Bolder text for emphasis
          height: '3rem', // Taller input for a premium feel
          transition: 'all 0.3s ease', // Smoother transitions
        },
        icon: {
          marginRight: '0.875rem', // Adjusted for better alignment
          fontSize: '1.25rem', // Larger icon for prominence
        },
        label: { color: '#4a5568' },
      }}
    />
  );
};

export default SearchComponent;