import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from 'context';

const PublicRoute = (props) => {
  const {
    state: { isLoggedIn },
  } = useContext(GlobalContext);

  const { component: Component, layout: Layout } = props;

  if (isLoggedIn) {
    // const userType = localStorage.getItem('usertype');
    return (
      <Route>
        <Redirect exact to='/' />
      </Route>
    );
  }

  return (
    <Route>
      <Layout>
        <Component />
      </Layout>
    </Route>
  );
};

export default PublicRoute;