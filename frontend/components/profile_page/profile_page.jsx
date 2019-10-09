import React from "react";
import { Link } from 'react-router-dom'
import  BioPic  from './bio_pic'
import {withRouter, Route} from 'react-router-dom'
import AboutPage from './about_page'
import CreatePost from './create_post'
import { connect } from 'react-redux'   
import { getUsersPosts, editUsersPost, deleteUsersPost} from '../../actions/posts_actions'
import  UsersPosts  from './user_posts'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {user: props.currentUser, photoFile: null, dropDown: "false", posts: ""}
        this.props = props 
        this.handleCoverPhotoSubmit = this.handleCoverPhotoSubmit.bind(this) 
        console.log(props)
    }   

    componentDidMount() {
       return this.props.getUsersPosts(this.props.match.params.userId).then(posts => this.setState({ posts: posts}))
    //    debugger 
    }

    
   
    editCoverPhoto(e) {
        e.preventDefault()
        this.setState({photoFile: e.currentTarget.files[0]})
        
    }


    handleCoverPhotoSubmit(e) {
        e.preventDefault()
        // debugger 
        e.type === "click" ? this.setState({ dropDown: "true"}) : this.setState({ dropDown: "false"})
    }

    handleProfPhotoSubmit(e) {
        e.preventDefault() 
        const formData = new FormData(); // formdata is sorting 
        formData.append('user[prof_photo]', this.state.photoFile) // key of photo... 
        // debugger
        this.props.updateUserAction(this.state.user.id, formData)
    }

    handleFile(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({photoFile: e.currentTarget.files[0]})
    }

    
                    
    render () {
        let renderPosts; 
        // debugger 
            if (this.state.posts !== "" ) {
                // debugger 
                renderPosts = () => Object.values(this.state.posts.posts.posts).map((post, idx) => (<UsersPosts key={idx} post={post}/>) )
            } 
        return (
            <div className="TopBox">
                 <img className="CoverPhoto" src="https://www.jakpost.travel/wimages/large/134-1340745_pickle-rick-hd-wallpaper-hey-morty-im-a.png" alt=""/>
                    <div>
                    <div onClick={this.handleCoverPhotoSubmit} onBlur={this.handleCoverPhotoSubmit} className="upload-cover-photo hvr-pulse-grow">
                        <div className="container-up">
                        <img className="camera-icon" src="https://icon-library.net/images/camera-icon-png-white/camera-icon-png-white-8.jpg" alt=""/>
                        <div>
                        <div className="text-cover-prof">Update Cover Photo</div>
                            
                        </div>
                        </div>
                    </div>
                    <div className={`drop-down-upload-${this.state.dropDown}`}><div className="arrowup"></div>Upload Photo...</div>

                    </div> 
                    <div className="sectional">
                        <div className="outerborder"></div>
                        <img className="main-prof-pic" src={this.props.currentUser.prof_photo}/> 
                        <div className="update-prof-pic">
                            <img className="camera-icon-prof" src="https://icon-library.net/images/camera-icon-png-white/camera-icon-png-white-8.jpg" />
                            <div className="up-text">Update</div>   
                            <input className="heo" type="file" onChange={this.handleFile.bind(this)} onChange={this.handleProfPhotoSubmit.bind(this)} /> 

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

const mapStateToProps = (state) => {    
    // debugger 
    return {
      currentUser: state.entities.users[state.session.id],
      posts: state.posts.posts 
    };
  };

  
  const mapDispatchToProps = dispatch => ({
    createPost: (userId, post) => dispatch(createPost(userId, post)),
    getUsersPosts: (userId) => dispatch(getUsersPosts(userId)),
    editUsersPost: (post) => dispatch(editUsersPost(post)),
    deleteUsersPost: (post ) => dispatch(deleteUsersPost(post))
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)







//questions how do we submit without a submit button. 
