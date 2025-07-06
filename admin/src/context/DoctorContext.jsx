import React, { createContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import  { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://wecare-backend-7dbz.onrender.com';

  const [dToken, setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken') : null);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const getAppointments = async () => {
    try {
      const url = backendUrl.endsWith('/') ? `${backendUrl}api/doctor/appointments` : `${backendUrl}/api/doctor/appointments`;
      const {data} = await axios.get(url, {headers:{dToken}});

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        console.error(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error fetching appointments');
    }
  }

  const completeAppointment = async (appointmentId) => {
    try {
      const url = backendUrl.endsWith('/') ? `${backendUrl}api/doctor/complete-appointment` : `${backendUrl}/api/doctor/complete-appointment`;
      const {data} = await axios.post(url, {appointmentId}, {headers:{dToken}});

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);  
      toast.error(error.message);
    }
  }

    const cancelAppointment = async (appointmentId) => {
    try {
      const url = backendUrl.endsWith('/') ? `${backendUrl}api/doctor/cancel-appointment` : `${backendUrl}/api/doctor/cancel-appointment`;
      const {data} = await axios.post(url, {appointmentId}, {headers:{dToken}});

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);  
      toast.error(error.message);
    }
  }

  const getDashData = async () => {
    try {
      const url = backendUrl.endsWith('/') ? `${backendUrl}api/doctor/dashboard` : `${backendUrl}/api/doctor/dashboard`;
      const {data} = await axios.get(url, {headers:{dToken}});

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Error fetching dashboard data');
    }
  }

  const getProfileData = async () => {
    try {
      const url = backendUrl.endsWith('/') ? `${backendUrl}api/doctor/profile` : `${backendUrl}/api/doctor/profile`;
      const {data} = await axios.get(url, {headers:{dToken}});

      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Error fetching profile data');
    }
  }

  const value = {
    dToken, setDToken,
    backendUrl,
    appointments, setAppointments,
    profileData, setProfileData, getProfileData,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData, setDashData, getDashData
  }

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
}

export default DoctorContextProvider;
