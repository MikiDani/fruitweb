import { NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { BsFill1CircleFill, BsFill2CircleFill, BsFill3CircleFill, BsFill4CircleFill } from 'react-icons/bs'

export default function MenuList({display}) {
  
  let design = 'hover:font-bold';
  
  return (
    <IconContext.Provider value={{ size: '1.5rem', color: 'white' }}>
      <div className={`${display} ${design}`}><BsFill1CircleFill className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/'>Home</NavLink></span></div>
      <div className={`${display} ${design}`}><BsFill2CircleFill className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/about'>About</NavLink></span></div>
      <div className={`${display} ${design}`}><BsFill3CircleFill className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/game'>Game</NavLink></span></div>
      <div className={`${display} ${design}`}><BsFill4CircleFill className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/registration'>Registration</NavLink></span></div>
      <div className={`${display} ${design}`}><BsFill4CircleFill className='inline-block' /><span className='ml-2 mr-2'><NavLink to='/login'>Login</NavLink></span></div>
    </IconContext.Provider>
  )
}