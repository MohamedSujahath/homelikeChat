import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";
import AuthService from '../authservice/AuthService';
import '../css/login.css';


var blockStyle = {
    display: 'block'
};

var noneStyle = {
    display: 'none'
};

// Create a Component
class Login extends React.Component {


  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      username: '',
      password: ''
    };

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Auth = new AuthService();

    this.handleLoginResponse = this.handleLoginResponse.bind(this);
    this.handleUserDetailsResponse = this.handleUserDetailsResponse.bind(this);
    this.handleOnlineUsersResponse = this.handleOnlineUsersResponse.bind(this);
  }

  handleSubmitClick(e)
  {
    //alert("Submit clicked");
    //alert("Username: " + this.state.password);
    e.preventDefault();
    this.Auth.login(this.state.username,this.state.password, this.handleLoginResponse);
  }



  handleLoginResponse(err,res)
  {
    //alert("inside callback Login response"+ res.body.token);
    if(res.body.success)
    {
      //alert("inside res body success" + res.body.success);
        this.Auth.setToken(res.body.token);
      //  alert("Email: " + this.state.username);
        this.Auth.getUserDetails(this.state.username, this.handleUserDetailsResponse);

    }
    else {
       alert(res.body.message);
    }

  }


  handleUserDetailsResponse(err,res)
  {

    //alert("inside user details callback");
    this.state.userDetails = this.Auth.getUserDetailsObject;

      this.Auth.setUserDetailsObject(JSON.stringify(res.body.user));

    this.Auth.getAllOnlineUsers(this.handleOnlineUsersResponse);

  }

  handleOnlineUsersResponse(err, res)
  {
        //alert("inside OnlineUsers callback");

        this.Auth.setAllOnlineUsersObject(JSON.stringify(res.body.users));

      this.props.history.push('/dashboard');

  }



  handleChange(e)
  {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleRegisterClick(e)
  {
    //alert(" Register clicked");

    e.preventDefault();
    this.props.history.push('/register');
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
                    <br/><br/>
                      <form id="login-form" action="#" method="POST" style={blockStyle}>
                          <div class="form-group">
                            <input type="text" name="username" id="username" value={this.state.username} tabindex="1" class="form-control" placeholder="Email" onChange={this.handleChange.bind(this)}/>
                          </div>
                          <div class="form-group">
                            <input type="password" name="password" id="password" value={this.state.password} tabindex="2" class="form-control" placeholder="Password" onChange={this.handleChange.bind(this)}/>
                          </div>
                        <div class="col-xs-6 form-group">
                                <input className="form-submit"
                                value="SUBMIT"
                                type="submit"  tabindex="4" class="form-control btn btn-login" onClick={this.handleSubmitClick} />
                        </div>
                        <div class="col-xs-6 form-group">
                                <input type="submit" name="login-register" id="login-register" tabindex="4" class="form-control btn btn-login" value="Register" onClick={this.handleRegisterClick}/>
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


export default Login;
