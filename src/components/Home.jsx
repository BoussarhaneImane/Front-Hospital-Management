import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaUserPlus, FaCalendarPlus, FaUserShield } from 'react-icons/fa';
import { DarkModeContext } from './DarkModeContext';
import img1 from './hos.png';
import './Home.css';
import './Sidebar.css';

function Home() {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
  
    <div className={` min-h-screen  ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} p-12 `} id="home">
      <div className={`flex flex-wrap items-center justify-between ${darkMode ? 'bg-gray-700 text-white' : 'bg-cyan-500 text-white'} p-4 rounded-md shadow-md sous-bar mx-auto`}>
        <div className="flex items-center space-x-2">
          <FaUserShield size={24} className="mr-2" />
          <span className="font-medium">{username || 'Admin Name'}</span>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src={img1}
            alt="Profile"
            className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-white"
          />
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} w-full lg:w-3/4 xl:w-2/3 mx-auto shadow-lg rounded-lg p-6 md:p-12 mt-6`}>
        <center>
          <h1 className={`text-2xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{t('welcome')}</h1>
        </center>
        <p className="text-sm mb-6 text-center font-medium text-gray-500">
          {t('intro')}
        </p>
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mt-6">
          <Link to="/patients" className="flex items-center bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            <FaUser className="mr-2" /> {t('viewPatients')}
          </Link>
          <Link to="/appointments" className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <FaCalendarAlt className="mr-2" /> {t('viewAppointments')}
          </Link>
          <Link to="/add-patient" className="flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            <FaUserPlus className="mr-2" /> {t('addPatient')}
          </Link>
          <Link to="/add-appointment" className="flex items-center bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ">
            <FaCalendarPlus className="mr-2" /> {t('addAppointment')}
          </Link>
        </div>
      </div>
    </div>
    
  );
}

export default Home;
