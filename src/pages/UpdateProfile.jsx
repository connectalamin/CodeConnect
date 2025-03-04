import Navbar from '../components/Navbar';
import { Card, TextInput, FileInput, Button, Text, Stack, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import authService from '../services/authService';
import HashLoader from 'react-spinners/HashLoader';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { profile, refetchProfile } = useProfile();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      image: null,
      classId: '',
      session: '',
      batch: '',
      dept: '',
      university: '',
      occupation: '',
      expertise: [],
    },
  });

  useEffect(() => {
    if (profile?.user) {
      form.setValues({
        name: profile.user.name || '',
        image: null, // FileInput doesn’t pre-populate files
        classId: profile.user.classId || '',
        session: profile.user.session || '',
        batch: profile.user.batch || '',
        dept: profile.user.dept || '',
        university: profile.user.university || '',
        occupation: profile.user.occupation || '',
        expertise: profile.user.expertise || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const updateData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'image' && values[key]) {
          updateData.append('image', values[key]);
        } else if (key === 'expertise' && values[key].length > 0) {
          updateData.append('expertise', JSON.stringify(values[key]));
        } else if (values[key] && key !== 'expertise') {
          updateData.append(key, values[key]);
        }
      });

      console.log('FormData contents:');
      for (let [key, value] of updateData.entries()) {
        console.log(`${key}: ${value}`);
      }

      await authService.updateProfile(token, updateData);
      await refetchProfile();

      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleMultiSelectKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const inputValue = event.target.value.trim();
      if (inputValue && !form.values.expertise.includes(inputValue)) {
        form.setFieldValue('expertise', [...form.values.expertise, inputValue]);
        event.target.value = ''; // Clear the input after adding
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center py-16 px-4 max-w-5xl mx-auto bg-gradient-to-br from-[#f0f9eb] to-[#d4e8d9] text-black relative overflow-hidden">
        <div className="relative z-10 w-full md:w-1/2">
          <Card
            shadow="lg"
            radius="xl"
            className="p-8 bg-gradient-to-br from-white to-[#f0f9eb] border border-gray-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)]"
          >
            <Text
              size="xl"
              weight={800}
              className="mb-6 text-gray-800 bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900"
            >
              Edit Your Profile
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack spacing="lg">
                <FileInput
                  label={<Text size="sm" color="gray.7" weight={600}>Profile Image</Text>}
                  placeholder="Upload an image"
                  accept="image/*"
                  radius="md"
                  {...form.getInputProps('image')}
                  className="text-gray-600"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(240, 249, 235, 0.5)',
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#94d2bd' },
                    },
                    placeholder: { color: '#718096' },
                  }}
                />
                <TextInput
                  label={<Text size="sm" color="gray.7" weight={600}>Name</Text>}
                  placeholder="Your full name"
                  radius="md"
                  {...form.getInputProps('name')}
                  className="text-gray-600"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(240, 249, 235, 0.5)',
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#94d2bd' },
                    },
                  }}
                />
                <TextInput
                  label={<Text size="sm" color="gray.7" weight={600}>Email</Text>}
                  placeholder="Your email"
                  radius="md"
                  value={profile?.user?.email || ''}
                  disabled
                  className="text-gray-500"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(240, 249, 235, 0.2)',
                      borderColor: '#e2e8f0',
                      cursor: 'not-allowed',
                    },
                  }}
                />
                <TextInput
                  label={<Text size="sm" color="gray.7" weight={600}>Class ID</Text>}
                  placeholder="e.g., CSE-2023"
                  radius="md"
                  {...form.getInputProps('classId')}
                  className="text-gray-600"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(240, 249, 235, 0.5)',
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#94d2bd' },
                    },
                  }}
                />
                <TextInput
                  label={<Text size="sm" color="gray.7" weight={600}>Session</Text>}
                  placeholder="e.g., 2020-2025"
                  radius="md"
                  {...form.getInputProps('session')}
                  className="text-gray-600"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(240, 249, 235, 0.5)',
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#94d2bd' },
                    },
                  }}
                />
                <TextInput
                  label={<Text size="sm" color="gray.7" weight={600}>Batch</Text>}
                  placeholder="e.g., 2023"
                  radius="md"
                  {...form.getInputProps('batch')}
                  className="text-gray-600"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(240, 249, 235, 0.5)',
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#94d2bd' },
                    },
                  }}
                />
                <TextInput
                  label={<Text size="sm" color="gray.7" weight={600}>Department</Text>}
                  placeholder="e.g., Computer Science & Engineering"
                  radius="md"
                  {...form.getInputProps('dept')}
                  className="text-gray-600"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(240, 249, 235, 0.5)',
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#94d2bd' },
                    },
                  }}
                />
                <TextInput
                  label={<Text size="sm" color="gray.7" weight={600}>University</Text>}
                  placeholder="e.g., Comilla University"
                  radius="md"
                  {...form.getInputProps('university')}
                  className="text-gray-600"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(240, 249, 235, 0.5)',
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#94d2bd' },
                    },
                  }}
                />
                <TextInput
                  label={<Text size="sm" color="gray.7" weight={600}>Occupation</Text>}
                  placeholder="e.g., Software Developer"
                  radius="md"
                  {...form.getInputProps('occupation')}
                  className="text-gray-600"
                  styles={{
                    input: {
                      backgroundColor: 'rgba(240, 249, 235, 0.5)',
                      borderColor: '#e2e8f0',
                      '&:hover': { borderColor: '#94d2bd' },
                    },
                  }}
                />
              <MultiSelect
  label={<Text size="sm" color="gray.7" weight={600}>Expertise</Text>}
  placeholder="Add skills (e.g., React, Node.js) - Use Tab to add"
  searchable
  creatable="true"
  radius="md"
  {...form.getInputProps('expertise')}
  onKeyDown={handleMultiSelectKeyDown}
  className="text-gray-600"
  styles={{
    input: {
      backgroundColor: 'rgba(240, 249, 235, 0.5)',
      borderColor: '#e2e8f0',
      '&:hover': { borderColor: '#94d2bd' },
    },
    dropdown: {
      backgroundColor: '#fff',
      borderColor: '#e2e8f0',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    item: {
      '&:hover': { backgroundColor: '#f0f9eb', color: '#2d3748' },
    },
  }}
/>
                <Button
                  type="submit"
                  fullWidth
                  radius="md"
                  disabled={loading}
                  className="bg-gradient-to-br from-white to-[#f0f9eb] text-gray-800 py-3 transition-all duration-300 shadow-md hover:shadow-lg hover:bg-gradient-to-br hover:from-[#f0f9eb] hover:to-white border border-gray-300/50 transform hover:-translate-y-0.5"
                >
                  {loading ? <HashLoader size={24} color="#94d2bd" /> : 'Save Changes'}
                </Button>
              </Stack>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
};

export default UpdateProfile;