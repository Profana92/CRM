function SidebarsRight(props) {
   return (
      <div className="text-slate-800">
         <div
            className={`fixed top-12 h-[calc(100vh-96px)] p-5 w-full lg:w-80 border bg-white transition-all duration-500 ease-in-out z-10  overflow-y-auto ${
               props.bellNotificationOpen ? 'right-0' : '-right-full'
            }`}
         >
            <div className="w-full">
               {props.bellNotificationData
                  ? props.bellNotificationData.data.map((item) => {
                       return (
                          <p key={item.id} className="border p-2 mb-2 shadow-sm hover:scale-105 hover:bg-slate-50 transition-all ">
                             {item.title}
                          </p>
                       );
                    })
                  : ''}
            </div>
         </div>
         <div
            className={`fixed top-12 bg-white border shadow-lg p-5 h-[calc(100vh-96px)] w-full lg:w-80 z-10 transition-all duration-500 ease-in-out overflow-y-auto ${
               props.searchOpen ? 'right-0' : '-right-full'
            }`}
         >
            <div className="w-full">
               <p className="text-lg font-montserrat text-center font-semibold text-slate-700">Search for product:</p>
               <input
                  type="text"
                  name="searchInput"
                  id="searchInput"
                  placeholder="Search for product"
                  className="p-5 my-3 h-8 w-full border placeholder:italic placeholder:text-slate-400 bg-slate-100 "
                  onChange={props.searchData}
               />
               <ol className="list-decimal list-inside w-full">
                  {props.searchResult
                     ? props.searchResult.map((item) => {
                          return (
                             <li key={item.id} className="border p-2 mb-2 shadow-sm lg:hover:scale-105 hover:bg-slate-50 transition-all ">
                                {item.title}
                             </li>
                          );
                       })
                     : ''}
               </ol>
            </div>
         </div>
         <div
            className={`fixed top-12 bg-white border shadow-lg p-5 h-[calc(100vh-96px)] w-full lg:w-80 z-10 transition-all duration-500 ease-in-out overflow-y-auto ${
               props.dotsOpen ? 'right-0' : '-right-full'
            }`}
         >
            <div className="w-full">
               <p className="text-lg font-montserrat text-center font-semibold text-slate-700">You are logged in as:</p>
               <img className="rounded-full mx-auto my-5" src={props.userData.userData.picture} alt="Your photo" />
               <div className="text-center text-xl my-5">
                  {props.userData.userData.firstname} {props.userData.userData.lastName}
               </div>
               <button type="button" className="border hover:bg-slate-100 py-2 px-5 block mx-auto" onClick={props.logoutHandler}>
                  Logout
               </button>
            </div>
         </div>
      </div>
   );
}

export default SidebarsRight;
