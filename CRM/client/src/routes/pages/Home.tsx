import axios from 'axios';
import { useEffect, useState } from 'react';
import { setPageTitle } from 'features/currentPageTitleSlice';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import TasksTable from 'components/Tables/TasksTable';
import OffersTable from 'components/Tables/OffersTable';
import LoggedInPerson from 'components/Pages/Home/LoggedInPerson';
import Calendar from 'components/Pages/Home/Calendar';
import OrdersTable from 'components/Tables/OrdersTable';
import { Link } from 'react-router-dom';
function Home() {
   const dispatch = useDispatch();
   const [fetchedTasksData, setfetchedTasksData] = useState(null);
   const [fetchedMarketsData, setFetchedMarketsData] = useState(null);
   const [fetchedOffersData, setFetchedOffersData] = useState(null);
   const [loggedInUser, setloggedInUser] = useState(JSON.parse(localStorage.getItem('user')));

   useEffect(() => {
      document.title = 'Home';
      dispatch(setPageTitle('Home'));
      getTasks();
      getOffers();
   }, []);

   async function getOffers() {
      try {
         const markets = await axios.get(`/api/markets?marketName=${loggedInUser.userData.market}`);
         const clients = await axios.get(`/api/clients`);
         const offers = await axios.get(`/api/offers`);
         let result = [];
         for (let element of markets.data.clients) {
            result.push(
               clients.data.find((item) => {
                  return item.id === +element;
               }).offers,
            );
         }

         result = result.flat();
         result = result.map((offerNumber) => {
            const clientDetails = clients.data.find((item) => {
               return item.offers.includes(offerNumber);
            });
            const offerData = offers.data.find((item) => {
               return item.uniqueiD.includes(offerNumber);
            });
            return { offerNumber: offerNumber, clientDetails, offerData };
         });

         setFetchedOffersData(result);
      } catch (error) {
         console.error(error);
      }
   }

   async function getTasks() {
      try {
         const response = await axios.get(`/api/tasks?id=${JSON.parse(localStorage.getItem('user')).userData.id}`);
         setfetchedTasksData(response);
      } catch (error) {
         console.error(error);
      }
   }

   let calendarData = false;
   if (fetchedTasksData) {
      calendarData = fetchedTasksData.data.map((item) => {
         const startDateArray = item.calendarData.StartTime.split(', ');
         const startDate = new Date(...startDateArray);
         const endDateArray = item.calendarData.EndTime.split(', ');
         const endDate = new Date(...endDateArray);
         return { ...item.calendarData, StartTime: startDate, EndTime: new Date(endDate) };
      });
   }

   return (
      <>
         <div className="min-h-[calc(100vh-96px)] w-full">
            <div className=" max-w-[1920px] xl:flex xl:flex-row-reverse m-auto mb-5 ">
               <LoggedInPerson data={loggedInUser} />
               <div className="xl:w-[calc(100vw-20rem)] xl:w-full] shadow-lg border self-start">
                  {fetchedTasksData ? (
                     <TasksTable items={fetchedTasksData} />
                  ) : (
                     <div className="w-full h-full">
                        <div className="flex items-center justify-center p-12 h-full">
                           <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div className=" max-w-[1920px] xl:flex m-auto shadow-lg border mb-5">
               {fetchedTasksData ? (
                  <Calendar items={calendarData} />
               ) : (
                  <div className="w-full">
                     <div className="flex items-center justify-center p-12">
                        <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                     </div>
                  </div>
               )}
            </div>

            <div className=" max-w-[1920px] xl:flex m-auto shadow-lg border mb-5">
               {fetchedOffersData ? (
                  <OffersTable items={fetchedOffersData} />
               ) : (
                  <div className="w-full">
                     <div className="flex items-center justify-center p-12">
                        <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                     </div>
                  </div>
               )}
            </div>
            {/*<div className="flex justify-end mb-5 max-w-[1920px] m-auto">
               <Link to="/orders">
                  <button className="py-3 px-6 border shadow-lg">See more offers</button>
               </Link>
            </div>
            <div className=" max-w-[1920px] m-auto shadow-lg border mb-5">
               {fetchedMarketsData ? (
                  <OrdersTable items={fetchedMarketsData.clients} />
               ) : (
                  <div className="w-full">
                     <div className="flex items-center justify-center p-12">
                        <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                     </div>
                  </div>
               )}
            </div>
            <div className="flex justify-end max-w-[1920px] m-auto">
               <Link to="/orders">
                  <button className="py-3 px-6 border shadow-lg">See more orders</button>
               </Link>
            </div> */}
         </div>
      </>
   );
}

export default Home;
