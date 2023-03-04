import React from 'react'
import { NavLink, Outlet } from "react-router-dom"

import Dropdown from './Dropdown';

export default function RootIndex() {
    return (
        <div className="container max-w-4xl mx-auto px-0">
            <header className="mt-10">
                <nav className="flex items-center justify-between bg-slate-400 text-center rounded-t-lg">
                    <div className='bg-orange-400 rounded-tl-lg'>
                        <h3 className='p-3 font-bold'>FruitWeb</h3>
                    </div>
                    <span className='ml-2 mr-2'><NavLink to="/">Home</NavLink></span>
                    <span className='ml-2 mr-2'><NavLink to="/about">About</NavLink></span>
                    <span className='ml-2 mr-2'><NavLink to="/game">Game</NavLink></span>
                    <span className='ml-2 mr-2'><NavLink to="/registration">Registration</NavLink></span>
                    <span className='ml-2 mr-2'><NavLink to="/login">Login</NavLink></span>
                    
                    <div className='flex mr-1 bg-green-600'>
                        <Dropdown  />
                    </div>
                </nav>
            </header>

            <main className='p-5 rounded bg-white'>
                <Outlet />
            </main>

            <footer className='p-3 bg-slate-400 rounded-b-lg'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia fugit molestias accusantium, cupiditate ea incidunt laborum sunt earum laudantium iure.</p>
            </footer>
        </div>
    )
}