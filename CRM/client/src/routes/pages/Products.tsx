import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import axios from 'axios';
import TableProducts from 'components/Tables/TableProducts';
import { RotatingLines } from 'react-loader-spinner';
import ProductsTable from 'components/Tables/ProductsTable';
function Products() {
   const [fetchedData, setfetchedData] = useState(null);
   /** Products download */
   async function getProducts() {
      try {
         const response = await axios.get(`/api/productsData`);
         setfetchedData(response.data);
      } catch (error) {
         console.error(error);
      }
   }
   console.log(fetchedData);
   const dispatch = useDispatch();

   useEffect(() => {
      document.title = 'Products';
      getProducts();
      dispatch(setPageTitle('Products'));
   }, []);

   return (
      <div className="w-full ">
         <div className="shadow-lg max-w-[1920px] xl:flex xl:flex-row-reverse m-auto my-5">
            <ProductsTable items={fetchedData} />
         </div>
      </div>
   );
}

export default Products;
