import React from "react"
import {withRouter} from 'react-router-dom'
import {createPost, getUsersPosts } from '../../actions/posts_actions'
import { connect } from "react-redux"
import UserPosts from './user_posts'


class CreatePost extends React.Component {
    constructor(props) {
    super(props) 
    this.state = {
            body: "hello",
            author_id: 2,
        }
    // console.log(this.props)
    this.update = this.update.bind(this) 
    console.log(this.state)
    }

    componentDidMount() {
        // console.log(this.props) 
        // this.props.getUsersPosts(this.props.match.params.userId)
    }

    update(field) {
        return e => this.setState({
          [field]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault() 
        debugger 
        this.props.createPost(this.state.author_id, this.state) 
    }


    render () {
        return (
            <div className='create-post'>
                            <form>
                                <div className="top-create">    
                                <div className="submit-post">
                                    <img className="pencil" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698651-icon-135-pen-angled-512.png"/>
                                    <div  onClick={this.handleSubmit.bind(this)} className="cpa">Create Post</div>
                                    </div> 
                                </div>
                                <div className="textbox-container">
                                <img className="textbox-prof" src="https://miro.medium.com/max/3840/1*1QJzJiri8js9PqwqlcOOCw.png"/>
                                <input className="create-textbox" onChange={this.update("body")} type="textarea" placeholder="What's on your mind?"/>
                                </div>
                                <div className="post-bottom-container">
                                    <div className="photo-sub">Photos</div>
                                </div>
                            </form>
                            
                       </div>
         
        )
    }
}
const mapStateToProps = (state) => {
    debugger 
    return {
      currentUser: state.entities.users[state.session.id], 
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    createPost: (userId, post) => dispatch(createPost(userId, post)),
    getUsersPosts: (userId) => dispatch(getUsersPosts(userId))
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(CreatePost)
