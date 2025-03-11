import { useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Group,
  Card,
  Table,
  ActionIcon,
  Badge,
  Loader,
} from "@mantine/core";
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useUserManagement } from "../hooks/useUserManagement";

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 hover:scale-110 transition-transform duration-200"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const UserManagement = () => {
  const { token } = useAuth();
  const { users, isLoading, isError, error, handleDelete, isDeleting } = useUserManagement(token);

  useEffect(() => {
    if (isError && error) {
      toast.error(error);
    }
  }, [isError, error]);

  return (
    <>
      <Navbar />
      <Container
        fluid
        className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-900 p-4 md:p-8"
      >
        <Title
          order={1}
          className="text-3xl md:text-4xl font-extrabold text-green-400 mb-6 md:mb-8 tracking-tight animate-fadeIn"
        >
          User Management
        </Title>

        {isLoading ? (
          <Card className="bg-white rounded-2xl p-8 shadow-lg flex items-center justify-center h-64">
            <Loader color="indigo" size="lg" />
          </Card>
        ) : isError ? (
          <Card className="bg-white rounded-2xl p-8 shadow-lg">
            <Text color="red">Error loading users: {error}</Text>
          </Card>
        ) : (
          <Card
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            withBorder
          >
            <Text
              size="xl"
              weight={700}
              className="mb-6 text-gray-800 tracking-wide"
            >
              Manage Users
            </Text>
            <Table className="bg-gray-50 rounded-xl">
              <thead>
                <tr className="bg-indigo-50 text-green-700">
                  <th className="text-left p-4 font-semibold">Name</th>
                  <th className="text-left p-4 font-semibold">Email</th>
                  <th className="text-left p-4 font-semibold">Role</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-200 hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <td className="p-4 text-gray-800 font-medium">
                      {user.name}
                    </td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      <Badge
                        className="px-3 py-1 rounded-full font-semibold tracking-wide"
                        color={user.role === "Admin" ? "indigo" : "gray"}
                        variant="filled"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Group spacing="xs">
                        <ActionIcon
                          color="red"
                          variant="filled"
                          size="md"
                          className="hover:bg-red-600 hover:scale-105 transition-all duration-200"
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting}
                          loading={isDeleting}
                        >
                          <TrashIcon />
                        </ActionIcon>
                      </Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
      </Container>
    </>
  );
};

export default UserManagement;