import React from "react" 
import { fetchAllPosts } from "../../util/posts_api_util"

class NewsFeed extends React.Component {
    constructor(props) {
        super(props) 
    }

componentDidMount() {
    fetchAllPosts()
}

}



const mapStateToProps = ({ session, entities: { users } }) => {
    return {
      currentUser: users[session.id]
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    fetchAllPosts: () => dispatch(fetchAllPosts())
  });

export default connect(mapStateToProps, mapDispatchToProps)(NavBar) 


