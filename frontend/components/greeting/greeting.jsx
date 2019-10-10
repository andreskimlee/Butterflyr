import React from 'react';

import SignUpFormContainer from '../session_form/signup_form_container';
import LogInFormContainer from '../session_form/login_form_container';
import NavBar from "../NavBar/Nav"
import ForFun from '../for_fun'
import { Route } from 'react-router-dom'
const Greeting = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <div className="login-signup">
      <div className="navhead">
     <div className="butterflyr">butterflyr</div>
      <img className="butterfree" src={window.butterFree}/>
      <LogInFormContainer/>
      </div>     

      <SignUpFormContainer/> 
      
    </div>
  );
  const homePage = () => (
    <hgroup className="header-group">
      <NavBar currentUser={currentUser} logout={logout}></NavBar>
      <Route exact path="/" component={ForFun}/>
      
    </hgroup>
  )

  return currentUser ? homePage() : sessionLinks();
};


export default Greeting;
