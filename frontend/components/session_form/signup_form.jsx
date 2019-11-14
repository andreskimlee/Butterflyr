import React from 'react';
import { merge } from "lodash"
// questions to ask how to delete key. 
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      first_name: '',  
      last_name: '',
      email: '',
      DOB: { month: '', day: '', year: ' '},
      gender:'',
      password:'',
      inputs: { fname: { focus:"", blur:"" }, lname: { focus:"", blur:"" }, password: { focus:"", blur:"" }, email: { focus:"", blur:"" } }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateUpdate = this.dateUpdate.bind(this);
    this.touch = this.touch.bind(this); 
    this.validate = this.validate.bind(this) 
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  }


  // if the user has focused on the first name input but left it blank, 
    // then this will trigger the css flag to pop up. also insures that this only occurs after the inital check instead of 
    // occuring on page load. 
  touch(e) { 
    e.preventDefault();
    if (e.target.classList.contains("touched")){
        e.target.classList.add("check")
    }
    e.target.classList.add("touched");
}

  clear(e) {
  e.preventDefault();
  e.target.classList.remove("Invalid");
  }

  
  validate(field) { 
    // this.setState({ someProperty: { ...this.state.someProperty, flag: false} }); this.state.inputs
    return e => {  // merge({} this.state.input, { [field]: { [e.type]: "focus-invalid" })
      
      
      if (e.type === "focus" && e.target.value.length < 1) {
        const newInput = merge({}, this.state.inputs, { [field]: { [e.type]: "focus-invalid", ["blur"]:"" }})   
        this.setState({inputs: newInput})
    } else if (e.type === "blur" && e.target.value.length < 1) {
        const newInput = merge({}, this.state.inputs, { [field]: { [e.type]: "not-focus-invalid", ["focus"]: "" }, }, )
        this.setState({inputs: newInput})
    } else if (e.type === "blur" && e.target.value.length > 0) {
      const newInput = merge({}, this.state.inputs, { [field]: "" })
      this.setState({inputs: newInput})  
     } else if (e.type === "focus" && e.target.value.length > 0) {
      const newInput = merge({}, this.state.inputs, { [field]: "" })
      this.setState({inputs: newInput})  
     }
    }}

  handleSubmit(e) {
     
    e.preventDefault(); 
    const user = Object.assign({}, this.state);
    let str = ""
    str += user['DOB'].month; 
    str += user['DOB'].day; 
    str += user['DOB'].year; 
    user['DOB'] = str  
    delete user.inputs
    
   
    this.props.processForm(user)

  }


  dateUpdate(field) {
      
    this.state["DOB"][field] = document.getElementsByClassName(field)[0].value
  } 

  render() { 
     
    return (
      <div className="sign-up-form">
        <form onSubmit={this.handleSubmit} >
          <div className="login-form">
              <h1 className='greeting'>Create a New Account</h1>
               <h3>It’s quick and easy.</h3>
              <div className="fnln">
              <span className="user-errors-fname">
                <input className="box-1" type="text"
                    value={this.state.firstName}
                    onChange={this.update('first_name')}
                    placeholder="  First Name"
                    onFocus={this.validate("fname")}
                    onBlur={this.validate("fname")}
                    /> 
                <div className="error-arrow-right"></div> 
                <div className={`fname-${this.state.inputs.fname.focus}`}>
                       
         
                </div>
                <i className={`fname-${this.state.inputs.fname.blur}`}></i>
              </span>
           
              <span className="user-errors-lname">
              <input className="box-2" type="text"
                value={this.state.lastName}
                onChange={this.update('last_name')}
                placeholder="   Last Name"
                onFocus={this.validate("lname")}
                onBlur={this.validate("lname")}
              />
              <div className="ln-error-arrow-right"></div>  
              <div className={`lname-${this.state.inputs.lname.focus}`}>
        
                      
                    <div className="ln-error-arrow-right error-arrow-shadow"></div>    
                </div>
                <i className={`lname-${this.state.inputs.lname.blur}`}></i>
                </span>
              </div>


            <div className="phone-email">
              <div className="user-errors-email">
              <input className="box-4" type="email"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="   Email"
                style={{width: 398, height: 35}}
                onFocus={this.validate("email")}
                onBlur={this.validate("email")}
              />
               <div className="email-error-arrow-right"></div>
              <div className={`email-${this.state.inputs.email.focus}`}>
                
                       
                    <div className="email-error-arrow-right error-arrow-shadow"></div>    
                </div>
                <i className={`email-${this.state.inputs.email.blur}`}></i>
              </div>
              
             </div>
            <label>
              <div className="user-errors-password">  </div>
              <input className="box-5" type="password"
                value={this.state.password}
                onChange={this.update('password')}
                
                placeholder="   New password"
                style={{width: 398, height: 35}}
                onClick={this.validate}
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                onFocus={this.validate("password")}
                onBlur={this.validate("password")}
              />
              <div className="pw-error-arrow-right"></div>
              <div className={`password-${this.state.inputs.password.focus}`}>
   
                    <div className="pw-error-arrow-right"></div>    
                    <div className="pw-error-arrow-right error-arrow-shadow"></div>    
                </div>
                <i className={`password-${this.state.inputs.password.blur}`}></i> 
            </label>
            <p id="birth">Birthday</p>
            <div className="birthdate">
            <label id='box-6'>
              <select className="month" onChange={() => this.dateUpdate('month')} aria-label="Month" name="birthday_month" id="month" title="Month">
                <option value="0">Month</option><option value="01">Jan</option>
                <option value="02">Feb</option><option value="03">Mar</option>
                <option value="04">Apr</option><option value="05">May</option>
                <option value="06">Jun</option><option value="07">Jul</option>
                <option value="08">Aug</option><option value="09">Sep</option>
                <option value="10">Oct</option><option value="11">Nov</option>
                <option value="12">Dec</option>
                
              </select>
              <select className="day" onChange={() => this.dateUpdate('day')} aria-label="Day" name="birthday_day" id="day" title="Day">
                <option value="0">Day</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <select className="year" onChange={() => this.dateUpdate('year')} aria-label="Year" name="birthday_year" id="year" title="Year">
                <option value="0">Year</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                <option value="1979">1979</option>
                <option value="1978">1978</option>
                <option value="1977">1977</option>
                <option value="1976">1976</option>
                <option value="1975">1975</option>
                <option value="1974">1974</option>
                <option value="1973">1973</option>
                <option value="1972">1972</option>
                <option value="1971">1971</option>
                <option value="1970">1970</option>
                <option value="1969">1969</option>
                <option value="1968">1968</option>
                <option value="1967">1967</option>
                <option value="1966">1966</option>
                <option value="1965">1965</option>
                <option value="1964">1964</option>
                <option value="1963">1963</option>
                <option value="1962">1962</option>
                <option value="1961">1961</option>
                <option value="1960">1960</option>
                <option value="1959">1959</option>
                <option value="1958">1958</option>
                <option value="1957">1957</option>
                <option value="1956">1956</option>
                <option value="1955">1955</option>
                <option value="1954">1954</option>
                <option value="1953">1953</option>
                <option value="1952">1952</option>
                <option value="1951">1951</option>
                <option value="1950">1950</option>
                <option value="1949">1949</option>
                <option value="1948">1948</option>
              </select>
            </label>
            </div>
            <label>
              <p id="gen">Gender</p>
              <div id="pickgen">
                <input onChange={this.update('gender')} type="radio" name="gender" value='F'/> Female &nbsp;&nbsp;
        
                <input onChange={this.update('gender')} type="radio" name="gender" value='M'/> Male
                </div>
            </label>
            <p className="terms">By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. 
                You may receive SMS Notifications from us and can opt out any time.</p>
            <input className="signup" type="submit" value="Sign Up" />

          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
