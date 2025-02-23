import { useState } from 'react';
import { Modal, Stack, TextInput, Select, Button, Text, LoadingOverlay } from '@mantine/core';
import hljs from 'highlight.js';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/authService';
import { useForm } from '@mantine/form';
import 'highlight.js/styles/github-dark.css';

hljs.configure({
  languages: ['javascript', 'typescript', 'python', 'java', 'cpp', 'css', 'html', 'json']
});

const AddPostComponent = ({ opened, onClose }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

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
        content: values.content,
        category: values.category,
      };
      await authService.createPost(token, postData);
      toast.success('Post created successfully!');
      onClose();
      form.reset();
      setHighlightedCode('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeHighlight = (code) => {
    const highlighted = hljs.highlightAuto(code).value;
    setHighlightedCode(highlighted);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        form.reset();
        setHighlightedCode('');
      }}
      title={<Text size="lg" weight={700} color="gray-900">Create New Post</Text>}
      size="lg"
      radius="xl"
      className="bg-gradient-to-b from-white to-gray-50"
      overlayProps={{ blur: 3 }}
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
            }}
          />
          
          <div className="code-editor">
            <TextInput
              component="textarea"
              placeholder="Write your code here..."
              {...form.getInputProps('content')}
              onChange={(e) => {
                form.setFieldValue('content', e.target.value);
                handleCodeHighlight(e.target.value);
              }}
              styles={{
                input: {
                  fontFamily: "'Fira Code', monospace",
                  backgroundColor: '#0d1117',
                  color: '#c9d1d9',
                  padding: '1rem',
                  minHeight: '200px',
                }
              }}
            />
          </div>

          {highlightedCode && (
            <div className="code-container">
              <div className="code-title">Preview</div>
              <pre className="hljs">
                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              </pre>
            </div>
          )}

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
                height: '3rem',
              },
            }}
          />
          
          <Button
            type="submit"
            radius="lg"
            className="bg-[#94d2bd] text-white hover:bg-[#7cb8a4] transition-colors duration-300 shadow-md hover:shadow-lg w-full"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddPostComponent;