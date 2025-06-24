import React, { use } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets.js';
import RelatedDoctors from '../components/RelatedDoctors.jsx';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const DaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(currentDate.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(today.getHours() > 10 ? today.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }
      else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeslots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        timeslots.push({ datetime: new Date(currentDate), time: formattedTime });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => [...prev, timeslots]);
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-5'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo?.image} alt={docInfo?.name} />
        </div>
        <div className='flex-1 border border-gray-300 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* Doc info */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-800'>{docInfo.name}<img className='w-5' src={assets.verified_icon} /></p>
          <div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='border border-gray-300 rounded-lg px-4 py-1'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-2 text-sm font-medium text-gray-600 mt-1'>About <img src={assets.info_icon} alt="Info" /></p>
            <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 mt-5 font-medium'>
            Appointment Fee : <span className='text-gray-600'>₹{docInfo.fees}</span>
          </p>
        </div>
      </div>
      <div className='sm:ml-72 mt-5 sm:pl-5 font-medium text-gray-800'>
        <p>Booking Slots</p>
        <div className='flex gap-3 mt-3 items-center w-full overflow-x-scroll'>
          {
            docSlots.length && docSlots.map((slots, index) => (
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ?'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{slots[0] && DaysOfWeek[slots[0].datetime.getDay()]}</p>
                <p>{slots[0] && slots[0].datetime.getDate()}</p>

              </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((slot, index) => (
              <p onClick={()=> setSlotTime(slot.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slot.time === slotTime ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 border border-gray'}`} key={index}>{slot.time}</p>
            ))
          }
        </div>
        <button className='bg-primary text-white px-14 py-4 rounded-full my-6 font-light'>Book an Appointment</button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
}

export default Appointment;