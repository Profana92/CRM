import { NavLink } from 'react-router-dom';

interface propsType {
   item: {
      name: string;
      location: string;
      id: number;
   };
   setOpen: Function;
}
function NavListElement(props: propsType) {
   return (
      <NavLink
         to={props.item.location}
         onClick={() => {
            props.setOpen(false);
         }}
         className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'bg-slate-100 text-center font-semibold h-12' : 'text-center ')}
      >
         {props.item.name}
      </NavLink>
   );
}

export default NavListElement;
