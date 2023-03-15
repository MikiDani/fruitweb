import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppContext } from '../variables'

export default function Registration() {

  const { cookies, user, setUser } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('useEffect... Admin');

    if (!cookies.login) { navigate("/") }
    
  }, [])

  return (
    <>
    { cookies.login && ( 
        <>ADMIN</>
    ) }
    </>
  )
}