import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import axios from 'axios';
import TableProducts from 'components/TableProducts';
import { RotatingLines } from 'react-loader-spinner';
function Products() {
   const [fetchedData, setfetchedData] = useState(null);
   /** Products download */
   async function getProducts(limit?: number) {
      try {
         const response = await axios.get(`https://fakestoreapi.com/products${limit ? `?limit=${limit}` : ''}`);
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
            <TableProducts products={fetchedData} />
         ) : (
            <div className="flex items-center justify-center">
               <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
            </div>
         )}
      </div>
   );
}

export default Products;
