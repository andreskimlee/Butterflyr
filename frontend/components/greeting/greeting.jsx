import React from 'react';

import SignUpFormContainer from '../session_form/signup_form_container';
import LogInFormContainer from '../session_form/login_form_container';
import NavBar from "../NavBar/Nav"
import ForFun from '../for_fun'
import { Route } from 'react-router-dom'
import { UsersPost } from "../profile_page/user_posts"
import NewsFeed from "../newsfeed/news_feed"
import ChatRoom from '../chatroom/chatroom'


class Greeting extends React.Component {
    constructor(props) {
      super(props)
  
    }

    render () {
     
      const sessionLinks = () => (
        <div className="login-signup">
          <div className="navhead">
         <div className="butterflyr">butterflyr</div>
          <img className="butterfree" src={window.butterFree}/>
          <Route exact path="/" component={LogInFormContainer}/>
          </div>     
          <SignUpFormContainer/> 
        </div>
      );
      const homePage = () => (
        <hgroup className="header-group">
          <NavBar  currentUser={this.props.currentUser} logout={this.props.logout}></NavBar>
          <Route exact path="/" component={ForFun}/>
          
        </hgroup>
      )
      return ( 
        <div>{this.props.session.id ? homePage() : sessionLinks()}</div>
      )
    }

}


export default Greeting;
