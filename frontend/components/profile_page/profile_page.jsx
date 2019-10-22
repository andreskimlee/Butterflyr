import React from "react";
import { Link } from 'react-router-dom'
import  BioPic  from './bio_pic'
import {withRouter, Route} from 'react-router-dom'
import AboutPage from './about_page'
import CreatePost from './create_post'
import { connect } from 'react-redux'   
import { fetchUser } from '../../actions/user_actions'
import { getUsersPosts, editUsersPost, deleteUsersPost } from '../../actions/posts_actions'
import { requestFriendship } from "../../actions/friendship_actions"
import  UsersPosts  from './user_posts'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props) 
        this.state = { photoFile: null, dropDown: "false", friendStatus: "true", user: ""} // because set to null put a if condition to append only if not null. 
        this.props = props 
        console.log(this.props)  
        // debugger 
    }   

    componentDidMount() {
       this.props.getUsersPosts(this.props.match.params.userId).then( ({user}) => this.setState({user: user}))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.getUsersPosts(this.props.match.params.userId)
        }
    }

    sendFriendshipRequest (e) {
        this.props.requestFriendship({requester_id: 16, requested_id: 2, status: "pending"})    
    }

    // friendship {requesting, receieved, status}

    //(:requester_id, :requested_id, :status)

    handleFile(e) {
        e.stopPropagation();
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[prof_photo]', e.currentTarget.files[0]) //  
        this.props.updateUserAction(this.props.currentUser.id, formData)
    }
 
    handleSubmitCover(e) {
        // debugger
        e.stopPropagation();
        e.preventDefault();
        const formData = new FormData();        
        formData.append('user[cover_photo]', e.currentTarget.files[0]) //  
        this.props.updateUserAction(this.props.currentUser.id, formData)
        
    }
    
                    
    render () {  
        let profPhoto; 
        let coverPhoto; 
        let renderPosts;  
        console.log(this.state)  
            if (typeof this.props.posts !== "undefined" ) {
                    renderPosts = () => Object.values(this.props.posts).reverse().map((post, idx) => (<UsersPosts key={idx} post={post} user={this.props.posts.user}/>) )
                } 
            
            if (this.state.user.cover_photo === "null") {
                coverPhoto = window.coverPhoto
            } else {
                coverPhoto = this.props.user.cover_photo 
            }

            

            // debugger
        // else {
        //     this.setState({friendStatus:"true"}) 
        // }


        return (
            
            <div className="TopBox">
                 <img className="CoverPhoto" src={coverPhoto} alt=""/>
                                <div onClick={this.sendFriendshipRequest.bind(this)} className={`friendButton-${this.state.friendStatus}`}> <img className="addfriendicon" src="https://banner2.kisspng.com/20180901/otz/kisspng-computer-icons-scalable-vector-graphics-like-butto-profile-addfriend-svg-png-icon-free-download-519-5b8b4a5af052e8.3625273415358551949844.jpg"/>Add Friend</div>
                    <div>
                    <div className="upload-cover-photo hvr-pulse-grow">
                        <div className="container-up">
                            <input onChange={this.handleSubmitCover.bind(this)} className= "hoo" type="file"/>
                        <img className="camera-icon" src="https://icon-library.net/images/camera-icon-png-white/camera-icon-png-white-8.jpg" alt=""/>
                        <div>
                        <div className="text-cover-prof">Update Cover Photo</div>
                            
                        </div>
                        </div>
                    </div>


                    </div> 
                    <div className="sectional">
                        <div className="outerborder"></div>
                        <img className="main-prof-pic" src={profPhoto}/>    
                        <div className="update-prof-pic">
                            <img className="camera-icon-prof" src="https://icon-library.net/images/camera-icon-png-white/camera-icon-png-white-8.jpg" />
                            <div className="up-text">Update</div>   
                            <input className="heo" type="file" onChange={this.handleFile.bind(this)}/> 

                        </div>
                        <div className="prof-links">
                        <Link className="timeline hvr-pop" to={`/users/${this.props.match.params.userId}`}>Timeline</Link>
                        <Link className="about hvr-pop"to={`/users/${this.props.match.params.userId}/about/overview`}>About</Link>   
                        <Link className="friends hvr-pop" to="/">Friends</Link>
                        <Link className="photos hvr-pop" to="/">Photos</Link>
                        <a className="more hvr-pop" href="https://images.squarespace-cdn.com/content/v1/51132139e4b0014fdfeca0ca/1515690627146-UG45BRZQ5WE4ABG6T786/ke17ZwdGBToddI8pDm48kEF2GaKpjeSPJuap1bYL1oVZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpyEWjbC5HC78c3ldIV68GhowvuiGnah3z0UFPVxk-pMmm-8ZlmgLQgTEiE--OHMuYI/Please+sir+may+I+have+some+more.jpg?format=1500w">More</a>
                        </div>
                        
                    </div>  
                    <div className='bio-comment-container'>
                       <Route exact path={`/users/:userId`} component={BioPic}/>
                       <div className="comment-container">
                       <Route exact path={`/users/:userId`} render={(props) => <CreatePost {...props} isAuthed={true} />}/>
                       <Route exact path={`/users/:userId`} render={renderPosts}/>
                       </div>
                        
                    </div>
                       <Route path={`/users/:userId/about`} component={AboutPage}/>
                    
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => {    
    // debugger 
    return {
      currentUser: state.entities.users[state.session.id],
      posts: state.entities.posts, 
      friendships: state.friendships, 
      user: state.entities.users[ownProps.match.params.userId]
    };
  };

  
  const mapDispatchToProps = dispatch => ({
    createPost: (userId, post) => dispatch(createPost(userId, post)),
    getUsersPosts: (userId) => dispatch(getUsersPosts(userId)),
    editUsersPost: (post) => dispatch(editUsersPost(post)),
    deleteUsersPost: (post ) => dispatch(deleteUsersPost(post)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    requestFriendship: friendship => dispatch(requestFriendship(friendship))

    
  })
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProfilePage))







//questions how do we submit without a submit button. 
