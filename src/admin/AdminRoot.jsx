import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

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
  
  let menuList = [{
    'id': 0,
    'deep': 0,
    'name': 'FIRST',
    'parent': null,
    'child': [{
      'id': 1,
      'deep': 1,
      'name': 'cars',
      'parent': 0,
      'child': [{
        'id': 2,
        'deep': 2,
        'name': 'ford',
        'parent': 1
      },
      {
        'id': 3,
        'deep': 2,
        'name': 'citroen',
        'parent': 1
      }]
    }]
    },
    {
      'id': 4,
      'deep': 0,
      'name': 'SECOND',
      'parent': null,
      'child': [{
        'id': 15,
        'deep': 1,
        'name': 'Instruments',
        'parent': 4,
        'child':[{
          'id':17,
          'deep': 2,
          'name': 'plucked',
          'parent': 4,
          'child': [{
            'id':18,
            'deep': 3,
            'name': 'guitar',
            'parent': 4,
          }]
        }]
      }]
    },
    {
    'id': 5,
    'deep': 0,
    'name': 'THIRD',
    'parent': null,
    'child': [{
      'id': 6,
      'deep': 1,
      'name': 'fruits',
      'parent': 5,
      'child': [{
        'id': 7,
        'deep': 2,
        'name': 'apple',
        'parent': 6,
        'child': [{
          'id': 9,
          'deep': 3,
          'name': 'red-apple',
          'parent': 7,
          'child': [{
            'id': 16,
            'deep': 4,
            'name': 'big-apple',
            'parent': 9
          }]
        },
        {
          'id': 10,
          'deep': 3,
          'name': 'green-apple',
          'parent': 7
        }]
      },
      {
        'id': 8,
        'deep': 2,
        'name': 'apricot',
        'parent': 6
      }]
    },
    {
      'id': 11,
      'deep': 1,
      'name': 'foods',
      'parent': 5,
      'child': [{
        'id': 12,
        'deep': 2,
        'name': 'cake',
        'parent': 11
      },
      {
        'id': 13,
        'deep': 2,
        'name': 'hamburger',
        'parent': 11
      }]
    },
    {
      'id': 14,
      'deep': 1,
      'name': 'basics',
      'parent': 5
    }]
  }];

  return (
    <>
    { cookies.login && ( 
      <>
        <nav className='text-center'>
          <button className={`${style} ${menuSelectedColor('menu')}`} onClick={() => setInc('menu')}>Menu</button>
          <button className={`${style} ${menuSelectedColor('users')}`} onClick={() => setInc('users')}>Users</button>
          <button className={`${style} ${menuSelectedColor('products')}`} onClick={() => setInc('products')}>Products</button>
        </nav>
          { (inc === 'menu') ? <AdminMenu menu={menuList}/> : (<></>)}
          { (inc === 'users') ? <AdminUsers/> : (<></>)}
          { (inc === 'products') ? <AdminProducts/> : (<></>)}
      </>
    ) }
    </>
  )
}