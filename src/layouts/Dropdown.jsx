import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppContext } from "../variables";

export default function Dropdown() {

  const {cookies, setCookie, user, setUser } = useAppContext();

  const navigate = useNavigate();

  const menuStyle = 'bg-white text-gray-700 block px-4 py-2 text-sm rounded-lg'

  const handleLogOut = () => {
    setUser({})
    setCookie('login', '', { path: '/' })
    sessionStorage.setItem('regForm', null)
    navigate("/")
  }

  let buttonStyle = "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";

  let buttonStyleBg = (user.username) ? ' bg-green-400 hover:bg-green-500' : ''; 

  return (
    <Menu as="div" className="relative inline-block text-right">
      <div>
        <Menu.Button className={`${buttonStyle} ${buttonStyleBg}`}>
          {user.username ? (<>{user.username}</>) : (<>Login</>)}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items 
        className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            { cookies.login ? ( 
              <>
               { user.rank && ( 
                <Menu.Item>
                  <NavLink to="/admin" className={ menuStyle + ' text-red-600 font-bold' } >Admin</NavLink>
                </Menu.Item>
                ) }
              
              <Menu.Item>
                <NavLink to="/profil" className={ menuStyle } >Profil</NavLink>
              </Menu.Item>

              <Menu.Item>
                <NavLink to="/" onClick={handleLogOut} className={ menuStyle } >Logout</NavLink>
              </Menu.Item>
              </>
            ) : (
              <>
              <Menu.Item>
                <NavLink to="/login" className={ menuStyle } >Login</NavLink>
              </Menu.Item>

              <Menu.Item>
                <NavLink to="/registration" className={ menuStyle } >Registration</NavLink>
              </Menu.Item>
              </>
              )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
