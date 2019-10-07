import React from "react";
import { Link } from 'react-router-dom'
import  BioPic  from './bio_pic'
import {withRouter, Route} from 'react-router-dom'
import AboutPage from './about_page'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {user: props.currentUser, photoFile: null}
        this.props = props
    }   

    componentDidMount() {
        
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
        this.props.updateUserAction(this.state.user.id, FormData)
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
                        <img className="main-prof-pic" src="https://miro.medium.com/max/3840/1*1QJzJiri8js9PqwqlcOOCw.png" />
                        <div className="prof-links">
                        <Link className="timeline" to={`/users/${this.state.user.id}`}>Timeline</Link>
                        <Link className="about"to={`/users/${this.state.user.id}/about/overview`}>About</Link>   
                        <Link className="friends" to="/">Friends</Link>
                        <Link className="photos" to="/">Photos</Link>
                        <a className="more" href="https://images.squarespace-cdn.com/content/v1/51132139e4b0014fdfeca0ca/1515690627146-UG45BRZQ5WE4ABG6T786/ke17ZwdGBToddI8pDm48kEF2GaKpjeSPJuap1bYL1oVZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpyEWjbC5HC78c3ldIV68GhowvuiGnah3z0UFPVxk-pMmm-8ZlmgLQgTEiE--OHMuYI/Please+sir+may+I+have+some+more.jpg?format=1500w">More</a>
                        </div>
                        
                    </div>  
                    <div className='bio-comment-container'>
                       <Route exact path={`/users/${this.state.user.id}`} component={BioPic}/>
                       <div className='create-post'>
                            <form>
                                <div className="top-create">    
                                <div className="submit-post">
                                    <img className="pencil" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698651-icon-135-pen-angled-512.png"/>
                                    <div className="cpa">Create Post</div>
                                    </div> 
                                </div>
                                <div className="textbox-container">
                                <img className="textbox-prof" src="https://miro.medium.com/max/3840/1*1QJzJiri8js9PqwqlcOOCw.png"/>
                                <input className="create-textbox" type="textarea" placeholder="What's on your mind?"/>
                                </div>
                                <div className="post-bottom-container">
                                    <div className="photo-sub">Photos</div>
                                </div>
                            </form>
                                
                            

                       </div>
                    </div>
                       <Route path={`/users/${this.state.user.id}/about`} component={AboutPage}/>
                    <form>
                        <input type="file" onChange={this.handleFile.bind(this)}/> 
                        <input type="submit" onClick={this.handleSubmit.bind(this)}/>   
                    </form>
            </div>

        )
    }
}
// there is an even once the eventlistenr 
export default withRouter(ProfilePage)



//questions how do we submit without a submit button. 
