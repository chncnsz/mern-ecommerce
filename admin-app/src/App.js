import React, { useEffect, useState} from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/HOC/PrivateRoute';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUserLoggedIn } from './actions';
import Products from '../src/containers/Products';
import Orders from '../src/containers/Orders';
import Category from './containers/Category';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);

  return (
    <div className="App">
            <Switch>
              <PrivateRoute path="/" exact component={Home}/>
              <PrivateRoute path="/category" exact component={Category}/>
              <PrivateRoute path="/products" exact component={Products}/>
              <PrivateRoute path="/orders" exact component={Orders}/>

              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
            </Switch>
    </div>
  );
}

export default App;
