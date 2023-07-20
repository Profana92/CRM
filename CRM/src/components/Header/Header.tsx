import { GiHamburgerMenu } from 'react-icons/gi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { BsFillBellFill, BsThreeDotsVertical } from 'react-icons/bs';

import Clock from 'components/Clock';
import type { RootState } from 'app/store';
import { useSelector } from 'react-redux';
function Header() {
   const activeTitle = useSelector((state: RootState) => state.pageTitle.value);
   return (
      <header className="flex h-12 items-center flex-row text-slate-800 font-bold w-full justify-between px-5 shadow-lg">
         <div className="flex flex-row gap-2 justify-center items-center">
            <div className="grid items-center justify-center h-8 w-8 text-lg m-auto lg:bg-slate-100 lg:border lg:rounded-sm">
               <GiHamburgerMenu size="1.25rem" />
            </div>
            <p className="hidden lg:block mx-3">SimCRM</p>
            <p>{activeTitle}</p>
         </div>
         <Clock />
         <div className="flex flex-row items-center justify-around">
            <div className="h-8 w-8 flex items-center justify-center border rounded-sm ">
               <HiMagnifyingGlass size="1.25rem" />
            </div>
            <div className="h-8 w-8 flex items-center justify-center mx-3">
               <BsFillBellFill size="1.25rem" />
            </div>
            <div className="h-8 w-8 flex items-center justify-center ">
               <BsThreeDotsVertical size="1.25rem" />
            </div>
         </div>
      </header>
   );
}

export default Header;
