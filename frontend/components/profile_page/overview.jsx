import React from 'react';
import { connect } from "react-redux"

class Overview extends React.Component {
    constructor(props) {
    super(props)
    // console.log(props)  
   

    }



    render () {
        let dateOfBirth = this.props.currentUser.DOB
        const dateString = dateOfBirth.slice(0,2) + "/" + dateOfBirth.slice(2,4) + "/" + dateOfBirth.slice(4)
        var d = new Date(dateString);
        var n = d.toString().slice(4, 15) 
        return (
            <div className="overview-container">
                <div className="overview-1">
                    <div className="view-1a">Studied Economics at Binghamton University</div>
                    <div className="view-1b">Lives in Syosset, New York</div>
                </div>
                <div className="overview-2">
                    <div className="view-2a">{this.props.currentUser.email}</div>
                    <div className="view-2b">{n}</div>
                        
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ session, entities: { users } }) => {
    return {
      currentUser: users[session.id],
      
    };
  };
  
  const mapDispatchToProps = dispatch => ({
     updateUserAction: (id, formData) => dispatch(updateUserAction(id, formData)),
     fetchUser: (id) => dispatch(fetchUser(id))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Overview);