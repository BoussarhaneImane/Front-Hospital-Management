import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { DarkModeContext } from './DarkModeContext';
import './Appointments.css';

function Appointments() {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://back-hospital-app-2.onrender.com/api/appointments/listAppointment')
      .then(response => {
        console.log('Appointments data:', response.data); // Log the data for debugging
        setAppointments(response.data);
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://back-hospital-app-2.onrender.com/api/appointments/deleteAppointment/${id}`)
      .then(() => {
        const updatedAppointments = appointments.filter(appointment => appointment._id !== id);
        setAppointments(updatedAppointments);
      })
      .catch(error => console.error('Error deleting appointment:', error));
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientId && appointment.patientId.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={` p-12 w-full ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`} id="home3">
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('searchByPatientName')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-cyan-500 bg-white text-black'} rounded-3xl`}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {filteredAppointments.map(appointment => (
          <div
            key={appointment._id}
            className={`card shadow rounded-lg p-4 w-64`}
            style={{ backgroundColor: darkMode ? '#2d3748' : '#ffffff', color: darkMode ? '#e2e8f0' : '#2d3748' }}
          >
            <h2 className="text-xl font-bold mb-2 ">{appointment.patientId.name}</h2>
            <p><span className="font-semibold ">{t('doctor')}:</span> {appointment.doctor}</p>
            <p><span className="font-semibold ">{t('date')}:</span> {new Date(appointment.date).toLocaleString()}</p>
            <p><span className="font-semibold ">{t('purpose')}:</span> {appointment.purpose}</p>
            <div className="flex space-x-2 mt-4">
              <button onClick={() => handleDelete(appointment._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl">
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments;
