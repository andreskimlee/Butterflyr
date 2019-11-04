import React from 'react'
import {withRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'

class FriendIndex extends React.Component {
    constructor(props) {
        super(props) 
        console.log(props) 
    }

    render () {
        return (
            <div className="friend-container"> 
                <header className="header-friend-idx">
                    <div className="header-friend-index">
                    <img className="friend-index-logo" src={window.friendIndex}></img>
                    <div className="title-friend-index">Friends</div>
                    </div>
                    <div>
                    <div>All Friends</div> 
                    </div>
                </header>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {     
    return {
      currentUser: state.entities.users[state.session.id],
      posts: state.entities.posts, 
      friendships: state.friendships, 
      user: state.entities.users[ownProps.match.params.userId], 
    };
  };

  
  const mapDispatchToProps = dispatch => ({
 
  })
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FriendIndex))
