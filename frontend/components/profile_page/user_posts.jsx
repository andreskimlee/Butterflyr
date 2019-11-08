import React from 'react';
import {connect} from "react-redux"
import {deleteUsersPost, getUsersPosts} from '../../actions/posts_actions'
import { createComment } from "../../actions/comment_actions"
import { merge } from 'lodash'
import { createLike } from '../../actions/like_actions'

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
        e.target.value = "" 
    }
  }

  handleLikeClick (e) {
    let typeOfLike; 
    e.preventDefault() 
    switch (e.target.className) {
      case "gif-1":
        typeOfLike = "like"
      case "gif-2":
        typeOfLike = "love"
      case "gif-3":
        typeOfLike = "haha"
      case "gif-4":
        typeOfLike = "wow"
      case "gif-5":
        typeOfLike = "sad"
      case "gif-6":
        typeOfLike = "angry"

    }
    let like = { like: {author_id: this.props.currentUser.id, likeable_id: this.props.post.id,  like_type: typeOfLike, likeable_type: "post"}} 
    this.props.createLike(like)
  }

  handleCommentClick (e) {
    e.preventDefault() 
   
   let abc = document.getElementsByClassName("write-comment-box")[0]
   abc.focus() 
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
    let commentCounter = this.props.post.comments ? Object.values(this.props.post.comments).length : "" 
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
    if (Object.values(this.props.comments).length > 0) { 
      if (Object.values(this.props.comments)[0].postId === this.props.post.id) { 
        comments = merge({}, this.props.comments, this.props.post.comments)
    } 
    
  }
    comments = Object.values(comments ? comments : this.props.post.comments).map(comment => {  
      return (
      <div>
        <div className="comment-head">
        <img className="prof-pic-for-the-100th-time" src={comment.prof_photo ? comment.prof_photo : window.profPhoto}></img>
        <div className="name-body">
        <div className="name-on-comment"> {(comment.first_name[0].toUpperCase() + comment.first_name.slice(1)) + " " + (comment.last_name[0].toUpperCase() + comment.last_name.slice(1))} </div>
        <div> {comment.body} </div>
        </div>
        </div>
        <div className="like-reply-created">
          <div className="like-reply">Like · Reply</div>
          <div className="timestamp">· {comment.createdAt.date}</div>
        </div>
        </div>
      )
    })
  }

  let postLikes = "";
  let emojiLikes; 
  let emojiLikes2;
  let emojiLikes3; 
  let countForEmojis = {}
  if (this.props.post.likes) {
    let totalLikes = Object.values(this.props.post.likes).length;  
      switch (true) {
        case (totalLikes === 0):
        postLikes = ""; 
        emojiLikes = ""; 
        break; 
        case (totalLikes === 1): 
        Object.values(this.props.post.likes).forEach(ele => {
         let firstUser = this.props.users[ele.author_id] 
         postLikes = (firstUser.first_name[0].toUpperCase() + firstUser.first_name.slice(1)) + " " +  (firstUser.last_name[0].toUpperCase() + firstUser.last_name.slice(1))
        })
        break; 
        case (totalLikes === 2): 
        let first = this.props.users[Object.values(this.props.post.likes)[0].author_id];
        let second = this.props.users[Object.values(this.props.post.likes)[1].author_id]; 
        postLikes = ((first.first_name[0].toUpperCase() + first.first_name.slice(1)) + " " +  (first.last_name[0].toUpperCase() + first.last_name.slice(1)) + "and" + (second.first_name[0].toUpperCase() + second.first_name.slice(1)) + " " +  (second.last_name[0].toUpperCase() + second.last_name.slice(1)))
        break; 
        case (totalLikes >= 3): 
        let first1 = this.props.users[Object.values(this.props.post.likes)[0].author_id];
        let second2 = this.props.users[Object.values(this.props.post.likes)[1].author_id]; 
        postLikes = ((first1.first_name[0].toUpperCase() + first1.first_name.slice(1)) + " " +  (first1.last_name[0].toUpperCase() + first1.last_name.slice(1)) + "," + (second2.first_name[0].toUpperCase() + second2.first_name.slice(1)) + " " +  (second2.last_name[0].toUpperCase() + second2.last_name.slice(1)) + "and" + `${totalLikes - 2}` + "others" )
        break; 
      }
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
          <div>
            <div className="likes-area"></div>
          <div className="comment-counter">{emojiLikes} {postLikes} {commentCounter} Comments</div>
          </div>
          <div className="comment-like-container ">
            <div className="ctii">
            <img className="like-button hvr-icon-bounce" src="https://images.vexels.com/media/users/3/157338/isolated/preview/4952c5bde17896bea3e8c16524cd5485-facebook-like-icon-by-vexels.png" />
            <div>
            <div className="likes">Like</div>
            <div className="hover-emojis">
              <img onClick={this.handleLikeClick.bind(this)} className="gif-1" src={window.likeGif} />
              <img onClick={this.handleLikeClick.bind(this)} className="gif-2" src={window.loveGif} />
              <img onClick={this.handleLikeClick.bind(this)} className="gif-3"  src={window.hahaGif} />
              <img onClick={this.handleLikeClick.bind(this)} className="gif-4" src={window.wowGif} />
              <img onClick={this.handleLikeClick.bind(this)} className="gif-5" src={window.sadGif} />
              <img onClick={this.handleLikeClick.bind(this)} className="gif-6" src={window.angryGif}/>
            </div>
            </div>
            </div>
            <div className="cti"> 
              <img className="commenticon" src="https://icon-library.net/images/comment-icon-png/comment-icon-png-2.jpg" />
              <div onClick={this.handleCommentClick.bind(this)} className="comment-text">Comment</div>
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
      
  return {
    currentUser: state.entities.users[state.session.id],
    posts: state.entities.posts,
    comments: state.entities.comments || [], 
    users: state.entities.users 
  };
};

const mapDispatchToProps = dispatch => ({
  createPost: (userId, post) => dispatch(createPost(userId, post)),
  getUsersPosts: (userId) => dispatch(getUsersPosts(userId)),
  editUsersPost: (postId) => dispatch(editUsersPost(postId)),
  deleteUsersPost: (postId) => dispatch(deleteUsersPost(postId)),
  createComment: (postId, formData) => dispatch(createComment(postId, formData)),
  deleteCommentOnPost: (commentId) => dispatch(deleteCommentOnPost(commentId)),
  createLike : (like) => dispatch(createLike(like))
})

export default connect(mapStateToProps,mapDispatchToProps)(UsersPost)