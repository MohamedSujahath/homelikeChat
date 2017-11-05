import React from 'react';
import '../css/dashboard.css';

import io from 'socket.io-client';

import AuthService from '../authservice/AuthService';

const Auth = new AuthService();

const socket = io('https://homelikechat.herokuapp.com');

 var blockStyle = {
    display: 'block'
};

var noneStyle = {
    display: 'none'
};

var slimscrollStyle = {
    position: 'relative',
    overflow: 'auto',
    height: '550 px',
    width: 'auto'
}



var slimscrollBarStyle = {

    width: '7px',
    position: 'absolute',
    overflow: 'auto',
    top: '265px',
    opacity: '0.4',
    display: 'none',
    borderRadius: '7px',
    zIndex: '1',
    right: '1px',
    height: '187.092px',
    background: 'rgb(0, 0, 0)'
}

var slimScrollRailStyle = {

    width: '7px',
    height: '100%',
    position: 'absolute',
    top: '0px',
    display: 'none',
    borderRadius: '7px',
    overflow: 'auto',
    opacity: '0.2',
    zIndex: '1',
    right: '1px',
    background: 'rgb(51, 51, 51)',
    overflow: 'auto'
}

var messageListStyle = {

    overflow: 'auto',
    width: 'auto',
    height: '452px'
}

var slimScrollDivStyle = {

    position: 'relative',
    overflow: 'auto',
    width: 'auto',
    height: '452px'

}

var avatarImageStyle = {
    width: '7%',
    height: '7%'
}

var chatListWrapperStyle = {

    overflowY: 'auto',
    width: 'auto',
    height: '550px'
}

var logoutButtonStyle = {

    float: 'right'
}

class ConversationListBody extends React.Component {


render() {

  var conversation = this.props.conversation
  var state = this.props.state

  if(conversation.author['email'] === state.userDetails.email){
        return(
              <div>
              <span class="avatar">
                  <img src={conversation.recipient['avatarImg']} alt="avatar" class="img-circle" />
              </span>
                    <div class="body">
                        <div class="header">
                            <span class="username">{conversation.recipient['username']}</span>
                            <small class="timestamp text-muted">
                                <i class="fa fa-clock-o"></i>1 secs ago
                            </small>
                        </div>
                        <p>
                            {conversation.body}
                        </p>
                    </div>

              </div>
        );
    }
   else {
    return(
        <div>
        <span class="avatar">
            <img src={conversation.author['avatarImg']} alt="avatar" class="img-circle" />
        </span>
              <div class="body">
                  <div class="header">
                      <span class="username">{conversation.author['username']}</span>
                      <small class="timestamp text-muted">
                          <i class="fa fa-clock-o"></i>1 secs ago
                      </small>
                  </div>
                  <p>
                      {conversation.body}
                  </p>
              </div>
        </div>
    );
  }

}
}


class ConversationList extends React.Component {


render() {
  var conversation = this.props.conversation
  var state = this.props.state
  var componentHandle = this.props.componentHandle
  if(state.conversationList.length > 0){
    return(
          <div>
                <li class="" value= {state.conversationList.indexOf(conversation)} onClick={(e)=>componentHandle.handleConversationClick(e,state.conversationList.indexOf(conversation))}>

                    <div>
                      <ConversationListBody conversation={conversation} state={state}/>
                    </div>
                </li>

          </div>
    );
  }
    else {
      return(
          <div>
                <p> No Conversations Started Yet !!! </p>
          </div>
      );
    }
  }
}

class LoggedInUserMessages extends React.Component {


render() {
  var message = this.props.message
  var state = this.props.state

  if(message.author.email === state.userDetails.email){
    return(
          <div>
                <li class="right">
                     <span class="timestamp">{message.author['username']}</span>

                    <span class="avatar tooltips" data-toggle="tooltip " data-placement="left" data-original-title="Kevin Mckoy">
                        <img src={message.author['avatarImg']} alt="avatar" class="img-circle" />
                    </span>
                    <div class="body">
                        <div class="message well well-sm">
                            {message.body}
                        </div>
                    </div>
                </li>

          </div>
    );
    }
    else {
      return(
          <div>

          </div>
      );
    }
  }
}


