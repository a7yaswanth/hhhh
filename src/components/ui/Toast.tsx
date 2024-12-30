import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 flex items-center bg-white border border-green-500 text-green-700 px-4 py-3 rounded-lg shadow-lg">
      <CheckCircle className="h-5 w-5 mr-2" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}