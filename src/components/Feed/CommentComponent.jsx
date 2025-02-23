
import { Card, Text, Button } from '@mantine/core';


const CommentComponent = () => {
  return (
    <Card shadow="sm" radius="md" className="p-3 mt-2 bg-gray-50 border border-gray-100">
      <Text size="sm" color="gray-700">
        comment
      </Text>
      <div className="flex space-x-2 mt-2 text-sm text-gray-600">
        <Button variant="subtle" className="hover:text-[#94d2bd]">
          up votes
        </Button>
        <Button variant="subtle" className="hover:text-[#94d2bd]">
          downvotes
        </Button>
      </div>
    </Card>
  );
};

export default CommentComponent;