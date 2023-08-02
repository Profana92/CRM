function SidebarsRight(props) {
   console.log(props.bellNotificationData);
   return (
      <>
         <div
            className={`fixed top-12 min-h-[calc(100vh-96px)] w-full lg:w-80 border bg-white transition-all duration-500 ease-in-out z-10  ${
               props.bellNotificationOpen ? 'right-0' : '-right-full'
            }`}
         >
            {props.bellNotificationData
               ? props.bellNotificationData.map((item) => {
                    return <p key={item.id}>{item.title}</p>;
                 })
               : ''}
         </div>

         <div
            className={`flex fixed top-12 bg-white border shadow-lg p-5 min-h-[calc(100vh-96px)] w-full lg:w-80 z-10 transition-all duration-500 ease-in-out ${
               props.searchOpen ? 'right-0' : '-right-full'
            }`}
         >
            <div className="w-full">
               <input
                  type="text"
                  name="searchInput"
                  id="searchInput"
                  placeholder="Search for product"
                  className="h-8 w-full border"
                  onChange={props.searchData}
               />
               <ol className="list-decimal  list-inside	w-full">
                  {props.searchResult
                     ? props.searchResult.map((item) => {
                          return <li key={item.id}>{item.title}</li>;
                       })
                     : ''}
               </ol>
            </div>
         </div>

         <div
            className={`flex fixed top-12 bg-white border shadow-lg p-5 min-h-[calc(100vh-96px)] w-full lg:w-80 z-10 transition-all duration-500 ease-in-out ${
               props.dotsOpen ? 'right-0' : '-right-full'
            }`}
         >
            <div onClick={props.logoutHandler}>Logout</div>
         </div>
      </>
   );
}

export default SidebarsRight;
