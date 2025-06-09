import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getWithdrawalHistory } from '@/State/Withdrawal/Action'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector(store => store);

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")))
  }, [dispatch]);

  return (
    <div className='p-7 lg:p-20'>
      <h1 className='font-bold text-3xl pb-10'>Withdrawal Menu</h1>

      <div className="border border-gray-200 rounded overflow-hidden">
        {withdrawal?.history?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawal.history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <p>{item.date?.toString() ?? "--"}</p>
                  </TableCell>
                  <TableCell>{item.method ?? "Bank Account"}</TableCell>
                  <TableCell>₹{item.amount ?? "0.00"}</TableCell>
                  <TableCell className="text-right">{item.status ?? "Success"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-10 text-center text-gray-500">
            <p className="text-lg font-semibold">No withdrawal history found</p>
            <p className="text-sm">Start withdrawing to see your history here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Withdrawal
