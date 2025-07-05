import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showfilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilteredDoctors(doctors.filter(doctor => doctor.speciality.toLowerCase() === speciality.toLowerCase()));
    }
    else {
      setFilteredDoctors(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-grey-600'>Browse though the Doctor Specialists</p>
      <div className='flex flex-col items-start sm:flex-row gap-5 mt-5'>
        <button onClick={() => setShowFilter(prev => !prev)} className={`border transition-all sm:hidden text-sm py-1 px-3 rounded ${showfilter ? "bg-green-100 text-black" : ""}`}>Filter</button>
        <div className={`flex flex-col gap-2 text-sm text-grey-900 ${showfilter ? "flex" : "hidden sm:flex"}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-grey-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-green-100 text-black" : ""}`}>General Physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-grey-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-green-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-grey-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-green-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-grey-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-green-100 text-black" : ""}`}>Pediatrician</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-grey-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-green-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-grey-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-green-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {
            filteredDoctors.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border border-green-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-200'>
                <div className='bg-green-50 flex flex-col justify-end items-center h-44 p-0'>
                  <img className='w-full h-full object-contain' src={item.image} alt={item.name} />
                </div>
                <div className='flex items-center  gap-2 text-sm text-center px-4 pt-2'>
                  <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                  <p className={`${item.available ? 'text-green-500' : 'text-red-500'} rounded-full`}>{item.available ? 'Available' : 'Unavailable'}</p>
                </div>
                <div className='px-4 pb-4'>
                  <p className='font-medium text-grey-900 text-lg'>{item.name}</p>
                  <p className='text-sm text-grey-600'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors