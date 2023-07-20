import { Outlet } from 'react-router-dom';

export default function Root() {
   return (
      <>
         <h1>Header</h1>
         <h2>Sidebar</h2>
         <div id="detail">
            <h2>Main</h2>
            <Outlet />
         </div>
         <h2>Footer</h2>
      </>
   );
}
