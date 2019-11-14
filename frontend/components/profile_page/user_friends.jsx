import React from "react"
import { Link } from 'react-router-dom'
import FriendIndex from './friend_index'
import {withRouter, Route} from 'react-router-dom'
class UsersFriends extends React.Component {
    constructor(props) {
        super(props) 
        
        this.state = {
            user: "",
            friendButton: "Add Friend",
            friendStatus: "true"
        }
        this.props = props

    }

    sendFriendshipRequest (e) {
        this.props.requestFriendship({requester_id: this.props.currentUser.id, requested_id: Number(this.props.match.params.userId), status: "pending"})    
    }

    componentDidMount () {
        this.props.getUsersPosts(this.props.match.params.userId).then( ({user}) => this.setState({user: user}))
        if (this.props.currentUser.id === Number(this.props.match.params.userId)) {
            this.setState({friendStatus: "false"})
        } else {
            this.setState({friendStatus: "true"})
        }
    }
    
    
    

    render () {
     
        if (this.props.user === undefined) {
            return null; 
        }
        let friendlist = [] 
        if (this.props.user.friends !== undefined) {
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


                friendlist = friendlist.map((user, idx) => {               
                     var profPhoto = user.prof_photo ? user.prof_photo : window.profPhoto
                     if (user.id === this.props.currentUser.id) {
                        var profPhoto = this.props.currentUser.prof_photo
                    }                      
                    return (
                        <div className="user-friend" key={idx}>
                            <Link className="linkund" to={`/users/${user.id}`}>
                            <img className="photo-of-friend"src={profPhoto} />
                            <div className="friend-name">{(user.first_name[0].toUpperCase() + user.first_name.slice(1)) + " " + (user.last_name[0].toUpperCase() + user.last_name.slice(1))}</div>
                            </Link>
                        </div>
                    )
                })

                

            }

        return (
            <div className="user-friends-container">
                    <div onClick={this.sendFriendshipRequest.bind(this)} className={`friendButton-${this.state.friendStatus}`}> <img className="addfriendicon" src="https://banner2.kisspng.com/20180901/otz/kisspng-computer-icons-scalable-vector-graphics-like-butto-profile-addfriend-svg-png-icon-free-download-519-5b8b4a5af052e8.3625273415358551949844.jpg"/>{this.state.friendButton}</div>
                <div className="logo-frnds-count">
                    <img className="friends-logo" src={window.friendsLogo}/>
                    <div className="friends-count">Friends · <div className="friend-num">{friendlist.length}</div></div>
                </div>
                <div className="friend-list-container">
                  {friendlist}
                </div>
                
            </div>
        )
    }
}


export default UsersFriends; 