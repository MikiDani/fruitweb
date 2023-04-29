import {React, useState} from 'react'

export default function Home() {
  
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random()*8)+1)

  return (
    <>
      <div className='text-center'>
        <h3><strong>HOME</strong></h3>
      </div>
      <div className='pl-20 pr-20 mt-3'>
        <div className='text-center'>Fruit {randomNum}.</div>
          <img src={`./img/fruit${randomNum}.jpg`} onClick={(e) => setRandomNum(Math.floor(Math.random()*8)+1)} alt="bg" title='bg' className='grayscale-0 hover:grayscale-[50%] transition delay-150 rounded-lg' />
      </div>
    </>
  )
}