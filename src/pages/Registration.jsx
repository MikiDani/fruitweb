import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineAppRegistration, MdDeleteForever } from 'react-icons/md'
import { checkLength, emailCheck } from '../functions'

export default function Registration() {

  const url = 'http://localhost:8080'

  const [form, setForm] = useState({})
  const [msg, setMsg] = useState({ msg:'Teszt', style: 'text-green-600'})

  const resetForm = () => {
    document.querySelector(`#robotbutton`).checked = false
    const sessionForm = JSON.parse(sessionStorage.getItem('regForm'))
    if (sessionForm !== null) {
      Object.keys(sessionForm).map(element => {
        //console.log(element)
        document.querySelector(`#${element}`).value = ''
      })
    }
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
    console.log(insert);
  }
  
  const handleCheck = (e) => {
    const insert = {
      ...form,
      [e.target.name]: e.target.checked
    }
    setForm(insert)
    sessionStorage.setItem('regForm', JSON.stringify(insert))
    console.log(insert);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(form)

    let errorMsg = ''

    try {
      if (!form.robotbutton) {
        throw ('Robot button is not checked.')
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
        throw ('The email is not a valid email address.')
      }
    }
    catch (error) {
      errorMsg += ' ' + error + ' '
    }
    try {
      if (form.password !== form.repassword) {
        throw ('The passwords entered do not match.')
      }
    }
    catch (error) {
      errorMsg += ' ' + error + ' '
    }

    if (errorMsg === '') {
      const response = await fetch('http://localhost:8080/users/add', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const resData = await response.json()
      setMsg({ msg:'valami', style: 'text-green-500'})
      Object.keys(resData).forEach(key => {
        if (key === 'error') { setMsg(resData.error) }
        if (key === 'success') { 
          setMsg({msg: resData.success, style:'text-green-500'})
          resetForm()
        }
      })
    } else {
      setMsg({ msg: errorMsg, style: 'text-red-600'})
    }
  }

  useEffect(() => {
    console.log('useEffect');
    
    //sessionStorage.clear();
    let sessionForm = JSON.parse(sessionStorage.getItem('regForm'));
    
    if (sessionForm === null) {
      sessionForm = '';
    } else {
      setForm(sessionForm);
      document.querySelector(`#robotbutton`).checked = sessionForm.robotbutton
      Object.keys(sessionForm).map(element => {
        console.log(element)
        document.querySelector(`#${element}`).value = sessionForm[element]
      });
    }
    //console.log('sessionStorage : '); console.log(sessionForm); console.log(form);

  }, [])

  return (
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
              <input type='text' name='username' id='username' onChange={handleForm} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='username' autoComplete='off' required={true} />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
              <input type='text' name='email' id='email' onChange={handleForm} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='email' autoComplete='off' required={true} />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
              <input type='password' name='password' id='password' onChange={handleForm} placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required={true} />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Repeat password</label>
              <input type='password' name='repassword' id='repassword' onChange={handleForm} placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required={true} />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input id='robotbutton' name='robotbutton' onChange={handleCheck} aria-describedby='robotbutton' type='checkbox' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' required ={true} />
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
  )
}