import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Dropdown from './Dropdown'
import MenuList from './MenuList'

export default function RootIndex() {

  const [menuOpen, setMenuOpen] = useState('hidden')

  const hamburgerClick = () => {
    let value = (menuOpen == 'hidden') ? 'show' : 'hidden'; 
    setMenuOpen(value);
  }

  return (
    <div className='container max-w-4xl mx-auto px-0'>
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
          <div className='flex mr-1 bg-green-600'>
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