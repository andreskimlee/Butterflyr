import React from "react"
import {withRouter, Route} from 'react-router-dom'
import UserFriends from './user_friends_container'
import {connect} from "react-redux"
import {updateUserAction} from '../../actions/user_actions'

class BioPic extends React.Component {
    constructor(props) {
    super(props) 
    this.state = {
        editBio: "false",
        bioText: ""
    }
        
    }

    componentDidMount() {
        this.setState({bioText: this.props.user ? this.props.user.bio : "" })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            // console.log(this.props.posts) 
            this.setState({bioText: this.props.user ? this.props.user.bio : "" })
        } 
    }

    handleCancel(e) {
        this.setState({editBio: "false"})
    }

    handleSave(e) {
        e.preventDefault() 
        let formData = new FormData()
        formData.append('user[bio]', this.state.bioText)
        this.props.updateUserAction(this.props.currentUser.id, formData).then(this.setState({bioText: this.state.bioText}))
        this.setState({editBio: "false"})
    }

    handleBioChange (e) {
        e.preventDefault() 
        this.setState({bioText: e.target.value})
    }

    handleClick(e) {
        e.preventDefault()
        this.setState({editBio: "true"})
    }

    render () {
        let editState;
        if (this.state.editBio === "false") {
          editState = 
            <div>
            <div className="bio">{this.state.bioText}</div>
            <button onClick={this.handleClick.bind(this)} className="edit-bio"><div className={`bioedit`}>Edit Bio</div></button>
            </div>
        } else {
           editState =
            <div className="edit-bio-info">
                <form>
             <input onChange={this.handleBioChange.bind(this)} className="input-bio"type="textbox" name="bio" value={this.state.bioText}/>
             <div className="bottom-sect-bio-edit">
                 <div className="counter-for-text">{100 - this.state.bioText.length}</div>
                 <div className="button-container">
                <button onClick={this.handleCancel.bind(this)} className="cancel-button">Cancel</button>
                <button onClick={this.handleSave.bind(this)} className="save-button">Save</button>
                </div>
             </div>
             </form>
             </div>
             
        }
        return (
            <div>
            <div className="bio-container">
                <div className="intro"><img className="globe-icon"src={window.globeicon}  /> Intro </div>
                {editState}
                <div className="user-info">
                   <div className="h"><img className="house" src={window.house}/><div>Lives in Syosset, New York</div></div>
                    <div className="g"><img className="geo" src={window.geo}/><div>From Asuncion, Paraguay</div></div>
                    <div className="c"><img className="clock" src={window.clock}/><div>Joined December 2007</div></div>
                </div>
                <button className="edit-details"><div className="detailedit">Edit Details</div></button>
                <div className="photos">
                    <img className="image-1" src="https://images2.minutemediacdn.com/image/upload/c_crop,h_788,w_1400,x_0,y_24/f_auto,q_auto,w_1100/v1555155291/shape/mentalfloss/rickandmorty.jpg"/>
                    <div>
                        <img className="image-2" src="https://nyoobserver.files.wordpress.com/2019/07/rick-and-morty-season-4-trailer-1.jpg?quality=80"/>
                        <img className="image-3" src="https://am23.akamaized.net/tms/cnt/uploads/2019/09/rick-and-morty-adult-swim-1200x800.jpg"/>
                        <img className="image-4" src="https://nerdist.com/wp-content/uploads/2019/05/Rick-and-morty-1200x675.png"/>
                    </div>
                </div>
            
            </div>
            <Route exact path={`/users/:userId`} component={UserFriends}/>
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
      comments: state.entities.comments || []  
    };
  };

  
  const mapDispatchToProps = dispatch => ({
    updateUserAction: (userId, formData) => dispatch(updateUserAction(userId, formData)), 
  })
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(BioPic))





