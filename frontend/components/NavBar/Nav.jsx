import React from "react"
import { Link } from 'react-router-dom';
import {connect} from "react-redux"
import { logout } from "../../actions/session_actions" 
import { fetchUser } from '../../actions/user_actions'
import { approveFriendship, denyFriendship } from "../../actions/friendship_actions"
import ReactDOM from "react-dom" 
import {merge} from "lodash"
class NavBar extends React.Component {
    constructor(props) {
    
        super(props) 
        this.state = { DropDown: "", DropDownFrnd: "false"}
        this.textInput = React.createRef();
    
    }

    componentDidMount () {
        
    }

    handleClick(e) {
        e.preventDefault()
        if (this.state.DropDown === "") {
        this.setState({DropDown: "visible"})
        } else {
            this.setState({DropDown: ""})
        }
    }

    handleClick4Frnd(e) {
        e.preventDefault() 
         
        if (this.state.DropDownFrnd === "false") {
            this.setState({DropDownFrnd: "true"})

        } else {
            this.setState({DropDownFrnd: "false"})
        }
    }

    handleBlur(e) {
        e.preventDefault
        this.setState({DropDown: ""})
    }
    
    render () {
            let user; 
            if (this.props.currentUser.received_friends[0] !== undefined) {
                user = this.props.currentUser.received_friends[0]
            } 
                else {
                    user = ""
                }
            

            let friendrequests = this.props.currentUser.received_friends  
            friendrequests = friendrequests.map((friendships, idx) => { 
                    let pendingRequests = this.props.currentUser.friend_requests.filter(friends => friends.status === "pending")  
                      return pendingRequests.map(element => { 
                        if (friendships.id === element.requester_id) { 
                              return ( 
                                <div key={idx} className="request-container">
                                <img className="requesterprof" src="https://vignette.wikia.nocookie.net/rickandmorty/images/b/bc/Vlcsnap-2015-01-31-04h27m25s140.png/revision/latest?cb=20150131122752"/>
                                <div className="textholder">
                                <div className="requestname"><Link className="friend-req-link"to={`/users/${friendships.id}`} >{friendships.first_name + " " + friendships.last_name}</Link></div>
                                <div className="bio-tag"> Lorem Ipsum is simply dummy text of the printing </div>
                                </div>
                                <div className="buttonclass">
                                <button className="friendapprove" onClick={() => this.props.approveFriendship(merge({}, this.props.currentUser.friend_requests.filter(friends => friends.requester_id === Number(friendships.id))[0], {status: "accepted"}))}> Confirm </button>
                                <button className="denyfriend"  > Delete</button>
                                </div>
                                </div>
                                ) 
                        }
                      
                    })   
                    });
            
       
        return (
            <span className="Nav-Bar">
                
                <Link to='/' className="azy"> <img className="butterfly-Logo" src={window.butterFlyLogo}/></Link>
                <Link className="showpage" to={`/users/${this.props.currentUser.id}`}><img className="profile-small"src={this.props.currentUser.prof_photo}/><div className="Name">{this.props.currentUser.first_name.charAt(0).toUpperCase() + this.props.currentUser.first_name.slice(1)}</div></Link>
                <Link to="/" className="home" ><div className='homeLink'>Home</div></Link>
                <img name="dropdown" tabIndex={3} onClick={this.handleClick4Frnd.bind(this)} className="friend-notification" src="https://cdn0.iconfinder.com/data/icons/facebook-ui-glyph/48/Sed-02-512.png"/>
                <div tabIndex={-1} ref={this.textInput}  className={`${this.state.DropDownFrnd}-friend-drp`}>
                    <div className="title-drp">Friend Request</div>
                        {friendrequests}
                    
                </div>
                <div className="drop-down-btn" onClick={this.handleClick.bind(this)} >
                    
                    <div className={this.state.DropDown} onClick={this.props.logout}></div>
                
                </div>
            </span>
        )
    }
}

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
      currentUser: users[session.id]
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchUser: (id) => dispatch(fetchUser(id)),
    approveFriendship: (friendship) => dispatch(approveFriendship(friendship)),
    denyFriendship: (id) => dispatch(denyFriendship(id))

  });

export default connect(mapStateToProps, mapDispatchToProps)(NavBar) 
