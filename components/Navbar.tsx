"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFlow } from '../hooks/useFlow';

const Navbar: React.FC = () => {
  const { saveFlow, error, clearError } = useFlow();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
        setTimeout(() => {
          clearError();
        }, 300); // match transition duration
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowError(false);
    }
  }, [error, clearError]);

  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 relative">
      <div className="text-xl font-bold text-gray-800">Flow Builder</div>
      <Button
        variant="outline"
        className="border-blue-600 text-blue-600 bg-white rounded-none hover:bg-blue-50 focus:ring-0 focus:outline-none font-normal px-6 py-2"
        onClick={saveFlow}
      >
        Save Changes
      </Button>
      <div
        className={`pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 transition-all duration-300 z-50
          ${showError && error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
      >
        {error && (
          <div className="bg-red-200 text-red-800 px-4 py-2 rounded shadow">
            {error}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 