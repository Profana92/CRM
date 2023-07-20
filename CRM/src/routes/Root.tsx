import { Outlet } from 'react-router-dom';
import Sidebar from 'components/Header/Sidebar/Sidebar';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
export default function Root() {
   return (
      <>
         <Header />
         <Sidebar />
         <Outlet />
         <Footer />
      </>
   );
}
