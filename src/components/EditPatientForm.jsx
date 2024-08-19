import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { DarkModeContext } from './DarkModeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './editpatient.css'; // Consolidated CSS file

function EditPatientForm() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:mm (without seconds)
  };

  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    typeOfIllness: '',
    diagnosis: '',
    cim: '',
    arrivalTime: getCurrentDateTime() // Set to current date and time initially
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log("Fetching patient with ID:", id);
    axios.get('https://back-hospital-app-2.onrender.com/api/patients/searshpatient/' + id)
      .then(response => {
        setPatient({ ...response.data, arrivalTime: response.data.arrivalTime || getCurrentDateTime() });
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id, t, darkMode]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://back-hospital-app-2.onrender.com/api/patients/editpatient/${id}`, patient)
      .then(() => {
        toast.success(t('Patient updated successfully'), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
        });
        setTimeout(() => navigate('/patients'), 2000);
      })
      .catch(error => {
        console.error(error);
        toast.error(t('Error updating patient'), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
        });
      });
  };

  if (loading) {
    return  <div className="flex items-center justify-center ml-64">
    <FaSpinner className="animate-spin text-5xl text-blue-500 mr-4" />
    <p className="text-3xl font-medium text-gray-500">{t('loading')}</p>
  </div>;
  }

  return (
    <div>
      <ToastContainer />
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} py-8`} id='form-card3'>
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-xs mx-auto p-6 rounded-lg shadow-md 
          ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}
       sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl  `}
          id="form-x3"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">{t('editPatient')}</h2>
          {errorMessage && <center><div className="mb-4 text-xl font-medium text-red-500">{errorMessage}</div></center>}

          <div className="mb-4">
            <label className="block font-bold mb-2">{t('name')}</label>
            <input type="text" name="name" value={patient.name} onChange={handleChange}
              className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">{t('age')}</label>
            <input type="number" name="age" value={patient.age} onChange={handleChange}
              className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">{t('gender')}</label>
            <input type="text" name="gender" value={patient.gender} onChange={handleChange}
              className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">{t('typeOfIllness')}</label>
            <input type="text" name="typeOfIllness" value={patient.typeOfIllness} onChange={handleChange}
              className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">{t('diagnosis')}</label>
            <input type="text" name="diagnosis" value={patient.diagnosis} onChange={handleChange}
              className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">{t('cim')}</label>
            <input type="text" name="cim" value={patient.cim} onChange={handleChange}
              className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">{t('arrivalTime')}</label>
            <input type="datetime-local" name="arrivalTime" value={patient.arrivalTime} onChange={handleChange}
              className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500 focus:ring-2 focus:ring-cyan-500'}`} />
          </div>

          <button type="submit" className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-300 hover:bg-gray-400 text-black font-medium' : 'bg-cyan-500 hover:bg-cyan-600 font-medium text-white'} transition duration-300`}>
            {t('save')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPatientForm;
