import React, { useContext } from 'react';
import { GlobalContext } from 'context';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ layout: Layout, component: Component, ...props }) => {
  
  const {
    state: { isLoggedIn },
  } = useContext(GlobalContext);
  
  let token = localStorage.getItem("authToken");
  
  if (!isLoggedIn && !!!token) {
      return <Route><Redirect exact to='/login' /></Route>
  }

  return <Route {...props}><Layout><Component /></Layout></Route>
};

export default PrivateRoute;
