import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DarkModeContext } from './DarkModeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Patients.css'; // Importez le fichier CSS personnalisé

function Patients() {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://back-hospital-app-2.onrender.com/api/patients/listpatient');
        setPatients(response.data);
        localStorage.setItem('patients', JSON.stringify(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://back-hospital-app-2.onrender.com/api/patients/deletepatient/${id}`);
      const updatedPatients = patients.filter(patient => patient._id !== id);
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      toast.success(t('patientDeletedSuccessfully'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    } catch (error) {
      console.error(error);
      toast.error(t('errorDeletingPatient'), {
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

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-12 w-full h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`} id="home2">
      <ToastContainer />
      <div className="mb-4">
        <input
          type="text"
          placeholder={t('searchByNameOrCIM')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`search-input w-full p-2 border ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-cyan-500 bg-white text-black'} rounded-3xl`}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {filteredPatients.map(patient => (
          <div
            key={patient._id}
            className={`card shadow rounded-lg p-4 `}
            style={{ backgroundColor: darkMode ? '#2d3748' : '#ffffff', color: darkMode ? '#e2e8f0' : '#2d3748' }}
          >
            <h2 className="text-xl font-bold mb-2">{patient.name}</h2>
            <p><span className="font-semibold">{t('age')}:</span> {patient.age}</p>
            <p><span className="font-semibold">{t('gender')}:</span> {patient.gender}</p>
            <p><span className="font-semibold">{t('typeOfIllness')}:</span> {patient.typeOfIllness}</p>
            <p><span className="font-semibold">{t('diagnosis')}:</span> {patient.diagnosis}</p>
            <p><span className="font-semibold">{t('cim')}:</span> {patient.cim}</p>
            <p><span className="font-semibold">{t('arrivalTime')}:</span> {new Date(patient.arrivalTime).toLocaleString()}</p>
            <div className="flex space-x-2 mt-4">
              <Link to={`/edit-patient/${patient._id}`} className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-3xl">
                {t('edit')}
              </Link>
              <button onClick={() => handleDelete(patient._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl">
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Patients;
