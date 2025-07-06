import React, { createContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = React.useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') : null);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://wecare-backend-7dbz.onrender.com/';

    const getAllDoctors = async () => {
        try {
            const url = backendUrl.endsWith('/') ? `${backendUrl}api/admin/all-doctors` : `${backendUrl}/api/admin/all-doctors`;
            const {data} = await axios.get(url, { headers: { aToken } });
            if (data.success) {
                setDoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message || "Failed to fetch doctors");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {

          const {data} = await axios.post(`${backendUrl}api/admin/change-availability`, { docId }, { headers: { aToken } });

            if (data.success) {
              toast.success(data.message);
              getAllDoctors();
            } else {
              toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    //get all appointments

    const getAllAppointments = async () => {
        try {
          const {data}= await axios.get(`${backendUrl}api/admin/appointments`, { headers: { aToken } });

          if( data.success ) {
            setAppointments(data.appointments);
            console.log(data.appointments);
          } else {
            toast.error(data.message || "Failed to fetch appointments");
          }

        }catch (error) {
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
      try{
        const url = backendUrl.endsWith('/') ? `${backendUrl}api/admin/cancel-appointment` : `${backendUrl}/api/admin/cancel-appointment`;
        console.log('Cancelling appointment:', appointmentId, 'with URL:', url, 'and token:', aToken);
        const {data} = await axios.post(url, {appointmentId}, { headers: { aToken } });
        console.log('Cancel appointment response:', data);
        if(data.success){
          toast.success(data.message);
          getAllAppointments();
        }
        else{
          toast.error(data.message || "Failed to cancel appointment");
        }

      } catch (error){
        toast.error(error.message);
        console.error('Cancel appointment error:', error);
      }
    };

    const getDashData = async () => {
      try{

        const {data} = await axios.get(`${backendUrl}api/admin/dashboard`, { headers: { aToken } });
        if(data.success){
          setDashData(data.dashData);
          console.log(data.dashData);
        } else {
          toast.error(data.message || "Failed to fetch dashboard data");
        }

      } catch (error) {
        toast.error(error.message);
      }
    };

  const value = {
    aToken,
    setAToken,
    doctors,
    getAllDoctors,
    backendUrl,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    getDashData,
    dashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;
