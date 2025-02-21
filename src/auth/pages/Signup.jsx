import { TextInput, Button, PasswordInput, Group, Stack, Text } from "@mantine/core";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import {Link} from 'react-router-dom'


// StrongPassword Component (Modern Static Version with Logo Colors)
const StrongPassword = () => {
  return (
    <Stack spacing="xs">
      <PasswordInput
        label="Password"
        placeholder="Create a strong password"
        classNames={{
          input: "border-gray-200 focus:border-[#7ed957] transition-colors duration-300",
          label: "text-gray-700 font-medium",
        }}
        visibilityToggleIcon={({ reveal }) =>
          reveal ? <IoEyeOutline size={20} color="#7ed957" /> : <IoEyeOffOutline size={20} color="#7ed957" />
        }
        withAsterisk
        variant="filled"
      />
      <Text size="xs" color="gray" className="mt-1">
        Password requirements:
      </Text>
      {[
        { text: "At least 8 characters", type: "length" },
        { text: "Uppercase (A-Z)", type: "uppercase" },
        { text: "Lowercase (a-z)", type: "lowercase" },
        { text: "Numbers (0-9)", type: "number" },
        { text: "Special characters (!@#$%)", type: "symbol" },
      ].map((hint, index) => (
        <Group key={index} spacing="xs" className="text-gray-600">
          <RxCross1 size={14} />
          <Text size="xs">{hint.text}</Text>
        </Group>
      ))}
    </Stack>
  );
};

// Signup Component (Modern Stylish JSX with Framer Motion and Logo Colors)
const Signup = () => {
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
            Join CodeConnect
          </Text>
          <form>
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
              />
              <StrongPassword />
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
      </div>
    </div>
  );
};

export default Signup;