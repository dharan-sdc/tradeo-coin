import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendResetPasswordOtp, verifyResetPasswordOtp } from "@/State/Auth/Action";

const ForgetPasswordForm = () => {
  const dispatch = useDispatch();
  const { loading, error, sessionId, successMessage } = useSelector(state => state.auth); // Redux state
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP & Password

  const form = useForm({
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
    }
  });

  const handleSendOtp = async (data) => {
    dispatch(sendResetPasswordOtp(data.email));
    setStep(2); // Move to OTP & password input step
  };

  const handleVerifyOtp = async (data) => {
    // if (!sessionId) {
    //   alert("Session expired. Please request a new OTP.");
    //   return;
    // }
    dispatch(verifyResetPasswordOtp(sessionId, data.otp, data.newPassword));
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center pb-3">
        {step === 1 ? "Reset Passcode" : "Enter OTP & New Password"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(step === 1 ? handleSendOtp : handleVerifyOtp)} className="space-y-6">

          {/* Email Input - Shown in Step 1 */}
          {step === 1 && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="border w-full border-gray-700 p-5" placeholder="Enter Your Email.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* OTP Input - Shown in Step 2 */}
          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="border w-full border-gray-700 p-5" placeholder="Enter OTP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password Input */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="border w-full border-gray-700 p-5" type="password" placeholder="Enter New Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full py-5" disabled={loading}>
            {step === 1 ? "Send OTP" : "Verify & Reset"}
          </Button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {/* Success Message */}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        </form>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;
