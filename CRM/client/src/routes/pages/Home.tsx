import axios from 'axios';
import { useEffect, useState } from 'react';
import { setPageTitle } from 'features/currentPageTitleSlice';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import TasksTable from 'components/Tables/TasksTable';
import OffersTable from 'components/Tables/OffersTable';
import LoggedInPerson from 'components/Pages/Home/LoggedInPerson';
import Calendar from 'components/Pages/Home/Calendar';

interface clientsInterface {
   cell: string;
   email: string;
   id: number;
   location: { street: string; city: string; country: string; postcode: number };
   loginData: { uuid: string; username: string; password: string };
   name: string;
   offers: string[];
   orders: string[];
   phone: string;
   picture: { large: string; medium: string; thumbnail: string };
}

interface offerInterface {
   associatedOrder: string;
   dateOfCreation: string;
   products: { amount: number; name: string }[];
   status: string;
   uniqueiD: string;
}

type fetchedOfferStateInterface = {
   offerNumber: number;
   clientDetails: {};
   offerData: {};
}[];

interface AxiosResponseInterface {
   config: Object;
   data: [];
   headers: Object;
   request: Object;
   status: number;
   statusText: string;
}

interface fetchedTasksDataMapItemInterface {
   belongsTo: number;
   calendarData: {
      Id: number;
      Subject: string;
      StartTime: string;
      EndTime: string;
      IsAllDay: false;
      Priority: string;

      Status: string;
   };
   clientId: number;
   createdBy: number;
   dateOfCreation: string;
   priority: string;
   taskId: number;
   title: string;
}
type calendarDataType = {
   EndTime: Date;
   Id: number;
   IsAllDay: boolean;
   Priority: string;
   StartTime: Date;
   Status: string;
   Subject: string;
}[];

function Home() {
   const dispatch = useDispatch();
   const [fetchedTasksData, setfetchedTasksData] = useState<AxiosResponseInterface | null>(null);
   const [fetchedOffersData, setFetchedOffersData] = useState<fetchedOfferStateInterface | null>(null);
   const [loggedInUser] = useState(JSON.parse(localStorage.getItem('user')!));

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
               clients.data.find((item: clientsInterface) => {
                  return item.id === +element;
               }).offers,
            );
         }

         result = result.flat();
         result = result.map((offerNumber) => {
            const clientDetails = clients.data.find((item: clientsInterface) => {
               return item.offers.includes(offerNumber);
            });
            const offerData = offers.data.find((item: offerInterface) => {
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
         const response = await axios.get(`/api/tasks?id=${JSON.parse(localStorage.getItem('user')!).userData.id}`);

         setfetchedTasksData(response as AxiosResponseInterface);
      } catch (error) {
         console.error(error);
      }
   }

   let calendarData: boolean | calendarDataType = false;
   if (fetchedTasksData) {
      calendarData = fetchedTasksData.data.map((item: fetchedTasksDataMapItemInterface) => {
         const startDateArray = item.calendarData.StartTime.split(', ');
         const startDate = new Date(...(startDateArray as []));
         const endDateArray = item.calendarData.EndTime.split(', ');
         const endDate = new Date(...(endDateArray as []));
         return { ...item.calendarData, StartTime: startDate, EndTime: new Date(endDate) };
      });
   }

   return (
      <>
         <div className="w-full">
            <div className=" max-w-[1920px] xl:flex xl:flex-row-reverse m-auto mb-5 mt-5">
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
         </div>
      </>
   );
}

export default Home;
