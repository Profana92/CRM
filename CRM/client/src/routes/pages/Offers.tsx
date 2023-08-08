import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import OffersTable from 'components/Tables/OffersTable';
function Offers() {
   const [fetchedOffersData, setFetchedOffersData] = useState(null);
   const [loggedInUser] = useState(JSON.parse(localStorage.getItem('user')));
   /** Products download */
   async function getOffers() {
      try {
         const markets = await axios.get(`/api/markets?marketName=${loggedInUser.userData.market}`);
         const clients = await axios.get(`/api/clients`);
         const offers = await axios.get(`/api/offers`);
         let result = [];
         for (let element of markets.data.clients) {
            result.push(
               clients.data.find((item) => {
                  return item.id === +element;
               }).offers,
            );
         }

         result = result.flat();
         result = result.map((offerNumber) => {
            const clientDetails = clients.data.find((item) => {
               return item.offers.includes(offerNumber);
            });
            const offerData = offers.data.find((item) => {
               return item.uniqueiD.includes(offerNumber);
            });
            return { offerNumber: offerNumber, clientDetails, offerData };
         });

         setFetchedOffersData(result);
      } catch (error) {
         console.error(error);
      }
   }

   const dispatch = useDispatch();
   useEffect(() => {
      document.title = 'Offers';
      getOffers();
      dispatch(setPageTitle('Offers'));
   }, []);
   console.log('fetchedOffers', fetchedOffersData);
   return (
      <div className="w-full ">
         <div className="shadow-lg max-w-[1920px] xl:flex xl:flex-row-reverse m-auto my-5">
            {fetchedOffersData ? (
               <OffersTable items={fetchedOffersData} />
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

export default Offers;
