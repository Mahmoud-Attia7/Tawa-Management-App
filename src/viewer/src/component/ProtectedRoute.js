import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from './UserContext';

const ProtectedRoute = () => {
  const { userRoles, setRoles, userAuthenticateData, setUserAuthenticateData, authorize } = useUser();
  const storedURLSTR = localStorage.getItem('URL');
  const storedAUTHSTR = localStorage.getItem('auth');

  useEffect(() => {
    if (storedURLSTR && storedAUTHSTR) {
      const URL = JSON.parse(storedURLSTR);
      const AUTH = JSON.parse(storedAUTHSTR);
      setRoles(URL);
      setUserAuthenticateData(AUTH);
      authorize(true);
    } else {
      console.log("Authentication data not found in localStorage.");
      localStorage.clear();
      authorize(false);
    }
  }, []);

  // Render the Outlet component if the user is authenticated,
  // otherwise redirect to the login page
  return (
    (storedURLSTR && storedAUTHSTR) ? <Outlet /> : <Navigate to="/pages/login" />
  );
};

export default ProtectedRoute;







// // In a new file, perhaps /components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useUser } from './UserContext';


// const ProtectedRoute = () => {
//   const { userAuthorize } = useUser();
//   return userAuthorize == true ? <Outlet/> : <Navigate to="/pages/login"/>;
// };


// export default ProtectedRoute;




// // // In a new file, perhaps /components/ProtectedRoute.jsx
// // import React from 'react';
// // import { Navigate, Outlet } from 'react-router-dom';
// // import { useUser } from './UserContext';


// // const ProtectedRoute = () => {
// //   const { userAuthenticateData, userRoles, setRoles, setUserAuthenticateData } = useUser();
// //   if(localStorage.getItem("URL") !== null && localStorage.getItem("auth") !== null){
// //     const storedURLSTR = localStorage.getItem('URL');
// //     const URL = JSON.parse(storedURLSTR);
// //     setRoles(URL);
// //     const storedAUTHSTR = localStorage.getItem('auth');
// //     const AUTH = JSON.parse(storedAUTHSTR);
// //     setUserAuthenticateData(AUTH);
// //   }
// //   else{
// //     console.log("not")
// //     localStorage.clear();
// //   }
// //   return (userRoles !== null && userAuthenticateData !== null) ? <Outlet/> : <Navigate to="/pages/login"/>;
// // };


// // export default ProtectedRoute;
