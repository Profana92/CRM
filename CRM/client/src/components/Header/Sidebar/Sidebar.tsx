import NavListElement from './NavListElement';
interface OpenState {
   open: boolean;
   setOpen: Function;
}

const navLinks: Array<{ name: string; location: string; id: number }> = [
   { name: 'Home', location: '/', id: 1 },
   { name: 'Products', location: '/products', id: 2 },
   { name: 'Clients', location: '/clients', id: 3 },
   { name: 'Institution', location: '/institution', id: 4 },
   { name: 'Offers', location: '/offers', id: 5 },
   { name: 'Orders', location: '/orders', id: 6 },
   { name: 'Knowledge Base', location: '/knowledge_base', id: 7 },
];

function Sidebar(props: OpenState) {
   const navList = navLinks.map((item) => (
      <div key={item.id} className="flex justify-center items-center text-center h-12">
         <NavListElement item={item} setOpen={props.setOpen} />
      </div>
   ));

   return (
      <div
      className={`fixed top-12 h-[calc(100vh-96px)] p-5 w-full lg:w-80 border bg-white transition-all duration-500 ease-in-out z-10  overflow-y-auto overflow-x-hidden ${
            props.open ? 'left-0' : '-left-full'
         } `}
      >
         <ul className="flex flex-col">{navList}</ul>
      </div>
   );
}

export default Sidebar;
