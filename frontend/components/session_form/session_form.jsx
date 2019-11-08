import React from 'react';
import { Redirect}  from 'react-router-dom'
class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlebutton = this.handlebutton.bind(this); 
    
  }



  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();  
    this.props.processForm(this.state).then(() => <Redirect to='/'/>)
  
  } 

  handlebutton(e) { // 
    e.preventDefault();
    // this.setState({email : "ricky@gmail.com"})
    // this.setState({password : "Password123"})
    this.state.email = "ricky@gmail.com"
    this.state.password = "Password123"
    this.props.processForm(this.state).then(() => <Redirect to='/'/>)
  }



  renderErrors() { 
    return(
      <ul> 
        {this.props.errors.map((error, i) => (
          <li className="errors-box" key={`error-${i}`}>
            {error} 
          </li>
        ))} 
         
      </ul>
    );
  }


  render() {
    return (
      <div className="login-form-container">
        <div className="textpe">
        <div>Email</div> 
        <div>Password</div>    
        </div>
        <form onSubmit={this.handleSubmit} className="login-form-box">

          {this.renderErrors()}
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input" 
                style={{width:"150px", height:"20px"}}
              />

              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
                style={{width:"150px", height:"20px"}}
              />
            <input className="submit" type="submit" value="Log in" />
            <button className="demo-button" onClick={this.handlebutton} >Demo</button>
        </form>
      </div>
    );
  }
}

export default SessionForm;
