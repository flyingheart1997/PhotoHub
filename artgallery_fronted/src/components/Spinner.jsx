import React from 'react'
import { Bars } from 'react-loader-spinner'

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center my-40 items-center w-full h-full'>
      <Bars 
        type="Bars"
        color="blue"
        height={70}
        width={300}
        arialLabel='loading'
        className="m-5"
      />
 
      <p className="text-lg text-center px-2">'{message}'</p>
    </div>
  )
}

export default Spinner;
