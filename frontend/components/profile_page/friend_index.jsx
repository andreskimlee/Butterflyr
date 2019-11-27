import React from 'react'
import {withRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {denyFriendship} from '../../actions/friendship_actions'

class FriendIndex extends React.Component {
    constructor(props) {
        super(props) 
       
    }

    handleClick(e) {
        e.preventDefault(); 
        debugger 
        
    }

    render () {
        let friendlist = [] 
            if (!this.props.user.friend_requests) {
                return null 
            }
            if (this.props.user.friends) {
            let friendrequests = Object.values(this.props.user.friends)
            friendrequests = friendrequests.map((friendships, idx) => { 
                    let pendingRequests = this.props.user.friend_requests.filter(friends => friends.status === "accepted")  
                      return pendingRequests.map(element => { 
                        if (friendships.id === element.requester_id) { 
                            friendlist.push(friendships) 
                      
                        }
                    })
                })
            let sentFriend = this.props.user.requested_friends
    
            sentFriend = sentFriend.forEach((friendships, idx) => { 
                    let requestedFriend = this.props.user.sent_friend_requests.filter(friends => friends.status === "accepted")  
                        return requestedFriend.map(element => { 
                            if (friendships.id === element.requested_id) { 
                                friendlist.push(friendships) 
                                
                            }
                        })
                    })

                
                friendlist = friendlist.map(user => {               
                     var profPhoto = user.prof_photo ? user.prof_photo : window.profPhoto
                     var friendShipId; 
                     if (user.id === this.props.currentUser.id) {
                        var profPhoto = this.props.currentUser.prof_photo
                    }
                    if (this.props.user.friend_requests) {
                        this.props.user.friend_requests.forEach(friendship => {
                            if (friendship.requester_id === user.id || friendship.requested_id === user.id ) {
                                friendShipId = friendship.id 
                            }
                        })
                    }
                    
                    
                    
                    debugger
                    return (
                        <div className="user-friendsindex">
                            <Link className="linkund" to={`/users/${user.id}`}>
                            <img className="photo-of-friend"src={profPhoto} />
                            </Link>
                            <div className="friend-index-name">{(user.first_name[0].toUpperCase() + user.first_name.slice(1)) + " " + (user.last_name[0].toUpperCase() + user.last_name.slice(1))}</div>
                            <div className="cont-friend-stat">
                            <div className="friend-status-btn"> ✓ Friends</div>
                            <div className="drp-dwn-frnd">
                                <div onClick={() => this.props.denyFriendship(friendShipId)} className="unfrnd-txt">Unfriend</div>
                                
                            </div>
                            </div>
                        </div>
                    )
                })
            }
        return (
            <div className="friend-container"> 
                <div className="header-friend-idx">
                    <div className="header-friend-index">
                    <img className="friend-index-logo" src={window.friendIndex}></img>
                    <div className="title-friend-index">Friends</div>
                    </div>
                    <div className="friend-count-cont">
                    <div className="friend-text-ind">All Friends</div> 
                    <div className="counter-friendamt">{friendlist.length}</div>
                    </div>
                </div>
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
    denyFriendship: (friendshipId) => dispatch(denyFriendship(friendshipId))
  })
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FriendIndex))
