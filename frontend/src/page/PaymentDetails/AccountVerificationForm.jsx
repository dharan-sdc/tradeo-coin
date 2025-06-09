import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure you have react-toastify for notifications
import api from "@/Config/api";

const AccountVerificationForm = ({ onVerificationSuccess }) => {
  const { auth } = useSelector((store) => store);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Send OTP Request
  const sendOtp = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("jwt"); // Assuming you store JWT in Redux
      await api.post(
        `/api/users/verification/EMAIL/send-otp`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("OTP sent successfully!");

    } catch (error) {
      toast.error(error.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("jwt");
      const response = await api.patch(
        `/api/users/enable-two-factor/verify-otp/${otp}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Two-factor authentication enabled successfully!");
      onVerificationSuccess(); 

      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data || "Incorrect OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-9 w-full">
        <div className="flex justify-between items-center">
          <p>Email : </p>
          <p className="text-gray-400">{auth.user?.email
            ? `${auth.user.email.slice(0, 5)}...@${auth.user.email.split('@')[1]}`
            : ''}</p>
          <Button onClick={sendOtp} disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Enter OTP</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
                <div className="py-4 flex gap-8 justify-center items-center">
                  <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <DialogClose>
                  <Button onClick={verifyOtp} disabled={loading} className="w-[8rem]">
                    {loading ? "Verifying..." : "Submit"}
                  </Button>
                </DialogClose>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationForm;
