import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyResetPasswordOtp } from '@/State/Auth/Action'; // Update the import path
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const { resetPasswordSessionId } = useSelector((state) => state.auth); // Get the session ID from Redux state

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resetPasswordSessionId && otp && newPassword) {
      dispatch(verifyResetPasswordOtp(resetPasswordSessionId, otp, newPassword));
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center pb-3">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="otp">OTP</label>
          <Input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border w-full border-gray-700 p-5"
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter New Password"
            className="border w-full border-gray-700 p-5"
          />
        </div>
        <Button type="submit" className="w-full py-5">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;