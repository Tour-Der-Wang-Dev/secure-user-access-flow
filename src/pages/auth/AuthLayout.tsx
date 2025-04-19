
import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">WangSocial</h2>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8">
          {children}
        </div>
        <div className="text-center">
          <Link to="/" className="text-sm text-teal-600 hover:text-teal-500">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
