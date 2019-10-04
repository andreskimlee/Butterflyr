import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import ProfilePage from './profile_page';

const mapStateToProps = ({ session, entities: { users } }) => {
    return {
      currentUser: users[session.id]
    };
  };

const mapDispatchToProps = ({
 
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage)