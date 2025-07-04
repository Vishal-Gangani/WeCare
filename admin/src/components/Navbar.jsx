import react, { use } from 'react';
import { assets } from '../assets/assets_admin/assets.js';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { DoctorContext } from '../context/DoctorContext.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext);

    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
        dToken && setDToken('');
        dToken && localStorage.removeItem('dToken');
    }

    return (
        <div className='flex justify-between items-center px-4 py-3 sm:px-10 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-32 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="WeCare Admin" />
                <p className='border px-2.5 py-0.5 rounded-full border-primary text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
        </div>
    );
}

export default Navbar;