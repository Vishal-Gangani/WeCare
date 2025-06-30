import react, { useState } from 'react';
import {assets} from '../assets/assets_admin/assets.js';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setAToken, backendUrl} = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try{
            if(state === 'Admin'){
                const url = `${backendUrl.endsWith('/') ? backendUrl : backendUrl + '/'}api/admin/login`;
                const {data} = await axios.post(url, {
                    email,
                    password
                });
                if(data.success){
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                }else{
                    toast.error(data.message || 'Login failed');
                }
            }
            else{

            }

        }catch(err){
            console.error(err);
        }

    }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col items-start m-auto p-8 min-w-[400px] sm:min-w-96 border rounded-xl text-sm text-[#5E5E5E] shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
        <div className='w-full'>
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded p-2 w-full mt-1' type="email" required/>
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded p-2 w-full mt-1' type="password" required/>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base mt-4' type="submit">Login</button>
        {
            state === 'Admin' 
            ? <p className='mt-2'>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Doctor')}>Click Here</span></p>
            : <p className='mt-2'>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click Here</span></p>
        }
      </div>
    </form>
  );
}

export default Login;