import { TextInput, Button, PasswordInput, Stack, Text } from "@mantine/core";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'


// Login Component (Modern Stylish JSX with #7ed957 and Framer Motion)
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f0f9eb]">
      <div
        
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100 transform transition-all hover:shadow-xl"
      >
        <Stack spacing="lg">
          <Text
            size="xl"
            weight={700}
            align="center"
            className="text-gray-800 bg-gradient-to-r from-[#7ed957] to-[#4caf50] bg-clip-text"
          >
            Welcome to CodeConnect
          </Text>
          <form>
            <Stack spacing="md">
              <TextInput
                label="Email"
                placeholder="you@codeconnect.com"
                withAsterisk
                variant="filled"
                classNames={{
                  input: "border-gray-200 focus:border-[#7ed957] transition-colors duration-300",
                  label: "text-gray-700 font-medium",
                }}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <IoEyeOutline size={20} color="#7ed957" /> : <IoEyeOffOutline size={20} color="#7ed957" />
                }
                withAsterisk
                variant="filled"
                classNames={{
                  input: "border-gray-200 focus:border-[#7ed957] transition-colors duration-300",
                  label: "text-gray-700 font-medium",
                }}
              />
              <Text size="xs" align="right" color="gray" className="cursor-pointer hover:text-[#7ed957]">
                Forgot Password?
              </Text>
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
            Don’t have an account?{" "}
            <Link to='/signup' className="text-[#7ed957] font-medium cursor-pointer hover:underline">
              Sign Up
            </Link>
          </Text>
        </Stack>
      </div>
    </div>
  );
};

export default Login;