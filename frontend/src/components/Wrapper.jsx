import React from 'react'
import { cn } from '../lib/utils'

const Wrapper = ({children, className}) => {
  return (
    <div className={cn("max-w-[1400px] mx-auto p-4", className)}>
       {children}
    </div>
  )
}

export default Wrapper
