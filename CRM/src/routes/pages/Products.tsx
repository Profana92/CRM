import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';

function Products() {
   const dispatch = useDispatch();

   useEffect(() => {
      document.title = 'Products';
      dispatch(setPageTitle('Products'));
   }, []);

   return <div className="shadow-lg min-h-[calc(100vh-96px)]">dsds</div>;
}

export default Products;
