import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DarkModeContext } from './DarkModeContext';

function EditAppointmentForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { darkMode } = useContext(DarkModeContext);

  const [appointment, setAppointment] = useState({
    patientId: '',
    doctor: '',
    date: '',
    purpose: ''
  });

  useEffect(() => {
    axios.get(`https://back-hospital-app-2.onrender.com/api/appointments/searshAppointment/${id}`)
      .then(response => setAppointment(response.data))
      .catch(error => console.error('Error fetching appointment:', error));
  }, [id]);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://back-hospital-app-2.onrender.com/api/appointments/editAppointment/${id}`, appointment)
      .then(response => {
        console.log('Appointment updated:', response.data);
        navigate('/appointments');
      })
      .catch(error => console.error('Error updating appointment:', error));
  };

  return (
    <div className={`p-4 ml-64 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} h-screen`}>
      <form onSubmit={handleSubmit} className={`max-w-md mx-auto p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} id='form-card'>
        <h2 className="text-2xl font-bold mb-6 text-center">{t('editAppointment')}</h2>
        <div className="mb-4">
          <label className="block font-bold mb-2">{t('patientId')}</label>
          <input 
            type="text" 
            name="patientId" 
            value={appointment.patientId} 
            onChange={handleChange} 
            className={`w-full p-3 border rounded-3xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} 
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">{t('doctor')}</label>
          <input 
            type="text" 
            name="doctor" 
            value={appointment.doctor} 
            onChange={handleChange} 
            className={`w-full p-3 border rounded-3xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} 
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">{t('date')}</label>
          <input 
            type="datetime-local" 
            name="date" 
            value={appointment.date} 
            onChange={handleChange} 
            className={`w-full p-3 border rounded-3xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} 
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">{t('purpose')}</label>
          <input 
            type="text" 
            name="purpose" 
            value={appointment.purpose} 
            onChange={handleChange} 
            className={`w-full p-3 border rounded-3xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`} 
          />
        </div>
        <button 
          type="submit" 
          className={`w-full p-3 rounded-3xl ${darkMode ? 'bg-gray-300 hover:bg-gray-400 text-black' : 'bg-blue-800 hover:bg-blue-700 text-white'}`}
        >
          {t('save')}
        </button>
      </form>
    </div>
  );
}

export default EditAppointmentForm;
