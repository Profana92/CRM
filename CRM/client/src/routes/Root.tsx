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
   async function getNotifications(limit?: number) {
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

   const bellClickHandler = () => {
      console.log('bell clicked');
      setbellNotificationOpen((prevState) => {
         return !prevState;
      });
      setBellNotificationIndicator(false);
   };
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);
   useEffect(() => {
      getNotifications();
   }, []);
   const searchHandler = () => {
      console.log('tu');
      setSearchOpen((prevstate) => {
         return !prevstate;
      });
   };
   console.log(searchOpen);
   return (
      <>
         <Header
            open={open}
            setOpen={setOpen}
            bellClickHandler={bellClickHandler}
            bellNotificationIndicator={bellNotificationIndicator}
            searchHandler={searchHandler}
         />
         <Sidebar open={open} setOpen={setOpen} />
         <SidebarsRight bellNotificationOpen={bellNotificationOpen} bellNotificationData={bellNotificationData} searchOpen={searchOpen} />
         <div className="m-5">
            <Outlet />
         </div>
         <Footer />
      </>
   );
}
