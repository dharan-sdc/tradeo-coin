import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { paymentHandler } from '@/State/Wallet/Action'
import { DotFilledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useDispatch } from 'react-redux'

const TopupForm = () => {
  const [amount, setAmount] = React.useState('')
  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = React.useState("RAZORPAY")

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }
  const handleChange = (e) => {
    setAmount(e.target.value)
  }
  const handleSubmit = () => {
    dispatch(paymentHandler({
      jwt: localStorage.getItem("jwt"),
      paymentMethod,
      amount
    }))
    console.log(amount, paymentMethod);
  }
  return (
    <div className='pt-10 space-y-5'>
      <div>
        <h1 className='pb-1'>Enter Amount</h1>
        <Input type='text' onChange={handleChange} className='pb-1 text-lg' placeholder='₹9999' value={amount} />
      </div>
      <div>
        <h1 className='pb-5'>Select payment method</h1>
        <RadioGroup onValueChange={(value) => handlePaymentMethodChange(value)} className="flex" defaultValue="RAZORPAY">

          <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
            <RadioGroupItem icon={DotFilledIcon} className="h-6 w-6"
              value="RAZORPAY" id="r1"
            />

            <Label htmlFor="r1">
              <div className='bg-white rounded-md px-5 py-3 w-32'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="" />
              </div>

            </Label>

          </div>

          <div className='flex items-center space-x-2 border p-3 px-5 rounded-md'>
            <RadioGroupItem icon={DotFilledIcon} className="h-6 w-6" value="STRIPE" id="r2" />

            <Label htmlFor="r2">

              <div className='bg-white rounded-md px-5  w-32'>

                <img className='h-7' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png?20240909030005" alt="" />

              </div>

            </Label>

          </div>
        </RadioGroup>
      </div>
      <Button onClick={handleSubmit} className="w-full py-7">
        Submit
      </Button>
    </div>
  )
}

export default TopupForm