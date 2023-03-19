import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../variables'
import { loadUserDetails } from "../functions"

import Dropdown from './Dropdown'
import MenuList from './MenuList'

export default function RootIndex() {
  
  const { user, setUser, reload, setReload, cookies, setCookies } = useAppContext()
  const [menuOpen, setMenuOpen] = useState('hidden')

  useEffect(() => {
    setReload(false)

    console.log('useEffect... ROOT INDEX')

    console.log('cookie valós értéke: '+ cookies.login)
    
    let loginCookie = (cookies.login) ? cookies.login : null;
    if (loginCookie) {
      console.log('ROOT SET cookie :'+ cookies.login)
      /*
      (async () => {
        let userData = await loadUserDetails(cookies.login)    
        
        setUser({
          username: userData.username,
          email: userData.email,
          rank: userData.rank,
        })

      })
      */
      
    }

    console.log('username: ' + user.username)
    console.log('email: ' + user.email)
    console.log('rank: ' + user.rank)

  }, []);

  const hamburgerClick = () => {
    let value = (menuOpen === 'hidden') ? 'show' : 'hidden'; 
    setMenuOpen(value);
  }

  return (
    <div className='container max-w-4xl mx-auto px-0'>
      <div>user: {user.username} </div>
      <div>cookie: {cookies.login} </div>
      <header className='mt-10'>
        <nav className='flex items-center justify-between bg-slate-400 text-center rounded-t-lg'>
          <div className='bg-orange-400 rounded-tl-lg'>
            <h3 className='p-3 font-bold'>FruitWeb</h3>
          </div>
          <div className='hidden lg:flex'>
            <MenuList display={'inline ml-5'} />
          </div>

          <div className='flex lg:hidden' onClick={hamburgerClick}>
            <div className='space-y-2'>
              <span className='block w-8 h-0.5 bg-gray-700 animate-pulse'></span>
              <span className='block w-8 h-0.5 bg-gray-700 animate-pulse'></span>
              <span className='block w-8 h-0.5 bg-gray-700 animate-pulse'></span>
            </div>
          </div>
          <div className='flex mr-2 bg-green-600'>
            <Dropdown />
          </div>
        </nav>
        <div className={`${menuOpen} lg:hidden bg-gray-300 text-center p-4 space-y-4`}>
          <MenuList display={'block'} />
        </div>
      </header>

      <main className='p-5 rounded bg-white'>
        <Outlet />
      </main>

      <footer className='p-3 bg-slate-400 rounded-b-lg mb-10'>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia fugit molestias accusantium, cupiditate ea incidunt laborum sunt earum laudantium iure.</p>
      </footer>
    </div>
  )
}