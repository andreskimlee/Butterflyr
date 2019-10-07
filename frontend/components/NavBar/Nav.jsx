import React from "react"
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props) 
        this.state = { DropDown: ""}
    }

    handleClick(e) {
        e.preventDefault()
        if (this.state.DropDown === "") {
        this.setState({DropDown: "visible"})
        } else {
            this.setState({DropDown: ""})
        }
    }

    handleBlur(e) {
        e.preventDefault
        this.setState({DropDown: ""})
    }

    render () {
        return (
            <span className="Nav-Bar">
                
                <Link to='/'> <img className="butterfly-Logo" src={window.butterFlyLogo}/></Link>
                <Link className="showpage" to={`/users/${this.props.currentUser.id}`}><img className="profile-small"src="https://scene7.zumiez.com/is/image/zumiez/Zoom_PDP/Primitive-x-Rick-and-Morty-Pickle-Rick-Sticker-_309256-front-US.jpg"/><div className="Name">{this.props.currentUser.first_name.charAt(0).toUpperCase() + this.props.currentUser.first_name.slice(1)}</div></Link>
                <Link to="/" className="home" ><div className='homeLink'>Home</div></Link>
                <div className="drop-down-btn" onClick={this.handleClick.bind(this)} >
                    
                    <div className={this.state.DropDown} onClick={this.props.logout}></div>
                
                </div>
            </span>
        )
    }
}

export default NavBar;