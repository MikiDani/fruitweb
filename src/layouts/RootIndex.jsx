import React from 'react'
import { NavLink, Outlet } from "react-router-dom"

export default function RootIndex() {
    return (
        <div className="container max-w-4xl mx-auto px-0 bg-white">
            <header className="mt-10">
                <nav className="flex items-center justify-between bg-slate-400 text-center">
                    <div className='bg-orange-400'>
                        <h3 className='p-3 font-bold'>FruitWeb</h3>
                    </div>
                    <span className='ml-2 mr-2'><NavLink to="/">Home</NavLink></span>
                    <span className='ml-2 mr-2'><NavLink to="about">About</NavLink></span>
                    <span className='ml-2 mr-2'><NavLink to="game">Game</NavLink></span>
                    <span className='ml-2 mr-2'><NavLink to="game">Próba</NavLink></span>
                    <NavLink to="login">
                    <div className='flex bg-green-600'>
                        <h3 className='p-3 font-bold'>Login</h3>
                    </div>
                    </NavLink>
                </nav>
            </header>

            <main className='p-5 rounded'>
                <Outlet />
            </main>

            <footer className='p-3 bg-slate-400 rounded-b-lg'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia fugit molestias accusantium, cupiditate ea incidunt laborum sunt earum laudantium iure.</p>
            </footer>
        </div>
    )
}