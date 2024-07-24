import React from 'react'

const InformationContainer = (props) => {
    const {heading, content} = props;
  return (
    <div className='w-full sm:h-[80%] flex h-full justify-center items-center'>
        <div className='w-[299px] sm:w-full h-full px-10 sm:px-0 flex flex-col sm:justify-start sm:items-center gap-4 sm:gap-2 pt-9 sm:pt-4'>
            <p className='text-gray-500 text-[14px] font-semibold tracking-widest'>{heading}</p>
            <h4 className='text-black text-[25px] font-medium leading-7 sm:text-center'>{content}</h4>
        </div>
        <div className='w-[1px] h-[70px] bg-gray-400 sm:hidden'></div>
    </div>
  )
}

export default InformationContainer