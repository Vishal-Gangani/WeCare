import React, { use } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality,docId}) => {

    const {doctors} = useContext(AppContext);
    const navigate = useNavigate();

    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if(doctors.length>0 && speciality){
            const doctorsData = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }
    },[doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-grey-900 md:mx-10 ">
            <h1 className='text-3xl font-medium text-center'>Top Doctors</h1>
            <p className='sm:w-1/3 text-center text-sm'>Browse through our list of top doctors</p>
            <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='border border-green-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-200'>
                        <div className='bg-green-50 flex flex-col justify-end items-center h-44 p-0'>
                            <img className='w-full h-full object-contain' src={item.image} alt={item.name} />
                        </div>
                        <div className='flex items-center  gap-2 text-sm text-center text-green-500 px-4 pt-2'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                            <p>Available</p>
                        </div>
                        <div className='px-4 pb-4'>
                            <p className='font-medium text-grey-900 text-lg'>{item.name}</p>
                            <p className='text-sm text-grey-600'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0); }} className='mt-4 px-4 py-2 bg-green-400 text-white rounded-full'>More</button>
        </div>
  );
}

export default RelatedDoctors;