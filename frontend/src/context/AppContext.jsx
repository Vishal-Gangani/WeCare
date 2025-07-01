import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { doctors } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/';
    const [doctors, setDoctors] = useState([]);

    const value = {doctors, backendUrl}

    const getDoctorsData = async () => {
        try{

            const {data} = await axios.get(`${backendUrl}api/doctor/list`);

            if(data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }

        } catch(error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
