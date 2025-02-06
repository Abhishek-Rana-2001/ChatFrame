import React from 'react'
import Wrapper from './Wrapper'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='fixed top-0 p-4 left-0 w-full'>
        <Wrapper className={"flex justify-between items-center p-0 md:p-4 "}>
            <div className='text-4xl text-[#5765C5] font-semibold'>ChatFrame</div>
        </Wrapper>
    </div>
  )
}

export default Header
