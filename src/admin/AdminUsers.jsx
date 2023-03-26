import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppContext } from '../variables'

export function AdminUsers() {

  const { cookies, setCookie, user, setUser, reload, setReload } = useAppContext()
  const [authorize, setAuthorize] = useState(false)
  const [users, setUsers] = useState([{}])
  const [msg, setMsg] = useState({ msg: '', style: 'text-green-600' })

  const navigate = useNavigate()

  useEffect(() => {
    console.log('useEffect... AdminUsers');    
    
    // Only logined user
    if (user.rank == 'admin') {
      setAuthorize(true)
    } else { 
      navigate("/") 
    }

    getUsers()
    setReload(false)
  }, [reload, msg])

  const handleReload = async () => {
    setMsg({ msg: cookies.login, style: 'text-orange-500' });
    console.log(cookies.login);
    //const d = new Date(); let time = d.getTime();
    setReload(true);
  }
  
  const getUsers = async () => {
    console.log('elötte');
    console.log(cookies.login);
    const response = await fetch(process.env.REACT_APP_URL + '/allusers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': cookies.login
      }
    });
    const data = await response.json()
    if (!data.error) {
      setUsers(data)
    } else {
      //LogOut
      setUser({})
      setCookie('login', '', { path: '/' })
      sessionStorage.setItem('regForm', null)
      navigate("/")
    }
  }

  // DELETE USER
  const handleDelete = async (e, delId) => {
    const response = await fetch(process.env.REACT_APP_URL + '/users/' + delId, {
      method: 'DELETE'
    })

    const resData = await response.json()

    Object.keys(resData).forEach(key => {
      if (key === 'deletedCount') {
        if (resData.deletedCount === 0) {
          setMsg({ msg: 'Nothing delete.', style: 'text-orange-500' });
        } else {
          setMsg({ msg: 'User has deleted!', style: 'text-green-500' });
        }
      }
    })
  }

  return (
    <>
    { authorize && (
      <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mx-auto mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">RANK</th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user._id + user.username} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.rank}</td>
                <td className="px-6 py-4"><button className="bg-orange-500 text-white w-full rounded-lg p-0.5 hover:bg-red-600" onClick={((e) => handleDelete(e, user._id))}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={`pt-3 text-center ${msg.style}`}>{msg.msg}</div>
        <div className="p-3 text-center">
          <button className="w-full bg-purple-400 text-sm py-2.5 rounded-lg" onClick={handleReload}>Reload button</button>
        </div>
      </div>
    ) }
    </>
  )
}