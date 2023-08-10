export interface LoggedInInterfqace {
   data: Data;
}

export interface Data {
   userData: UserData;
   logged_in: boolean;
}

export interface UserData {
   id: number;
   username: string;
   firstname: string;
   lastName: string;
   position: string;
   picture: string;
   market: string;
}

function LoggedInPerson(props: LoggedInInterfqace) {
   return (
      <>
         <div className="min-w-[19rem] xl:ml-4 flex flex-row justify-center xl:flex-col p-5 border gap-5 sm:gap-10 xl:gap-24 shadow-lg">
            <div className="min-h-[150px] xl:relative flex justify-center flex-col">
               <img src={props.data.userData.picture} alt="" className="rounded-full h-[80px] sm:h-[150px] xl:absolute right-5 shadow-xl" />
            </div>
            <div className="flex justify-center flex-col">
               <p className="text-green-500">{props.data.userData.username}</p>
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
