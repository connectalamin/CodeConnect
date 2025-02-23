import { PasswordInput, Group, Stack, Text } from "@mantine/core";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";

const StrongPassword = ({ value, onChange }) => {
  // Password validation functions matching backend regex
  const requirements = [
    { 
      text: "At least 8 characters", 
      validate: (v) => v.length >= 8 
    },
    { 
      text: "Uppercase (A-Z)", 
      validate: (v) => /[A-Z]/.test(v) 
    },
    { 
      text: "Lowercase (a-z)", 
      validate: (v) => /[a-z]/.test(v) 
    },
    { 
      text: "Numbers (0-9)", 
      validate: (v) => /\d/.test(v) 
    },
    { 
      text: "Special characters (!@#$%^&*)", 
      validate: (v) => /[\W_]/.test(v) 
    },
  ];

  // Check overall password validity
  const isPasswordValid = (password) => {
    return requirements.every(req => req.validate(password));
  };

  return (
    <Stack spacing="xs">
      <PasswordInput
        label="Password"
        placeholder="Create a strong password"
        classNames={{
          input: `border-gray-200 focus:border-[#7ed957] transition-colors duration-300 
                 ${isPasswordValid(value) ? 'border-green-500' : ''}`,
          label: "text-gray-700 font-medium",
        }}
        name="password"
        value={value}
        onChange={onChange}
        visibilityToggleIcon={({ reveal }) =>
          reveal ? (
            <IoEyeOutline size={20} color="#7ed957" />
          ) : (
            <IoEyeOffOutline size={20} color="#7ed957" />
          )
        }
        withAsterisk
        variant="filled"
      />
      <Text size="xs" color="gray" className="mt-1">
        Password requirements:
      </Text>
      {requirements.map((requirement, index) => {
        const isMet = requirement.validate(value);
        return (
          <Group key={index} spacing="xs" className="text-gray-600">
            {isMet ? (
              <BsCheckLg size={14} className="text-green-500" />
            ) : (
              <RxCross1 size={14} className="text-red-500" />
            )}
            <Text
              size="xs"
              className={isMet ? "text-green-500" : "text-red-500"}
            >
              {requirement.text}
            </Text>
          </Group>
        );
      })}
    </Stack>
  );
};

export default StrongPassword;