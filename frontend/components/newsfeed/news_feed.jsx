import React from 'react'
import {withRouter, Route} from 'react-router-dom'
import {connect} from 'react-redux'
// import NewsFeedPostForm from '../post/post_form_container'
// import NewsFeedPostIndex from './newsfeed_post_index_container'
import {fetchUser} from '../../actions/user_actions'
// import UserIndex from './users_index'


class NewsFeed extends React.Component {
    
    componentDidMount() {
        this.props.fetchUser(this.props.currentUserId);
        window.scrollTo(0, 0);
    }

    profile(e) {
        e.preventDefault();
        this.props.history.push(`/user/${this.props.currentUser.id}`)
    }

    render() {
        
        return (
            <div className="newsfeed">
                <div className="newsfeed-content">  
                       <div className="prof-again"> 
                           <img className="smaller-prof-photo" src={this.props.currentUser.prof_photo}/>
                           <div>Andres Kim</div>
                        </div>
                    <section className="newsfeed-main">
                       <div className="first-column-tab">
                        <img className="newsfeed-logo" src="https://icon-library.net/images/news-feed-icon/news-feed-icon-16.jpg" />
                       <div className="textfeed" >News Feed </div>
                       </div>
                    </section>
                    <div className="credentials-stuff">
                    <section className="newsfeed-main hvr-wobble-to-bottom-right">
                       <div className="left-column-tab">
                        <img className="newsfeed-logo" src="https://icon-library.net/images/github-icon-svg/github-icon-svg-14.jpg" />
                       <a className="git-link" href="https://github.com/andreskimlee"><div className="textfeed" >GitHub </div></a>
                       </div>
                    </section>
                    <section className="newsfeed-main hvr-wobble-to-bottom-right">
                       <div className="left-column-tab">
                        <img className="newsfeed-logo" src="https://images.vexels.com/media/users/3/131245/isolated/preview/9351735cd3a456e88ad876588ab9e503-linkedin-logo-by-vexels.png" />
                        <a className="linkedin" href="https://www.linkedin.com/in/andres-kim-lee-bb9b35196/"><div className="textfeed" >Linkedin </div> </a>
                       </div>
                    </section>
                    <section className="newsfeed-main hvr-wobble-to-bottom-right">
                       <div className="left-column-tab">
                        <img className="newsfeed-logo" src="https://cdn.worldvectorlogo.com/logos/angellist.svg" />
                       <a className="angellist" href="https://angel.co/andres-kim-lee"><div className="textfeed" > AngelList </div></a>
                       </div>
                    </section>
                    <section className="newsfeed-main hvr-wobble-to-bottom-right">
                       <div className="left-column-tab">
                        <img className="newsfeed-logo" src="data:image/png;base64,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" />
                       <a className="personal-site"href="https://andreskimlee.github.io/"><div className="textfeed" >Portfolio </div></a>
                       </div>
                    </section>
                    <section className="newsfeed-main hvr-wobble-to-bottom-right">
                       <div className="left-column-tab">
                        <img className="newsfeed-logo" src="https://cdn3.iconfinder.com/data/icons/email-51/48/5-512.png" />
                       <a className="personal-email"href="mailto:andreskimlee@gmail.com?"><div className="textfeed" >Email </div></a>
                       </div>
                    </section>
                    </div>
                
                </div>
            </div>
        )
    }
}

const msp = state => ({
    currentUserId: state.session.id,
    currentUser: state.entities.users[state.session.id]
})

const mdp = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId))
})

export default withRouter(connect(msp, mdp)(NewsFeed))

