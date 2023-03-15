import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdOutlineAppRegistration, MdDeleteForever } from 'react-icons/md'
import { checkLength, emailCheck } from '../functions'

import { useAppContext } from '../variables'

export default function Registration() {

  const { cookies, login } = useAppContext()
  const navigate = useNavigate()

  const [form, setForm] = useState({})
  const [msg, setMsg] = useState({ msg:'', style: 'text-green-600'})

  const inputUsername = useRef(null)
  const inputEmail = useRef(null)
  const inputPassword = useRef(null)
  const inputRePassword = useRef(null)
  const inputRobotbutton = useRef({checked: false})

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

  // REGISTRATION
  const handleSubmit = async (e) => {
    e.preventDefault()

    let errorMsg = ''

    try {
      if (!form.robotbutton) {
        throw new Error ('Robot button is not checked.')
      }
    }
    catch (error) {
      errorMsg += ' ' + error + ' '
    }
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
      if (form.password !== form.repassword) {
        throw new Error ('The passwords entered do not match.')
      }
    }
    catch (error) {
      errorMsg += ' ' + error + ' '
    }

    if (errorMsg === '') {
      const response = await fetch(process.env.REACT_APP_URL+'/users/add', {
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
    console.log('useEffect...');
    console.log('cookies: '+ cookies.login);

    if (cookies.login) { 
      sessionStorage.setItem('regForm', null)
      navigate("/") 
    }
    
    let sessionForm = JSON.parse(sessionStorage.getItem('regForm'));

    if (sessionForm === null) {
      sessionForm = {}
    } else {
      setForm(sessionForm)
      inputUsername.current.value = (sessionForm.username !== undefined) ? sessionForm.username : '';
      inputEmail.current.value = (sessionForm.email !== undefined) ? sessionForm.email : '';
      inputPassword.current.value = (sessionForm.password !== undefined) ? sessionForm.password : '';
      inputRePassword.current.value = (sessionForm.repassword !== undefined) ? sessionForm.repassword : '';
      inputRobotbutton.current.checked = (sessionForm.username !== undefined) ? sessionForm.robotbutton : '';
    }

    //sessionStorage.clear();
    //console.log('sessionStorage : '); console.log(sessionForm); console.log(form);

  }, [])

  return (
    <>
    { !cookies.login && ( 
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
            Registration
          </h1>
          <MdDeleteForever onClick={resetForm} className='p-0.5 rounded-full bg-red-700 hover:bg-red-500' size='2rem' color='white' />
        </div>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
              <input type='text' name='username' id='username' ref={inputUsername} onChange={handleForm} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='username' autoComplete='off' required={true} />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
              <input type='text' name='email' id='email' ref={inputEmail} onChange={handleForm} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='email' autoComplete='off' required={true} />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
              <input type='password' name='password' id='password' ref={inputPassword} onChange={handleForm} placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required={true} />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Repeat password</label>
              <input type='password' name='repassword' id='repassword' ref={inputRePassword} onChange={handleForm} placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required={true} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input id='robotbutton' name='robotbutton' ref={inputRobotbutton} onChange={handleCheck} aria-describedby='robotbutton' type='checkbox' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='robotbutton' className='text-gray-500 dark:text-gray-300'>I am not a Robot!</label>
                </div>
              </div>
            </div>
            <div className='p-3'>
              {msg && <div className={`text-center ${msg.style}`}>{msg.msg}</div>}
            </div>
            <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Registration</button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              do you have an account? <NavLink to='/login' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
    ) }
    </>
  )
}