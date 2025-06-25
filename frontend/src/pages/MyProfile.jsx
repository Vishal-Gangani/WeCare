import React from 'react';
import { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Vishal Gangani',
    image: assets.profile_pic,
    phone: '123-456-7890',
    email: 'example@example.com',
    address: '123 Main St, Cityville, ST 12345',
    dob: '1990-01-01',
    gender: 'Male'
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 text-sm text-neutral-800 p-4 bg-white shadow-md rounded-xl">
      <div className="flex flex-col items-center">
        <img className="w-36 h-36 rounded-full object-cover" src={userData.image} alt="Profile" />
        {
          isEdit ? (
            <input
              className="mt-4 text-2xl font-semibold text-center border border-gray-300 rounded-md px-3 py-1 bg-gray-100 w-60"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <p className="mt-4 text-2xl font-semibold text-center text-neutral-900">{userData.name}</p>
          )
        }
      </div>

      <hr className="border-t border-gray-300 my-2" />

      <div>
        <p className="text-gray-600 font-medium mb-2 underline">Contact Information</p>
        <div className="grid grid-cols-[120px_1fr] gap-y-3">
          <p className="font-medium">Email:</p>
          <p className="text-green-600 break-all">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {
            isEdit ? (
              <input
                className="border border-gray-300 bg-gray-50 rounded-md px-2 py-1 w-60"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-green-600">{userData.phone}</p>
            )
          }

          <p className="font-medium">Address:</p>
          {
            isEdit ? (
              <input
                className="border border-gray-300 bg-gray-50 rounded-md px-2 py-1 w-full"
                type="text"
                value={userData.address}
                onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
              />
            ) : (
              <p className="text-gray-600">{userData.address}</p>
            )
          }
        </div>
      </div>

      <div>
        <p className="text-gray-600 font-medium mt-4 mb-2 underline">Basic Information</p>
        <div className="grid grid-cols-[120px_1fr] gap-y-3">
          <p className="font-medium">Date of Birth:</p>
          {
            isEdit ? (
              <input
                className="border border-gray-300 bg-gray-50 rounded-md px-2 py-1 w-[150px]"
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )
          }

          <p className="font-medium">Gender:</p>
          {
            isEdit ? (
              <select
                className="border border-gray-300 bg-gray-50 rounded-md px-2 py-1 w-[120px]"
                value={userData.gender}
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              >
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )
          }
        </div>
      </div>

      <button
        className="mt-6 border border-green-600 text-green-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition self-start"
        onClick={() => setIsEdit(!isEdit)}
      >
        {isEdit ? 'Save Changes' : 'Edit Profile'}
      </button>
    </div>
  );
};

export default MyProfile;
