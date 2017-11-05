import decode from 'jwt-decode';
import request from 'superagent';

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:4000/api' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

   login(email, password, callback) {
        // Get a token from api server using the fetch api
      //alert("login email password" + email + password)
        /*return this.fetch(`${this.domain}/authenticate`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
         alert("Token " + res.token);
      //      alert("Sucess " + res.success);

            if(res.success)
            {
              this.setToken(res.token) // Setting the token in localStorage

            }
            return Promise.resolve(res);
        })*/
          //http://localhost:4000/api/authenticate
      request.post('https://homelikechat.herokuapp.com/api/authenticate')
            .set('Content-Type', 'application/json')
           .send({ email: email, password: password })
           .end(callback);

    }



    register(username, password, email, callback) {
        // Get a token from api server using the fetch api
        //alert("inside register");
      /*  return this.fetch(`${this.domain}/registerUser`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                email
            })
        }).then(res => {
          //alert("User ID " + res._id);
          //alert("username " + res.username);
            //this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })*/

        request.post('https://homelikechat.herokuapp.com/api/registerUser')
              .set('Content-Type', 'application/json')
             .send({ username: username, password: password, email:email  })
             .end(callback);

    }


    getUserDetails(email, callback) {
        // Get a token from api server using the fetch api
        //alert("get User Details" + email);
      /*  return this.fetch(`${this.domain}/getUserDetails`, {
            method: 'POST',
            body: JSON.stringify({
                email
            })
        }).then(res => {
          //alert("get User Details User name " + res.user.username);
          //alert("username " + res.username);
            //this.setToken(res.token) // Setting the token in localStorage
            this.setUserDetailsObject(JSON.stringify(res.user))
            return Promise.resolve(res);
        })*/

        request.post('https://homelikechat.herokuapp.com/api/getUserDetails')
              .set('Content-Type', 'application/json')
             .send({ email: email })
             .end(callback);
    }

    getAllOnlineUsers (callback) {
        // Get a token from api server using the fetch api
      //  alert("get all OnlineUsers" );
      /*  return this.fetch(`${this.domain}/getAllUsers`, {
            method: 'GET'
        }).then(res => {
          //alert("Online Users " + res);
          //alert("username " + res.username);
            //this.setToken(res.token) // Setting the token in localStorage
            this.setAllOnlineUsersObject(JSON.stringify(res.users))
            return Promise.resolve(res);
        })*/


        request.get('https://homelikechat.herokuapp.com/api/getAllUsers')
              .set('Accept', 'application/json')
             .end(callback);


    }

    postNewConversation(composedMessage, recipientID, user, callback) {
        // Get a token from api server using the fetch api
      //  alert("postNewConversation" + composedMessage  + recipientID + user);


            request.post('https://homelikechat.herokuapp.com/api/newConversation/' + recipientID)
                  .set('Content-Type', 'application/json')
                 .send({ composedMessage: composedMessage, user: user })
                 .end(callback);
    }

      getAllConversationList(userID, callback) {
          // Get a token from api server using the fetch api
         //alert("inside getAllConversationList" + userID);

      /*  let params = {
            userid: userID
        }*/

          //  let esc = encodeURIComponent;

          /*  let query = Object.keys(params)
             .map(k => esc(k) + '=' + esc(params[k]))
             .join('&');*/

            let url = 'https://homelikechat.herokuapp.com/api/getAllConversationList'

            //alert("URL: " + url);

            var query = 'userid=' + userID;

            request.get(url)
                  .query(query)
                  .set('Accept', 'application/json')
                 .end(callback);

        /*  return this.fetch(url, {
              method: 'GET'
          }).then(res => {
            //alert("Response conversations: ");
            //let conversations = res.conversations[0];
            //conversations.map(function(conversation) {
            //  alert("Body: " + conversation.body);
              //})
            //alert("Conversation ID: " + res.conversations[0].conversationId);
              //this.setToken(res.token) // Setting the token in localStorage
              return Promise.resolve(res);
          })*/
      }

      getAllMessagesList(conversationID, callback) {
          // Get a token from api server using the fetch api
        //  alert("login email password" + email + password)

        let params = {
            conversationId: conversationID
        }

            let esc = encodeURIComponent;

            let query = Object.keys(params)
             .map(k => esc(k) + '=' + esc(params[k]))
             .join('&');

            let url = 'https://homelikechat.herokuapp.com/api/getAllMessagesinConversation';

          //  alert("URL: " + url);

        /*  return this.fetch(url, {
              method: 'GET'
          }).then(res => {
          //alert("Response messages: " + res.conversation);
            //alert("Conversation ID: " + res.conversations[0].conversationId);
              //this.setToken(res.token) // Setting the token in localStorage
              return Promise.resolve(res);
          })*/

          request.get(url)
                .query(query)
                .set('Accept', 'application/json')
               .end(callback);
      }


      replyToConversation(conversationId, composedMessage, user, recipient, callback) {
          // Get a token from api server using the fetch api
        //alert("Reply To Conversation " + conversationId);
      /*  {
          "conversationId": "59e42cf1aaa5373b341fc1f1",
          "composedMessage": "Hi David",
            "user": {
              "_id": "59e42008c6b5c2435403f484",
              "username": "Jack",
              "password": "$2a$10$wSiQA0B3KEZr7az91yaj1.T3HmZ4xRx.e9i0oZGRBaRN/Qybm3mHa",
              "email": "jack@gmail.com"
            }
        }*/
        /*  return this.fetch(`${this.domain}/replyConversation`, {
              method: 'POST',
              body: JSON.stringify({
                  conversationId,
                  composedMessage,
                  user,
                  recipient
              })
          }).then(res => {
          //  alert("Token " + res.token);
          // alert("Sucess " + res.message);
            //  this.setToken(res.token) // Setting the token in localStorage
              return Promise.resolve(res);
          })*/


          request.post('https://homelikechat.herokuapp.com/api/replyConversation')
                .set('Content-Type', 'application/json')
               .send({ conversationId: conversationId, composedMessage: composedMessage, user: user, recipient:recipient })
               .end(callback);

      }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        //alert("setting Token in storage");
        localStorage.setItem('id_token', idToken)
    }

    setUserDetailsObject(userDetails){
        localStorage.setItem('user_details', userDetails)
    }

    getUserDetailsObject() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('user_details')
    }

    setAllOnlineUsersObject(onlineUsers){
        localStorage.setItem('online_users', onlineUsers)
    }

    getAllOnlineUsersObject() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('online_users')
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'JWT ' + this.getToken()
        }

        return fetch(url, {
            headers,
            options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
