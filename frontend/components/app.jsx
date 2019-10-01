import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../util/route_util';

import GreetingContainer from './greeting/greeting_container';
import UserShowContainer from './UserShow/users_show_container';


const App = () => (
  <div>
    <GreetingContainer/>
    <AuthRoute exact path="/users/:userId" component={UserShowContainer} />
    </div> 
);

export default App;
