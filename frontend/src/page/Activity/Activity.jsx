import { AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllOrdersForUser } from '@/State/Order/Action'
import { calculateProfit } from '@/Utilis/calculateProfit'
import { Avatar } from '@radix-ui/react-avatar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Activity = () => {
  const dispatch = useDispatch()
  const order = useSelector(store => store.order)

  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem('jwt') }))
  }, [dispatch])

  return (
    <div className='p-7 lg:p-20'>
      <h1 className='font-bold text-3xl pb-10'>Activity Space</h1>

      <div className="border border-gray-200 rounded overflow-hidden">
        {order.orders?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Date & Time</TableHead>
                <TableHead>Trading Pair</TableHead>
                <TableHead>Buy Price</TableHead>
                <TableHead>Sell Price</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Profit & Loss</TableHead>
                <TableHead>Hold Volume</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orders.slice().reverse().map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <p>{item.timestamp?.split('T')[0] ?? "--"}</p>
                    <p className='text-gray-400'>{item.timestamp?.split('T')[1]?.split('.')[0] ?? "--"}</p>
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className='-z-50 w-8 h-8'>
                      <AvatarImage src={item.orderItem?.coin?.image || '/default-image.png'} alt="Coin" />
                    </Avatar>
                    <span className='font-bold font-serif'>{item.orderItem?.coin?.name ?? "Unknown"}</span>
                  </TableCell>
                  <TableCell>₹{item.orderItem?.buyPrice ?? "--"}</TableCell>
                  <TableCell>₹{item.orderItem?.sellPrice ?? "--"}</TableCell>
                  <TableCell>{item.orderType ?? "--"}</TableCell>
                  <TableCell>{calculateProfit(item) ?? "--"}</TableCell>
                  <TableCell>{item.orderItem?.quantity ?? "--"}</TableCell>
                  <TableCell className="text-right">₹{item.price ?? "--"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-10 text-center text-gray-500">
            <p className="text-lg font-semibold">No trading activity found</p>
            <p className="text-sm">Start trading to see your activity here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Activity
