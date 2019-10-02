import React from 'react';
import { Link } from 'react-router-dom';
import SignUpFormContainer from '../session_form/signup_form_container';
import LogInFormContainer from '../session_form/login_form_container';



const Greeting = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <nav className="login-signup">
      <div className="navhead"></div>
      <div className="butterflyr">butterflyr</div>
      <LogInFormContainer/>
      <SignUpFormContainer/> 
      
    </nav>
  );
  const navBar = () => (
    <hgroup className="header-group">
      <h2 className="header-name">Hi, {currentUser.email}!</h2>
      <button className="header-button" onClick={logout}>Log Out</button>
    </hgroup>
  )

  return currentUser ? navBar() : sessionLinks();
};


export default Greeting;
