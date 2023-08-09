import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import OrdersTable from 'components/Tables/OrdersTable';

interface ordersDataInterface {
   associatedOrder: string;
   dateOfCreation: string;
   products: { name: string; amount: number }[];
   status: string;
   uniqueiD: string;
}
interface clientDataInterface {
   id: number;
   name: string;
   location: {
      city: string;
      country: string;
      postcode: number;
      street: string;
   };
   email: string;
   cell: string;
   loginData: { password: string; username: string; uuid: string };
   offers: string[];
   orders: string[];
   picture: { large: string; medium: string; thumbnail: string };
   phone: string;
}
type ordersDataType = {
   client: {
      id: number;
      name: string;
      location: {
         city: string;
         country: string;
         postcode: number;
         street: string;
      };
      email: string;
      cell: string;
      loginData: { password: string; username: string; uuid: string };
      offers: string[];
      orders: string[];
      picture: { large: string; medium: string; thumbnail: string };
      phone: string;
   };
   number: string;
   orderDetails: { associatedOffer: string; dateOfCreation: string; products: { name: string; amount: number }[]; status: string; uniqueiD: string };
}[];

function Orders() {
   const [fetchedOrdersData, setfetchedOrdersData] = useState<ordersDataType | null>(null);
   const [loggedInUser] = useState(JSON.parse(localStorage.getItem('user')!));
   const dispatch = useDispatch();

   async function getOrders() {
      try {
         const markets = await axios.get(`/api/markets?marketName=${loggedInUser.userData.market}`);
         const clients = await axios.get(`/api/clients`);
         const orders = await axios.get(`/api/orders`);
         let result = [];
         //Get all users belonging to logged user market
         for (let element of markets.data.clients) {
            result.push(
               clients.data.find((item: clientDataInterface) => {
                  return item.id === +element;
               }),
            );
         }
         //Filter out empty records
         result = result.filter((item) => item.orders.length > 0);
         // Get an Order number, order details and client details for every order.
         const orderData = result
            .map((item) => {
               let ordersList = [];
               for (let number of item.orders) {
                  const orderDetails = orders.data.find((item: ordersDataInterface) => {
                     return item.uniqueiD === number;
                  });
                  ordersList.push({ number, client: { ...item }, orderDetails });
               }
               return ordersList;
            })
            .flat();
         setfetchedOrdersData(orderData);
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      document.title = 'Orders';
      getOrders();
      dispatch(setPageTitle('Orders'));
   }, []);

   return (
      <div className="w-full">
         <div className="shadow-lg max-w-[1920px] xl:flex xl:flex-row-reverse m-auto my-5">
            {fetchedOrdersData ? (
               <OrdersTable items={fetchedOrdersData} />
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

export default Orders;
