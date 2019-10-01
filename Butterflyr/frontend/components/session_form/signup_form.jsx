import React from 'react';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      DOB:'',
      gender:'',
      phone_number:'',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    debugger 
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then((currentUser) => this.props.history.push(`/user/${currentUser.id}`))
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
    const lastName = this.state.lastName === '' ? "Last Name" : this.state 
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          
          <br/>
      
          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label>First Name:
              <input type="text"
                value={this.state.firstName}
                onChange={this.update('firstName')}
                className='signup-input'
              />
            </label>
            <label>Last Name:
              <input type="text"
                value={this.state.lastName}
                onChange={this.update('lastName')}
                className='signup-input'
              />
            </label>
            <label>Mobile Number:
              <input type="text"
                value={this.state.phone_number}
                onChange={this.update('phone_number')}
                className='signup-input'
              />
            </label>
            <label>Email:
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className='signup-input'
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className='signup-input'
              />
            </label>
            <label>Birthday
            <input type="date" 
              value={this.state.DOB}
              onChange={this.update('DOB')}
              className='signup-input'
              />
            </label>
            <label>Gender
            
                <input onChange={this.update('gender')} type="radio" name="gender" value={this.state.gender} checked/> Male 
                <input type="radio" name="gender" value="female"/> Female 
  
            </label>
            <br/>
            <p>By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. 
                You may receive SMS Notifications from us and can opt out any time.</p>
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    );
  }
}

export default SessionForm;
