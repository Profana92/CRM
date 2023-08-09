import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import InstitutionsTable from 'components/Tables/InstitutionsTable';
interface institutionsInterface {
   clients: number[];
   id: number;
   location: { street: string; city: string; country: string; postcode: number };
   name: string;
   phone: string;
}

function Institutions() {
   const [fetchedUsers, setfetchedUsers] = useState(null);
   const [loggedInUser] = useState(JSON.parse(localStorage.getItem('user')!));
   const dispatch = useDispatch();
   useEffect(() => {
      document.title = 'Institutions';
      getInstitutions();
      dispatch(setPageTitle('Institutions'));
   }, []);
   async function getInstitutions() {
      try {
         const markets = await axios.get(`/api/markets?marketName=${loggedInUser.userData.market}`);
         const institutions = await axios.get(`/api/institutions`);
         const result = markets.data.institutions.map((element: number) => {
            return institutions.data.find((item: institutionsInterface) => {
               return element === +item.id;
            });
         });
         setfetchedUsers(result);
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <div className="w-full ">
         <div className="shadow-lg max-w-[1920px] xl:flex xl:flex-row-reverse m-auto my-5">
            {fetchedUsers ? (
               <InstitutionsTable items={fetchedUsers} />
            ) : (
               <div className="w-full h-full">
                  <div className="flex items-center justify-center p-12 h-full">
                     <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default Institutions;
