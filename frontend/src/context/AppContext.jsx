import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { doctors } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://wecare-backend-v4yh.onrender.com/';

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        try{
            console.log('Fetching doctors from:', `${backendUrl}api/doctor/list`);
            const {data} = await axios.get(`${backendUrl}api/doctor/list`);

            if(data.success) {
                setDoctors(data.doctors);
                console.log('Doctors data:', data.doctors);
            } else {
                toast.error(data.message);
            }

        } catch(error) {
            console.error('Error fetching doctors:', error);
            console.error('Error response:', error.response?.data);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const loadUserProfileData = async () => {
        try {
            console.log('Loading user profile from:', `${backendUrl}api/user/get-profile`);
            const { data } = await axios.get(`${backendUrl}api/user/get-profile`, {headers: {token}});

            if (data.success) {
                setUserData(data.userData);
                console.log('User profile loaded:', data.userData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error('Error loading user profile:', error);
            console.error('Error response:', error.response?.data);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const value = {doctors, token, setToken, backendUrl, userData, setUserData, loadUserProfileData, getDoctorsData};

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else{
            setUserData(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
