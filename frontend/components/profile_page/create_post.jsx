import React from "react"
import {withRouter} from 'react-router-dom'
import {createPost, getUsersPosts } from '../../actions/posts_actions'
import { connect } from "react-redux"
import UserPosts from './user_posts'
import {updateUserAction} from '../../actions/user_actions'
import { openModal, closeModal } from '../../actions/modal_actions';


class CreatePost extends React.Component {
    constructor(props) {
    super(props) 
    this.state = {
            body: "",
            author_id: this.props.currentUser.id,
            photoFile: null,
        }
    this.update = this.update.bind(this) 
    
    this.props = props 
    }

    

    update(field) {
        return e => this.setState({
          [field]: e.target.value
          
        });
        
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = new FormData(); // formdata is sort of holding 
        const formData2 = new FormData(); 
        if (this.state.photoFile !== null) {
            formData.append('post[photo]', this.state.photoFile)
            formData2.append('user[photos]', this.state.photoFile)
        }  
        formData.append('post[body]', this.state.body)
        formData.append('post[author_id]', this.state.author_id)
      
        this.props.createPost(this.props.currentUser.id, formData).then(this.props.closeModal)
        this.props.updateUserAction(this.props.currentUser.id, formData2)
    }

    handleFile(e) {
        e.stopPropagation();
        e.preventDefault();
        
        this.setState({photoFile: e.currentTarget.files[0]})
    }


    render () {
        // console.log(this.props)
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
                                <img className="textbox-prof" src={this.props.currentUser.prof_photo}/>
                                <input value={this.state.body} onClick={() => this.props.openModal("createPost")} className="create-textbox" onChange={this.update("body").bind(this)} type="textarea" placeholder="What's on your mind?" />
                                
                                <div className="bottom-container">
                                <input id="file" name="file" type="file" onChange={this.handleFile.bind(this)} className="upload-photo-post"/>
                                <label htmlFor="file"><img className ="photo-pic-up hvr-sink" src="https://image.flaticon.com/icons/svg/185/185293.svg" /><div className="upt" > Photo </div></label>
                                </div>
            
                                </div>
                            
                            </form>             
                       </div>
         
        )
    }
}
const mapStateToProps = (state) => {
     
    return {
      modal: state.modal, 
      currentUser: state.entities.users[state.session.id], 
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    createPost: (userId, formData) => dispatch(createPost(userId, formData)),
    closeModal: () => dispatch(closeModal()),
    openModal: (abc) => dispatch(openModal(abc)),
    updateUserAction: (userId, formData) => dispatch(updateUserAction(userId, formData)),
    createComment: (postId, authorId) => dispatch(createComment(postId, authorId))
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(CreatePost)



