import React from 'react';
import '../css/dashboard.css';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import Notifications, {notify} from 'react-notify-toast';


import AuthService from '../authservice/AuthService';

const Auth = new AuthService();

var timeoutID = null;



  var inputBoxStyle = {
       border: 'none',
       background: 'transparent'

   };

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

  constructor(props) {
    super(props);
    this.props = props;

    this.handleCheckboxSelect = this.handleCheckboxSelect.bind(this);

  }


  handleCheckboxSelect(e, index)
  {
    //alert("inside checkbox alert" + index + "checked: " + this.refs.checkbox.checked);
    var state = this.props.state
    var componentHandle = this.props.componentHandle

    var selectedList = [];
    selectedList = state.currentSelectedCheckboxIndex

    var checkboxName = "checkbox" + index;

      if(this.refs.checkbox.checked)
      {
        //alert("Add");
          selectedList.push(index);
      }
      else {
        //alert("remove");
        var valueIndex = selectedList.indexOf(index);
        selectedList.splice(valueIndex,1);
      }

  /*  for (var i = 0; i < selectedList.length; i++)
      {
          alert("state Array values:" + state.currentSelectedCheckboxIndex[i]);
      }*/
      //componentHandle.setState({state});
  }

render() {

  var conversation = this.props.conversation
  var state = this.props.state
  var index = this.props.index
  var checkboxName = "checkbox" + index;

  if(conversation.author['email'] === state.userDetails.email){
        return(
              <div>
                <input type="checkbox" name={checkboxName} value={state.conversationList.indexOf(conversation)} ref="checkbox" onChange={(e)=>this.handleCheckboxSelect(e,state.conversationList.indexOf(conversation))}/>

              <div>
                  <span class="avatar available" data-toggle="tooltip" >

                      <img src={conversation.recipient['avatarImg']} alt="avatar" class="img-circle" />
                  </span>
                        <div class="body">
                            <div class="header">
                                <span class="username">{conversation.recipient['username']}</span>
                            </div>
                            <p>
                                {conversation.body}
                            </p>
                        </div>
                  </div>

              </div>
        );
    }
   else {
    return(
        <div>
           <input type="checkbox" name={checkboxName} value={state.conversationList.indexOf(conversation)} ref="checkbox" onChange={(e)=>this.handleCheckboxSelect(e,state.conversationList.indexOf(conversation))}/>
        <div>
            <span class="avatar available" data-toggle="tooltip" >
                <img src={conversation.author['avatarImg']} alt="avatar" class="img-circle" />
            </span>
                  <div class="body">
                      <div class="header">
                          <span class="username">{conversation.author['username']}</span>
                      </div>
                      <p>
                          {conversation.body}
                      </p>
                  </div>
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
  var index = state.conversationList.indexOf(conversation)

  if(state.conversationList.length > 0){
    return(
          <div>
                <li class="" value= {state.conversationList.indexOf(conversation)} onClick={(e)=>componentHandle.handleConversationClick(e,state.conversationList.indexOf(conversation))}>

                    <div>
                      <ConversationListBody conversation={conversation} state={state} index={state.conversationList.indexOf(conversation)} componentHandle={componentHandle}/>
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

                    <span class="avatar available" data-toggle="tooltip " data-placement="left">
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


            <div class="slimScrollBar" ref="slimScrollBar" style={slimscrollBarStyle}></div>
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

          <option value={onlineusers._id}>{onlineusers.username} - {onlineusers.onlineStatus}</option>

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
      currentSelectedConversation: {},
      currentComposedMessage: '',
      currentSelectedOnlineUser: '',
      socket: {},
      currentSelectedCheckboxIndex: []
    };

   //this.handleConversationClick = this.handleConversationClick.bind(this);
    this.handleNewChatClick = this.handleNewChatClick.bind(this);
    this.handleDeleteChatClick = this.handleDeleteChatClick.bind(this);
    //this.handleGroupChatClick = this.handleGroupChatClick.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.handleComposedMessage = this.handleComposedMessage.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.sendReplyToConversation = this.sendReplyToConversation.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleGetAllConversationResponse = this.handleGetAllConversationResponse.bind(this);
    this.handleGetAllMessagesResponse = this.handleGetAllMessagesResponse.bind(this);
    this.handleNewChatResponse = this.handleNewChatResponse.bind(this);
    this.handleReplyConversationResponse = this.handleReplyConversationResponse.bind(this);
    //this.scrollDown = this.scrollDown.bind(this);
    this.handleDeleteChatResponse = this.handleDeleteChatResponse.bind(this);
    this.handleUserProfileClick = this.handleUserProfileClick.bind(this);
    this.handleOnlineUsersResponse = this.handleOnlineUsersResponse.bind(this);
    this.Auth = new AuthService();


    /*socket.on('broadcastMessage', (incomingMessage) => {
      //this.props.newMessage({ message: incomingMessage })
      console.log("Incoming Message :" + incomingMessage);
      alert("incoming message: " + incomingMessage);
       })

       socket.on('socketID', (socketID) => {
         //this.props.newMessage({ message: incomingMessage })
         console.log("Incoming Socket ID :" + socketID);
         alert("incoming message: " + socketID);
       })*/
      //alert("Dashboard Constructor");


  }



  initSocket(){

   const socket = io('https://homelikechat.herokuapp.com', {query: {token: this.state.userDetails.email, name: this.state.userDetails.username}});
    //alert("inside init socket " + this.state.userDetails['email'] );
      /*{
           reconnection: true,
           reconnectionDelay: 1000,
           reconnectionDelayMax : 5000,
           reconnectionAttempts: 99999
       }*/

    //this.setState({socket: socket});

    //var loginPageState = this.props.location.state;
    // alert("Init Socket: " + socket);
    this.setState({socket:socket});

  }

    handleLogout(){
      var loggedInUserName = this.state.userDetails['username'];
      var loggedInUserEmail = this.state.userDetails['email'];
      this.state.socket.emit('userLogout', {userName:loggedInUserName, userEmail: loggedInUserEmail});
        Auth.logout();
        this.props.history.replace('/login');
    }

    componentWillMount(){
      //alert("Dashboard will mount" + this.Auth.getUserDetailsObject());
      var conversationArray = [];
        this.setState({userDetails: JSON.parse(this.Auth.getUserDetailsObject())});
        this.setState({onlineUsers: JSON.parse(this.Auth.getAllOnlineUsersObject())});
        this.setState({conversationList: conversationArray});

        var loggedInUserEmail = this.state.userDetails['email']

        //  alert("Dashboard will mount :" + loggedInUserEmail);

    }

    componentDidMount() {
      //console.log('Dashboard did mount.');
    //  alert("Dashboard did mount");
      //var json = JSON.parse(this.Auth.getUserDetailsObject())
      //alert("User Details in Dashboard: " + this.state.userDetails['username'])




      var loggedInUserID = this.state.userDetails['_id']

      var loggedInUserEmail = this.state.userDetails['email']

        //alert("Dashboard did mount" + loggedInUserEmail);

        this.initSocket();

      this.refreshConversationList(loggedInUserID);



      /*this.state.socket.on('connection', (socketID) => {
        //this.props.newMessage({ message: incomingMessage })
        console.log("Incoming Socket ID :" + socketID);
        alert("incoming message: " + socketID);
         })

      this.state.socket.on('socketID', (socketID) => {
        //this.props.newMessage({ message: incomingMessage })
        console.log("Incoming Socket ID :" + socketID);
        alert("incoming message: " + socketID);
      })*/

      //this.state.socket.emit('userJoined', {connectedUserEmail: loggedInUserEmail});
      /*this.state.socket.on('broadcastMessage', (incomingMessage) => {
        //this.props.newMessage({ message: incomingMessage })
        console.log("Incoming Message :" + incomingMessage.message);
          alert("incoming message: " + incomingMessage.message);
      })*/

        //this.handleIncomingMessageEvent();

        //this.scrollDown();


    }

    handleIncomingMessageEvent(){
     /*this.state.socket.on('broadcastMessage', (incomingMessage) => {
       //this.props.newMessage({ message: incomingMessage })
       console.log("Incoming Message :" + incomingMessage);
         alert("incoming message: " + incomingMessage);
       })*/
     }


    refreshConversationList(loggedInUserID)
    {
      //alert("refresh conversations list" + loggedInUserID);
      this.Auth.getAllConversationList(loggedInUserID, this.handleGetAllConversationResponse);
    }


    handleGetAllConversationResponse(err,res)
    {
      //alert("Load Conversation Success" + res.body.conversations.length);
      //alert("State object : " + JSON.stringify(this.state));
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

      //alert("Selected Online User: " + this.refs.currentSelectedOnlineUser.value);
      this.setState({currentSelectedOnlineUser: this.refs.currentSelectedOnlineUser.value});



      this.state.socket.on('broadcastMessage', (incomingMessage) => {
        //this.props.newMessage({ message: incomingMessage })
        console.log("Incoming Message :" + incomingMessage.message);
          //alert("incoming message: " + incomingMessage.message);
          var loggedInUserID = this.state.userDetails['_id']
          this.refreshConversationList(loggedInUserID);
          this.refreshMessagesList(incomingMessage.conversationID);
      })

      this.state.socket.on('showUserTyping', (typingMessage) => {
        //this.props.newMessage({ message: incomingMessage })
        //alert("User Typing :" + typingMessage.typingUserName);
          //alert("incoming message: " + incomingMessage.message);
            this.refs.userTypingLabel.value = typingMessage.typingUserName + " is typing ...";
      })


    this.state.socket.on('userStoppedTyping', (typingMessage) => {
      //this.props.newMessage({ message: incomingMessage })
      //alert("User Typing :" + typingMessage.typingUserName);
        //alert("incoming message: " + incomingMessage.message);
          this.refs.userTypingLabel.value = "";
    })


    this.state.socket.on('userLoggedOut', (logoutMessage) => {
      //this.props.newMessage({ message: incomingMessage })
      //alert("User Typing :" + typingMessage.typingUserName);
        //alert("User Logged Out :  " + logoutMessage.userName);
          //this.refs.userTypingLabel.value = "";
          let myColor = { background: '#0000FF', text: '#FFFFFF' };
          notify.show(logoutMessage.userName + ' has logged out from Homelike Chat !!!' , myColor);

          this.Auth.getAllOnlineUsers(this.handleOnlineUsersResponse);
    })

    this.state.socket.on('userLoggedIn', (connectMessage) => {
      //this.props.newMessage({ message: incomingMessage })
      //alert("User Typing :" + typingMessage.typingUserName);
        //alert("User Logged Out :  " + logoutMessage.userName);
          //this.refs.userTypingLabel.value = "";
          var loggedInUserName = this.state.userDetails['username']
          if(loggedInUserName !== connectMessage){
            let myColor = { background: '#0000FF', text: '#FFFFFF' };
            notify.show(connectMessage + ' is now online ...' , myColor);
          }

          this.Auth.getAllOnlineUsers(this.handleOnlineUsersResponse);

    })

    this.state.socket.on('newChatStarted', (newChatMessage) => {
      //this.props.newMessage({ message: incomingMessage })
      //alert("User Typing :" + typingMessage.typingUserName);
        //alert("User Logged Out :  " + logoutMessage.userName);
          //this.refs.userTypingLabel.value = ""

          //this.Auth.getAllOnlineUsers(this.handleOnlineUsersResponse);


                var loggedInUserID = this.state.userDetails['_id']
                this.refreshConversationList(loggedInUserID);

                let myColor = { background: '#0000FF', text: '#FFFFFF' };
                notify.show(newChatMessage.userName + ' has initiated a new chat with you !!!' , myColor);

    })

    this.state.socket.on('chatDeleted', (deleteChatMessage) => {
      //this.props.newMessage({ message: incomingMessage })
      //alert("User Typing :" + typingMessage.typingUserName);
        //alert("User Logged Out :  " + logoutMessage.userName);
          //this.refs.userTypingLabel.value = ""

          //this.Auth.getAllOnlineUsers(this.handleOnlineUsersResponse);
          var loggedInUserID = this.state.userDetails['_id']
          this.refreshConversationList(loggedInUserID);

          //let myColor = { background: '#0000FF', text: '#FFFFFF' };
          //notify.show(deleteChatMessage.userName + ' has deleted a conversation between you.' , myColor);

    })

    /*this.state.socket.on('connect', function() {
      alert("connect");
    })

    this.state.socket.on('connecting', function() {
      alert("connecting");
    })

    this.state.socket.on('disconnect', function() {
      alert("disconnect");
    })

    this.state.socket.on('connect_failed', function() {
      alert("connect_failed");
    })
    this.state.socket.on('error', function() {
      alert("error");
    })
    this.state.socket.on('message', function() {
      alert("message");
    })
    this.state.socket.on('reconnect', function() {
      alert("reconnect!");
    })

    this.state.socket.on('reconnecting', function() {
      alert("reconnecting");
    })

    this.state.socket.on('reconnect_failed', function() {
      alert("reconnect_failed");
    })*/


    }

    handleOnlineUsersResponse(err, res)
    {
       //alert("inside OnlineUsers callback");


        this.Auth.setAllOnlineUsersObject(JSON.stringify(res.body.users));

        //var socket = this.state.socket;
  //this.state.socket.io.engine.id
        //alert("Socket object ID: " + socket + " - " + io().id);

        //socket = this.connectToSocket();
      //  this.setState({socket: socket});

      //  this.props.history.push('/dashboard');

      //  socket.on('connect', this.callOnSocketConnection(socket));

      //this.initializeSocketConnection();

      this.setState({onlineUsers: JSON.parse(this.Auth.getAllOnlineUsersObject())});

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
      //  this.scrollDown();



      }

    handleConversationClick(e, index)
    {
    //  alert("Conversation clicked" + index);
      //alert("Username: " + this.state.password);
      //e.preventDefault();


      var conversationArray = this.state.conversationList;

      var conversationID = conversationArray[index].conversationId;

      var conversation = conversationArray[index];
      //alert("Conversation :" + conversation.author.email);
      this.setState({currentSelectedConversation: conversation});
      //this.setState({currentRecipientDetails: recipient});

      this.refreshMessagesList(conversationID);

    }

    handleNewChatClick(e)
    {
     e.preventDefault();
     //alert("New chat Clicked");
      // alert("Selected recipient: " + this.state.currentSelectedOnlineUser);
        var currentSelectedUser = this.state.currentSelectedOnlineUser;
      this.Auth.postNewConversation("Hi...", currentSelectedUser, this.state.userDetails, this.handleNewChatResponse);

    }

    handleNewChatResponse(err,res)
    {
      //alert("New Conversation posted !!!");
       var loggedInUserID = this.state.userDetails['_id'];

       var loggedInUserName = this.state.userDetails['username'];
       var loggedInUserEmail = this.state.userDetails['email'];

         var receiverUserID = this.state.currentSelectedOnlineUser;
         var onlineUserList = this.state.onlineUsers;
         var receiverUserObj = {};

         for(var i =0 ; i< onlineUserList.length ; i++)
         {
           var userObj = onlineUserList[i];
           if(userObj._id === receiverUserID)
           {
                receiverUserObj = userObj;
           }
         }
         var receiverUserName = receiverUserObj.username;
         var receiverUserEmail = receiverUserObj.email;


         this.state.socket.emit('newChatPosted', {UserEmail:loggedInUserEmail, userName: loggedInUserName, receiverEmail: receiverUserEmail});
         this.refreshConversationList(loggedInUserID);
    }

    handleDeleteChatClick(e)
    {
      //alert("Delete chat Clicked");
      e.preventDefault();
      if(this.state.currentSelectedCheckboxIndex.length === 0)
      {
        alert("Please select a Conversation to delete");
      }
      else {

        var conversationList = this.state.conversationList;

        for(var i =0 ; i< this.state.currentSelectedCheckboxIndex.length ; i++)
        {
            var conversation = conversationList[this.state.currentSelectedCheckboxIndex[i]];
            //alert("Deleting Conversation Id:" + conversation.conversationId);
            this.Auth.deleteConversation(conversation.conversationId, this.state.userDetails, this.handleDeleteChatResponse);

        }


      }
    }

    handleDeleteChatResponse(err,res)
    {
    //  alert("received response for delete");

      var loggedInUserID = this.state.userDetails['_id'];
      var conversationID = this.state.currentSelectedConversation.conversationId;

    //  var loggedInUserID = this.state.userDetails['_id'];

      var loggedInUserName = this.state.userDetails['username'];
      var loggedInUserEmail = this.state.userDetails['email'];

        //var receiverUserID = this.state.currentSelectedOnlineUser;

        this.state.socket.emit('chatRemoved', {UserEmail:loggedInUserEmail, userName: loggedInUserName});


        this.refreshConversationList(loggedInUserID);
        this.refreshMessagesList(conversationID);
    }

    handleKeyDown(e)
    {
      //alert("handle key down clicked");
      //  clear timeout
      clearTimeout(timeoutID);
      if(e.keyCode == 13)
      {
        e.preventDefault();
        //alert("press enter");
        this.sendReplyToConversation();
      }
    }

    handleKeyUp(e)
    {
      //alert("handle key down clicked");
      //set the setTimeout and pass the callback

      timeoutID = setTimeout(this.removeUserTypingMessage(), 5000);
    }

    removeUserTypingMessage()
    {
        //this.refs.userTypingLabel.innerHTML = "";
        //emit the scoket message here
        // on socket listening remove the typing message

        var loggedInUserName = this.state.userDetails['username'];
        var loggedInUserEmail = this.state.userDetails['email'];
        var currentConversation = this.state.currentSelectedConversation
        var recipientEmail = "";
        var currentRecipient = {};
        if(loggedInUserEmail === currentConversation.author['email'])
        {
          //alert("inside logged in user" + currentConversation.recipient);
             recipientEmail = currentConversation.recipient['email'];
             currentRecipient = currentConversation.recipient;
        }
        else
        {
             recipientEmail = currentConversation.author['email'];
             currentRecipient = currentConversation.author;
        }

        this.state.socket.emit('removeUserTyping', {typingUserEmail:loggedInUserEmail, typingUserName:loggedInUserName, receiverEmail: recipientEmail});
    }



    handleComposedMessage(e)
    {
      //alert("handle Composed Message");
      e.preventDefault();

      this.setState({
        [e.target.name]: e.target.value,
      });

      var loggedInUserName = this.state.userDetails['username'];
      var loggedInUserEmail = this.state.userDetails['email'];
      var currentConversation = this.state.currentSelectedConversation
      var recipientEmail = "";
      var currentRecipient = {};
      if(loggedInUserEmail === currentConversation.author['email'])
      {
        //alert("inside logged in user" + currentConversation.recipient);
           recipientEmail = currentConversation.recipient['email'];
           currentRecipient = currentConversation.recipient;
      }
      else
      {
           recipientEmail = currentConversation.author['email'];
           currentRecipient = currentConversation.author;
      }

        this.state.socket.emit('userTyping', {typingUserEmail:loggedInUserEmail, typingUserName:loggedInUserName, receiverEmail: recipientEmail});
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

    handleUserProfileClick(e)
    {
      //alert("handleUserProfileClick");

      e.preventDefault();

      this.props.history.push({pathname: '/userprofile', query: {user: this.state.userDetails}});

    }

    sendReplyToConversation()
    {
    //  alert("inside send reply");
     var currentConversation = this.state.currentSelectedConversation;
     var conversationID = currentConversation['conversationId'];
     var composedMessage = this.state.currentComposedMessage;

     var loggedInUserID = this.state.userDetails['_id'];
     var loggedInUserEmail = this.state.userDetails['email'];
     //alert("inside logged in user" + currentConversation.author['email']  + currentConversation.recipient['email'] + loggedInUserEmail);
     var recipientEmail = "";
     var currentRecipient = {};
     if(loggedInUserEmail === currentConversation.author['email'])
     {
       //alert("inside logged in user" + currentConversation.recipient);
          recipientEmail = currentConversation.recipient['email'];
          currentRecipient = currentConversation.recipient;
     }
     else
     {
          recipientEmail = currentConversation.author['email'];
          currentRecipient = currentConversation.author;
     }

      //alert("current Recipient :" + currentRecipient.email);
      var composedMessage = this.state.currentComposedMessage;

      //alert("composed Message:" + composedMessage);
      //alert("State : " + this.state.socket);
        //socket.emit('userJoined', {connectedUserEmail: loggedInUserEmail});
      this.state.socket.emit('chatMessage', {authorEmail:loggedInUserEmail, recipientEmail: recipientEmail , message: composedMessage , conversationID: conversationID});

      this.Auth.replyToConversation(conversationID, composedMessage, this.state.userDetails, currentRecipient, this.handleReplyConversationResponse);
      this.refs.typedMessage.value = '';
    }

    handleReplyConversationResponse(err,res)
    {

      //alert("Reply Success" + res.body);
          var loggedInUserID = this.state.userDetails['_id'];

         this.refreshMessagesList(res.body.conversationId);
         this.refreshConversationList(loggedInUserID);

    }




  render() {
    return (
      <div>

        <div class="container">
        <Notifications />
            <div class="row">
                    <div class="col-sm-12">
                    <center> <h1> Home Like Chat Application </h1> </center>
                    <div className="App-header">
                        <h2><span class="avatar available">
                            <img  style={avatarImageStyle} src={this.state.userDetails.avatarImg} alt="avatar" class="img-circle halfsize" />
                        </span>  Welcome <a href="" onClick={this.handleUserProfileClick.bind(this)}>{this.state.userDetails['username']}</a>,</h2>
                        <a href="" class="btn btn-default" onClick={this.handleLogout.bind(this)} style={logoutButtonStyle}>Logout</a>
                    </div>

                        <div class="panel panel-white border-top-green">

                            <div class="panel-body chat">
                                <div class="row chat-wrapper">
                                    <div class="col-md-4">
                                        <div class="compose-area">
                                        
                                            <a href="" onClick={this.handleNewChatClick.bind(this)} class="btn btn-default"><i class="fa fa-edit"></i> New Chat</a>
                                            <a href="" onClick={this.handleDeleteChatClick} class="btn btn-default"><i class="fa fa-edit"></i> Delete Chat</a>

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
                                    <div class="col-xs-8"><h5> <b>Select a Online user from the box below to chat .... </b></h5></div>
                                    <div class="col-md-8">


                                        <div class="recipient-box">

                                            <select name= "currentSelectedOnlineUser" ref = "currentSelectedOnlineUser" data-placeholder=" " class="form-control chzn-select chzn-done" multiple="" style={blockStyle} onChange={this.handleSelectChange}>
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
                                                    <input style={inputBoxStyle} type="text" name="userTypingText" value = "" ref="userTypingLabel" readonly/>
                                                 </div>
                                                   <div class="col-xs-12 mg-btm-10">
                                                       <textarea id="btn-input" ref="typedMessage" name="currentComposedMessage" class="form-control input-sm" placeholder="Type your message here..." onChange={this.handleComposedMessage}  onKeyUp={this.handleKeyUp} onKeyDown={this.handleKeyDown}></textarea>
                                                    </div>
                                                    <div class="col-xs-8">
                                                    <p> (Please select/click on the conversation on the left column before starting to type.) </p>
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

export default withRouter(Dashboard);
