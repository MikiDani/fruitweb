import React from 'react'
import { useState } from 'react';

export default function Game() {

  const [menuOpen, setMenuOpen] = useState("false")

  const test = () => {
    window.location.reload(true);
  }

  return (
    <div>
      <button className='bg-red-700 rounded-2xl p-2.5' onClick={test}>Reload</button>
    </div>
  );
}