import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from 'components/Header/Sidebar/Sidebar';
import SidebarsRight from 'components/Header/SidebarsRight/SidebarsRight';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Root() {
   const [open, setOpen] = useState(false);
   const { pathname } = useLocation();
   const [bellNotificationData, setbellNotificationData] = useState();
   const [bellNotificationOpen, setbellNotificationOpen] = useState(false);
   const [bellNotificationIndicator, setBellNotificationIndicator] = useState(true);
   const [searchOpen, setSearchOpen] = useState(false);
   const [dotsOpen, setdotsOpen] = useState(false);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);
   useEffect(() => {
      getNotifications();
   }, []);

   async function getNotifications() {
      try {
         const response = await axios.get(`/api/markets`);
         const filteredResponse = response.data.find((item) => {
            return item.marketName === JSON.parse(localStorage.getItem('user')).userData.market;
         });
         setbellNotificationData(filteredResponse);
      } catch (error) {
         console.error(error);
      }
   }

   const searchHandler = () => {
      setSearchOpen((prevstate) => {
         return !prevstate;
      });
      setdotsOpen(false);
      setbellNotificationOpen(false);
   };

   const bellClickHandler = () => {
      setbellNotificationOpen((prevState) => {
         return !prevState;
      });
      setSearchOpen(false);
      setdotsOpen(false);
      setBellNotificationIndicator(false);
   };

   const dotsClickHandler = () => {
      setdotsOpen((prevstate) => {
         return !prevstate;
      });
      setbellNotificationOpen(false);
      setSearchOpen(false);
   };
   return (
      <>
         <Header
            open={open}
            setOpen={setOpen}
            bellClickHandler={bellClickHandler}
            bellNotificationIndicator={bellNotificationIndicator}
            searchHandler={searchHandler}
            dotsClickHandler={dotsClickHandler}
         />
         <Sidebar open={open} setOpen={setOpen} />
         <SidebarsRight bellNotificationOpen={bellNotificationOpen} bellNotificationData={bellNotificationData} searchOpen={searchOpen} dotsOpen={dotsOpen} />
         <div className="m-5">
            <Outlet />
         </div>
         <Footer />
      </>
   );
}
