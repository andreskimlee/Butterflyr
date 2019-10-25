import React from "react"
import { Link } from 'react-router-dom'
class UsersFriends extends React.Component {
    constructor(props) {
        super(props) 
        console.log(props) 
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
        } 
    }

    

    render () {
        if (this.props.user === undefined) {
            return null; 
        }
        let friendlist = [] 
            let friendrequests = this.props.user.received_friends 
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



                let profilePic;  
                friendlist = friendlist.map(user => {
                    user.prof_photo ? profilePic = user.prof_photo : profilePic = window.profPhoto
                    return (
                        <div className="user-friend">
                            <Link className="linkund" to={`/users/${user.id}`}>
                            <img className="photo-of-friend"src={profilePic} alt=""/>
                            <div className="friend-name">{(user.first_name[0].toUpperCase() + user.first_name.slice(1)) + " " + (user.last_name[0].toUpperCase() + user.last_name.slice(1))}</div>
                            </Link>
                        </div>
                    )
                })

                



        return (
            <div className="user-friends-container">
                    <div onClick={this.sendFriendshipRequest.bind(this)} className={`friendButton-${this.state.friendStatus}`}> <img className="addfriendicon" src="https://banner2.kisspng.com/20180901/otz/kisspng-computer-icons-scalable-vector-graphics-like-butto-profile-addfriend-svg-png-icon-free-download-519-5b8b4a5af052e8.3625273415358551949844.jpg"/>{this.state.friendButton}</div>
                <div className="logo-frnds-count">
                    <img className="friends-logo" src={window.friendsLogo} alt=""/>
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