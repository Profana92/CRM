import { GiHamburgerMenu } from 'react-icons/gi';
import Clock from 'components/Clock';
import type { RootState } from 'app/store';
import { useSelector } from 'react-redux';
function Header() {
   const activeTitle = useSelector((state: RootState) => state.pageTitle.value);
   return (
      <header className="flex bg-cyan-400 h-12 items-center flex-row ">
         <div className="flex flex-row gap-2">
            <div className="grid text-lg m-auto">
               <GiHamburgerMenu />
            </div>
            <p className="hidden lg:block">SimCRM</p> <p>{activeTitle}</p>
         </div>
         <Clock />
         <div className=""></div>
      </header>
   );
}

export default Header;
