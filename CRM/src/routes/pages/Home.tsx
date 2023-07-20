import { useEffect } from 'react';
import { Counter } from 'features/counter/Counter';
import { Title } from 'features/currentPageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import type { RootState } from 'app/store';
function home() {
   const count = useSelector((state: RootState) => state.pageTitle.value);
   const dispatch = useDispatch();

   useEffect(() => {
      document.title = 'Home';
      dispatch(setPageTitle('Home'));
   }, []);

   return (
      <>
         <div className="">
            <Counter />
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
            </div>
         </div>
      </>
   );
}

export default home;
