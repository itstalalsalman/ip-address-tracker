import React from 'react'
import arrowLogo from '../assets/icon-arrow.svg';

const InputContainer = (props) => {
  return (
    <div className='w-full h-[50px] flex justify-center items-center'>
          <input
            type='text'
            value={props.input}
            name='inp'
            className='w-[480px] sm:w-[65%] h-[50px] rounded-tl-xl rounded-bl-xl px-6 border-none focus:outline-none'
            placeholder='Search for any IP address or domain'
            onChange={props.change}
            required
          />
          <button
            className='w-[50px] h-[50px] bg-black rounded-tr-xl rounded-br-xl flex items-center justify-center hover:bg-gray-800'
            onClick={props.click}
          >
            <img src={arrowLogo} alt='arrow' />
          </button>
    </div>
  )
}

export default InputContainer