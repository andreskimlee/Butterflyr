import React from 'react';
import {connect} from "react-redux"
import {deleteUsersPost} from '../../actions/posts_actions'

class UsersPost extends React.Component {
  constructor(props) {
    super(props) 
    this.state = { dropDown: "falseDropDown" }
    this.props = props 
    console.log(props) 
  }
  
  handleDropDownFocus(e) {
    e.preventDefault() 
      this.setState({ dropDown: "trueDropDown"})
  }
  

  handleDropDownBlur(e) {
    e.preventDefault()
    this.setState({ dropDown: "falseDropDown"}) 
  }

  // handleEditPost(e) {
  //   const abc = <form>
  //     <input type="textarea"/>
  //   </form>
  // }

  handlePostDelete(e) {
    e.preventDefault()
    // debugger 
    this.props.deleteUsersPost(this.props.post.id).then(this.setState({dropDown: "falseDropDown"}))
    
  }


  

  render () {  
    let postPhoto; 
    if (this.props.post.photo != null) { 
    postPhoto = <img className="photo-on-post" src={this.props.post.photo} alt=""/>
  }  
  var d = new Date(this.props.post.timestamp);
  var n = d.toString().slice(4, 15)
  return (
    <div className="post-index-container">
      <div className="post-top-portion">
        <div className="prof-name-ind">
          <img className="prof-photo-ind" src={this.props.currentUser.prof_photo} alt=""/>
          <div className="post-date-name">
            <div className="author-name">{this.props.user}</div>
            <div className="date-made">{n}</div>
          </div>
          <div  id="drpdwn" tabIndex={3} onFocus={this.handleDropDownFocus.bind(this)} className="edit-post-button">...</div>
          <div id="drpdwn" className={`${this.state.dropDown}`}>
            <div className="e-post">Edit</div>
            <div onClick={this.handlePostDelete.bind(this)} className="d-post">Delete</div>
          </div>
        </div>
          
          <div className="body-of-post">{this.props.post.body}</div>
          {postPhoto} 
          <div className="comment-like-container ">
            <div className="ctii">
            <img className="like-button hvr-icon-bounce" src="https://images.vexels.com/media/users/3/157338/isolated/preview/4952c5bde17896bea3e8c16524cd5485-facebook-like-icon-by-vexels.png" />
            <div className="likes">Likes</div>
            </div>
            <div className="cti"> 
              <img className="commenticon" src="https://icon-library.net/images/comment-icon-png/comment-icon-png-2.jpg" />
              <div className="comment-text">Comment</div>
            </div>
          </div>
          <div className="write-comm">
            <img className="write-comm-prof" src={this.props.currentUser.prof_photo}/>
            <input className="write-comment-box" type="text" placeholder="Write a comment..."/>
          </div>
      </div>
    
    </div>
  )
  }
}
const mapStateToProps = (state) => {    
  // debugger 
  return {
    currentUser: state.entities.users[state.session.id],
    posts: state.entities.posts, 
    user: state.entities.user 
  };
};

const mapDispatchToProps = dispatch => ({
  createPost: (userId, post) => dispatch(createPost(userId, post)),
  getUsersPosts: (userId) => dispatch(getUsersPosts(userId)),
  editUsersPost: (postId) => dispatch(editUsersPost(postId)),
  deleteUsersPost: (postId) => dispatch(deleteUsersPost(postId))
})

export default connect(mapStateToProps,mapDispatchToProps)(UsersPost)