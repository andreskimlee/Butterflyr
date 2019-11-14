import React from "react";
import {withRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'

class PhotoIndex extends React.Component {
    constructor(props) {
        super(props)

    }

    render () {
        let userPhotos;
        if (this.props.user.photos !== undefined) {
            userPhotos = this.props.user.photos.map(photo => {
                return (
                    <img className='all-user-photos' src={photo}/>
                )
            })
        }
        return (
            <header className="photo-index-container">
                <div className="photo-index-title">
                    <div className="photo-header-container">
                        <img className="photo-index-logo" src={window.photoIndex} />
                        <div className="photo-index-text">Photos</div>
                    </div>
                    <div className="your-photos">Your Photos</div>
                </div>
                <div className="all-photos-container">
                        {userPhotos}
                    </div>
            </header>
        )
    }
}

const mapStateToProps = (state, ownProps) => {     
    return {
      user: state.entities.users[ownProps.match.params.userId]
    };
  };

  
  const mapDispatchToProps = dispatch => ({
    createPost: (userId, post) => dispatch(createPost(userId, post)),
    getUsersPosts: (userId) => dispatch(getUsersPosts(userId)),
    editUsersPost: (post) => dispatch(editUsersPost(post)),
    deleteUsersPost: (post ) => dispatch(deleteUsersPost(post)),
    fetchUser: userId => dispatch(fetchUser(userId)),    
  })
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PhotoIndex))