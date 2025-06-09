import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const Notfound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-3xl text-center'>
      <Avatar className="w-20 h-20 mb-4">
        <AvatarImage src="https://static.vecteezy.com/system/resources/previews/021/016/948/original/trading-icon-trading-graphic-symbol-trade-logo-design-trade-mark-logo-vector.jpg" />
      </Avatar>
      <div className="flex gap-1 items-center">
        <span className='font-bold text-blue-600'>TradeO</span>
        <span>Trade</span>
      </div>
      <p className="text-lg text-gray-500 mt-2">Please wait...</p>
    </div>
  )
}

export default Notfound
