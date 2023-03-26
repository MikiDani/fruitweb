import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppContext } from '../variables'

export function AdminMenu() {

  const { cookies, user, setUser, reload, setReload } = useAppContext()
  const [authorize, setAuthorize] = useState(false)
  const [users, setUsers] = useState([{}])
  const [msg, setMsg] = useState({ msg: 'semmi...', style: 'text-green-600' })

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
    console.log(cookies.login);
    setReload(true);
  }
  
  // DELETE
  const handleAdd = async (e) => {
    console.log('Handle Add...' + e);
  }

  let menus = [
    {
      id: 1,
      deep: 0,
      name: 'elso',
      parent: null
    },
      {
        id: 4,
        deep: 1,
        name: 'elso-elso',
        parent: 1
      },
        {
          id: 6,
          deep: 2,
          name: 'elso-elso-elso',
          parent: 4
        },
      {
        id: 5,
        deep: 1,
        name: 'elso-masodik',
        parent: 1
      },
    {
      id: 2,
      deep: 0,
      name: 'masodik',
      parent: null
    },
    {
      id: 3,
      deep: 0,
      name: 'harmadik',
      parent: null
    }
  ]

  console.log(menus);

  return (
    <>
    { authorize && (
      <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 mx-auto mt-5">

        {menus.map((menu) => (<div className="p-3 bg-green-500">{menu.name}</div>))}
        
        <div className={`pt-3 text-center ${msg.style}`}>{msg.msg}</div>
        <div className="p-3 text-center">
          <button className="w-full bg-yellow-400 text-sm py-2.5 rounded-lg" onClick={handleAdd}>Add button</button>
        </div>
      </div>
    ) }
    </>
  )
}