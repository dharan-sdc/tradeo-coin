import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './State/Auth/Action';
import Navbar from './page/Navbar/Navbar';
import Activity from './page/Activity/Activity';
import Home from './page/Home/Home';
import Portfolio from './page/Portfolio/Portfolio';
import Wallet from './page/Wallet/Wallet';
import Withdrawal from './page/Withdrawal/Withdrawal';
import PaymentDetails from './page/PaymentDetails/PaymentDetails';
import StockDetails from './page/Stock Details/StockDetails';
import Watchlist from './page/Watchlist/Watchlist';
import Profile from './page/Profile/Profile';
import SearchCoin from './page/Search/SearchCoin';
import Notfound from './page/Not Found/Notfound.jsx';
import Auth from './page/Auth/Auth';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();

  // console.log("Auth -- -- --", auth);

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            {/* <Route path='/' element={<Auth />} /> */}
            <Route path='/' element={<Home />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/activity' element={<Activity />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/withdrawal' element={<Withdrawal />} />
            <Route path='/payment-details' element={<PaymentDetails />} />
            <Route path='/market/:id' element={<StockDetails />} />
            <Route path='/watchlist' element={<Watchlist />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/search' element={<SearchCoin />} />

            <Route path='/*' element={<Notfound />} />
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
