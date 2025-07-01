import React, { useContext } from 'react';
import { useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [speciality, setSpeciality] = useState('Cardiology');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [about, setAbout] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (!docImg) {
                toast.error('Please upload a doctor image');
                return;
            }
            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', fees);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));
            formData.append('about', about);

            //console log formdata
            formData.forEach((value, key) =>{ console.log(`${key}, ${value}`);});

            const {data} = await axios.post(backendUrl + 'api/admin/add-doctor', formData, {
                headers: { aToken }
            });

            if (data.success) {
                toast.success(data.message || 'Doctor added successfully');
                setDocImg(false);
                setName('');
                setEmail('');
                setPassword('');
                setExperience('1 Year');
                setFees('');
                setSpeciality('Cardiology');
                setDegree('');
                setAddress1('');
                setAddress2('');
                setAbout('');
            }
            else{
                toast.error(data.message || 'Failed to add doctor');
            }

        } catch (error) {
            toast.error(error.message);
            console.error('Error adding doctor:', error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full '>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>
            <div className='bg-white p-x-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Add Icon" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>Upload Doctor <br /> picture</p>
                </div>
                <div className='flex flex-col lg:flex-row gap-10 items-start text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-2 py-1' type="text" placeholder='Enter name' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-2 py-1' type="email" placeholder='Enter email' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-2 py-1' type="password" placeholder='Enter password' required />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-2 py-1'>
                                <option value="1 Years">1 Years</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="7 Years">7 Years</option>
                                <option value="8 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10 Years">10 Years</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-2 py-1' type="number" placeholder='Enter fees' required />
                        </div>
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-2 py-1' required>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Radiologist">Radiologist</option>
                                <option value="Surgeon">Surgeon</option>
                                <option value="Orthopedist">Orthopedist</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="General Physician">General Physician</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Degree</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-2 py-1' type="text" placeholder='Enter degree details' required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-2 py-1' type="text" placeholder='Enter address1' required />
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-2 py-1' type="text" placeholder='Enter address2' required />
                        </div>

                    </div>

                </div>

                <div>
                    <p className='mt-4 mb-2'>About</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='Write about doctor' rows={5} required></textarea>
                </div>

                <button type="submit" className='bg-primary text-white px-10 py-2 rounded-full text-base mt-4'>Add Doctor</button>

            </div>
        </form>
    )
};

export default AddDoctor;