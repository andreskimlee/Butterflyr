import React from 'react';
import { Link } from 'react-router-dom';
import SignUpFormContainer from '../session_form/signup_form_container';
import LogInFormContainer from '../session_form/login_form_container';
// import NavContainer from '../nav/nav'


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
      <div className="Nav-Bar">
          <Link to='/'> <img className="butterfly-Logo" src={window.butterFlyLogo}/></Link>
          <h2 className="header-name">Hi, {currentUser.email}!</h2>
          <Link to={`/users/${currentUser.id}`}>User's Profile Page</Link>
          <button className="header-button" onClick={logout}>Log Out</button>
      </div>

    </hgroup>
  )

  return currentUser ? homePage() : sessionLinks();
};


export default Greeting;
