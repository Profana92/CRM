import { Navigate } from 'react-router-dom';
type Props = {
   children: JSX.Element;
};
interface loggedInObject {
   logged_in: boolean;
   userData: {
      firstname: string;
      id: number;
      lastName: string;
      market: string;
      picture: string;
      position: string;
      username: string;
   };
}

function privateRoute({ children }: Props) {
   if (localStorage) {
      const isLoggedin: loggedInObject = JSON.parse(localStorage.getItem('user')!);
      return isLoggedin && isLoggedin?.logged_in === true ? children : <Navigate to="/login" />;
   }
}

export default privateRoute;
