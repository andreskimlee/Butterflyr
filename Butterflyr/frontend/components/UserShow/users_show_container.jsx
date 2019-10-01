import { connect } from 'react-redux'
import UserShow from './users_show'


const msp = (state, ownProps) => {
    user: state.users[ownProps.match.params.userId]
}

const mdp = (dispatch) => {
    
}

export default connect(msp,mdp)(UserShow);