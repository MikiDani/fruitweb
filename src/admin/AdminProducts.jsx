import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppContext } from '../variables'

export function AdminProducts() {

  const { cookies, user, setUser, reload, setReload } = useAppContext()
  const [authorize, setAuthorize] = useState(false)
  const [users, setUsers] = useState([{}])
  const [msg, setMsg] = useState({ msg: '', style: 'text-green-600' })

  const navigate = useNavigate()

  useEffect(() => {
    console.log('useEffect... Admin');    
    
    // Only logined user
    if (user.rank == 'admin') {
      setAuthorize(true)
    } else { 
      navigate("/") 
    }

    setReload(false)
  }, [reload])

  const handleReload = async () => {
    setMsg({ msg: cookies.login, style: 'text-orange-500' });
    setReload(true);
  }
  
  // DELETE
  const handleDelete = async (e) => {
    console.log('Handle Delete...' + e);
  }

  return (
    <>
    { authorize && (
      <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mx-auto mt-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">one</th>
              <th scope="col" className="px-6 py-3">two</th>
              <th scope="col" className="px-6 py-3">button</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user._id + user.username} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4">1.</td>
                <td className="px-6 py-4">2.</td>
                <td className="px-6 py-4"><button className="bg-orange-500 text-white w-full rounded-lg p-0.5 hover:bg-red-600" onClick={((e) => handleDelete(e, user._id))}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={`pt-3 text-center ${msg.style}`}>{msg.msg}</div>
        <div className="p-3 text-center">
          <button className="w-full bg-yellow-400 text-sm py-2.5 rounded-lg" onClick={handleReload}>Reload button</button>
        </div>
      </div>
    ) }
    </>
  )
}