import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const {backendUrl, token, setToken} = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] =useState('Sign Up')
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler =  async (event) => {
    event.preventDefault();
    try{

      if(state === 'Sign Up') {
        const {data} = await axios.post(`${backendUrl}api/user/register`, {name, email, password});

        if(data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);

        } else {
          toast.error(data.message);
        }

      } else {
        const {data} = await axios.post(`${backendUrl}api/user/login`, {email, password});

        if(data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);

        } else {
          toast.error(data.message);
        }
      }

    } catch(error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if(token) {
      navigate('/');
    }

  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[300px] sm:min-w-96 border border-gray-300 rounded-lg text-zinc-600 text-sm shadow-md'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'Create Account' : 'Login'} to continue</p>
        {
          state === 'Sign Up' && <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-gray-300 rounded-md p-2 w-full' type="text"  onChange={(e) => setName(e.target.value)} value={name} required/>
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-gray-300 rounded-md p-2 w-full' type="email"  onChange={(e) => setEmail(e.target.value)} value={email} required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-gray-300 rounded-md p-2 w-full' type="password"  onChange={(e) => setPassword(e.target.value)} value={password} required/>
        </div>
        <button type="submit" className='bg-primary text-white rounded-md p-2 w-full cursor-pointer'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'Sign Up' ? 
          <p className='text-sm text-gray-500 mt-2'>Already have an account? <span onClick={() => setState('Login')} className='text-primary cursor-pointer'>Login</span></p> : 
          <p className='text-sm text-gray-500 mt-2'>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-primary cursor-pointer'>Sign Up</span></p>
        }
      </div>
    </form>
  );
}

export default Login;