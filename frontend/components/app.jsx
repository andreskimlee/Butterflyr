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
import ProfilePageContainer from './profile_page/profile_page_container'
import AboutPage from './profile_page/about_page'



const App = () => (
  <div>
    <Route  path="/" component={GreetingContainer}/>
    <ProtectedRoute path="/users/:userId" component={ProfilePageContainer}/>
    </div> 
);

export default App;


