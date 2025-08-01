import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Optional: to redirect after logout

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/login'); // Optional: redirect after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button className="px-5 py-2 font-medium tracking-wide transition-all duration-300 ease-in-out bg-red-600 hover:bg-white hover:text-red-600 text-white rounded-full shadow hover:shadow-lg"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
