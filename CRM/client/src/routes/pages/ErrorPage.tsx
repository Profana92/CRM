import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage(): React.ReactNode {
   const error: unknown = useRouteError();
   return (
      <div id="error-page">
         <h1>Oops!</h1>
         <p>Sorry, an unexpected error has occurred.</p>
         <p>{isRouteErrorResponse(error) ? <i>{error.statusText || error.error?.message}</i> : ''}</p>
      </div>
   );
}
