import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useDispatch } from 'react-redux'
import { addPaymentDetails } from '@/State/Withdrawal/Action'
import AccountVerificationForm from './AccountVerificationForm'
import { VerifiedIcon } from 'lucide-react'

// Zod Validation Schema
const paymentSchema = z.object({
  accountHolderName: z.string().min(3, "Account holder name must be at least 3 characters"),
  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code (Example: SBIN0001234)"),
  accountNumber: z.string().min(8, "Account number must be at least 8 digits").max(18, "Account number cannot exceed 18 digits"),
  confirmAccountNumber: z.string(),
  bankName: z.string().min(3, "Bank name must be at least 3 characters"),
}).refine((data) => data.accountNumber === data.confirmAccountNumber, {
  message: "Account numbers do not match",
  path: ["confirmAccountNumber"]
});

const PaymentDetailsForm = () => {
  const dispatch = useDispatch();
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState("");

  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: ""
    }
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const handleVerificationSuccess = () => {
    setIsTwoFactorEnabled(true); 
    setTwoFactorError("");
    setIsDialogOpen(false); 
  };


  const onSubmit = (data) => {
    if (!isTwoFactorEnabled) {
      setTwoFactorError("⚠️ 2-Step Verification is required.");
      return;
    }

    console.log("Payment Details Submitted:", data);
    dispatch(addPaymentDetails({
      paymentDetails: data,
      jwt: localStorage.getItem("jwt")
    }));
  };

  return (
    <div className='px-10 py-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

          {/* Account Holder Name */}
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input className="border w-full border-gray-700 p-5" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IFSC Code */}
          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input className="border w-full border-gray-700 p-5" placeholder="SBIN0001234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Account Number */}
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input className="border w-full border-gray-700 p-5" placeholder="********1307" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Account Number */}
          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number</FormLabel>
                <FormControl>
                  <Input className="border w-full border-gray-700 p-5" placeholder="Re-enter Account Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bank Name */}
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input className="border w-full border-gray-700 p-5" placeholder="Bank Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 2-Step Verification - Mandatory */}
          <div className="mt-6">
            <Card className="w-full">
              <CardHeader className="pb-7">
                <div className="flex items-center gap-3">
                  <CardTitle>2-Step Verification (Required)</CardTitle>
                  {isTwoFactorEnabled ? (
                    <Badge className="space-x-2 text-white bg-green-700">
                      <span>Enabled</span>
                      <VerifiedIcon />
                    </Badge>
                  ) : (
                    <Badge className="bg-purple-800 p-1.5">Disabled</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsDialogOpen(true)}>
                      {isTwoFactorEnabled ? "Renew Two-Factor" : "Enable Two-Step Verification"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verify your Account</DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm onVerificationSuccess={handleVerificationSuccess} />
                  </DialogContent>
                </Dialog>

              </CardContent>
            </Card>
            {twoFactorError && <p className="text-red-500 mt-2">{twoFactorError}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full py-5">
            Add Payment Details
          </Button>

        </form>
      </Form>
    </div>
  );
}

export default PaymentDetailsForm;
