import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineAppRegistration } from 'react-icons/md'
import { loadUserDetails } from "../functions";
import { checkLength, emailCheck } from '../functions'

import { useAppContext } from "../variables";

function Profil() {

  const { cookies, user, setUser, setReload } = useAppContext()
  const navigate = useNavigate()

  const [form, setForm] = useState({})
  const [msg, setMsg] = useState({ msg:'', style: 'text-green-600'})
  const [divButton, setDivButton] = useState(false)

  const inputUsername = useRef(null)
  const inputEmail = useRef(null)
  const inputPassword = useRef(null)
  const inputNewPassword = useRef(null)
  const inputNewRePassword = useRef(null)

  const handleForm = (e) => {
    const insert = {
      ...form,
      [e.target.name]: e.target.value
    }
    setForm(insert)
  }
  
  // reload user data
  const handleReload = async () => {

    let userData = await loadUserDetails(cookies.login)
    
    inputUsername.current.value = userData.username
    inputEmail.current.value = userData.email

    setUser(userData)

    const insert = {
      ...form,
      username: userData.username,
      email: userData.email
    }

    setForm(insert)
    setReload(true)
  }

  // modify user datas
  const handleSubmit = async (e) => {
    e.preventDefault()

    const sendDatas = {
      username: user.username,
      password: form.password
    }

    const response = await fetch(process.env.REACT_APP_URL + '/check', {
      method: 'POST',
      body: JSON.stringify(sendDatas),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const resData = await response.json()

    let errorMsg = ''
    
    // correct the actual password
    if (resData.result) {
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
        checkLength('newpassword', form.password, 6, 64)
      }
      catch (error) {
        errorMsg += ' ' + error + ' '
      }
      // if given new password
      if (divButton) {
        try {
          if (form.newpassword !== form.newrepassword) {
            throw new Error ('The new passwords entered do not match.')
          }
        }
        catch (error) {
          errorMsg += ' ' + error + ' '
        }
      }
      // modified user datas
      if (errorMsg === '') {
        const responesUserDatas = await fetch(process.env.REACT_APP_URL+'/users/token/'+cookies.login, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const valuesUserDatas = await responesUserDatas.json()
        
        let modForm = {
          username: form.username,
          email: form.email
        }
        if (divButton) { modForm['password'] = form.newrepassword }

        const response = await fetch(process.env.REACT_APP_URL+'/users/'+valuesUserDatas._id, {
          method: 'PATCH',
          body: JSON.stringify(modForm),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const resData = await response.json()
        
        Object.keys(resData).forEach(key => {
          if (key === 'error') { setMsg({msg: resData.error, style:'text-red-600' }) }
          if (key === 'success') { 
            setMsg({msg: resData.success, style:'text-green-500'})
            setReload(true) 
          }
        })
        
      } else {
        setMsg({ msg: errorMsg, style: 'text-red-600'})
      }

    } else {
      errorMsg = 'You entered an incorrect password!'
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
            </div>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <label className='inline-block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label> <label className="inline-block ml-5 text-zinc-400 text-xs">Enter your password to edit</label>
                <input type='password' name='password' ref={inputPassword} onChange={handleForm} placeholder='' className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required={true} />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
                <input type='text' name='username' id='username' ref={inputUsername} onChange={handleForm} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='username' autoComplete='off' required={true} />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                <input type='text' name='email' ref={inputEmail} onChange={handleForm} className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='email' autoComplete='off' required={true} />
              </div>

              <div id="button-newpassword" className=" text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:cursor-pointer" onClick={() => setDivButton(!divButton)}>New Password</div>
              {divButton ? (
                <div id="div-newpassword" className="p-5 bg-slate-100 rounded-lg border border-slate-300">
                  <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>New Password</label>
                    <input type='password' name='newpassword' ref={inputNewPassword} onChange={handleForm} placeholder='' className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-300 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                  </div>
                  <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Repeat new password</label>
                    <input type='password' name='newrepassword' ref={inputNewRePassword} onChange={handleForm} placeholder='' className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                  </div>
                </div>
              ) : (<></>) }
              <div className='p-3'>
                {msg && <div className={`text-center ${msg.style}`}>{msg.msg}</div>}
              </div>
              <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Save Changes</button>
            </form>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default Profil;