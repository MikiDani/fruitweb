import React from 'react'

export default function Home() {
  return (
    <>
    <h3>HOME</h3>
    <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-100 text-center">01</div>
        <div className="bg-orange-100 text-center">02</div>
        <div className="bg-orange-100 text-center">03</div>
        <div className="col-span-2 ">04</div>
    </div>
    <div className='pl-40 mt-3'>
        <img src="./img/01.jpg" alt="bg" title='bg' className='grayscale hover:grayscale-0 transition delay-150 rounded-lg' />
    </div>
    </>
  )
}