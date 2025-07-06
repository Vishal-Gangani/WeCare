import React, { useEffect } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointment = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);

  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-2 sm:m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white rounded text-sm max-h-[70vh] min-h-[50vh] overflow-y-scroll px-1 sm:px-0">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-2 sm:px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item, index) => (
            <div className="flex flex-wrap justify-between items-center gap-2 sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-2 sm:py-3 px-2 sm:px-6 border-b text-gray-500 hover:bg-gray-100 max-sm:text-base" key={index}>
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <img src={item.userData.image} alt="Patient" className="w-8 h-8 rounded-full" />
                <p className="truncate">{item.userData.name}</p>
              </div>
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start">
                <p className="text-xs inline border border-primary px-2 rounded-full">{item.payment ? 'Online' : 'CASH'}</p>
                <span className="sm:hidden text-xs ml-2">{item.amount} ₹</span>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p className="w-full sm:w-auto truncate">{item.slotDate} | {item.slotTime}</p>
              <p className="max-sm:hidden">{item.amount}</p>
              {
                item.cancelled ?
                  <p className="text-red-500 w-full sm:w-auto text-center">Cancelled</p>
                  : item.isCompleted ?
                    <p className="text-green-500 w-full sm:w-auto text-center">Completed</p>
                    : <div className="flex gap-2 w-full sm:w-auto justify-center">
                      <img onClick={() => cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="Receipt" />
                      <img onClick={() => completeAppointment(item._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt="Invoice" />
                    </div>
              }

            </div>
          ))
        }
      </div>
    </div>
  );
};

export default DoctorAppointment;
