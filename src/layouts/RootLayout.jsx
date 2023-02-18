import React from 'react'
import { NavLink, Outlet } from "react-router-dom"

export default function RootLayout() {
    return (
        <div className="container max-w-4xl mx-auto px-0 bg-white">
            <header className="felx items-center">
                <nav className="flex items-center bg-slate-300 text-center">
                    <div className='col-span-3 text-left bg-red-400'>
                        <h3 className='p-3 font-bold'>MENU</h3>
                    </div>
                    <div className='col-span-6 text-right'>
                        <span className='ml-2 mr-2'><NavLink to="/">Home</NavLink></span>
                        <span className='ml-2 mr-2'><NavLink to="about">About</NavLink></span>
                        <span className='ml-2 mr-2'><NavLink to="game">Game</NavLink></span>
                        <span className='ml-2 mr-2'><NavLink to="login">Login</NavLink></span>
                    </div>
                </nav>
            </header>

            <main className='p-5 rounded'>
                <Outlet />
            </main>

            <div className='p-3 bg-slate-300'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia fugit molestias accusantium, cupiditate ea incidunt laborum sunt earum laudantium iure.</p>
            </div>
        </div>
    )
}