import { connect } from 'react-redux';
import UserFriends from './user_friends';
import {getUsersPosts} from '../../actions/posts_actions'

const mapStateToProps = (state, ownProps) => {
    return {
      currentUser: state.entities.users[state.session.id],
      friendships: state.friendships, 
      user: state.entities.users[ownProps.match.params.userId]
    };
  };


const mapDispatchToProps = dispatch => ({
  updateUserAction: (userId, formData) => dispatch(updateUserAction(userId, formData)),
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  getUsersPosts: (userId) => dispatch(getUsersPosts(userId))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserFriends)