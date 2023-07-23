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
         className={({ isActive, isPending }) =>
            isPending
               ? 'pending'
               : isActive
               ? 'bg-slate-100 font-semibold w-full h-12 leading-[3rem] transition-all duration-[400ms]'
               : 'transition-all	bg-white'
         }
      >
         {props.item.name}
      </NavLink>
   );
}

export default NavListElement;
