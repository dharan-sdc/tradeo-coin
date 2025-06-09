import { AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AssetTable = ({ coin, category }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Table className="pl-6">
      <ScrollArea className={`${category == "all" ? "h-[74vh]" : "h-[78vh]"}`}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Coin</TableHead>

            <TableHead>Volume</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>24hrs</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coin.map((item) => <TableRow key={item.id}>
            {/* <TableCell className="font-medium">Bitcoin</TableCell> */}
            <TableCell onClick={() => navigate(`/market/${item.id}`)} className=" flex items-center gap-2">
              <Avatar className='-z-50 w-8 h-8'>
                <AvatarImage src={item.image} />

              </Avatar>
              <span className='font-bold font-serif'>{item.name}</span>
              <span className='font-medium font-mono'>{item.symbol}</span>
            </TableCell>

            <TableCell>{item.total_volume}</TableCell>
            <TableCell>{item.market_cap}</TableCell>
            <TableCell>{item.price_change_percentage_24h
            }</TableCell>
            <TableCell className="text-right">₹{item.current_price}</TableCell>
          </TableRow>)}

        </TableBody>
      </ScrollArea>

    </Table>


  )
}

export default AssetTable