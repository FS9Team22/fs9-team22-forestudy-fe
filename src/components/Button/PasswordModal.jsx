import React from 'react';

export default function PasswordModal({ isOpen, onClose, children, className = '' }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-3xl shadow-xl ${className}`}
        style={{ width: '40.5rem', height: '23rem' }}
      >
        {children}
      </div>
    </div>
  );
}