import React from 'react';
import '../css/userprofile.css';
import '../css/dashboard.css';


var blockStyle = {
    display: 'block'
};

var noneStyle = {
    display: 'none'
};

var avatarImageStyle = {
    width: '30%',
    height: '30%'
};

export class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      userDetails: {}
    };

    this.handleCancelClick = this.handleCancelClick.bind(this);




  }


    componentDidMount() {
    //  alert("component did mount" + this.props.location.query.user['email']);
        this.setState({userDetails: this.props.location.query.user});


    }

  handleCancelClick(e)
  {
    //alert("handleCancelClick clicked");

    e.preventDefault();

      this.props.history.goBack();

  }

render() {
    return (
      <div>
        <div class="container">
        <center> <h1> User Profile page </h1> </center>
              <div class="row">
              <div class="col-md-5  toppad  pull-right col-md-offset-3 ">

               <br />

              </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad" >


                  <div class="panel panel-info">
                    <div class="panel-heading">
                      <h3 class="panel-title">{this.state.userDetails.username} </h3>
                    </div>
                    <div class="panel-body">
                    <span class="avatar available halfsize" data-toggle="tooltip ">
                        <img style={avatarImageStyle} src={this.state.userDetails.avatarImg} alt="avatar" class="img-circle halfsize" />
                    </span>
                      <div class="row">
                        <div class=" col-md-9 col-lg-9 ">
                          <table class="table table-user-information">
                            <tbody>
                              <tr>
                                <td>Username</td>
                                <td>{this.state.userDetails.username}</td>
                              </tr>
                              <tr>
                                <td>Email</td>
                                <td>{this.state.userDetails.email}</td>
                              </tr>
                            </tbody>
                          </table>

                          <div class="col-sm-6 col-sm-offset-3">
                            <input type="submit" name="cancel-submit" id="cancel-submit" tabindex="4" class="form-control btn btn-register" value="Go Back" onClick={this.handleCancelClick}/>
                          </div>
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

export default UserProfile;
