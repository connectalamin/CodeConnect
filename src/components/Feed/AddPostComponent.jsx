import { useState } from 'react';
import { Modal, Stack, TextInput, Select, Button, Text, LoadingOverlay } from '@mantine/core';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import { useForm } from '@mantine/form';

const AddPostComponent = ({ opened, onClose }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      category: '',
    },
    validate: {
      title: (value) => (value.length < 1 ? 'Title is required' : null),
      content: (value) => (value.length < 1 ? 'Content is required' : null),
      category: (value) => (value.length < 1 ? 'Category is required' : null),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const postData = {
        title: values.title,
        content: values.content, // Plain text content
        category: values.category,
      };
      await authService.createPost(token, postData);
      toast.success('Post created successfully!');
      onClose();
      form.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={<Text size="lg" weight={700} color="gray-900">Create New Post</Text>}
      size="lg"
      radius="xl"
      className="bg-gradient-to-b from-white to-gray-50"
      overlayProps={{
        blur: 3,
      }}
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <TextInput
            label={<Text size="sm" weight={500} color="gray-700">Title</Text>}
            placeholder="Enter post title"
            radius="lg"
            {...form.getInputProps('title')}
            className="w-full"
            styles={{
              input: {
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                '&:hover': { borderColor: '#94d2bd', backgroundColor: '#f8faf9' },
                '&:focus': { borderColor: '#94d2bd', boxShadow: '0 0 0 3px rgba(148, 210, 189, 0.2)' },
                paddingLeft: '1rem',
                paddingRight: '1rem',
                color: '#2d3748',
                fontSize: '0.875rem',
                fontWeight: 600,
                height: '3rem',
                transition: 'all 0.3s ease',
              },
              label: { color: '#4a5568' },
              error: { color: '#e53e3e' },
            }}
          />
          <TextInput
            label={<Text size="sm" weight={500} color="gray-700">Content</Text>}
            placeholder="Describe your problem or question"
            radius="lg"
            {...form.getInputProps('content')}
            className="w-full"
            styles={{
              input: {
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                '&:hover': { borderColor: '#94d2bd', backgroundColor: '#f8faf9' },
                '&:focus': { borderColor: '#94d2bd', boxShadow: '0 0 0 3px rgba(148, 210, 189, 0.2)' },
                paddingLeft: '1rem',
                paddingRight: '1rem',
                color: '#2d3748',
                fontSize: '0.875rem',
                fontWeight: 600,
                height: '200px', // Increased height for multi-line input
                transition: 'all 0.3s ease',
              },
              label: { color: '#4a5568' },
              error: { color: '#e53e3e' },
            }}
          />
          <Select
            label={<Text size="sm" weight={500} color="gray-700">Category</Text>}
            placeholder="Select category"
            data={['Technology', 'Education', 'Health', 'Other']}
            radius="lg"
            {...form.getInputProps('category')}
            className="w-full"
            styles={{
              input: {
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                '&:hover': { borderColor: '#94d2bd', backgroundColor: '#f8faf9' },
                '&:focus': { borderColor: '#94d2bd', boxShadow: '0 0 0 3px rgba(148, 210, 189, 0.2)' },
                color: '#2d3748',
                fontSize: '0.875rem',
                fontWeight: 600,
                height: '3rem',
                transition: 'all 0.3s ease',
              },
              label: { color: '#4a5568' },
              error: { color: '#e53e3e' },
            }}
          />
          <Button
            type="submit"
            radius="lg"
            className="bg-[#94d2bd] text-white hover:bg-[#7cb8a4] transition-colors duration-300 shadow-md hover:shadow-lg w-full"
            disabled={loading}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddPostComponent;