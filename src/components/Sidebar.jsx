import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaUser, FaCalendarAlt, FaUserPlus, FaCalendarPlus, FaFileMedical, FaBriefcaseMedical, FaUsers, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import { DarkModeContext } from './DarkModeContext';
import { motion } from 'framer-motion';
import img2 from './hos.png';
import './Sidebar.css';

function Sidebar() {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    const sousBar = document.querySelector('.sous-bar');
    if (sousBar) {
      sousBar.classList.toggle('sidebar-open', isOpen);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}
      
      <div className={`h-full fixed top-0 left-0 flex flex-col p-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-cyan-500 text-white'} ${isOpen ? 'w-64' : 'w-12'} lg:w-64 xl:w-64 transition-all duration-300 ease-in-out boxi`} >
        <div className="relative flex items-center mb-4">
          <button 
            onClick={toggleSidebar} 
            className={`text-xl mr-4 focus:outline-none block lg:hidden open-button ${isOpen ? 'hidden' : 'block'}`}
          >
            <FaBars />
          </button>
          {isOpen && (
            <button 
              onClick={toggleSidebar} 
              className="text-xl lg:hidden focus:outline-none close-button"
            >
              <FaTimes />
            </button>
          )}
          <Link to='/' className="flex items-center">
            <div className={`text-2xl font-bold flex items-center ${isOpen ? 'opacity-100' : 'opacity-0'} lg:opacity-100`}>
              <img
                src={img2}
                alt="Profile"
                className={`w-12 h-12 rounded-full border-2 border-white ${isOpen ? 'mr-2' : 'mr-0'}`}
              />
              <span className={`ml-1 font-medium ${isOpen ? 'block' : 'hidden lg:block'}`}>Our Hospital</span>
            </div>
          </Link>
        </div>
        <ul className={`flex-1 mt-6 space-y-2 ${isOpen ? 'block' : 'hidden'} lg:flex lg:flex-col lg:space-y-2`}>
          {[
            { to: "/patients", icon: <FaUser />, text: t('patients') },
            { to: "/appointments", icon: <FaCalendarAlt />, text: t('appointments') },
            { to: "/add-patient", icon: <FaUserPlus />, text: t('addPatient') },
            { to: "/add-appointment", icon: <FaCalendarPlus />, text: t('addAppointment') },
            { to: "/", icon: <FaFileMedical />, text: t('medicalRecords') },
            { to: "/", icon: <FaBriefcaseMedical />, text: t('medicalStaff') },
            { to: "/", icon: <FaUsers />, text: t('departments') },
            { to: "/", icon: <FaCog />, text: t('settings') },
          ].map(({ to, icon, text }, index) => (
            <motion.li
              key={index}
              className={`flex items-center py-2 border-b border-white ${isOpen ? 'flex-row' : 'flex-col'} lg:flex-row lg:space-x-2`}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {icon}
              <Link to={to} className={`ml-2 font-medium hover:text-white ${isOpen ? 'block' : 'lg:block'}`}>
                {text}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
