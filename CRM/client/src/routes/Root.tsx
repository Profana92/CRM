import Sidebar from 'components/Header/Sidebar/Sidebar';
import SidebarsRight from 'components/Header/SidebarsRight/SidebarsRight';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import axios from 'axios';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
export default function Root() {
   const [open, setOpen] = useState(false);
   const { pathname } = useLocation();
   const [bellNotificationData, setbellNotificationData] = useState();
   const [bellNotificationOpen, setbellNotificationOpen] = useState(false);
   const [bellNotificationIndicator, setBellNotificationIndicator] = useState(true);
   const [searchOpen, setSearchOpen] = useState(false);
   const [dotsOpen, setdotsOpen] = useState(false);
   const [searchResult, setSetsearchResult] = useState([]);
   const navigate = useNavigate();
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);
   useEffect(() => {
      getNotifications();
   }, []);

   const logoutHandler = () => {
      localStorage.setItem('user', JSON.stringify({ logged_in: false }));
      navigate(0);
   };

   async function getNotifications() {
      try {
         const response = await axios.get(`/api/notifications`);
         const filteredResponse = response.data.filter((item) => {
            return item.userId === JSON.parse(localStorage.getItem('user')).userData.id;
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

   const searchData = (event) => {
      if (event.target.value.length > 2) {
         console.log(event.target.value);
         axios
            .post('/api/products', {
               title: event.target.value,
            })
            .then(function (response) {
               setSetsearchResult(response.data);
            })
            .catch(function (error) {
               console.log(error);
            });
      } else setSetsearchResult([]);
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
         <SidebarsRight
            searchData={searchData}
            bellNotificationOpen={bellNotificationOpen}
            bellNotificationData={bellNotificationData}
            searchOpen={searchOpen}
            dotsOpen={dotsOpen}
            searchResult={searchResult}
            logoutHandler={logoutHandler}
         />
         <div className="m-5">
            <Outlet />
         </div>
         <Footer />
      </>
   );
}
