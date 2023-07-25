import axios from 'axios';
import { useEffect } from 'react';
import { setPageTitle } from 'features/currentPageTitleSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import type { RootState } from 'app/store';
// import { Counter } from 'features/counter/Counter';
function Home() {
   // const count = useSelector((state: RootState) => state.pageTitle.value);
   // const dispatch = useDispatch();
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
   }, []);

   return (
      <div className="min-h-[calc(100vh-96px)] w-full p-5">
         {/* <Counter />
         <div>
            <div>
               <button aria-label="Increment value" onClick={() => dispatch(setPageTitle('Dziala'))}>
                  Increment
               </button>
               <span>{count}</span>
               <button aria-label="Decrement value" onClick={() => dispatch(setPageTitle('Tez dziala'))}>
                  Decrement
               </button>
            </div>
         </div> */}
      </div>
   );
}

export default Home;
