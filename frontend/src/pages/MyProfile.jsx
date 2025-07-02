import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {

  const { userData, setUserData, token, loadUserProfileData, backendUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateUserProfileData = async () => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('dob', userData.dob);
      formData.append('gender', userData.gender);
      formData.append('address', JSON.stringify(userData.address));
      if (image) {
        formData.append('image', image);
      }
      const { data } = await axios.post(`${backendUrl}api/user/update-profile`, formData, {
        headers: { token }
      });
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return userData && (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 text-sm text-neutral-800 p-4 bg-white shadow-md rounded-xl">

      <div className="flex flex-col items-center">
        {
          isEdit ? (
            <label htmlFor="image">
              <div className='inline-block relative cursor-pointer'>
                <img className='w-36 h-36 rounded-full object-cover opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
                <img className='w-10 h-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full p-1 border border-gray-300' src={assets.upload_icon} alt="Upload" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          ) : (
            <img className="w-36 h-36 rounded-full object-cover" src={userData.image} alt="Profile" />
          )
        }
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
              <p>
                <input type='text'
                  className='bg-gray-50 border border-gray-300 rounded-md px-2 py-1 w-full'
                  value={userData.address.line1}
                  onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                />
                <br />
                <input type='text'
                  className='bg-gray-50 border border-gray-300 rounded-md px-2 py-1 w-full'
                  value={userData.address.line2}
                  onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                />
              </p>
            ) : (
              <p className='text-gray-500'>
                {userData.address.line1}<br />
                {userData.address.line2}
              </p>
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
        className="mt-6 border border-green-600 text-green-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition self-start disabled:opacity-50"
        onClick={() => {
          if (isEdit) {
            updateUserProfileData();
          } else {
            setIsEdit(true);
          }
        }}
        disabled={isUpdating}
      >
        {isEdit ? (isUpdating ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
      </button>
    </div>
  );
};

export default MyProfile;
