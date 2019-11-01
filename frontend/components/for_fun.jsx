import React from "react" 
import CreatePost from "./profile_page/create_post"
import NewsFeed from "./newsfeed/news_feed"
import {withRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux' 
import { getUsersPosts, editUsersPost, deleteUsersPost } from '../actions/posts_actions'
import  UsersPosts  from './profile_page/user_posts'

class NewsFeedComments extends React.Component {
    constructor(props) {
      super(props)
      console.log(props) 
    }

    componentDidMount() { 
      // debugger 
      Object.values(this.props.currentUser.friends).forEach(ele => this.props.getUsersPosts(ele.id))
      this.props.getUsersPosts(this.props.currentUser.id)
      
   }



    render () {
      let renderPosts;
      const {currentUser = {} } = this.props;
        if (typeof this.props.posts !== "undefined") {

                    renderPosts = Object.values(this.props.posts).reverse().map((post, idx) => (<UsersPosts className="newsfeed-posts" key={idx} post={post} user={this.props.currentUser.friends[post.authorId] ? this.props.currentUser.friends[post.authorId] : this.props.currentUser} type={"newsfeed"}/>) )
                } 
    return (
        <div className="home-page-containers">
       <NewsFeed/> 
       <div className="cont-wall">
      <CreatePost/>
      <div className="newsfeed-posts">
      {renderPosts}
      </div>
      </div>
      <div className="request-tab">
        <div className="birthday-friend-column">
        <div className="axx" ><img className="calendar" src="https://magazine.rehearseapp.net/wp-content/uploads/2019/08/Calendar.png"/>1 friend request</div>
        <div className="ayy"><img className="present" src="https://cdn11.bigcommerce.com/s-hii7479o/images/stencil/original/products/9552/25692/present_2__06101.1523656413.png?c=2" />Morty's Birthday and 2 others</div>
        </div>
        <div className="sponsored-ads">
          <div className="sponsor-text"> Sponsored </div>
          <img className="picklecostume" src={window.pickle}/>
          <div className="adstuff">
          <div>Hot Topic</div>
         <div>HOT-TOPIC.COM</div>
         <div>Be the best pickle you can be today with this award winning Halloween Costume! Save up to 30% with the code APPACADEMY</div>
         </div>
         <div className="ad-2-ads">
          <div className="ad-2-text"> Sponsored </div>
          <img className="picklecostume" src="https://www.growthmarketingpro.com/wp-content/uploads/2018/06/app-academy.png"/>
          <div className="adstuff">
          <div>App Academy</div>
         <div>APP-ACADEMY.IO</div>
         <div> Change Careers and make over $100,000! Join (this or that) awesome program! Dont thunk about it take action and apply!(e) </div>
         </div>
        </div>
        </div>
        
      </div>
      
      </div>
    )
    }
}



const mapStateToProps = (state) => {     
  return {
    currentUser: state.entities.users[state.session.id],
    posts: state.entities.posts, 
    friendships: state.friendships, 
  };
};


const mapDispatchToProps = dispatch => ({
  createPost: (userId, post) => dispatch(createPost(userId, post)),
  getUsersPosts: (userId) => dispatch(getUsersPosts(userId)),
  editUsersPost: (post) => dispatch(editUsersPost(post)),
  deleteUsersPost: (post ) => dispatch(deleteUsersPost(post)),  
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewsFeedComments))

