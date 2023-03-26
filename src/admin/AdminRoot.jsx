import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppContext } from '../variables'

import { AdminMenu } from './AdminMenu'
import { AdminUsers } from './AdminUsers'
import { AdminProducts } from './AdminProducts'

export default function AdminRoot() {

  const { cookies, user, setUser } = useAppContext()
  const [inc, setInc] = useState('menu')
  const navigate = useNavigate()

  useEffect(() => {
    console.log('useEffect... AdminRoot');

    if (!cookies.login) { navigate("/") }
    
  }, [])

  const menuSelectedColor = (value) => {
    const returnValue = (value === inc) ? 'bg-orange-400' : 'bg-orange-200';
    return returnValue;
  }
  
  let style = `pt-2 pb-2 pl-4 pr-4 ml-1 mr-1 rounded-2xl hover:bg-orange-400`
  console.log(style);

  return (
    <>
    { cookies.login && ( 
      <>
        <nav className='text-center'>
          <button className={`${style} ${menuSelectedColor('menu')}`} onClick={() => setInc('menu')}>Menu</button>
          <button className={`${style} ${menuSelectedColor('users')}`} onClick={() => setInc('users')}>Users</button>
          <button className={`${style} ${menuSelectedColor('products')}`} onClick={() => setInc('products')}>Products</button>
        </nav>
          { (inc == 'menu') ? <AdminMenu/> : (<></>)}
          { (inc == 'users') ? <AdminUsers/> : (<></>)}
          { (inc == 'products') ? <AdminProducts/> : (<></>)}
      </>
    ) }
    </>
  )
}