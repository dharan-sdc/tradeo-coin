import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '@/State/Store'
import { updateProfile } from "@/State/Auth/Action"

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VerifiedIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import AccountVerificationForm from './AccountVerificationForm'
import { UploadIcon } from '@radix-ui/react-icons'
import TopupForm from '../Wallet/TopupForm'



const Profile = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(store => store)
  const { withdrawal } = useSelector(store => store);
  const wallet = useSelector(store => store.wallet)
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false); // Track status

  const handleVerificationSuccess = () => {
    localStorage.setItem("isTwoFactorEnabled", "true");
    setIsTwoFactorEnabled(true);
  };

  useEffect(() => {
    const storedStatus = localStorage.getItem("isTwoFactorEnabled");
    if (storedStatus === "true") {
      setIsTwoFactorEnabled(true);
    }
  }, []);


  // Local state for profile updates
  const [profileData, setProfileData] = useState({
    dateOfBirth: auth.user?.dateOfBirth || "",
    nationality: auth.user?.nationality || "",

    city: auth.user?.city || "",
    postcode: auth.user?.postcode || "",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleSaveProfile = () => {
    dispatch(updateProfile(profileData))
    setIsTwoFactorEnabled(true);
  }



  return (
    <div className='flex flex-col items-center mb-5'>
      <div className='pt-10 w-full lg:w-[60%]'>
        <Card>
          <CardHeader className="pb-6">
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='lg:flex gap-32'>
              <div className='space-y-5'>
                <div className='flex'>
                  <p className='w-[9rem]'>Email:</p>
                  <p className='text-gray-500'>{auth.user?.email}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Full Name:</p>
                  <p className='text-gray-500'>{auth.user?.fullName}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Date of Birth:</p>
                  <p className='text-gray-500'>{profileData.dateOfBirth || "dd : mm : yyyy"}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Nationality:</p>
                  <p className='text-gray-500'>{profileData.nationality || "Indian"}</p>
                </div>
              </div>
              <br />
              <div className='space-y-5'>

                <div className='flex'>
                  <p className='w-[9rem]'>City:</p>
                  <p className='text-gray-500'>{profileData.city || "xxx city"}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Postcode:</p>
                  <p className='text-gray-500'>{profileData.postcode || "*** ***"}</p>
                </div>
                <div className='flex'>
                  <p className='w-[9rem]'>Country:</p>
                  <p className='text-gray-500'>India</p>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <Dialog>
                <DialogTrigger>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogDescription>Update your personal information.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleInputChange} placeholder="Date of Birth" />
                    <Input name="nationality" value={profileData.nationality} onChange={handleInputChange} placeholder="Nationality" />

                    <Input name="city" value={profileData.city} onChange={handleInputChange} placeholder="City" />
                    <Input name="postcode" value={profileData.postcode} onChange={handleInputChange} placeholder="Postcode" />
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* 2-Step Verification */}
        <div className="mt-5">
          <Card className="w-full">
            <CardHeader className="pb-5">
              <div className="flex items-center justify-between"> {/* Align Left & Right */}

                {/* Left Side: Name & Badge */}
                <div className="flex items-center gap-3">
                  <CardTitle>2-Step Verification</CardTitle>

                  {isTwoFactorEnabled ? (
                    <Badge className="space-x-2 text-white bg-green-700 flex items-center gap-1">
                      <span>Enabled</span>
                      <VerifiedIcon />
                    </Badge>
                  ) : (
                    <Badge className="bg-purple-800 p-1.5">Disabled</Badge>
                  )}
                </div>

                {/* Right Side: Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>{isTwoFactorEnabled ? "Renew Your Two-Factor" : "Enable Two-Step Verification"}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verify your Account</DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm onVerificationSuccess={handleVerificationSuccess} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Bank details */}
        <div className="mt-5">
          <Card className="w-full">
            <CardHeader className="pb-5">
              <div className="flex items-center justify-between">
                <CardTitle>Bank account</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 p-4 bg-gray-200 rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">

                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-medium">Bank Name:</span>
                  <p className="text-gray-600 font-semibold bg-white px-3 py-1 rounded-md shadow-sm border">
                    {withdrawal.paymentDetails?.bankName || 'N/A'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-medium">IFSC Code:</span>
                  <p className="text-gray-600 font-semibold bg-white px-3 py-1 rounded-md shadow-sm border">
                    {withdrawal.paymentDetails?.ifsc || 'N/A'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-medium">Account No:</span>
                  <p className="text-gray-600 font-semibold bg-white px-3 py-1 rounded-md shadow-sm border">
                    {withdrawal.paymentDetails?.accountNumber
                      ? `**** **** **** ${withdrawal.paymentDetails.accountNumber.slice(-4)}`
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>

          </Card>
        </div>

        {/* Wallet details */}
        <div className="mt-5">
          <Card className="w-full shadow-md rounded-lg bg-gray-200">
            <CardHeader className="pb-3 border-b border-gray-300">
              <div className="flex items-center justify-between">

                {/* Wallet Details & ID (Stacked) */}
                <div className="text-lg font-semibold text-gray-800 flex flex-col gap-1">
                  <span>Wallet Details</span>
                  <p className="text-orange-500 font-bold text-sm">#{wallet.userWallet?.id || "N/A"}</p>
                </div>

                {/* Balance */}
                <div className="flex items-center gap-3">
                  <span className="text-orange-500 font-semibold">Balance:</span>
                  <p className="text-gray-700 font-semibold bg-white px-5 py-1 rounded-md shadow-sm border border-gray-300">
                    {wallet.userWallet?.balance || "0.00"}
                  </p>
                </div>

                {/* Add Money Button */}
                <Dialog>
                  <DialogTrigger>
                    <p className="text-gray-700 font-semibold bg-white px-10 py-1 rounded-md shadow-sm border border-gray-300 hover:bg-orange-400 transition-all cursor-pointer">
                      + Add Money
                    </p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Top Up Your Wallet</DialogTitle>
                    </DialogHeader>
                    <TopupForm />
                  </DialogContent>
                </Dialog>

              </div>
            </CardHeader>
          </Card>
        </div>



      </div>
    </div>
  )
}

export default Profile
