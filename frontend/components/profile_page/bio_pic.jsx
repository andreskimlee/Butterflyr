import React from "react"
import {withRouter} from 'react-router-dom'

class BioPic extends React.Component {
    constructor(props) {
    super(props) 
        
    }

    render () {
        return (
            <div className="bio-container">
                <div className="intro"><img className="globe-icon"src={window.globeicon}  /> Intro </div>
                <div className="bio"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed porttitor nulla. Nulla ornare nisl eget condimentum vehicula.</div>
                <button className="edit-bio"><div className="bioedit">Edit Bio</div></button>
                <div className="user-info">
                   <div className="h"><img className="house" src={window.house}/><div>Lives in Syosset, New York</div></div>
                    <div className="g"><img className="geo" src={window.geo}/><div>From Asuncion, Paraguay</div></div>
                    <div className="c"><img className="clock" src={window.clock}/><div>Joined December 2007</div></div>
                </div>
                <div className="photos">
                    <img className="image-1" src="https://images2.minutemediacdn.com/image/upload/c_crop,h_788,w_1400,x_0,y_24/f_auto,q_auto,w_1100/v1555155291/shape/mentalfloss/rickandmorty.jpg"/>
                    <div>
                        <img className="image-2" src="https://nyoobserver.files.wordpress.com/2019/07/rick-and-morty-season-4-trailer-1.jpg?quality=80"/>
                        <img className="image-3" src="https://am23.akamaized.net/tms/cnt/uploads/2019/09/rick-and-morty-adult-swim-1200x800.jpg"/>
                        <img className="image-4" src="https://nerdist.com/wp-content/uploads/2019/05/Rick-and-morty-1200x675.png"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(BioPic); 
