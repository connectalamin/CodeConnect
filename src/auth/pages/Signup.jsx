import { TextInput, Button, Stack, Text } from "@mantine/core";
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import StrongPassword from "../../components/StrongPassword";
import  authService  from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import HashLoader from "react-spinners/HashLoader";
import { toast } from 'react-hot-toast';

const Signup = () => {
 const [user,setUser] = useState ({
    name:'',
    email:'',
    password:''
  })
 const [error, setError] = useState('');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name,value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add validation
    if (!user.name || !user.email || !user.password) {
      toast.error('Please fill in all fields');
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    try {
      setError('');
      setLoading(true);
      await authService.register(user);
      // After registration, login with credentials
      await login({
        email: user.email,
        password: user.password
      });
      toast.success('Registration successful!');
      navigate('/feed'); // Navigate after successful login
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error(error.response.data.error || error.response.data.message);
            break;
          case 409:
            toast.error('Email already exists. Please use a different email.');
            break;
          case 422:
            toast.error('Please fill in all required fields.');
            break;
          default:
            toast.error('Registration failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f0f9eb]">
     {loading ?<HashLoader
       color="#7ec226"
       loading
       speedMultiplier={2}
     /> : <div
        
     className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100 transform transition-all hover:shadow-xl"
   >
     <Stack spacing="lg">
       <Text
         size="xl"
         weight={700}
         align="center"
         className="text-gray-800 bg-gradient-to-r from-[#7ed957] to-[#4caf50] bg-clip-text"
       >
         Join CodeConnect
       </Text>
       {error && <p className="text-red-500 mb-4">{error}</p>}
       <form onSubmit={handleSubmit}>
         <Stack spacing="md">
           <TextInput
             label="Name"
             placeholder="Your full name"
             withAsterisk
             variant="filled"
             classNames={{
               input: "border-gray-200 focus:border-[#7ed957] transition-colors duration-300",
               label: "text-gray-700 font-medium",
             }}
             name="name"
             value={user.name}
             onChange={handleChange}
           />
           <TextInput
             label="Email"
             placeholder="you@codeconnect.com"
             withAsterisk
             variant="filled"
             classNames={{
               input: "border-gray-200 focus:border-[#7ed957] transition-colors duration-300",
               label: "text-gray-700 font-medium",
             }}
             name="email"
             value={user.email}
             onChange={handleChange}
           />
           <StrongPassword value={user.password}
   onChange={handleChange}  />
           <Button
             type="submit"
             fullWidth
             className="bg-[#7ed957] hover:bg-[#6cc149] transition-all duration-300 transform hover:scale-105"
             radius="md"
           >
             Sign Up
           </Button>
         </Stack>
       </form>
       <Text size="sm" align="center" color="gray">
         Already a member?{" "}
         <Link to='/login' className="text-[#61d82e] font-medium cursor-pointer hover:underline">
           Log In
         </Link>
       </Text>
     </Stack>
   </div>} 
    </div>
  );
};

export default Signup;