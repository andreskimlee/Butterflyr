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
        console.log(this.props.user)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.setState({bioText: this.props.user ? this.props.user.bio : "" })
        } 
        if (prevProps.user !== this.props.user) {
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
        if (!this.props.user) {
            return null
        }

        console.log(this.state.bioText)
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
                 <div className="counter-for-text">{100 - (this.state.bioText ? this.state.bioText.length : 0 ) }</div>
                 <div className="button-container">
                <button onClick={this.handleCancel.bind(this)} className="cancel-button">Cancel</button>
                <button onClick={this.handleSave.bind(this)} className="save-button">Save</button>
                </div>
             </div>
             </form>
             </div>
             
        }
        let featuredPhotos;
        
        if (this.props.user.photos !== undefined) { 
            switch (true) {
                case (this.props.user.photos.length === 1) :
                featuredPhotos = <div className="photos"><img className="image-1" src={this.props.user.photos[0]} /></div>
                break;
                case (this.props.user.photos.length === 2) : 
                featuredPhotos = <div className="photos"><img className="image-1" src={this.props.user.photos[0]} />
                    <div>
                    <img className="image-2" src={this.props.user.photos[1]} />
                    </div>
                    </div>
                break; 
                case (this.props.user.photos.length === 3 ) :
                       featuredPhotos = <div className="photos"><img className="image-1" src={this.props.user.photos[0]} />
                        <div>
                        <img className="image-2" src={this.props.user.photos[1]} />
                        <img className="image-3" src={this.props.user.photos[2]}/>
                        </div>
                        </div>
                    break; 
                case (this.props.user.photos.length >= 4 ) : 
                featuredPhotos = <div className="photos"><img className="image-1" src={this.props.user.photos[0]} />
                <div>
                <img className="image-2" src={this.props.user.photos[1]} />
                <img className="image-3" src={this.props.user.photos[2]}/>
                <img className="image-4" src={this.props.user.photos[3]}/>
                </div>
                </div>
                break;        
            }     
        }

        return (
            <div>
            <div className="bio-container">
                <div className="intro"><img className="globe-icon"src={window.globeicon}  /> Intro </div>
                {editState}
                <div className="user-info">
                   <div className="h"><img className="house" src={window.house}/><div>Lives in Syosset, New York</div></div>
                    <div className="g"><img className="geo" src={window.geo}/><div>From Asuncion, Paraguay</div></div>
                    <div className="c"><img className="clock" src={window.clock}/><div>Joined {this.props.user.createdAt}</div></div>
                </div>
                <button className="edit-details"><div className="detailedit">Edit Details</div></button>
                
                    {featuredPhotos}
        
            
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





