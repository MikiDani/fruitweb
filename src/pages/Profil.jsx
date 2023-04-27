import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineAppRegistration, MdDeleteForever } from 'react-icons/md'
import { loadUserDetails } from "../functions";
import { checkLength, emailCheck } from '../functions'

import { useAppContext } from "../variables";

function Profil() {

  const { cookies, user, setUser, setReload } = useAppContext()
  const navigate = useNavigate()

  const [form, setForm] = useState({})
  const [msg, setMsg] = useState({ msg:'Próba üzenet!!!', style: 'text-green-600'})

  const inputUsername = useRef(null)
  const inputEmail = useRef(null)
  const inputPassword = useRef(null)
  const inputRePassword = useRef(null)
  const inputRobotbutton = useRef({checked: false})
  const inputNewPassword = useRef(null)
  const inputNewRePassword = useRef(null)

  const resetForm = () => {
    inputUsername.current.value = ''
    inputEmail.current.value = ''
    inputPassword.current.value = ''
    inputRePassword.current.value = ''
    inputRobotbutton.current.checked = false

    sessionStorage.clear()
    setForm({})
    setMsg({ msg:'', style: ''})
  }

  const handleForm = (e) => {
    const insert = {
      ...form,
      [e.target.name]: e.target.value
    }
    setForm(insert)
    sessionStorage.setItem('regForm', JSON.stringify(insert))
  }
  
  const handleCheck = (e) => {
    const insert = {
      ...form,
      [e.target.name]: e.target.checked
    }
    setForm(insert)
    sessionStorage.setItem('regForm', JSON.stringify(insert))
  }

  // reload user data
  const handleReload = async () => {
    console.log('cookie: ')
    console.log(cookies.login);

    let userData = await loadUserDetails(cookies.login)
    
    console.log(userData)

    inputUsername.current.value = userData.username
    inputEmail.current.value = userData.email

    setUser(userData)
    setReload(true)
  }

  // MODIFY
  const handleSubmit = async (e) => {
    e.preventDefault()

    let errorMsg = ''

    try {
      checkLength('username', form.username, 6, 64)
    }
    catch (error) {
      errorMsg += ' ' + error + ' '
    }

    try {
      checkLength('password', form.password, 6, 64)
    }
    catch (error) {
      errorMsg += ' ' + error + ' '
    }
    try {
      if (!emailCheck(form.email)) {
        throw new Error ('The email is not a valid email address.')
      }
    }
    catch (error) {
      errorMsg += ' ' + error + ' '
    }
    try {
      if (form.newpassword !== form.newrepassword) {
        throw new Error ('The new passwords entered do not match.')
      }
    }
    catch (error) {
      errorMsg += ' ' + error + ' '
    }

    if (errorMsg === '') {
      const response = await fetch(process.env.REACT_APP_URL+'/users/mod', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const resData = await response.json()

      Object.keys(resData).forEach(key => {
        if (key === 'error') { setMsg(resData.error) }
        if (key === 'success') { 
          resetForm()
          setMsg({msg: resData.success, style:'text-green-500'})
        }
      })
    } else {
      setMsg({ msg: errorMsg, style: 'text-red-600'})
    }
  }

  useEffect(() => {
    if (!cookies.login) { navigate('/') }
    handleReload()
  }, [])

  return (
    <>
    {cookies.login && (
      <div className='flex justify-start bg-white'>
        <div className='hidden lg:block w-1/2 rounded'>
          <div className='h-full flex justify-center items-center'>
            <MdOutlineAppRegistration size='20rem' color='orange' opacity='0.5' />
          </div>
        </div>
        <div className='w-full lg:w-1/2 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mx-auto'>
          <div className='p-6 space-y-4'>
            <div className='flex justify-between items-center'>
              <h1 className='font-bold text-gray-900 text-2xl dark:text-white'>
                My Profil
              </h1>
              <MdDeleteForever onClick={resetForm} className='p-0.5 rounded-full bg-red-700 hover:bg-red-500' size='2rem' color='white' />
            </div>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <label className='inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label> <label className="inline-block ml-5 text-zinc-400 text-xs">Enter your password to edit</label>
                <input type='password' name='password' id='password' ref={inputPassword} onChange={handleForm} placeholder='' className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required={true} />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
                <input type='text' name='username' id='username' ref={inputUsername} onChange={handleForm} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='username' autoComplete='off' required={true} />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                <input type='text' name='email' id='email' ref={inputEmail} onChange={handleForm} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='email' autoComplete='off' required={true} />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>New Password</label>
                <input type='password' name='newpassword' id='newpassword' ref={inputNewPassword} onChange={handleForm} placeholder='' className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required={true} />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Repeat new password</label>
                <input type='password' name='newrepassword' id='newrepassword' ref={inputNewRePassword} onChange={handleForm} placeholder='' className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required={true} />
              </div>
              <div className='p-3'>
                {msg && <div className={`text-center ${msg.style}`}>{msg.msg}</div>}
              </div>
              <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Save Changes</button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                do you have an account? <NavLink to='/login' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  Login
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default Profil;