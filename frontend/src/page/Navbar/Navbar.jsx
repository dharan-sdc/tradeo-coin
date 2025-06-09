import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar } from '@radix-ui/react-avatar';
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Command, CommandInput, CommandList, CommandItem, CommandDialog, CommandEmpty, CommandGroup } from '@/components/ui/command';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { auth } = useSelector(store => store);
  const { coinList } = useSelector(store => store.coin); // Get coin list from Redux store
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");

  // Filter coins dynamically based on search input
  const filteredCoins = coinList?.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Redirect to StockDetails page when selecting a coin
  const handleSelect = (id) => {
    navigate(`/market/${id}`);
    setOpen(false); // Close modal on selection
  };

  return (
    <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center'>
      <div className='flex items-center gap-3'>
        {/* Sidebar Toggle */}
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
              <DragHandleHorizontalIcon className='h-7 w-7' />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-72 border-r-0 flex flex-col justify-center" side="left">
            <SheetHeader>
              <SheetTitle>
                <div className='text-3xl flex justify-center items-center gap-1'>
                  <Avatar>
                    <AvatarImage src="https://static.vecteezy.com/system/resources/previews/021/016/948/original/trading-icon-trading-graphic-symbol-trade-logo-design-trade-mark-logo-vector.jpg" />
                  </Avatar>
                  <div>
                    <span className='font-bold text-blue-600'>TradeO</span>
                    <span>Coin</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>



        <div className="px-2 py-3 border-b z-50 bg-background sticky top-0 left-0 right-0 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div>
              <Link to="/">
                <div className="cursor-pointer">
                  <span className="font-bold text-blue-600">TradeO</span>
                  <span> Coin</span>
                </div>
              </Link>
            </div>
            {/* <p className="text-sm lg:text-base cursor-pointer">TradeO Trading</p> */}

            {/* Search Button */}
            <Button variant="outline" className="flex items-center gap-5" onClick={() => setOpen(true)}>
              <MagnifyingGlassIcon size={30} className='ml-4' />
              <span className='pr-5'>Search</span>
            </Button>

            {/* Search Modal */}
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Search coins..." value={searchTerm} onValueChange={setSearchTerm} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Coins">
                  {filteredCoins.map((coin) => (
                    <CommandItem key={coin.id} onSelect={() => handleSelect(coin.id)}>
                      {coin.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </div>


      </div>

      {/* User Profile Avatar */}
      <div>
        <Link to="/profile">
          <Avatar className="cursor-pointer">
            <AvatarFallback className="w-10 h-10">
              {auth.user?.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
