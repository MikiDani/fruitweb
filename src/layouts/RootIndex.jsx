import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { useAppContext } from '../variables'
import { GiFruitBowl } from 'react-icons/gi'

import Dropdown from './Dropdown'
import MenuList from './MenuList'

export default function RootIndex() {
  
  const { setUser, setReload, cookies, setCookie } = useAppContext()
  const [ menuOpen, setMenuOpen] = useState('hidden')
  const [ waiter, setWaiter] = useState(false)

  const navigate = useNavigate()

  const auntAndUserdata = async (token) => {
    const auth = await fetch(process.env.REACT_APP_URL + '/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    })
    const resData = await auth.json()
    if (resData.auth) {
      // Correct token. Get user Datas
      fetch(process.env.REACT_APP_URL + '/users/token/' + cookies.login, { method: 'GET' })
      .then((response) => response.json())
      .then((resData) => {
        const userData = {
            id : resData._id,
            username: resData.username,
            email: resData.email,
            rank: resData.rank,
        }
        // insert user datas
        setUser(userData)
      })
    } else {
      // the token was awarded
      setUser({})
      setCookie('login', '', { path: '/' })
      sessionStorage.setItem('regForm', null)
      navigate("/login")
    }
  }

  useEffect(() => {
    setReload(false)

    setInterval(() => {
      setWaiter(!waiter)
    }, 180000)
    
    let loginCookie = (cookies.login) ? cookies.login : null;
    if (loginCookie) {
      auntAndUserdata(cookies.login)
    }

  }, [waiter]);

  const hamburgerClick = () => {
    let value = (menuOpen === 'hidden') ? 'show' : 'hidden'; 
    setMenuOpen(value);
  }

  return (
    <div className='container max-w-4xl mx-auto px-0'>
      <header className='mt-10'>
        <nav className='flex items-center justify-between bg-indigo-300 text-center rounded-t-lg'>
          <div className='bg-orange-400 rounded-tl-lg'>
            <h3 className='p-3 font-bold'>FruitWeb <GiFruitBowl className='inline-block' /></h3>
          </div>
          <div className='hidden md:flex'>
            <MenuList display={'inline ml-5'} />
          </div>
          <div className='flex md:hidden' onClick={hamburgerClick}>
            <div className='space-y-2'>
              <span className='block w-8 h-0.5 bg-gray-700 animate-pulse'></span>
              <span className='block w-8 h-0.5 bg-gray-700 animate-pulse'></span>
              <span className='block w-8 h-0.5 bg-gray-700 animate-pulse'></span>
            </div>
          </div>
          <div className='flex mr-2'>
            <Dropdown />
          </div>
        </nav>
        <div className={`${menuOpen} md:hidden bg-lime-300 text-center p-4 space-y-4`}>
          <MenuList display={'block'} />
        </div>
      </header>

      <main className='p-5 rounded bg-white'>
        <Outlet />
      </main>
      
      <footer className='p-3 bg-indigo-300 rounded-b-lg mb-10'>
        <div className="grid grid-cols-3 gap-4">
          <div className='text-yellow-100 bg-purple-500 rounded-lg'>
            <ul className='p-3 ml-5 list-disc text-start text-sm'>
              <li className='text-white hover:text-indigo-200'><NavLink to='/'>Home</NavLink></li>
              <li className='text-white hover:text-indigo-200'><NavLink to='/about'>About</NavLink></li>
              <li className='text-white hover:text-indigo-200'><NavLink to='/login'>Login</NavLink></li>
              <li className='text-white hover:text-indigo-200'><NavLink to='/registration'>Registration</NavLink></li>
            </ul>
          </div>
          <div className='flex justify-center items-center p-3 text-center bg-green-500 rounded-lg'>
            <ul className='text-xs'>
              <li className='uppercase'>open source authentication mini-interface</li>
              <li className='p-2'><a className='text-white hover:text-orange-500' href='mailto:free.ingyenes@gmail.com'>free.ingyenes@gmail.com</a></li>
              <li><a className='text-white hover:text-orange-500' href="https://github.com/MikiDani" target="_blank">github.com/MikiDani</a></li>
            </ul>
          </div>
          <div className='p-3 bg-yellow-300 rounded-lg flex justify-center items-center'>
            <p className='text-sm'>It is an mini authentication interface. Prepared framework width <a className='font-semibold hover:text-teal-600' href='https://legacy.reactjs.org/' target='_blank'>React</a> and <a className='font-semibold hover:text-cyan-600' href='https://tailwindcss.com/' target='_blank'>Tailwind</a> and <a className='font-semibold hover:text-lime-400' href='https://www.mongodb.com/' target='_blank'>MongoDB</a>.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}