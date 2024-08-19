import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { DarkModeContext } from './DarkModeContext';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://back-hospital-app-2.onrender.com/api/auth/authenticate', { username, password });
      setLoading(false);
      if (response.data.success) {
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);
        localStorage.setItem('username', response.data.username);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-5xl text-blue-500 mr-4" />
        <p className="text-3xl font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center  h-full ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-600'}`} id="homeY">
      <div className={`form-container ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-600'}`}>Authentification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              required
            />
            <div
              className={`absolute inset-y-0 right-0 pr-3 mt-7 flex items-center cursor-pointer ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button type="submit" className={`w-full ${darkMode ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-cyan-500 hover:bg-cyan-600'} text-white font-bold py-2 px-4 rounded-lg`}>
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginForm;
