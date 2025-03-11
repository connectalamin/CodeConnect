// filepath: h:\Academic\CodeConnect\CodeConnect_Client\src\auth\pages\Login.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { TextInput, Button, PasswordInput, Stack, Text } from '@mantine/core';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      setError('');
      setLoading(true);
      const user = await login(credentials);
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/feed');
      }
      toast.success('Login successful!');
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error('Invalid email or password');
            break;
          case 404:
            toast.error('Account not found');
            break;
          case 500:
            toast.error('Server error. Please try again later');
            break;
          default:
            toast.error(error.response.data.message || 'Login failed. Please try again');
        }
      } else if (error.request) {
        toast.error('Unable to connect to server. Please check your internet connection');
      } else {
        toast.error('An unexpected error occurred. Please try again');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f0f9eb]">
      {loading ? (
        <HashLoader color="#7ec226" loading speedMultiplier={2} />
      ) : (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100 transform transition-all hover:shadow-xl">
          <Stack spacing="lg">
            <Text
              size="xl"
              weight={700}
              align="center"
              className="text-gray-800 bg-gradient-to-r from-[#7ed957] to-[#4caf50] bg-clip-text"
            >
              Welcome to CodeConnect
            </Text>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <Stack spacing="md">
                <TextInput
                  label="Email"
                  placeholder="you@codeconnect.com"
                  withAsterisk
                  variant="filled"
                  value={credentials.email}
                  type="email"
                  name="email"
                  onChange={handleChange}
                  classNames={{
                    input: 'border-gray-200 focus:border-[#7ed957] transition-colors duration-300',
                    label: 'text-gray-700 font-medium',
                  }}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  visibilityToggleIcon={({ reveal }) =>
                    reveal ? <IoEyeOutline size={20} color="#7ed957" /> : <IoEyeOffOutline size={20} color="#7ed957" />
                  }
                  withAsterisk
                  variant="filled"
                  classNames={{
                    input: 'border-gray-200 focus:border-[#7ed957] transition-colors duration-300',
                    label: 'text-gray-700 font-medium',
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  className="bg-[#7ed957] hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105"
                  radius="md"
                >
                  Log In
                </Button>
              </Stack>
            </form>
            <Text size="sm" align="center" color="gray">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-[#7ed957] font-medium cursor-pointer hover:underline">
                Sign Up
              </Link>
            </Text>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default Login;