import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import axios from 'axios';

import { RotatingLines } from 'react-loader-spinner';
function Clients() {
   const [fetchedData, setfetchedData] = useState(null);
   /** Products download */
   async function getProducts() {
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
         <div className=" max-w-[1920px] xl:flex xl:flex-row-reverse m-auto mb-5 "></div>
      </div>
   );
}

export default Clients;
