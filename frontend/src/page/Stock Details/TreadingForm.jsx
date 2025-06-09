import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DotIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletTransaction } from '@/State/Wallet/Action';
import { getAssetDetails } from '@/State/Asset/Action';
import { payOrder } from '@/State/Order/Action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TreadingForm = () => {
  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const { coin, wallet, asset } = useSelector(state => ({
    coin: state.coin,
    wallet: state.wallet,
    asset: state.asset
  }));

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    dispatch(getWalletTransaction({ jwt }));

    if (coin?.coinDetails?.id) {
      dispatch(getAssetDetails({ coinId: coin.coinDetails.id, jwt }));
    }
  }, []);

  const handleChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    setAmount(amount);

    const volume = calculateBuyCost(
      amount, coin?.coinDetails?.market_data?.current_price?.inr
    );
    setQuantity(volume);
  };

  const calculateBuyCost = (amount, price) => {
    let volume = amount / price;
    let decimalPlaces = Math.max(2, price.toString().split(".").length);
    return volume.toFixed(decimalPlaces);
  };

  const handleBuyCrypto = () => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      console.warn("JWT token missing. Authentication required.");
      return;
    }

    const price = coin?.coinDetails?.market_data?.current_price?.inr || 6554;
    const calculatedQuantity = (amount / price).toFixed(5);

    dispatch(
      payOrder({
        jwt,
        amount,
        orderData: {
          coinId: coin?.coinDetails?.id,
          quantity: calculatedQuantity,
          orderType,
        },
      })
    ).then(() => {
      toast.success(` ${orderType} Order Successful!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }).catch(() => {
      toast.error(`❌ ${orderType} Order Failed!`, {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };

  return (
    <div className="space-y-10 p-5">
      {/* Amount Input */}
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder="Enter Amount ..."
            onChange={handleChange}
            type="number"
            name="amount"
          />
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              {quantity}
            </p>
          </div>
        </div>
      </div>

      {/* Crypto Display */}
      <div className="flex gap-5 items-center">
        <Avatar>
          <AvatarImage src={coin?.coinDetails?.image.large} />
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p>BTC</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">{coin.coinDetails?.name}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              ₹{coin?.coinDetails?.market_data?.current_price?.inr || "6554"}
            </p>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className="flex items-center justify-between">
        <p>{orderType === "BUY" ? "Available Balance" : "Available Quantity"}</p>
        <p>{orderType === "BUY" ? `₹${wallet?.userWallet?.balance || 0}` : (asset?.assetDetails?.quantity || 0)}</p>
      </div>

      {/* Buy/Sell Buttons */}
      <div>
        <Button
          onClick={handleBuyCrypto}
          className={`w-full py-6 ${orderType === "SELL" ? "bg-red-600 text-white" : ""}`}
        >
          {orderType}
        </Button>
        <Button
          variant="link"
          className="w-full mt-5 text-xl text-slate-600"
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
        >
          {orderType === "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};

export default TreadingForm;
