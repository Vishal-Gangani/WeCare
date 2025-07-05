import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Helper to join base URL and endpoint safely
function joinUrl(base, endpoint) {
  if (base.endsWith('/')) base = base.slice(0, -1);
  if (endpoint.startsWith('/')) endpoint = endpoint.slice(1);
  return `${base}/${endpoint}`;
}

const MyAppointment = () => {

  const navigate = useNavigate();

  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(joinUrl(backendUrl, '/api/user/appointments'), {
        headers: {
          token
        }
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log("Appointments fetched successfully:", data.appointments);
      }

    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching appointments:", error);
    }
  };

  // //cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(joinUrl(backendUrl, '/api/user/cancel-appointment'), {
        appointmentId
      }, {
        headers: {
          token
        }
      });

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData(); // Refresh doctor data after cancellation
      } else{
        toast.error(data.message);
        console.error("Error canceling appointment:", data.message);
      }

    } catch (error) {
      toast.error(error.message);
      console.error("Error canceling appointment:", error);
    }
  };

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initPay = async (order) => {
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'WeCare',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log('Payment successful:', response);
        try {
          const { data } = await axios.post(joinUrl(backendUrl, '/api/user/verify-razorpay'), response, { headers: { token } });
          if (data.success) {
            getUserAppointments();
            navigate('/appointment');
          } else {
            toast.error('Payment verification failed');
            console.error('Payment verification error:', data.message);
          }
        } catch (error) {
          toast.error('Payment verification failed');
          console.error('Payment verification error:', error);
        }
      },
      prefill: {},
      theme: { color: '#3399cc' }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  //payment online
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(joinUrl(backendUrl, '/api/user/payment-razorpay'), {
        appointmentId
      }, {
        headers: {
          token
        }
      });

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
        console.error("Error processing payment:", data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
      console.error("Error processing payment:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {
          appointments.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex py-2 border-b' key={item._id}>
              <div>
                <img className='w-32 bg-green-50' src={item.docData.image} alt={item.name} />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address?.line1}</p>
                <p className='text-xs'>{item.docData.address?.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time : </span>{item.slotDate} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment  && !item.isCompleted && <button className='text-sm text-green-600 text-center sm:min-w-48 py-2 border rounded'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
                {item.cancelled && !item.isCompleted && <button className='text-sm text-red-600 text-center sm:min-w-48 py-2 border rounded'>Cancelled</button>}
                {item.isCompleted && <button className='text-sm text-green-600 text-center sm:min-w-48 py-2 border rounded'>Completed</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default MyAppointment;