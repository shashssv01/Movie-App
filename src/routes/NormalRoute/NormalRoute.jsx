import { Route } from 'react-router-dom';

const NormalRoute = (props) => {

  const { component: Component, layout: Layout } = props;

  return (
    <Route>
      <Layout>
        <Component />
      </Layout>
    </Route>
  );
};

export default NormalRoute;