import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import ProductsTable from 'components/Tables/ProductsTable';
function Products() {
   const [fetchedData, setfetchedData] = useState(null);
   const dispatch = useDispatch();

   useEffect(() => {
      document.title = 'Products';
      getProducts();
      dispatch(setPageTitle('Products'));
   }, []);

   async function getProducts() {
      try {
         const response = await axios.get(`/api/productsData`);
         setfetchedData(response.data);
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <div className="w-full ">
         <div className="shadow-lg max-w-[1920px] xl:flex xl:flex-row-reverse m-auto my-5">
            {fetchedData ? (
               <ProductsTable items={fetchedData} />
            ) : (
               <div className="w-full">
                  <div className="flex items-center justify-center p-12">
                     <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default Products;
