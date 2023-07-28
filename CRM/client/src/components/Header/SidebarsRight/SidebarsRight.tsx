function SidebarsRight(props) {
   return (
      <>
         <div
            className={`fixed top-12 min-h-[calc(100vh-96px)] w-full lg:w-80 border bg-white transition-all duration-500 ease-in-out z-10  ${
               props.bellNotificationOpen ? 'right-0' : '-right-full'
            }`}
         >
            {props.bellNotificationData
               ? props.bellNotificationData.notifications.map((item) => {
                    return <p key={item.id}>{item.message}</p>;
                 })
               : ''}
         </div>
         {props.searchOpen ? (
            <div
               className={`flex fixed right-0 top-12 bg-white border shadow-lg p-5 h-[calc(100vh-96px)] w-full lg:w-80 z-10 transition-all duration-500 ease-in-out ${
                  props.searchOpen ? 'right-0' : '-right-full'
               }`}
            >
               <div>
                  <input type="text" name="searchInput" id="searchInput" placeholder="Search for product" className="w-full border" />
                  <button className="border py-2 px-5">Search</button>
               </div>
            </div>
         ) : (
            ''
         )}
      </>
   );
}

export default SidebarsRight;
