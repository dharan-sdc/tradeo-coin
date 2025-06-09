import { AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getUserAssets } from '@/State/Asset/Action'
import { store } from '@/State/Store'
import { Avatar } from '@radix-ui/react-avatar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Portfolio = () => {
  const asset = useSelector(store => store.asset)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")))
  }, [])

  console.log("Asset display : ", asset?.userAssets)

  return (
    <div className='p-5 lg:p-20'>
      <h1 className='font-bold text-3xl pb-5'>Portfolio</h1>

      <div className="border border-gray-200 rounded overflow-hidden">
        {asset?.userAssets?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assets</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Buy Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Change(%)</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {asset.userAssets.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className='-z-50 w-8 h-8'>
                      <AvatarImage src={item.coin?.image || '/default-image.png'} alt="Asset" />
                    </Avatar>
                    <span className='font-bold font-serif'>{item.coin?.name || "Unknown"}</span>
                    <span className='font-medium font-mono'>{item.coin?.symbol || "--"}</span>
                  </TableCell>
                  <TableCell>₹{item.coin?.current_price ?? "--"}</TableCell>
                  <TableCell>{item.quantity ?? "--"}</TableCell>
                  <TableCell>₹{item.buyPrice ?? "--"}</TableCell>
                  <TableCell>{item.coin?.price_change_24h ?? "--"}</TableCell>
                  <TableCell>{item.coin?.price_change_percentage_24h ? `-${item.coin.price_change_percentage_24h}` : "--"}</TableCell>
                  <TableCell className="text-right">{item.coin?.total_volume ?? "--"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-5 text-center text-gray-500">
            <p className="text-lg font-semibold">No assets found</p>
            <p>Start investing to see your portfolio here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Portfolio
