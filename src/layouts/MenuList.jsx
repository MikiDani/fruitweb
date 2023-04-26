import { NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { AiOutlineHome, AiFillBuild } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import { FaRegAddressCard } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

import { useAppContext } from "../variables";

export default function MenuList({display}) {
  
  const { cookies } = useAppContext()

  let design = 'hover:font-bold';
  
  return (
    <IconContext.Provider value={{ size: '1.5rem', color: 'white' }}>
      <div className={`${display} ${design}`}><AiOutlineHome className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/'>Home</NavLink></span></div>
      <div className={`${display} ${design}`}><AiFillBuild className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/about'>About</NavLink></span></div>
      {cookies.login ? (
        <div className={`${display} ${design}`}><CgProfile className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/profil'>Profil</NavLink></span></div>
        ) : (
          <>
          <div className={`${display} ${design}`}><FiLogIn className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/login'>Login</NavLink></span></div>
          <div className={`${display} ${design}`}><FaRegAddressCard className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/registration'>Registration</NavLink></span></div>
          </>
      )}
    </IconContext.Provider>
  )
}