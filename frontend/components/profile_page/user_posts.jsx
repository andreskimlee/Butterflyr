import React from 'react';
import {connect} from "react-redux"
import {deleteUsersPost} from '../../actions/posts_actions'
import { createComment } from "../../actions/comment_actions"

class UsersPost extends React.Component {
  constructor(props) {
    super(props) 
    this.state = { dropDown: "falseDropDown", type: this.props.type, body: "", photoFile: null,}
    this.props = props 
    
  }

  keyPressed(e) {
    if (e.key === "Enter") {
        const formData = new FormData(); // formdata is sort of holding 
        if (this.state.photoFile !== null) {
            formData.append('comment[photo]', this.state.photoFile)
            
        }  
        formData.append('comment[body]', this.state.body)
        formData.append('comment[author_id]', this.props.currentUser.id)
        formData.append('comment[post_id]', this.props.post.id)
        this.props.createComment(this.props.post.id, formData)
        
    }
  }


  update(field) {
    return e => this.setState({
      [field]: e.target.value
    });
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
    console.log(this.state.body)
    if (this.props.user === undefined) {
      return null; 
  }
    let postPhoto; 
    if (this.props.post.photo != null) { 
    postPhoto = <img className="photo-on-post" src={this.props.post.photo} alt=""/>
  }  
  var d = new Date(this.props.post.timestamp);
  var n = d.toString().slice(4, 15)
  var profPhoto = this.props.user.prof_photo ? this.props.user.prof_photo : window.profPhoto
                     if (this.props.user.id === this.props.currentUser.id) {
                        var profPhoto = this.props.currentUser.prof_photo
                    }    
  let comments;                    
  if (this.props.post.comments) {
    comments = Object.values(this.props.post.comments).map(comment => {
      return (
      <div>
        <div className="comment-head">
        <img className="prof-pic-for-the-100th-time" src={comment.prof_photo ? comment.prof_photo : window.profPhoto}></img>
        <div className="name-body">
        <div> {(comment.first_name[0].toUpperCase() + comment.first_name.slice(1)) + " " + (comment.last_name[0].toUpperCase() + comment.last_name.slice(1))} </div>
        <div> {comment.body} </div>
        </div>
        </div>
        </div>
      )
    })
  }
  
  return (
    <div className="post-index-container">
      <div className="post-top-portion">
        <div className="prof-name-ind">
          <img className="prof-photo-ind" src={profPhoto} alt=""/>
          <div className="post-date-name">
            <div className="author-name">{(this.props.user.first_name[0].toUpperCase() + this.props.user.first_name.slice(1)) + " " + (this.props.user.last_name[0].toUpperCase() + this.props.user.last_name.slice(1))}</div>
            <div className="date-made">{n}</div>
          </div>
          <div  id="drpdwn" tabIndex={3} onFocus={this.handleDropDownFocus.bind(this)} className="edit-post-button">...</div>
          <div id="drpdwn" className={`${this.state.dropDown}-${this.state.type}`}>
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
          <div className="comment-container">
            {comments}
            </div>
          <div className="write-comm">
            <img className="write-comm-prof" src={profPhoto}/>
            <input className="write-comment-box" type="text" placeholder="Write a comment..." onChange={this.update("body").bind(this)} onKeyPress={this.keyPressed.bind(this)}/>
          </div>
      </div>
    
    </div>
  )
  }
}
const mapStateToProps = (state, ownProps) => {
  // debugger    
  return {
    currentUser: state.entities.users[state.session.id],
    posts: state.entities.posts,
  };
};

const mapDispatchToProps = dispatch => ({
  createPost: (userId, post) => dispatch(createPost(userId, post)),
  getUsersPosts: (userId) => dispatch(getUsersPosts(userId)),
  editUsersPost: (postId) => dispatch(editUsersPost(postId)),
  deleteUsersPost: (postId) => dispatch(deleteUsersPost(postId)),
  createComment: (postId, authorId) => dispatch(createComment(postId, authorId)),
  deleteCommentOnPost: (commentId) => dispatch(deleteCommentOnPost(commentId))
})

export default connect(mapStateToProps,mapDispatchToProps)(UsersPost)