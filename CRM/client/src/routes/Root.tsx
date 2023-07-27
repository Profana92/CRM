import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from 'components/Header/Sidebar/Sidebar';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useState, useEffect } from 'react';

export default function Root() {
   const [open, setOpen] = useState(false);
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);
   return (
      <>
         <Header open={open} setOpen={setOpen} />
         <Sidebar open={open} setOpen={setOpen} />
         <div className="m-5">
            <Outlet />
         </div>
         <Footer />
      </>
   );
}
