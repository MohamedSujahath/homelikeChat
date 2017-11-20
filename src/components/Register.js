import React from 'react';
import '../css/login.css';
import '../css/register.css';
import '../css/register.js';
import {withRouter} from "react-router-dom";
import AuthService from '../authservice/AuthService';

var blockStyle = {
    display: 'block'
};

var noneStyle = {
    display: 'none'
};

export class Register extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      username: '',
      password: '',
      email: ''
    };

    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleRegisterResponse = this.handleRegisterResponse.bind(this);
    this.Auth = new AuthService();
  }

  handleRegisterClick(e)
  {
    //alert("Register Now clicked");
    //alert("Username: " + this.state.password);
    e.preventDefault();

    if(this.state.username === '' || this.state.password === '' || this.state.email === '')
    {
        alert("Please fill all the fields to register a user");
    }
    else {
      //alert("Invoking register service");

          var emailValid = this.validateEmail(this.state.email);
          //alert("email Valid" + emailValid);
          if(emailValid)
          {
            //alert("Valid email");
            this.Auth.register(this.state.username,this.state.password,this.state.email, this.handleRegisterResponse);
          }
          else {
            alert("Invalid email !!! Please enter Email in proper format.");
          }

    }


  }

  handleCancelClick(e)
  {
    //alert("handleCancelClick clicked");

    e.preventDefault();

      this.props.history.push('/login');

  }

 validateEmail(email)
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return true;
    }
    else {
        return false;
    }
      //alert("You have entered an invalid email address!")

  }

  handleRegisterResponse(err, res)
  {
      //alert("Registeration Success");

      if(!res.body.success)
      {
        alert(res.body.message);
      }
      else {
        this.props.history.push('/login');
      }


  }

  handleChange(e)
  {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

render() {
    return (
      <div>
        <div class="container">
           <div class="row">
            <div class="col-md-6 col-md-offset-3">
              <div class="panel panel-login">
                <div class="panel-body">
                  <div class="row">
                    <div class="col-lg-12">
                    <h2>HomeLike Chat Application</h2>
                    <h3>New User Registration Page</h3>
                    <br/>
                      <form id="register-form" action="#" method="post" style={blockStyle}>
                      <div class="form-group">
                            <input type="text" name="username" id="username" value={this.state.username} tabindex="1" class="form-control" placeholder="Username" onChange={this.handleChange.bind(this)}/>
                          </div>
                          <div class="form-group">
                            <input type="email" name="email" id="email" value={this.state.email} tabindex="1" class="form-control" placeholder="Email Address" onChange={this.handleChange.bind(this)}/>
                          </div>
                          <div class="form-group">
                            <input type="password" name="password" id="password" value={this.state.password} tabindex="2" class="form-control" placeholder="Password" onChange={this.handleChange.bind(this)}/>
                          </div>
                          <div class="form-group">
                            <div class="row">
                              <div class="col-sm-6 col-sm-offset-3">
                                <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now" onClick={this.handleRegisterClick}/>
                              </div>
                            </div><br/>
                            <div class="row">
                              <div class="col-sm-6 col-sm-offset-3">
                                <input type="submit" name="cancel-submit" id="cancel-submit" tabindex="4" class="form-control btn btn-register" value="Cancel" onClick={this.handleCancelClick}/>
                              </div>
                            </div>
                          </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
