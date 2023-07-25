import axios from 'axios';
import { useEffect, useState } from 'react';
import { setPageTitle } from 'features/currentPageTitleSlice';
import { useDispatch } from 'react-redux';
// import type { RootState } from 'app/store';

function Home() {
   const dispatch = useDispatch();
   const [fetchedData, setfetchedData] = useState(null);
   async function getProducts(limit?: number) {
      try {
         const response = await axios.get(`/api`);
         setfetchedData(response);
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      document.title = 'Home';
      dispatch(setPageTitle('Home'));
      getProducts();
   }, []);

   return <>{!localStorage.getItem('user') && <div className="min-h-[calc(100vh-96px)] w-full p-5">dsa</div>}</>;
}

export default Home;
