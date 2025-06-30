import react from 'react';
import { assets } from '../../assets/assets_admin/assets';

const AddDoctor = () => {
    return (
        <form>
            <p>Add Doctor</p>
            <div>
                <div>
                    <label htmlFor="doc-img">
                        <img src={assets.upload_area} alt="Add Icon" />
                    </label>
                    <input type="file" id="doc-img" />
                    <p>Upload Doctor <br /> picture</p>
                </div>
                <div>
                    <div>
                        <div>
                            <p>Doctor Name</p>
                            <input type="text" placeholder='Enter name' required/>
                        </div>
                        <div>
                            <p>Doctor Email</p>
                            <input type="email" placeholder='Enter email' required/>
                        </div>
                        <div>
                            <p>Doctor Password</p>
                            <input type="password" placeholder='Enter password' required/>
                        </div>
                        <div>
                            <p>Experience</p>
                            <select>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>
                            <div>
                                <p>Fees</p>
                                <input type="number" placeholder='Enter fees' required/>
                            </div>
                    </div>

                    <div>
                        <div>
                            <p>Speciality</p>
                            <select>
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

                        <div>
                            <p>Education</p>
                            <input type="text" placeholder='Enter education details' required/>
                        </div>

                        <div>
                            <p>Address</p>
                            <input type="text" placeholder='Enter address1' required/>
                            <input type="text" placeholder='Enter address2' required/>
                        </div>

                    </div>

                </div>

                <div>
                    <p>About</p>
                    <textarea placeholder='Write about doctor' rows={5} required></textarea>
                </div>

                <button type="submit" className='bg-primary text-white w-full py-2 rounded-md text-base mt-4'>Add Doctor</button>

            </div>
        </form>
    )
};

export default AddDoctor;