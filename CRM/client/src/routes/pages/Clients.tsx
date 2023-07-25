import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import axios from 'axios';
import ClientsTable from 'components/Tables/ClientsProducts';
import { RotatingLines } from 'react-loader-spinner';
function Clients() {
   const [fetchedData, setfetchedData] = useState(null);
   /** Products download */
   async function getProducts(limit?: number) {
      try {
         const response = await axios.get(`/api`);
         setfetchedData(response);
      } catch (error) {
         console.error(error);
      }
   }

   const dispatch = useDispatch();

   useEffect(() => {
      document.title = 'Products';
      getProducts(20);
      dispatch(setPageTitle('Products'));
   }, []);

   return (
      <div className="shadow-lg min-h-[calc(100vh-96px)] w-full p-5">
         {fetchedData ? (
            <ClientsTable products={fetchedData} />
         ) : (
            <div className="flex items-center justify-center">
               <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
            </div>
         )}
      </div>
   );
}

export default Clients;
