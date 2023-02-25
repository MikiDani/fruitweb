import React from 'react'

export default function Home() {
  return (
    <>
    <h3>HOME</h3>
    <div className="grid grid-cols-4 gap-4">
        <div className="bg-orange-100 text-center">01</div>
        <div className="bg-orange-100 text-center">02</div>
        <div className="bg-orange-100 text-center">03</div>
        <div className="col-span-2 ">04</div>
        <div className="bg-orange-100 text-center">05</div>
        <div className="bg-orange-100 text-center">06</div>
        <div className="bg-orange-300 col-span-2">07</div>
    </div>
    <div className='mt-3'>
        <img src="./img/01.jpg" alt="bg" title='bg' className='grayscale hover:grayscale-0 transition delay-150 rounded-full' />
    </div>
    </>

  )
} 
