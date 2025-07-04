import React, { createContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import  { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const [dToken, setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken') : null);

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async (docId) => {
    try {
      const url = backendUrl.endsWith('/') ? `${backendUrl}api/doctor/appointments` : `${backendUrl}/api/doctor/appointments`;
      const {data} = await axios.post(url, {docId}, {headers:{dToken}});

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments.reverse());
      } else {
        console.error(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error fetching appointments');
    }
  }

  const value = {
    dToken, setDToken,
    backendUrl,
    appointments, setAppointments,
    getAppointments
  }

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
}

export default DoctorContextProvider;
