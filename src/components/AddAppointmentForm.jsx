import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { DarkModeContext } from './DarkModeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addapp.css';

function AddAppointmentForm() {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(false);

  const getCurrentDateTime = () => {
    const date = new Date();
    return date.toISOString().slice(0, 16);
  };

  const [appointment, setAppointment] = useState({
    patientCIM: '',
    doctor: '',
    date: getCurrentDateTime(),
    purpose: ''
  });

  useEffect(() => {
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      date: getCurrentDateTime()
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointment.patientCIM || !appointment.doctor || !appointment.date || !appointment.purpose) {
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
      return;
    }

    try {
      const response = await axios.get(`https://back-hospital-app-2.onrender.com/api/patients/checkCIM/${appointment.patientCIM}`);
      if (response.data.exists) {
        await axios.post('https://back-hospital-app-2.onrender.com/api/appointments/addAppointment', appointment);
        toast.success('Appointment added successfully', {
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
        setAppointment({
          patientCIM: '',
          doctor: '',
          date: getCurrentDateTime(),
          purpose: ''
        });
      } else {
        toast.error(t('Patient does not exist'), {
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
    } catch (error) {
      console.error('Error adding appointment:', error);
      toast.error(t('Error adding appointment'), {
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
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} py-8
        `}id='form-card2'>
        <form 
          onSubmit={handleSubmit} 
          className={`w-full max-w-xs mx-auto p-6 rounded-lg shadow-md 
            ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'}
           
            sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl`
          }  
          id='form-x2'
        >
          <h2 className="text-2xl font-bold mb-6 text-center">{t('addAppointment')}</h2>
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('patientCIM')}</label>
            <input type="text" name="patientCIM" onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500  focus:ring-2 focus:ring-cyan-500'}`} />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('doctor')}</label>
            <input type="text" name="doctor" onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500  focus:ring-2 focus:ring-cyan-500'}`} />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('date')}</label>
            <input type="datetime-local" name="date" value={appointment.date} onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500  focus:ring-2 focus:ring-cyan-500'}`} />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">{t('purpose')}</label>
            <input type="text" name="purpose" onChange={handleChange} className={`w-full text-lg font-normal p-3 border rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-2 focus:ring-cyan-500' : 'bg-white border-cyan-500  focus:ring-2 focus:ring-cyan-500'}`} />
          </div>
          <button type="submit" className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-300 hover:bg-gray-400 text-black font-medium' : 'bg-cyan-500 hover:bg-cyan-600 font-medium text-white'} transition duration-300`} disabled={loading}>
            {loading ? 'Loading...' : t('addAppointment')}
          </button>
         
        </form>
      </div>
    </div>
  );
}

export default AddAppointmentForm;
