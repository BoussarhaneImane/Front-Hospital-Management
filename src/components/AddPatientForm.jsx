import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from './DarkModeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addpatient.css';

function AddPatientForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    diagnosis: '',
    illnessType: '',
    cim: '',
    arrivalTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!patient.name || !patient.age || !patient.gender || !patient.diagnosis || !patient.illnessType || !patient.cim) {
      toast.error(t('Oops! All fields are required'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post('https://back-hospital-app-2.onrender.com/api/patients/addpatient', patient);
      toast.success('Patient added successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
      setLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      setPatient({
        name: '',
        age: '',
        gender: '',
        diagnosis: '',
        illnessType: '',
        cim: '',
        arrivalTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(t('Error adding patient'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} py-8`} id='form-card1'>
        <form 
          onSubmit={handleSubmit} 
          className={`w-full max-w-xs mx-auto p-6 rounded-lg shadow-md 
            ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}
            sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl`}
          id='form-x'
        >
          <h2 className="text-2xl font-bold mb-6 text-center">{t('addPatient')}</h2>
          {errorMessage && <center><div className="mb-4 text-xl font-medium text-red-500">{errorMessage}</div></center>}
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('name')}</label>
            <input type="text" name="name" value={patient.name} onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('age')}</label>
            <input type="number" name="age" value={patient.age} onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('gender')}</label>
            <select name="gender" value={patient.gender} onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`}>
              <option value="" disabled>{t('*')}</option>
              <option value="Male">{t('Male')}</option>
              <option value="Female">{t('Female')}</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('diagnosis')}</label>
            <input type="text" name="diagnosis" value={patient.diagnosis} onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('illnessType')}</label>
            <input type="text" name="illnessType" value={patient.illnessType} onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-600' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('cim')}</label>
            <input type="text" name="cim" value={patient.cim} onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-600' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>
          <button type="submit" className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-300 hover:bg-gray-400 text-black font-medium' : 'bg-cyan-500 hover:bg-cyan-600 font-medium text-white'} transition duration-300`} disabled={loading}>
            {loading ? 'Loading...' : t('addPatient')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPatientForm;
