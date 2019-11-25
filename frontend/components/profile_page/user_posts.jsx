import React from 'react';
import {connect} from "react-redux"
import {deleteUsersPost, getUsersPosts} from '../../actions/posts_actions'
import { createComment } from "../../actions/comment_actions"
import { merge } from 'lodash'
import { createLike, deleteLike} from '../../actions/like_actions'


class UsersPost extends React.Component {
  constructor(props) {
    super(props) 
    this.state = { dropDown: "falseDropDown", type: this.props.type, body: "", photoFile: null, likeButton: "", emojiLogo: window.defaultLike}
    this.props = props 
    
  }

  

  handleLikeButton(e) {
    e.preventDefault()  
    if (this.state.likeButton !== "" ) {
      let allLikesForPost = merge({}, this.props.post.likes, this.props.likes)
      Object.values(allLikesForPost).forEach(ele => {
        if (ele.author_id === this.props.currentUser.id) {
          this.props.deleteLike(ele)
          this.setState({likeButton: ""})
          this.setState({emojiLogo: window.defaultLike})
        }
        
      })
    

    }
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
    switch (true) {
      case (e.target.className ==="gif-1"):
        typeOfLike = "like"
        this.setState({likeButton: "Like"})
        this.setState({emojiLogo: window.likeSVG})
        break;
      case (e.target.className === "gif-2"):
        typeOfLike = "love"
        this.setState({likeButton: "Love"})
        this.setState({emojiLogo: window.loveSVG})
        break;
      case (e.target.className === "gif-3"):
        typeOfLike = "haha"
        this.setState({likeButton: "Haha"})
        this.setState({emojiLogo: window.hahaSVG})
        break;
      case (e.target.className ==="gif-4"):
        typeOfLike = "wow"
        this.setState({likeButton: "Wow"})
        this.setState({emojiLogo: window.wowSVG})
        break;
      case (e.target.className === "gif-5"):
        typeOfLike = "sad"
        this.setState({likeButton: "Sad"})
        this.setState({emojiLogo: window.sadSVG})
        break;
      case (e.target.className === "gif-6"):
        typeOfLike = "angry"
        this.setState({likeButton: "Angry"})
        this.setState({emojiLogo: window.angrySVG})
        break;

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
    
    this.props.deleteUsersPost(this.props.post.id).then(this.setState({dropDown: "falseDropDown"}))
    
  }


  

  render () {
    if (!this.props.users) {
      return null 
    }
    let commentCounter = this.props.post.comments ? Object.values(this.props.post.comments).length : "" 
    if (this.props.user === undefined) {
      return null; 
  }
    let postPhoto; 
    if (this.props.post.photo != null) { 
    postPhoto = <img className="photo-on-post" src={this.props.post.photo} />
  }  
  var d = new Date(this.props.post.timestamp);
  var n = d.toString().slice(4, 15)
  var profPhoto = this.props.user.prof_photo ? this.props.user.prof_photo : window.profPhoto
                     if (this.props.user.id === this.props.currentUser.id) {
                        var profPhoto = this.props.currentUser.prof_photo
                    }
                    
  
  let comments;                    
  if (this.props.post.comments || (!this.props.comments instanceof Array) ) {
    debugger 
    if (Object.values(this.props.comments).length > 0) { 
       for (let i=0; i < Object.values(this.props.comments).length; i++) 
       if (Object.values(this.props.comments)[i].postId === this.props.post.id) {
          comments = merge({}, {[Object.values(this.props.comments)[i].id] : Object.values(this.props.comments)[i]}, this.props.post.comments)
           
       }
  
    
  }
  
    comments = Object.values(comments ? comments : merge({}, this.props.comments, this.props.post.comments)).map((comment, idx) => {  
      return (
      <div>
        <div className="comment-head" key={idx}>
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
  let allLikes; 
  let emojiPrint; 
  let postLikes = "";
  let countForEmojis = {}
  if (this.props.post.likes || this.props.likes) {
      allLikes = merge(this.props.post.likes, this.props.likes) 
    let totalLikes = Object.values(allLikes).filter(ele => ele.likeable_id === this.props.post.id).length;  
     if (this.props.users !== undefined) {
      switch (true) {
        case (totalLikes === 0):
        postLikes = "";  
        break; 
        case (totalLikes === 1):  
        let firstA = this.props.users[Object.values(allLikes)[0].author_id]; 
        postLikes = ((firstA.first_name[0].toUpperCase() + firstA.first_name.slice(1)) + " " +  (firstA.last_name[0].toUpperCase() + firstA.last_name.slice(1)))
        break; 
        case (totalLikes === 2): 
        
        let first = this.props.users[Object.values(allLikes)[0].author_id];
        let second = this.props.users[Object.values(allLikes)[1].author_id]; 
        postLikes = ((first.first_name[0].toUpperCase() + first.first_name.slice(1)) + " " +  (first.last_name[0].toUpperCase() + first.last_name.slice(1)) + " " + "and" + " " + (second.first_name[0].toUpperCase() + second.first_name.slice(1)) + " " +  (second.last_name[0].toUpperCase() + second.last_name.slice(1)))
        break; 
        case (totalLikes >= 3): 
        let first1 = this.props.users[Object.values(allLikes)[0].author_id];
        let second2 = this.props.users[Object.values(allLikes)[1].author_id]; 
        postLikes = ((first1.first_name[0].toUpperCase() + first1.first_name.slice(1)) + " " +  (first1.last_name[0].toUpperCase() + first1.last_name.slice(1)) + "," + " " + (second2.first_name[0].toUpperCase() + second2.first_name.slice(1)) + " " +  (second2.last_name[0].toUpperCase() + second2.last_name.slice(1)) +  " " + "and" + " " + `${totalLikes - 2}` + " " + "others" )
        break; 
      }
    }
      Object.values(allLikes).filter(ele => ele.likeable_id === this.props.post.id).forEach(like => {
        if (countForEmojis[like.like_type]) {
          countForEmojis[like.like_type] += 1 
        } else {
          countForEmojis[like.like_type] = 0
          countForEmojis[like.like_type] += 1 
        }
      })
      let sortedEmojis = [] 
      let arr = [countForEmojis]
      let sorted = Object.keys(arr[0]).sort((a, b) => arr[0][b] - arr[0][a])
      sorted.forEach(x => sortedEmojis.push(x))
      let emojiToDisplay = []
      
      switch (true) {
        case (sortedEmojis.length === 0):
          emojiToDisplay = "" 
          break;
        case (sortedEmojis.length === 1):  
        emojiToDisplay.push(sortedEmojis[0])
          break; 
        case (sortedEmojis.length === 2):
            emojiToDisplay.push(sortedEmojis[0])
            emojiToDisplay.push(sortedEmojis[1])
          break;
        case (sortedEmojis.length >= 3):
            emojiToDisplay.push(sortedEmojis[0])
            emojiToDisplay.push(sortedEmojis[1])
            emojiToDisplay.push(sortedEmojis[2])
          break;  
      }
       
      if (emojiToDisplay !== "") {
        
         emojiPrint = emojiToDisplay.map((emoji,idx) => {
          switch (true) {
            case (emoji === "angry"):
               return <img key={idx} className="most-liked-emoji" src={window.angrySVG}></img>
            case (emoji === "like"):
               return <img key={idx} className="most-liked-emoji" src={window.likeSVG}></img>
              
            case (emoji === "sad"):
               return emojiPrint = <img key={idx} className="most-liked-emoji" src={window.sadSVG}></img>
            case (emoji === "love"):
               return emojiPrint = <img key={idx} className="most-liked-emoji" src={window.loveSVG}></img>
            case (emoji === "haha"):
              return <img key={idx} className="most-liked-emoji" src={window.hahaSVG}></img>
            case (emoji === "wow"):
               return <img key={idx} className="most-liked-emoji" src={window.wowSVG}></img>
          }
        })
      }
    } 
  if (this.props.post.likes) {
    Object.values(this.props.post.likes).filter(ele => ele.author_id === this.props.currentUser.id).map(ele => {
      if (ele.author_id === this.props.currentUser.id && this.state.likeButton === "" ) {
        switch (true) {
          case (ele.like_type ==="like"):
           
            this.setState({likeButton: "Like"})
            this.setState({emojiLogo: window.likeSVG})
            break; 
          case (ele.like_type ==="love"):
            this.setState({likeButton: "Love"})
            this.setState({emojiLogo: window.loveSVG})
            break;
          case (ele.like_type ==="haha"):
            this.setState({likeButton: "Haha"})
            this.setState({emojiLogo: window.hahaSVG})
            break;
          case (ele.like_type ==="wow"):
           
            this.setState({likeButton: "Wow"})
            this.setState({emojiLogo: window.wowSVG})
            break;
          case (ele.like_type ==="sad"):
            this.setState({likeButton: "Sad"})
            this.setState({emojiLogo: window.sadSVG})
            break;
          case (ele.like_type ==="angry"):

            this.setState({likeButton: "Angry"})
            this.setState({emojiLogo: window.angrySVG})
            break;
        }
      }
    }) }

  return (
    <div className="post-index-container">
      <div className="post-top-portion">
        <div className="prof-name-ind">
          <img className="prof-photo-ind" src={profPhoto} />
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
              <div className="comment-counter">
                <div className="emoji-container">
                  {emojiPrint} 
                  <div className="name-liker">{postLikes}</div>
                </div>
                
                <div className="comment-counter">{commentCounter} Comments</div>
                
              </div>
          </div>
          <div className="comment-like-container ">
            <div className="ctii" onClick={this.handleLikeButton.bind(this)}>
            <img className="like-button" src={this.state.emojiLogo} />
            <div>
            <div className={`likes-${this.state.likeButton}`}>{this.state.likeButton === "" ? 'Like' : this.state.likeButton}</div>
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
            <img className="write-comm-prof" src={this.props.currentUser.profPhoto ? this.props.currentUser.profPhoto : window.profPhoto}/>
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
    users: state.entities.users,
    likes: state.entities.likes
  };
};

const mapDispatchToProps = dispatch => ({
  createPost: (userId, post) => dispatch(createPost(userId, post)),
  getUsersPosts: (userId) => dispatch(getUsersPosts(userId)),
  editUsersPost: (postId) => dispatch(editUsersPost(postId)),
  deleteUsersPost: (postId) => dispatch(deleteUsersPost(postId)),
  createComment: (postId, formData) => dispatch(createComment(postId, formData)),
  deleteCommentOnPost: (commentId) => dispatch(deleteCommentOnPost(commentId)),
  createLike : (like) => dispatch(createLike(like)),
  deleteLike : (like) => dispatch(deleteLike(like))
})

export default connect(mapStateToProps,mapDispatchToProps)(UsersPost)