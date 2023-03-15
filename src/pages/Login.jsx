import React, { useEffect, useState, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { BiDoorOpen } from "react-icons/bi"

import { useAppContext } from "../variables";

export default function Login() {

  //const url = "http://localhost:8080";
  //console.log(process.env.REACT_APP_URL)

  const navigate = useNavigate();

  const { login, setLogin, reload, setReload, setTest } = useAppContext();

  const [form, setForm] = useState({})
  const [users, setUsers] = useState([{}])
  const [msg, setMsg] = useState({ msg:'', style: 'text-green-600'})

  const inputUsernameOrEmail = useRef(null)
  const inputPassword = useRef(null)
  const inputRobotbutton = useRef({checked: false})
  
  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleCheck = (e) => {
    const insert = {
      ...form,
      [e.target.name]: e.target.checked
    }
    setForm(insert)
    sessionStorage.setItem('regForm', JSON.stringify(insert))
  }
  
  // DELETE USER
  const handleDelete = async (e, delId) => {
    const response = await fetch(process.env.REACT_APP_URL+'/users/'+delId, {
      method: 'DELETE'
    })

    const resData = await response.json()
    
    Object.keys(resData).forEach(key => {
      if (key === 'deletedCount') { 
        if (resData.deletedCount === 0) {
          setMsg('Nothing delete.');
        } else {
          setReload(true);
        }
      }
    })
  }

  const handleReload = async () => {
    setMsg('LOGIN handlereload');
    console.log('RELOAD BUTTONNÁL');
    
    const d = new Date();
    let time = d.getTime();

    setTest(time)
    //setReload(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorMsg = ''

    try {
      if (!form.robotbutton) {
        throw new Error ('Robot button is not checked.')
      }
    }
    catch (error) {
      errorMsg += ' ' + error + ' '
    }

    if (errorMsg === '') {

      const response = await fetch(process.env.REACT_APP_URL+'/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const resData = await response.json()

      Object.keys(resData).forEach(key => {
        if (key === 'error') { setMsg({ msg:resData.error, style: 'text-red-600'}) }
        if (key === 'success') { 
          setMsg({msg: resData.success, style:'text-green-500'})
          inputUsernameOrEmail.current.value = ''
          inputPassword.current.value = ''
          inputRobotbutton.current.checked = false

          localStorage.setItem('login', JSON.stringify(resData.success))
          setLogin(resData.success)
          setReload(true)
          navigate("/")
        }
      })

    } else {
      setMsg({ msg: errorMsg, style: 'text-red-600'})
    }
  }

  const getUsers = async () => {
    const response = await fetch(process.env.REACT_APP_URL+'/allusers', {
      method: 'GET'
    });

    const data = await response.json()
    setUsers(data)
  }

  useEffect(() => {
    console.log('useEffect... login');

    if (login) { navigate("/") }
    
    getUsers();
    setReload(false)
    
  }, [reload]);

  return (
    <>
      <div className="flex justify-start bg-white">
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mx-auto">
          <div className="p-6 space-y-4">
            <>
            { login && <h3>{login}</h3> }
            </>
            <h1 className="font-bold text-gray-900 text-2xl dark:text-white">
              Login
            </h1>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username or email</label>
                <input type="text" name="usernameoremail" id="usernameoremail" ref={inputUsernameOrEmail} onChange={handleForm} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username or email" autoComplete="off" required={true} />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" ref={inputPassword} onChange={handleForm} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="robotbutton" name="robotbutton" type="checkbox" ref={inputRobotbutton} onChange={handleCheck} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">I am not a Robot!</label>
                  </div>
                </div>
                <NavLink to='/forgot' className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</NavLink>
              </div>
              <div className='p-3'>
                {msg && <div className={`text-center ${msg.style}`}>{msg.msg}</div>}
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">Don't have an account yet? <NavLink to="/registration" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registration</NavLink>
              </p>
            </form>
          </div>
        </div>
        <div className="hidden lg:block w-1/2 rounded">
          <div className="h-full flex justify-center items-center">
            <BiDoorOpen size='20rem' color="orange" opacity="0.5" />
          </div>
        </div>
      </div>
        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mx-auto mt-5">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">Username</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">RANK</th>
                        <th scope="col" className="px-6 py-3">PASSWORD</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                      <tr key={user._id+user.username} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"></th>
                          <td className="px-6 py-4">{user.username}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.rank}</td>
                          <td className="px-6 py-4">{user.password}</td>
                          <td className="px-6 py-4"><button className="bg-orange-500 text-white w-full rounded-lg p-0.5 hover:bg-red-600" onClick={((e) => handleDelete(e, user._id))}>delete</button></td>
                      </tr>
                    ))}
                </tbody>
            </table>
            <div className="p-3">
              <button className="p-3 bg-purple-400" onClick={handleReload}>Reload button</button>
            </div>
        </div>
    </>
  )
}