class UsersChatMessageList extends React.Component {

  render() {
    var state = this.props.state

        return(
            <div>

            <div class="slimScrollDiv" style={slimScrollDivStyle}>
            <div class="message-list-wrapper" style={messageListStyle}>
                <ul class="message-list">
                {state.messageList.map((message) =>
                    <div>
                        <LoggedInUserMessages message= {message} state={state}/>
                        <RecipientUserMessages message = {message} state={state}/>
                    </div>
                )}

                </ul>

            </div>
            <div class="slimScrollBar" style={slimscrollBarStyle}></div>
            <div class="slimScrollRail" style={slimScrollRailStyle}></div>
            </div>

            </div>
        );
      }

}



class OnlineUsersList extends React.Component {

  render() {

    var onlineusers = this.props.onlineUsers
    var state = this.props.state

   if(onlineusers.email === state.userDetails.email){
        return(

          <div>
          </div>

        );
      }
      else {
        return(

          <option value={onlineusers._id}>{onlineusers.username}</option>

        );
      }

      }

  }


class RecipientUserMessages extends React.Component {

  render() {
    var message = this.props.message
    var state = this.props.state
    if(message.author.email !== state.userDetails.email){
        return(
            <div>

                   <li class="left">
                       <span class="timestamp">{message.author.username}</span>

                       <span class="avatar available tooltips" data-toggle="tooltip " >
                           <img src={message.author['avatarImg']} alt="avatar" class="img-circle" />
                       </span>
                       <div class="body">
                           <div class="message well well-sm">
                             {message.body}
                           </div>
                       </div>
                   </li>

            </div>
        );
      }
      else {
        return(
            <div>

            </div>
        );
      }
    }
}

