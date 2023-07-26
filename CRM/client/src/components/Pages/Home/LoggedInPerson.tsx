function LoggedInPerson(props) {
   console.log(props);
   return (
      <>
         <div className="min-w-[19rem] xl:ml-4 flex justify-center flex-col p-5 border gap-10">
            <div className="min-h-[150px] relative">
               <img src={props.data.userData.picture} alt="" className="rounded-full h-[150px] absolute right-5" />
            </div>
            <div>
               <p>{props.data.userData.username}</p>
               <p>
                  {props.data.userData.firstname} {props.data.userData.lastName}
               </p>
               <p>{props.data.userData.position}</p>
            </div>
         </div>
      </>
   );
}

export default LoggedInPerson;
