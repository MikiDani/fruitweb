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
    'child': [{
        'id': 1,
        'deep': 1,
        'name': 'cars',
        'child': [{
                'id': 2,
                'deep': 2,
                'name': 'ford',
                'row': 0,
            },
            {
                'id': 3,
                'deep': 2,
                'name': 'citroen',
            }
        ]
    }]
},
{
    'id': 4,
    'deep': 0,
    'name': 'SECOND',
    'child': [{
        'id': 15,
        'deep': 1,
        'name': 'Instruments',
        'child': [{
            'id': 17,
            'deep': 2,
            'name': 'plucked',
            'child': [{
                'id': 18,
                'deep': 3,
                'name': 'guitar',
            }]
        }]
    }]
},
{
    'id': 5,
    'deep': 0,
    'name': 'THIRD',
    'child': [{
            'id': 6,
            'deep': 1,
            'name': 'fruits',
            'child': [{
                    'id': 7,
                    'deep': 2,
                    'name': 'apple',
                    'child': [{
                            'id': 9,
                            'deep': 3,
                            'name': 'red-apple',
                            'child': [{
                                'id': 16,
                                'deep': 4,
                                'name': 'big-apple',
                            }]
                        },
                        {
                            'id': 10,
                            'deep': 3,
                            'name': 'green-apple',
                        }
                    ]
                },
                {
                    'id': 8,
                    'deep': 2,
                    'name': 'apricot',
                }
            ]
        },
        {
            'id': 11,
            'deep': 1,
            'name': 'foods',
            'child': [{
                    'id': 12,
                    'deep': 2,
                    'name': 'cake',
                },
                {
                    'id': 13,
                    'deep': 2,
                    'name': 'hamburger',
                }
            ]
        },
        {
            'id': 14,
            'deep': 1,
            'name': 'basics',
        }
    ]
}
];

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