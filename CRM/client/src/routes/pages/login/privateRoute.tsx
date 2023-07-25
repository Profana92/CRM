import { Navigate } from 'react-router-dom';

function privateRoute({ children }) {
   console.log(JSON.parse(localStorage.getItem('user')));
   const isLoggedin = JSON.parse(localStorage.getItem('user'));
   return isLoggedin && isLoggedin.logged_in === true ? children : <Navigate to="/login" />;
}

export default privateRoute;
