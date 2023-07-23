import { Outlet } from 'react-router-dom';
import Sidebar from 'components/Header/Sidebar/Sidebar';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useState } from 'react';

export default function Root() {
   const [open, setOpen] = useState(false);

   return (
      <>
         <Header open={open} setOpen={setOpen} />
         <Sidebar open={open} setOpen={setOpen} />
         <Outlet />
         <Footer />
      </>
   );
}
