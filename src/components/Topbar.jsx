import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from './DarkModeContext';
import './Topbar.css';
import i18n from '../i18n.jsx';

function Topbar() {
  const { t } = useTranslation();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      console.log(`Language changed to ${lng}`);
    }).catch((error) => {
      console.error("Error changing language: ", error);
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className={`topbar-container p-4 flex flex-row items-center justify-between ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-gray-800'} w-full`}>
      <div className="flex items-center flex-grow text-center">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          {/* Your title or logo */}
        </h1>
      </div>

      <div className="topbar-buttons flex flex-row gap-4 items-center ml-12 lg:mr-[2rem] xl:mr-[12rem]">
        <button
          onClick={() => changeLanguage('fr')}
          className={`px-4 py-2 ${darkMode ? 'bg-gray-800 text-cyan-500' : 'bg-white hover:bg-gray-100 text-cyan-500'} font-medium rounded-3xl transition-colors`}
        >
          FR
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className={`px-4 py-2 ${darkMode ? 'bg-gray-800 text-cyan-500' : 'bg-white hover:bg-gray-100 text-cyan-500'} font-medium rounded-3xl transition-colors`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage('de')}
          className={`px-4 py-2 ${darkMode ? 'bg-gray-800 text-cyan-500' : 'bg-white hover:bg-gray-100 text-cyan-500'} font-medium rounded-3xl transition-colors`}
        >
          DE
        </button>
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-3xl transition-colors flex items-center justify-center ${darkMode ? 'bg-white text-yellow-500' : 'bg-white text-gray-800'}`}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-cyan-500 hover:bg-red-700 text-white font-medium rounded-3xl transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;
