import react from 'react';
import Login from './pages/Login.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext.jsx';
import { useContext } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllAppointment from './pages/Admin/AllAppointment.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorList from './pages/Admin/DoctorList.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
import DoctorAppointment from './pages/Doctor/DoctorAppointment.jsx';

const App = () => {

  const {aToken} = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);

  return aToken || dToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* {Admin Routes} */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorList />} />

          {/* {Doctor Routes} */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;