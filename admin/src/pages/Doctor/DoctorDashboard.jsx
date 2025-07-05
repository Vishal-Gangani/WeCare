import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, setDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="p-4 sm:p-6 space-y-6">
  {/* Stats Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[
      { icon: assets.earning_icon, label: "Earnings", value: dashData.earnings },
      { icon: assets.appointments_icon, label: "Appointments", value: dashData.appointments },
      { icon: assets.patients_icon, label: "Patients", value: dashData.patients },
    ].map((stat, idx) => (
      <div
        key={idx}
        className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-1 hover:scale-105 duration-300 border border-gray-100"
      >
        <img className="w-12 sm:w-14" src={stat.icon} alt={stat.label} />
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Latest Bookings */}
  <div className="bg-white rounded-2xl shadow-md border border-gray-100">
    <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-200">
      <img src={assets.list_icon} alt="List Icon" className="w-8 sm:w-10" />
      <p className="text-lg sm:text-xl font-semibold text-gray-800">Latest Bookings</p>
    </div>
    <div className="divide-y divide-gray-100">
      {dashData.latestAppointments.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row sm:items-center px-4 sm:px-6 py-4 gap-3 sm:gap-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <img
              src={item.userData.image}
              alt={item.userData.name}
              className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover ring-2 ring-gray-200"
            />
            <div className="text-sm">
              <p className="text-gray-800 font-medium">{item.userData.name}</p>
              <p className="text-gray-500 text-xs">{item.slotDate}</p>
            </div>
          </div>
          <div className="sm:ml-auto mt-2 sm:mt-0">
            {item.cancelled ? (
              <p className="text-red-500 font-semibold text-sm">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 font-semibold text-sm">Completed</p>
            ) : (
              <div className="flex gap-2">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 sm:w-9 cursor-pointer hover:scale-105 transition"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-8 sm:w-9 cursor-pointer hover:scale-105 transition"
                  src={assets.tick_icon}
                  alt="Complete"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



  );
};

export default DoctorDashboard;
