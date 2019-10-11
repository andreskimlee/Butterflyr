import React from "react" 
import { connect} from 'react-redux'; 
import { Link } from "react-router-dom"
import { Route } from "react-router-dom" 
import Overview from './overview'
import Work from "./work"
import Contact from "./contact"

class AboutPage extends React.Component {
    constructor(props) {
        super(props)
        
    
    }
    // componentDidMount() {
    //     this.props.fetchUser 
    // }
    render () {
      return (
        <div className="about-container">
        <div className="about-title">  
          <img className="about-icon" src="https://cdn4.iconfinder.com/data/icons/linecon/512/photo-512.png"/>
          <div>About</div>
          </div>
            <div className="inner-about">
              <div className="inner-tabs">
                <Link className="about1" to={`/users/${this.props.currentUser.id}/about/overview`}> Overview </Link>
                <Link className="about2"to={`/users/${this.props.currentUser.id}/about/work`}> Work and Education </Link>
                <Link className="about3"to={`/users/${this.props.currentUser.id}/about/contact`}> Contact and basic info </Link>
              </div>
              <Route exact path={`/users/${this.props.currentUser.id}/about/overview`} currentUser={this.props.currentUser} component={Overview}/>
              <Route exact path={`/users/${this.props.currentUser.id}/about/work`} currentUser={this.props.currentUser} component={Work}/>
              <Route exact path={`/users/${this.props.currentUser.id}/about/contact`} currentUser={this.props.currentUser} component={Contact}/>

            </div>

        </div>
      )
    }
}

const mapStateToProps = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mapDispatchToProps = ({
  updateUserAction: (userId, formData) => dispatch(updateUserAction(userId, formData))
})

export default connect(mapStateToProps,mapDispatchToProps)(AboutPage)