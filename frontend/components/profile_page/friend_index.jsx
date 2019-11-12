import React from 'react'
import {withRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

class FriendIndex extends React.Component {
    constructor(props) {
        super(props) 
       
    }

    render () {
        let friendlist = [] 
        
            let friendrequests = Object.values(this.props.user.friends)
            friendrequests = friendrequests.map((friendships, idx) => { 
                    let pendingRequests = this.props.user.friend_requests.filter(friends => friends.status === "accepted")  
                      return pendingRequests.map(element => { 
                        if (friendships.id === element.requester_id) { 
                            friendlist.push(friendships) 
                            // debugger 
                        }
                    })
                })
            let sentFriend = this.props.user.requested_friends
            // debugger
            sentFriend = sentFriend.forEach((friendships, idx) => { 
                    let requestedFriend = this.props.user.sent_friend_requests.filter(friends => friends.status === "accepted")  
                        return requestedFriend.map(element => { 
                            if (friendships.id === element.requested_id) { 
                                friendlist.push(friendships) 
                                // debugger
                            }
                        })
                    })


                friendlist = friendlist.map(user => {               
                     var profPhoto = user.prof_photo ? user.prof_photo : window.profPhoto
                     if (user.id === this.props.currentUser.id) {
                        var profPhoto = this.props.currentUser.prof_photo
                    }                      
                    return (
                        <div className="user-friendsindex">
                            <Link className="linkund" to={`/users/${user.id}`}>
<<<<<<< HEAD
                            <img className="photo-of-friend"src={profPhoto} />
=======
                            <img className="photo-of-friend"src={profPhoto} alt=""/>
>>>>>>> 3e421af565e7e932f77e833ea9cd791ad0afaca8
                            </Link>
                            <div className="friend-index-name">{(user.first_name[0].toUpperCase() + user.first_name.slice(1)) + " " + (user.last_name[0].toUpperCase() + user.last_name.slice(1))}</div>
                            <div className="friend-status-btn"> ✓ Friends</div>
                        </div>
                    )
                })
        return (
            <div className="friend-container"> 
                <header className="header-friend-idx">
                    <div className="header-friend-index">
                    <img className="friend-index-logo" src={window.friendIndex}></img>
                    <div className="title-friend-index">Friends</div>
                    </div>
                    <div className="friend-count-cont">
                    <div className="friend-text-ind">All Friends</div> 
                    <div className="counter-friendamt">{friendlist.length}</div>
                    </div>
                </header>
                <div className="friend-index-list">
                 {friendlist}
                 </div>
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
