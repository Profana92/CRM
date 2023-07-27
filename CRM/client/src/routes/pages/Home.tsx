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
   const [fetchedData, setfetchedData] = useState(null);
   const [fetchedMarketsData, setFetchedMarketsData] = useState(null);
   const [loggedInUser, setloggedInUser] = useState(JSON.parse(localStorage.getItem('user')));

   async function getProducts(limit?: number) {
      try {
         const response = await axios.get(`/api/tasks`);
         setfetchedData(response);
      } catch (error) {
         console.error(error);
      }
   }
   async function getOffers(limit?: number) {
      try {
         const response = await axios.get(`/api/markets`);
         const filteredResponse = response.data.find((item) => {
            return item.marketName === 'market_1';
         });
         setFetchedMarketsData(filteredResponse);
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      document.title = 'Home';
      dispatch(setPageTitle('Home'));
      getProducts();
      getOffers();
   }, []);

   let calendarData = false;
   if (fetchedData) {
      calendarData = fetchedData.data.map((item) => {
         const startDateArray = item.calendarData.StartTime.split(', ');
         const startDate = new Date(...startDateArray);
         const endDateArray = item.calendarData.EndTime.split(', ');
         const endDate = new Date(...endDateArray);
         // const endDate = new Date(item.calendarData.EndTime);
         return { ...item.calendarData, StartTime: startDate, EndTime: new Date(endDate) };
      });
   }

   return (
      <>
         <div className="min-h-[calc(100vh-96px)] w-full">
            <div className=" max-w-[1920px] xl:flex xl:flex-row-reverse m-auto mb-5 ">
               <LoggedInPerson data={loggedInUser} />
               <div className="xl:w-[calc(100vw-20rem)] xl:w-full] shadow-lg border self-start">
                  {fetchedData ? (
                     <TasksTable items={fetchedData} />
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
               {calendarData ? (
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
               {fetchedMarketsData ? (
                  <OffersTable items={fetchedMarketsData.clients} />
               ) : (
                  <div className="w-full">
                     <div className="flex items-center justify-center p-12">
                        <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                     </div>
                  </div>
               )}
            </div>
            <div className="flex justify-end mb-5">
               <Link to="/orders">
                  <button className="py-3 px-6 border shadow-lg">See more orders</button>
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
            <div className="flex justify-end ">
               <Link to="/orders">
                  <button className="py-3 px-6 border shadow-lg">See more orders</button>
               </Link>
            </div>
         </div>
      </>
   );
}

export default Home;
