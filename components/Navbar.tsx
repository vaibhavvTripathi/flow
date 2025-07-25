import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
      <div className="text-xl font-bold text-gray-800">Flow Builder</div>
      <Button
        variant="outline"
        className="border-blue-600 text-blue-600 bg-white rounded-none hover:bg-blue-50 focus:ring-0 focus:outline-none font-normal px-6 py-2"
      >
        Save Changes
      </Button>
    </nav>
  );
};

export default Navbar; 