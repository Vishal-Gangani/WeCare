import React, { createContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = React.useState(localStorage.getItem('aToken')? localStorage.getItem('aToken') : null);
    const [doctors, setDoctors] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/';

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

  const value = {
    aToken,
    setAToken,
    doctors,
    getAllDoctors,
    backendUrl,
    changeAvailability
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;