class Dashboard extends React.Component {

//  var dashboardState;

  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      userDetails: {},
      conversationList: [],
      messageList: [],
      onlineUsers: [],
      currentConversationID: 0,
      currentRecipientDetails: {},
      currentComposedMessage: '',
      currentSelectedOnlineUser: ''
    };

   //this.handleConversationClick = this.handleConversationClick.bind(this);
    this.handleNewChatClick = this.handleNewChatClick.bind(this);
    this.handleDeleteChatClick = this.handleDeleteChatClick.bind(this);
    this.handleGroupChatClick = this.handleGroupChatClick.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleComposedMessage = this.handleComposedMessage.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.sendReplyToConversation = this.sendReplyToConversation.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleGetAllConversationResponse = this.handleGetAllConversationResponse.bind(this);
    this.handleGetAllMessagesResponse = this.handleGetAllMessagesResponse.bind(this);
    this.handleNewChatResponse = this.handleNewChatResponse.bind(this);
    this.handleReplyConversationResponse = this.handleReplyConversationResponse.bind(this);
    this.Auth = new AuthService();

    socket.on('chatMessage', (incomingMessage) => {
      //this.props.newMessage({ message: incomingMessage })
      console.log("Incoming Message :" + incomingMessage);
       })
  }

    handleLogout(){
        Auth.logout();
        this.props.history.replace('/login');
    }

    componentWillMount(){
      //alert("Dashboard will mount" + this.Auth.getUserDetailsObject());
      var conversationArray = [];
        this.setState({userDetails: JSON.parse(this.Auth.getUserDetailsObject())});
        this.setState({onlineUsers: JSON.parse(this.Auth.getAllOnlineUsersObject())});
        this.setState({conversationList: conversationArray});

    }

    componentDidMount() {
      //console.log('Dashboard did mount.');
      //alert("Dashboard did mount");
      //var json = JSON.parse(this.Auth.getUserDetailsObject())
      //alert("User Details in Dashboard: " + this.state.userDetails['username'])
      var loggedInUserID = this.state.userDetails['_id']
      var loggedInUserEmail = this.state.userDetails['email']

      this.refreshConversationList(loggedInUserID);

      socket.emit('userJoined', {connectedUserEmail: loggedInUserEmail});
      socket.on('chatMessage', (incomingMessage) => {
        //this.props.newMessage({ message: incomingMessage })
        console.log("Incoming Message :" + incomingMessage);
         })

        this.handleIncomingMessageEvent();


    }

    handleIncomingMessageEvent(){
     socket.on('chatMessage', (incomingMessage) => {
       //this.props.newMessage({ message: incomingMessage })
       console.log("Incoming Message :" + incomingMessage);
        })
     }


    refreshConversationList(loggedInUserID)
    {
    //  alert("refresh conversations list" + loggedInUserID);
      this.Auth.getAllConversationList(loggedInUserID, this.handleGetAllConversationResponse);
    }


    handleGetAllConversationResponse(err,res)
    {
      //alert("Load Conversation Success" + res.body.conversations.length);
        var conversationArray = [];
          if(res.body.conversations.length > 0) {
                  for (var i = 0; i < res.body.conversations.length; i++) {

                    res.body.conversations[i].map(function(conversation) {
                      //alert("Body: " + conversation.body);

                            conversationArray.push(conversation);

                            })
                      }
          }

      //alert("conversationArray length" + conversationArray.length);
      //let conversations = res.conversations[1];

        // set the state for message List

      this.setState({conversationList: conversationArray});

    }


      refreshMessagesList(conversationID)
      {
        this.Auth.getAllMessagesList(conversationID, this.handleGetAllMessagesResponse);

      }


      handleGetAllMessagesResponse(err,res)
      {

        //  alert("Load Messages Success");

          var messagesArray = [];


            res.body.messageList.map(function(messages) {
             //alert("Message Body: " + messages.body);

              messagesArray.push(messages);

            })

              //alert("Message Array: " + messagesArray.length);
            // set the state for message List
          this.setState({messageList: messagesArray});
        //  alert("Messages List body state: " + this.state.messageList[0].body);
      }

    handleConversationClick(e, index)
    {
    //  alert("Conversation clicked" + index);
      //alert("Username: " + this.state.password);
      e.preventDefault();

      var conversationArray = this.state.conversationList;

      var conversationID = conversationArray[index].conversationId;

      var recipient = conversationArray[index].recipient;
      this.setState({currentConversationID: conversationID});
      this.setState({currentRecipientDetails: recipient});

      this.refreshMessagesList(conversationID);

    }

    handleNewChatClick(e)
    {
     e.preventDefault();
    // alert("New chat Clicked");
    //    alert("Selected recipient: " + this.state.currentSelectedOnlineUser);
        var currentSelectedUser = this.state.currentSelectedOnlineUser;
      this.Auth.postNewConversation("Hi", currentSelectedUser, this.state.userDetails, this.handleNewChatResponse);

    }

    handleNewChatResponse(err,res)
    {
      // alert("New Conversation posted !!!");
       var loggedInUserID = this.state.userDetails['_id'];
         this.refreshConversationList(loggedInUserID);
    }

    handleDeleteChatClick(e)
    {
      alert("Delete chat Clicked");
      e.preventDefault();
    }

    handleKeyDown(e)
    {
      //alert("handle key down clicked");

      if(e.keyCode == 13)
      {
        //alert("press enter");
        this.sendReplyToConversation();
      }
    }

    handleGroupChatClick(e)
    {
      //alert("Group chat Clicked");
      e.preventDefault();
    }

    handleComposedMessage(e)
    {
    //  alert("handle Composed Message");
      e.preventDefault();

      this.setState({
        [e.target.name]: e.target.value,
      });

    }

    handleSelectChange(e)
    {
        e.preventDefault();
      //  alert("select change");
        this.setState({
          [e.target.name]: e.target.value,
        });
    }

    handleSendClick(e)
    {
      //alert("Send clicked");
      //alert("Username: " + this.state.password);
      e.preventDefault();

        this.sendReplyToConversation();
    }

    sendReplyToConversation()
    {
      //alert("inside send reply");
      var currentConversationID = this.state.currentConversationID;
     var composedMessage = this.state.currentComposedMessage;
      this.Auth.replyToConversation(currentConversationID, composedMessage, this.state.userDetails, this.state.currentRecipientDetails, this.handleReplyConversationResponse);

    }

    handleReplyConversationResponse(err,res)
    {

      //alert("Reply Success" + res.body);

         this.refs.typedMessage.value = '';
         var loggedInUserID = this.state.userDetails['_id'];
         var recipientEmail = this.state.currentRecipientDetails.email;
          var composedMessage = this.state.currentComposedMessage;
         socket.emit('chatMessage', {recipientEmail: recipientEmail , message: composedMessage });
         this.refreshMessagesList(res.body.conversationId);
         this.refreshConversationList(loggedInUserID);

    }




  render() {
    return (
      <div>

        <div class="container">
            <div class="row">
                    <div class="col-sm-12">
                    <center> <h1> Home Like Chat Application </h1> </center>
                    <div className="App-header">
                        <h2><span class="avatar">
                            <img style={avatarImageStyle} src={this.state.userDetails.avatarImg} alt="avatar" class="img-circle halfsize" />
                        </span>  Welcome {this.state.userDetails['username']},</h2>
                        <a href="" class="btn btn-default" onClick={this.handleLogout.bind(this)} style={logoutButtonStyle}>Logout</a>
                    </div>

                        <div class="panel panel-white border-top-green">

                            <div class="panel-body chat">
                                <div class="row chat-wrapper">
                                    <div class="col-md-4">
                                        <div class="compose-area">
                                            <a href="" onClick={this.handleNewChatClick.bind(this)} class="btn btn-default"><i class="fa fa-edit"></i> New Chat</a>
                                            <a href="" onClick={this.handleDeleteChatClick} class="btn btn-default"><i class="fa fa-edit"></i> Delete Chat</a>
                                            <a href="" onClick={this.handleGroupChatClick} class="btn btn-default"><i class="fa fa-edit"></i> Group Chat</a>
                                        </div>

                                        <div>
                                            <div class="slimScrollDiv" style={slimscrollStyle}>
                                            <div class="chat-list-wrapper" style={chatListWrapperStyle}>
                                                <ul class="chat-list">

                                                {this.state.conversationList.map(conversation =>

                                                  <div>
                                                      <ConversationList componentHandle = {this} conversation= {conversation} state={this.state}/>

                                                  </div>


                                                )}


                                                </ul>
                                            </div><div class="slimScrollBar" style={slimscrollBarStyle}></div><div class="slimScrollRail" style={slimScrollRailStyle}></div></div>
                                        </div>

                                    </div>
                                    <h5> <b>Select a Online user from the box below to chat .... </b></h5>
                                    <div class="col-md-8">


                                        <div class="recipient-box">

                                            <select name= "currentSelectedOnlineUser" data-placeholder=" " class="form-control chzn-select chzn-done" multiple="" style={blockStyle} onChange={this.handleSelectChange}>
                                                  {this.state.onlineUsers.map(onlineusers =>

                                                          <OnlineUsersList onlineUsers={onlineusers} state={this.state}/>

                                                )}
                                            </select>
                                        </div>


                                        <div>

                                            <UsersChatMessageList state={this.state}/>

                                            <div class="compose-box">
                                                <div class="row">
                                                   <div class="col-xs-12 mg-btm-10">
                                                       <textarea id="btn-input" ref="typedMessage" name="currentComposedMessage" class="form-control input-sm" placeholder="Type your message here..." onChange={this.handleComposedMessage} onKeyDown={this.handleKeyDown}></textarea>
                                                    </div>
                                                    <div class="col-xs-8">
                                                        <button class="btn btn-green btn-sm">
                                                            <i class="fa fa-file"></i> Upload image
                                                        </button>
                                                    </div>
                                                    <div class="col-xs-4">
                                                        <button class="btn btn-green btn-sm pull-right" onClick={this.handleSendClick}>
                                                            <i class="fa fa-location-arrow"></i> Send
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

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

export default Dashboard;
