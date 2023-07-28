import { GiHamburgerMenu } from 'react-icons/gi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { BsFillBellFill, BsThreeDotsVertical } from 'react-icons/bs';
import Clock from 'components/Clock';
import type { RootState } from 'app/store';
import { useSelector } from 'react-redux';

interface OpenState {
   open: boolean;
   setOpen: Function;
}
function Header(props: OpenState) {
   const activeTitle = useSelector((state: RootState) => state.pageTitle.value);

   return (
      <header className="fixed top-0 z-50 flex h-12 w-full flex-row items-center justify-between bg-white px-5 font-bold text-slate-800 shadow-lg">
         <div className="flex flex-row items-center justify-center gap-2">
            <div
               className="m-auto grid h-8 w-8 items-center justify-center text-lg lg:rounded-sm lg:border lg:bg-slate-100"
               onClick={() => props.setOpen(!props.open)}
            >
               <GiHamburgerMenu size="1.25rem" />
            </div>
            <p className="mx-3 hidden font-normal lg:block">SimCRM</p>
            <p>{activeTitle}</p>
         </div>
         <Clock />
         <div className="flex flex-row items-center justify-around">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm border " onClick={props.searchHandler}>
               <HiMagnifyingGlass size="1.25rem" />
            </div>
            <div className="relative mx-3 flex h-8 w-8 items-center justify-center" onClick={props.bellClickHandler}>
               <BsFillBellFill size="1.25rem" />

               <div
                  className={`absolute right-0 top-0 flex h-[10px] w-[10px] items-center justify-center rounded-full bg-red-600 transition-all ease-out ${
                     props.bellNotificationIndicator ? 'opacity-100' : 'opacity-0'
                  }`}
               />
            </div>
            <div className="flex h-8 w-8 items-center justify-center">
               <BsThreeDotsVertical size="1.25rem" />
            </div>
         </div>
      </header>
   );
}

export default Header;
