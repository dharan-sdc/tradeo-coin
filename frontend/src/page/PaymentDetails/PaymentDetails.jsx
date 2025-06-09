import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import PaymentDetailsForm from './PaymentDetailsForm'
import { Button } from '@/components/ui/button'
import { store } from '@/State/Store'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentDetails } from '@/State/Withdrawal/Action'
import { Badge } from '@/components/ui/badge'
import { VerifiedIcon } from 'lucide-react'

const ReferAndEarn = ({ referralCode, earnings }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral Code Copied!");
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <div className="max-w-lg mx-auto p-6">
      <Card className="shadow-lg rounded-2xl p-4 bg-white">
        <CardContent className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Refer & Earn</h2>
          <p className="text-gray-600 text-center mb-4">
            Share your referral code and earn rewards when your friends sign up!
          </p>
          <div className="bg-gray-200 px-4 py-2 rounded-lg flex items-center justify-between w-full">
            <span className="text-lg font-semibold">{referralCode}</span>
            <Button onClick={handleCopy} className="ml-2">
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="text-lg font-semibold text-green-600 mt-4">
            Earnings: ${earnings}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};


const PaymentDetails = () => {

  const { withdrawal } = useSelector(store => store);
    const { auth } = useSelector(store => store)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }))

  }, [])

  const referralCode = auth.user?.referralCode || "TRADEO48097";
  const earnings = auth.user?.earnings || 0;

  console.log("Payment --- ", withdrawal.paymentDetails)
  return (
    <div className='px-20'>
      <h1 className='text-3xl font-bold py-10'>TradeO Deposit Fund Bank Details</h1>

      {withdrawal.paymentDetails ? (
        <Card className="border border-gray-300 shadow-lg rounded-xl p- bg-white">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                <span className="text-lg font-bold text-gray-800">Payment Details</span>
                <Badge className="flex items-center gap-2 px-3 py-1 text-white bg-green-600 rounded-lg shadow-md">
                  <span className="text-sm font-medium">Enabled</span>
                  <VerifiedIcon className="w-4 h-4" />
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center border-b pb-2">
              <p className="w-40 text-gray-700 font-medium">Account Number</p>
              <p className="text-gray-500">
                : {withdrawal.paymentDetails?.accountNumber
                  ? `**** **** **** ${withdrawal.paymentDetails.accountNumber.slice(-4)}`
                  : 'N/A'}
              </p>
            </div>

            <div className="flex items-center border-b pb-2">
              <p className="w-40 text-gray-700 font-medium">A/C Holder Name</p>
              <p className="text-gray-500">: {withdrawal.paymentDetails?.accountHolderName || 'N/A'}</p>
            </div>

            <div className="flex items-center border-b pb-2">
              <p className="w-40 text-gray-700 font-medium">Bank Name</p>
              <p className="text-gray-500">: {withdrawal.paymentDetails?.bankName || 'N/A'}</p>
            </div>

            <div className="flex items-center">
              <p className="w-40 text-gray-700 font-medium">IFSC Code</p>
              <p className="text-gray-500">: {withdrawal.paymentDetails?.ifsc || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>

      ) : (
        <Dialog >
          <DialogTrigger >
            <Button className='py-6 mt-2'>Add payment details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>

            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>)
      }

      {/* Refer & Earn */}
      <ReferAndEarn referralCode={referralCode} earnings={earnings} />

    </div >
  )
}

export default PaymentDetails