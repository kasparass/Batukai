import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Products from './components/products/Products';
import Product from './components/product/Product';
import Profile from './components/profile/Profile';
import Cart from './components/cart/Cart';
import CreateProduct from './components/product/CreateProduct';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="mt-9">
            <Alert />
            <Switch>
              <Route exact path="/" component={Products} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/products/:id" component={Product} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/create-product"
                component={CreateProduct}
              />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/cart" component={Cart} />
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
