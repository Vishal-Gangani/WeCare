import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets_admin/assets';

const Dashboard = () => {

    const { aToken, getDashData, dashData, cancelAppointment } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    return dashData && (
        <div className="m-6 space-y-6">
            {/* Stat Cards */}
            <div className="flex flex-wrap gap-6">
                {/* Doctors */}
                <div className="flex items-center gap-4 bg-white p-5 min-w-[13rem] rounded-xl shadow hover:scale-105 transition-transform duration-300 border">
                    <img className="w-14" src={assets.doctor_icon} alt="Doctors" />
                    <div>
                        <p className="text-2xl font-semibold text-gray-700">{dashData.doctors}</p>
                        <p className="text-sm text-gray-500">Doctors</p>
                    </div>
                </div>

                {/* Appointments */}
                <div className="flex items-center gap-4 bg-white p-5 min-w-[13rem] rounded-xl shadow hover:scale-105 transition-transform duration-300 border">
                    <img className="w-14" src={assets.appointments_icon} alt="Appointments" />
                    <div>
                        <p className="text-2xl font-semibold text-gray-700">{dashData.appointments}</p>
                        <p className="text-sm text-gray-500">Appointments</p>
                    </div>
                </div>

                {/* Patients */}
                <div className="flex items-center gap-4 bg-white p-5 min-w-[13rem] rounded-xl shadow hover:scale-105 transition-transform duration-300 border">
                    <img className="w-14" src={assets.patients_icon} alt="Patients" />
                    <div>
                        <p className="text-2xl font-semibold text-gray-700">{dashData.patients}</p>
                        <p className="text-sm text-gray-500">Patients</p>
                    </div>
                </div>
            </div>

            {/* Latest Bookings */}
            <div className="bg-white rounded-xl shadow border">
                <div className="flex items-center gap-3 px-6 py-5 border-b">
                    <img src={assets.list_icon} alt="List Icon" className="w-10" />
                    <p className="text-lg font-semibold text-gray-700">Latest Bookings</p>
                </div>
                <div className="divide-y">
                    {dashData.latestAppointments.map((item, index) => (
                        <div key={index} className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors">
                            <img src={item.docData.image} alt={item.docData.name} className="rounded-full w-10 h-10 object-cover" />
                            <div className="flex-1 text-sm">
                                <p className="text-gray-800 font-medium">{item.docData.name}</p>
                                <p className="text-gray-500">{item.slotDate}</p>
                            </div>
                            {
                                item.cancelled ?
                                    <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                    : item.isCompleted ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                                        : <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="Cancel Appointment" className='w-10 cursor-pointer' />
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
