import React from "react"
import { Link } from 'react-router-dom'
class UsersFriends extends React.Component {
    constructor(props) {
        super(props) 
        console.log(props) 
        this.state = {
            user: ""
        }
        this.props = props
    }

    componentDidMount () {
        this.props.getUsersPosts(this.props.match.params.userId).then( ({user}) => this.setState({user: user}))
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
            debugger 
            sentFriend = sentFriend.forEach((friendships, idx) => { 
                    let requestedFriend = this.props.user.sent_friend_requests.filter(friends => friends.status === "accepted")  
                        return requestedFriend.map(element => { 
                            if (friendships.id === element.requested_id) { 
                                friendlist.push(friendships) 
                            }
                        })
                    })



                let profilePic; 
                debugger 
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