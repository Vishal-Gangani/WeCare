import React, { use } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets.js';
import RelatedDoctors from '../components/RelatedDoctors.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const DaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  }

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    let slotsArr = [];
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        // For today, start at 10:00 AM
        currentDate.setHours(10, 0, 0, 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeslots = [];
      const now = new Date();
      while (currentDate < endTime) {
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are zero-based
        const year = currentDate.getFullYear();
        const slotDate = day + '-' + month + '-' + year;
        const slotTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isSlotAvailable = !(docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime));
        if (
          isSlotAvailable &&
          (i !== 0 || currentDate > now)
        ) {
          let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          timeslots.push({ datetime: new Date(currentDate), time: formattedTime });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      if (timeslots.length > 0) {
        slotsArr.push(timeslots);
      }
    }
    setDocSlots(slotsArr);
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment');
      return navigate('/login');
    }

    try {

      const date = docSlots[slotIndex][0].datetime;
      
      let day = date.getDate();
      let month = date.getMonth() + 1; // Months are zero-based
      let year = date.getFullYear();

      const slotDate = day + '-' + month + '-' + year;

      const { data } = await axios.post(`${backendUrl}api/user/book-appointment`, { docId, slotDate, slotTime }, {headers: {token}});

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/appointment');
      }
      else{
        toast.error(data.message);
        console.error(data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message);
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
            docSlots.length && docSlots[slotIndex] && docSlots[slotIndex].map((slot, index) => (
              <p onClick={()=> setSlotTime(slot.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slot.time === slotTime ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 border border-gray'}`} key={index}>{slot.time}</p>
            ))
          }
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white px-14 py-4 rounded-full my-6 font-light'>Book an Appointment</button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
}

export default Appointment;