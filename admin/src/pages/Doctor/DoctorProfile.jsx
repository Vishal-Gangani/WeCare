import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {

  const { dToken, profileData, getProfileData, setProfileData } = useContext(DoctorContext);
  const { backendUrl } = useContext(AppContext);
  const baseUrl = backendUrl || 'https://wecare-backend-7dbz.onrender.com/';

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const {data} = await axios.post(`${baseUrl}api/doctor/update-profile`, updateData, {headers: {dToken}});

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        console.error(data.message);
        toast.error(data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div>
      <div className="flex flex-col gap-4 m-5">
        <div>
          <img className="bg-primary/70 w-full sm:max-w-64 rounded-lg" src={profileData.image} />
        </div>

        <div className="flex-1 border border-stone-100 p-8 py-7 rounded-lg bg-white">
          <h2 className="flex items-center text-3xl font-medium text-gray-700">{profileData.name}</h2>
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className="py-0.5 px-2 text-xs border rounded-full">{profileData.experience}</button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-600 mt-3">About :</p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">{profileData.about}</p>
          </div>

          <p className="mt-3 text-gray-600 font-medium">Appointment Fee: <span className="text-gray-800">{isEdit ? <input type="number" onChange={(e) => setProfileData(prev=>({ ...prev, fees: e.target.value }))} value={profileData.fees} className="border-2 border-black px-2 py-1 rounded" /> : profileData.fees}</span></p>

          <div className="flex gap-2 py-2">
            <p>Address :</p>
            <p className="text-sm">{isEdit ? <input type="text" onChange={(e) => setProfileData(prev=>({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address?.line1} className="border-2 border-black px-2 py-1 rounded" /> : profileData.address?.line1} 
            <br />
            {isEdit ? <input type="text" onChange={(e) => setProfileData(prev=>({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address?.line2} className="border-2 border-black px-2 py-1 rounded" /> : profileData.address?.line2}</p>
          </div>

                     <div className="flex gap-1 pt-2">
             <input onChange={(e) => isEdit && setProfileData(prev => ({ ...prev, available: e.target.checked }))} checked={profileData.available} type="checkbox" className={isEdit ? "border-2 border-black" : ""} />
             <label htmlFor="available">Available</label>
           </div>

          {
            isEdit ?
            <button onClick={updateProfile} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all">Save</button>
            : <button onClick={() => setIsEdit(true)} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all">Edit</button>
          }

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
