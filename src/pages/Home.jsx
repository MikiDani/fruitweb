import React from 'react'

export default function Home() {
  
  let random = Math.floor(Math.random()*8)+1

  return (
    <>
      <div className='text-center'>
        <h3><strong>HOME</strong></h3>
      </div>
      <div className='pl-20 pr-20 mt-3'>
        <div className='text-center'>Fruit {random}.</div>
        <img src={`./img/fruit${random}.jpg`} alt="bg" title='bg' className='grayscale-0 hover:grayscale transition delay-150 rounded-lg' />
      </div>
    </>
  )
}