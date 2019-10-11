import React from "react"
import { Link } from 'react-router-dom';
import {connect} from "react-redux"
import { logout } from "../../actions/session_actions" 
import { fetchUser } from '../../actions/user_actions'


class NavBar extends React.Component {
    constructor(props) {
        super(props) 
        this.state = { DropDown: "", DropDownFrnd: "false"}
        
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
        if (e.type === "focus") {
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
            
        debugger    
    
        return (
            <span className="Nav-Bar">
                
                <Link to='/' className="azy"> <img className="butterfly-Logo" src={window.butterFlyLogo}/></Link>
                <Link className="showpage" to={`/users/${this.props.currentUser.id}`}><img className="profile-small"src={this.props.currentUser.prof_photo}/><div className="Name">{this.props.currentUser.first_name.charAt(0).toUpperCase() + this.props.currentUser.first_name.slice(1)}</div></Link>
                <Link to="/" className="home" ><div className='homeLink'>Home</div></Link>
                <img tabIndex={3} onBlur={this.handleClick4Frnd.bind(this)} onFocus={this.handleClick4Frnd.bind(this)} className="friend-notification" src="https://cdn0.iconfinder.com/data/icons/facebook-ui-glyph/48/Sed-02-512.png"/>
                <div className={`${this.state.DropDownFrnd}-friend-drp`}>
                    <div className="title-drp">Friend Request</div>
                    <div className="request-container">
                        <img className="requesterprof" src={user.prof_photo}/>
                        <div className="textholder">
                        <div className="requestname">{user.first_name + " " + user.last_name}</div>
                        <div className="bio-tag"> Lorem Ipsum is simply dummy text of the printing </div>
                        </div>
                        <div className="buttonclass">
                        <button className="friendapprove"> Confirm </button>
                        <button className="denyfriend"> Delete</button>
                        </div>
                    </div>
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
      currentUser: users[session.id],
      friendships: users.friend_requests 
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchUser: (id) => dispatch(fetchUser(id)) 
  });

export default connect(mapStateToProps, mapDispatchToProps)(NavBar) 
