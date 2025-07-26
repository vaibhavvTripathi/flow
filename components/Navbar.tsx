'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useFlow } from '../hooks/useFlow';
import Notification from './Notification';

const Navbar: React.FC = () => {
  const { saveFlow, error, success, clearError, clearSuccess } = useFlow();

  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 relative">
      <div className="text-xl font-bold text-gray-800">Flow Builder</div>
      <Button
        variant="outline"
        className="border-blue-600 text-blue-600 bg-white rounded-none hover:text-blue-800 focus:ring-2 focus:ring-blue-300 focus:outline-none font-normal px-6 py-2 transition-colors duration-200"
        onClick={saveFlow}
      >
        Save Changes
      </Button>
      {/* Notifications */}
      {error && (
        <Notification
          message={error}
          type="error"
          onClose={clearError}
        />
      )}
      {success && (
        <Notification
          message={success}
          type="success"
          onClose={clearSuccess}
        />
      )}
    </nav>
  );
};

export default Navbar;
