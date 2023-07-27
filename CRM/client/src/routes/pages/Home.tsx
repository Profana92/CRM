import axios from 'axios';
import { useEffect, useState } from 'react';
import { setPageTitle } from 'features/currentPageTitleSlice';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import TasksTable from 'components/Pages/Home/TasksTable';
import LoggedInPerson from 'components/Pages/Home/LoggedInPerson';
import Calendar from 'components/Pages/Home/Calendar';

function Home() {
   const dispatch = useDispatch();
   const [fetchedData, setfetchedData] = useState(null);
   const [loggedInUser, setloggedInUser] = useState(JSON.parse(localStorage.getItem('user')));
   async function getProducts(limit?: number) {
      try {
         const response = await axios.get(`/tasks`);
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

   return (
      <>
         <div className="min-h-[calc(100vh-96px)] w-full">
            <div className=" max-w-[1920px] xl:flex xl:flex-row-reverse m-auto ">
               <LoggedInPerson data={loggedInUser} />
               <div className="xl:w-[calc(100vw-20rem)] xl:w-full] shadow-lg border">
                  {fetchedData ? (
                     <TasksTable items={fetchedData} />
                  ) : (
                     <div className="max-w-screen-xl">
                        <div className="flex items-center justify-center p-12">
                           <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                        </div>
                     </div>
                  )}
               </div>
            </div>{' '}
            <div className=" max-w-[1920px] xl:flex m-auto ">
               {' '}
               <Calendar />
            </div>
         </div>
      </>
   );
}

export default Home;
