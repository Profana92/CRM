import type { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';

export function Title() {
   const count = useSelector((state: RootState) => state.pageTitle.value);
   const dispatch = useDispatch();

   return (
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
   );
}
