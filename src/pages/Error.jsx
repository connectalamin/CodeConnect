
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg mb-8">Sorry, you don&apos;t have permission to access this page.</p>
      <Link to="/">
        <Button color="blue">Return to Homepage</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;