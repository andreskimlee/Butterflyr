import { connect } from 'react-redux';
import ProfilePage from './profile_page';
import { updateUserAction, fetchUser } from '../../actions/user_actions'


const mapStateToProps = ({ session, entities: { users } }) => {
    return {
      currentUser: users[session.id]
    };
  };


const mapDispatchToProps = dispatch => ({
  updateUserAction: (userId, formData) => dispatch(updateUserAction(userId, formData)),
  fetchUser: (userId) => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)


