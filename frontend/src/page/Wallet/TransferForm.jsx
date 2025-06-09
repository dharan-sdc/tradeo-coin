import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { store } from '@/State/Store';
import { transferMoney } from '@/State/Wallet/Action';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransferForm = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector(store => store); // Fetch wallet details
  const [formData, setFormData] = useState({
    amount: '',
    walletId: '',
    purpose: '',
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      validateForm(updatedData); // Validate after each change
      return updatedData;
    });
  };

  // Validate fields
  const validateForm = (data) => {
    let newErrors = {};

    if (!data.amount || isNaN(data.amount) || Number(data.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    } else if (wallet?.userWallet?.balance < Number(data.amount)) {
      newErrors.amount = 'Insufficient balance!';
    }

    if (!data.walletId) {
      newErrors.walletId = 'Wallet Passcode is required!';
    }

    if (!data.purpose) {
      newErrors.purpose = 'Purpose is required!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm(formData)) {
      toast.error('Please fix the errors and try again.');
      return;
    }

    try {
      await dispatch(
        transferMoney({
          jwt: localStorage.getItem('jwt'),
          walletId: formData.walletId,
          reqData: {
            amount: formData.amount,
            purpose: formData.purpose,
          },
        })
      );
      toast.success(`Transaction successful! Sent ₹${formData.amount} to ${formData.walletId}`);
      setFormData({ amount: '', walletId: '', purpose: '' }); // Reset form on success
      setErrors({});
    } catch (error) {
      toast.error('Transaction failed! Please try again.');
    }
  };

  return (
    <div className="pt-10 space-y-5">
      {/* Amount Input */}
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          name="amount"
          onChange={handleChange}
          value={formData.amount}
          className="py-7"
          placeholder="₹99999"
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
      </div>

      {/* Wallet Passcode Input */}
      <div>
        <h1 className="pb-1">Wallet Passcode</h1>
        <Input
          name="walletId"
          onChange={handleChange}
          value={formData.walletId}
          className="py-7"
          placeholder="#SDC21F"
        />
        {errors.walletId && <p className="text-red-500 text-sm">{errors.walletId}</p>}
      </div>

      {/* Purpose Input */}
      <div>
        <h1 className="pb-1">Message</h1>
        <Input
          name="purpose"
          onChange={handleChange}
          value={formData.purpose}
          className="py-7"
          placeholder="Make it memorable"
        />
        {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose}</p>}
      </div>

      {/* Submit Button */}
      <DialogClose className="w-full">
        <Button
          onClick={handleSubmit}
          className="w-full py-7"
          disabled={Object.keys(errors).length > 0}
        >
          Send
        </Button>
      </DialogClose>
    </div>
  );
};

export default TransferForm;
