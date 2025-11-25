import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

const SignIn: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <AuthModal 
        isOpen={showModal}
        onClose={handleClose}
        initialMode="signin"
      />
    </div>
  );
};

export default SignIn;
