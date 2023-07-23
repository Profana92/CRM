import NavListElement from './NavListElement';
interface OpenState {
   open: boolean;
   setOpen: Function;
}

const navLinks: Array<{ name: string; location: string; id: number }> = [
   { name: 'Home', location: '/', id: 1 },
   { name: 'Products', location: '/products', id: 2 },
   { name: 'Persons', location: '/persons', id: 3 },
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
         className={`min-h-[calc(100vh-96px)] w-80 fixed top-12 border-r-2 z-10 bg-white transition-all ease-in-out delay-100 duration-500 ${
            props.open ? 'left-0' : '-left-80'
         } `}
      >
         <ul className="flex flex-col">{navList}</ul>
      </div>
   );
}

export default Sidebar;
