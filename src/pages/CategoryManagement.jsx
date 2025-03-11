import { useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
  TextInput,
  Table,
  ActionIcon,
  Loader,
  Modal,
} from "@mantine/core";
import toast from 'react-hot-toast';
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { useCategoryManagement } from "../hooks/useCategoryManagement";

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

const EditIcon = () => (
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
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 mr-2 hover:scale-110 transition-transform duration-200"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);

const CategoryManagement = () => {
  const { token } = useAuth();
  const {
    categories,
    isLoading,
    isError,
    error,
    newCategory,
    setNewCategory,
    editingCategory,
    handleAddCategory,
    handleEdit,
    handleUpdate,
    handleDelete,
    isMutating,
    // Modal props
    deleteModalOpen,
    categoryToDelete,
    confirmDelete,
    cancelDelete,
  } = useCategoryManagement(token);
  
  useEffect(() => {
    if (isError && error) {
      toast.error(error);
    }
  }, [isError, error]);

  return (
    <>
      <Navbar />
      <Container fluid className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-900 p-4 md:p-8">
        <Title
          order={1}
          className="text-3xl md:text-4xl font-extrabold text-green-400 mb-6 md:mb-8 tracking-tight animate-fadeIn"
        >
          Category Management
        </Title>

        {isLoading ? (
          <Card className="bg-white rounded-2xl p-8 shadow-lg flex items-center justify-center h-64">
            <Loader color="indigo" size="lg" />
          </Card>
        ) : isError ? (
          <Card className="bg-white rounded-2xl p-8 shadow-lg">
            <Text color="red">Error loading categories: {error}</Text>
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
              Manage Categories
            </Text>
            <Stack spacing="lg">
              <Group position="apart" className="flex flex-col md:flex-row gap-4">
                <TextInput
                  placeholder="Category Name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 bg-gray-50 text-gray-800 placeholder-gray-400 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  variant="filled"
                />
                <Button
                  onClick={() => editingCategory ? handleUpdate() : handleAddCategory()}
                  className="bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-md w-full md:w-auto"
                  leftIcon={<PlusIcon />}
                  disabled={!newCategory.trim() || isMutating}
                  loading={isMutating}
                >
                  {editingCategory ? "Update Category" : "Add Category"}
                </Button>
              </Group>
              <Table className="bg-gray-50 rounded-xl">
                <thead>
                  <tr className="bg-indigo-50 text-green-700">
                    <th className="text-left p-4 font-semibold">Name</th>
                    <th className="text-right p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-t border-gray-200 hover:bg-indigo-50 transition-colors duration-200"
                    >
                      <td className="p-4 text-gray-800 font-medium">
                        {category.name}
                      </td>
                      <td className="p-4 pr-2 flex justify-end">
                        <Group spacing="xs" position="right" className="ml-auto">
                          <ActionIcon
                            color="blue"
                            variant="filled"
                            size="md"
                            className="hover:bg-green-600 hover:scale-105 transition-all duration-200"
                            onClick={() => handleEdit(category)}
                            disabled={isMutating}
                          >
                            <EditIcon />
                          </ActionIcon>
                          <ActionIcon
                            color="red"
                            variant="filled"
                            size="md"
                            className="hover:bg-red-600 hover:scale-105 transition-all duration-200"
                            onClick={() => handleDelete(category.id)}
                            disabled={isMutating}
                          >
                            <TrashIcon />
                          </ActionIcon>
                        </Group>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Stack>
          </Card>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          opened={deleteModalOpen}
          onClose={cancelDelete}
          title={<Text size="lg" weight={700} className="text-red-500">Confirm Deletion</Text>}
          centered
        >
          <Text size="md" className="mb-4">
            Are you sure you want to delete the category{" "}
            <span className="font-semibold">{categoryToDelete?.name}</span>?
            <br /><br />
            This action cannot be undone.
          </Text>
          <Group position="right" spacing="md">
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button 
              color="red" 
              onClick={confirmDelete}
              loading={isMutating}
            >
              Delete
            </Button>
          </Group>
        </Modal>
      </Container>
    </>
  );
};

export default CategoryManagement;