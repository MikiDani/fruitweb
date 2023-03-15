import React from 'react'

export default function Home() {
  
  let random = Math.floor(Math.random()*6)+1

  return (
    <>
      <h3>HOME</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-orange-100 text-center">01</div>
        <div className="bg-orange-100 text-center">02</div>
        <div className="bg-orange-100 text-center">03</div>
        <div className="bg-orange-100 text-center">04</div>
        <div className="bg-orange-100 text-center col-span-2 ">05</div>
      </div>
      <div className='pl-20 pr-20 mt-3'>
        <div className='text-center'>{random}</div>
        <img src={`./img/flower${random}.jpg`} alt="bg" title='bg' className='grayscale-0 hover:grayscale transition delay-150 rounded-lg' />
      </div>
    </>
  )
}