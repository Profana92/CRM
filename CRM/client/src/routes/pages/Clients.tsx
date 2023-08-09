import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import ClientsTable from 'components/Tables/ClientsTable';

interface marketsDataInterface {
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

function Clients() {
   const [fetchedUsers, setfetchedUsers] = useState(null);
   const [loggedInUser] = useState(JSON.parse(localStorage.getItem('user')!));
   /** Products download */
   async function getClients() {
      try {
         const markets = await axios.get(`/api/markets?marketName=${loggedInUser.userData.market}`);
         const clients = await axios.get(`/api/clients`);

         const result = markets.data.clients.map((element: number) => {
            console.log('element', element);
            return clients.data.find((item: marketsDataInterface) => {
               console.log('item', item);
               return element === +item.id;
            });
         });
         setfetchedUsers(result);
      } catch (error) {
         console.error(error);
      }
   }

   const dispatch = useDispatch();
   useEffect(() => {
      document.title = 'Clients';
      getClients();
      dispatch(setPageTitle('Clients'));
   }, []);

   return (
      <div className="w-full ">
         <div className="shadow-lg max-w-[1920px] xl:flex xl:flex-row-reverse m-auto my-5">
            {fetchedUsers ? (
               <ClientsTable items={fetchedUsers} />
            ) : (
               <div className="w-full h-full">
                  <div className="flex items-center justify-center p-12 h-full">
                     <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default Clients;
