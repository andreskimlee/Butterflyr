import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',  
      last_name: '',
      email: '',
      DOB:'',
      gender:'',
      phone_number:'',
      password:'',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
     
    return e => this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit(e) {
    debugger 
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
   
    return (
      <div className="sign-up-form">
        <form onSubmit={this.handleSubmit} >
          {this.renderErrors()}
          <div className="login-form">
            <label>
              <h1 className='greeting'>Create a New Account</h1>
               <h3>It’s quick and easy.</h3>
              <input id="box-1" type="text"
                value={this.state.firstName}
                onChange={this.update('first_name')}
                className='signup-input'
                placeholder="    First Name"
              />
            </label>
            <label>
              <input id="box-2" type="text"
                value={this.state.lastName}
                onChange={this.update('last_name')}
                className='signup-input'
                placeholder="    Last Name"
              />
            </label>
            <div className="phone-email">
            <label>
              <input id="box-3" type="text"
                value={this.state.phone_number}
                onChange={this.update('phone_number')}
                className='signup-input'
                placeholder="    Mobile Number"
                style={{width: 385, height: 35}}
              />
            </label>
            <label>
              <input id="box-4" type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className='signup-input'
                placeholder="    Email"
                style={{width: 385, height: 35}}
              />
            </label>
            </div>
            <br/>
            <label>
              <input id="box-5" type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className='signup-input'
                placeholder="    New password"
                style={{width: 385, height: 35}}
              />
            </label>
            <label>
              <p id="birth">Birthday</p>
            <input id="box-6" type="date" 
              value={this.state.DOB}
              onChange={this.update('DOB')}
              className='signup-input'
              style={{height: 36}}
              />
            </label>
            <label>
              <p id="gen">Gender</p>
              <div id="pickgen">
                <input onChange={this.update('gender')} type="radio" name="gender" value='M'/> Male
                <input onChange={this.update('gender')} type="radio" name="gender" value='F'/> Female 
                </div>
            </label>
            <p className="terms">By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. 
                You may receive SMS Notifications from us and can opt out any time.</p>
            <input className="session-submit" type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

export default SessionForm;
