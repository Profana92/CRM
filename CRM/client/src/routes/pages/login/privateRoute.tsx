import { Navigate } from 'react-router-dom';

function privateRoute({ children }) {
   const isLoggedin = JSON.parse(localStorage.getItem('user'));
   return isLoggedin && isLoggedin.logged_in === true ? children : <Navigate to="/login" />;
}

export default privateRoute;
