import React from 'react'
import { useState } from 'react';

export default function Game() {

  const [menuOpen, setMenuOpen] = useState("false")

  return (
    <>
    <div className='menuAnim bg-green-300 p-3'>Animate</div>
    </>
  );
}