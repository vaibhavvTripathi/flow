import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification with a slight delay for smooth entrance
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Hide notification after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation to complete before calling onClose
      setTimeout(() => {
        onClose();
      }, 300);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose, duration]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon =
    type === 'success' ? (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-4 rounded-lg shadow-lg text-white ${bgColor} min-w-80 max-w-md transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-2 opacity-0 scale-95'
      }`}
    >
      <div className="flex-shrink-0 mr-3">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 ml-3 text-white hover:text-gray-200 focus:outline-none transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
