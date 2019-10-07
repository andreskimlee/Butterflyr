import React from "react";
import { Link } from 'react-router-dom'
import  BioPic  from './bio_pic'
import {withRouter, Route} from 'react-router-dom'
import AboutPage from './about_page'
import CreatePost from './create_post'
import { connect } from 'react-redux'   
import { getUsersPosts } from '../../actions/posts_actions'


class ProfilePage extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {user: props.currentUser, photoFile: null}
        this.props = props
        console.log(this.props) 
        
    }   

    componentDidMount() {
        this.props.getUsersPosts(this.props.match.params.userId)
    }
   
    editCoverPhoto(e) {
        e.preventDefault()
        this.setState({photoFile: e.currentTarget.files[0]})
        
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = new FormData(); // formdata is sort of holding 
        formData.append('user[prof_photo]', this.state.photoFile) // key of photo... 
        debugger
        this.props.updateUserAction(this.state.user.id, formData)
    }

    handleFile(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({photoFile: e.currentTarget.files[0]})
    }
                    
    render () {
        return (
            <div className="TopBox">
                 <img className="CoverPhoto" src="https://www.jakpost.travel/wimages/large/134-1340745_pickle-rick-hd-wallpaper-hey-morty-im-a.png" alt=""/>
                    <div className="sectional">
                        <div className="outerborder"></div>
                        <img className="main-prof-pic" src={this.props.currentUser.prof_photo} />
                        <div className="prof-links">
                        <Link className="timeline" to={`/users/${this.props.match.params.userId}`}>Timeline</Link>
                        <Link className="about"to={`/users/${this.props.match.params.userId}/about/overview`}>About</Link>   
                        <Link className="friends" to="/">Friends</Link>
                        <Link className="photos" to="/">Photos</Link>
                        <a className="more" href="https://images.squarespace-cdn.com/content/v1/51132139e4b0014fdfeca0ca/1515690627146-UG45BRZQ5WE4ABG6T786/ke17ZwdGBToddI8pDm48kEF2GaKpjeSPJuap1bYL1oVZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpyEWjbC5HC78c3ldIV68GhowvuiGnah3z0UFPVxk-pMmm-8ZlmgLQgTEiE--OHMuYI/Please+sir+may+I+have+some+more.jpg?format=1500w">More</a>
                        </div>
                        
                    </div>  
                    <div className='bio-comment-container'>
                       <Route exact path={`/users/${this.props.match.params.userId}`} component={BioPic}/>
                       <Route exact path={`/users/${this.props.match.params.userId}`} component={CreatePost}/>
                
                    </div>
                       <Route path={`/users/${this.props.match.params.userId}/about`} component={AboutPage}/>
                    <form>
                        <input type="file" onChange={this.handleFile.bind(this)}/> 
                        <input type="submit" onClick={this.handleSubmit.bind(this)}/>   
                    </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    debugger 
    return {
      currentUser: state.entities.users[state.session.id]
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    createPost: (userId, post) => dispatch(createPost(userId, post)),
    getUsersPosts: (userId) => dispatch(getUsersPosts(userId))
  })
  
  export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)







//questions how do we submit without a submit button. 
