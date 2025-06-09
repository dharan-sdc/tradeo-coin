import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { store } from '@/State/Store'
import { withdrawalRequest } from '@/State/Withdrawal/Action'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify' // For displaying notifications

const WithdrawalForm = () => {
  const dispatch = useDispatch()
  const { wallet, withdrawal } = useSelector(store => store)

  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setAmount(e.target.value)
    setError('')  // Reset the error message when the user changes the input
  }

  const handleSubmit = (e) => {
    e.preventDefault()  // Prevent default form submission behavior

    // Validation checks
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid withdrawal amount greater than zero.')
      return
    }

    if (Number(amount) > wallet.userWallet.balance) {
      setError('You do not have enough balance to withdraw this amount.')
      return
    }

    if (!withdrawal.paymentDetails?.bankName || !withdrawal.paymentDetails?.accountNumber) {
      setError('Please link your bank account before withdrawing.')
      return
    }

    // If all validations pass, proceed with the withdrawal
    dispatch(withdrawalRequest({ amount, jwt: localStorage.getItem("jwt") }))
    toast.success('Withdrawal request submitted successfully!')
    setError('')  // Clear error after successful submission
  }

  return (
    <div className='pt-10 space-y-5'>
      <div className='flex justify-between items-center rounded-md bg-gray-400 text-xl font-bold px-5 py-4'>
        <p>Available Balance</p>
        <p>₹ {wallet.userWallet.balance}</p>
      </div>

      <div className='flex flex-col items-center'>
        <h1>Enter Withdrawal amount</h1>
        <div className='flex items-center justify-center'>
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
            placeholder="₹999"
            type="number"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}  {/* Error Message */}
      </div>

      <div>
        <p className='pb-2'>Transfer To ..</p>
        <div className='flex items-center gap-5 border px-5 py-2 rounded-md'>
          <img className='h-8 w-8' src="https://www.pngarts.com/files/6/Vector-Bank-PNG-Pic.png" alt="" />
          <div>
            <p className='text-xl font-bold'>{withdrawal.paymentDetails?.bankName}</p>
            <p className='text-xs'>
              {withdrawal.paymentDetails?.accountNumber
                ? `**** **** **** ${withdrawal.paymentDetails.accountNumber.slice(-4)}`
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <DialogClose className='w-full'>
        <Button onClick={handleSubmit} className="w-full py-7 text-xl">Withdraw</Button>
      </DialogClose>
    </div>
  )
}

export default WithdrawalForm
