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


