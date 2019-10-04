import React from "react";
import { Link } from 'react-router-dom'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props) 
    }
   
    
    render () {
        return (
            <div className="TopBox">
                 <img className="CoverPhoto" src="http://icanbecreative.com/resources/files/articles/40-high-resolution-wallpapers-for-minimalist-lovers/sources/Progamer-glasses-minimalist-wallpaper-green.png" alt=""/>
                    <div className="sectional">
                        <Link to="/">About</Link>   
                        <Link to="/">Friends</Link>
                        <Link to="/">Photos</Link>
                    </div>
            </div>

        )
    }
}

export default ProfilePage 