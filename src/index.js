import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route} from 'react-router-dom';
import AuthService from './authservice/AuthService';
import './index.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';



class App extends React.Component {

  render() {
    return (
      <HashRouter>
      <div className="main">
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register" component={Register} />
      </div>
      </HashRouter>
    );
  }

}

ReactDOM.render( <App />
  , document.getElementById('root'));
