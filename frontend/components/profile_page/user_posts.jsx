import React from 'react';
function UsersPost(props) {
  let postPhoto; 
  console.log(props)
  if (props.post.photo != null) {
    postPhoto = <img className="photo-on-post" src={props.post.photo} alt=""/>
  }

  
  var d = new Date(props.post.timestamp);
  var n = d.toString().slice(4, 15) 

    

  return (
    <div className="post-index-container">
      <div className="post-top-portion">
        <div className="prof-name-ind">
          <img className="prof-photo-ind" src="https://miro.medium.com/max/3840/1*1QJzJiri8js9PqwqlcOOCw.png" alt=""/>
          <div className="post-date-name">
            <div className="author-name">Rick</div>
            <div className="date-made">{n}</div>
          </div>
        </div>
          
          <div className="body-of-post">{props.post.body}</div>
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
            <img className="write-comm-prof" src="https://miro.medium.com/max/3840/1*1QJzJiri8js9PqwqlcOOCw.png"/>
            <input className="write-comment-box" type="text" placeholder="Write a comment..."/>
          </div>
      </div>
    
    </div>
  )
}
export default UsersPost;