import React from 'react';
import { connect } from "react-redux"

class Work extends React.Component {
    constructor(props) {
    super(props)
    // console.log(props)  
   

    }



    render () {
        return (
            <div className="overview-container">
                <div className="overview-1">
                    <div className="view-1a">Studied Economics at Binghamton University</div>
                    <div className="view-1b">Lives in Syosset, New York</div>
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
  )(Work);