import React from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { useEffect } from 'react';

const DoctorList = () => {

    const {doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext);

    useEffect(() => {
        if(aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Doctors</h1>
            <div className='w-full flex flex-wrap gap-5 pt-5 gap-y-6'>
                {
                    doctors.map((item,index) => (
                        <div className='border border-green-300 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                            <img src={item.image} alt="" className='bg-green-50 group-hover:bg-primary transition-all duration-500' />
                            <div className='p-4 '>
                                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                                <p className='text-neutral-600 text-sm'>{item.speciality}</p>
                            </div>
                            <div className='flex items-center gap-1 text-sm pb-2 px-4'>
                                <input onChange={() => changeAvailability(item._id)} type='checkbox' checked={item.available} />
                                <p>Available</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default DoctorList;
