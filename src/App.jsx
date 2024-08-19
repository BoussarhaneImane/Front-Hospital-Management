import React, { useState, useEffect, useContext } from 'react'; // Assurez-vous que useEffect est importé
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import AddPatientForm from './components/AddPatientForm';
import AddAppointmentForm from './components/AddAppointmentForm';
import EditPatientForm from './components/EditPatientForm';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { DarkModeProvider, DarkModeContext } from './components/DarkModeContext'; // Import correct
import EditAppointmentForm from './components/EditAppointmentForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialisé à false

  const checkAuthentication = () => {
    // On simule la vérification en supprimant les informations d'authentification
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuthentication(); // Réinitialiser l'authentification à chaque exécution
  }, []);

  return (
    <DarkModeProvider>
      <Router>
        <MainContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </DarkModeProvider>
  );
}

function MainContent({ isAuthenticated, setIsAuthenticated }) {
  const { darkMode } = useContext(DarkModeContext); // Utilisation correcte de useContext
  const navigate = useNavigate();

  // Mise à jour de l'état d'authentification après le login
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate, setIsAuthenticated]);

  return (
    <div className={`flex ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}>
      {isAuthenticated && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {isAuthenticated && <Topbar />}
        <main className="p-4 mt-16 lg:mt-0">
          <Routes>
            <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
            <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
            <Route path="/add-patient" element={<PrivateRoute><AddPatientForm /></PrivateRoute>} />
            <Route path="/add-appointment" element={<PrivateRoute><AddAppointmentForm /></PrivateRoute>} />
            <Route path="/edit-patient/:id" element={<PrivateRoute><EditPatientForm /></PrivateRoute>} />
            <Route path="/edit-appointment/:id" element={<PrivateRoute><EditAppointmentForm /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
