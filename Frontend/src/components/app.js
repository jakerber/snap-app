import React, { Component } from 'react';
// import { Link } from 'react-router';
import NavBar from './navbar.js';
import { connect } from 'react-redux';
import SplashPage from './splash.js';
// import SignUp from '../containers/sign-up';
// import SignIn from '../containers/sign-in';


// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  render() {
    let main;
    if (this.props.auth) {
      console.log('user is authed, display snaps');
      main = (
        <div id="full">
          <div id="layout">
            <NavBar />
            {this.props.children}
          </div>
          <div id="content">
          </div>
        </div>
      );
    } else {
      console.log('not authed, display signup/in');
      main = (
        <div className="SplashPage">
          <SplashPage />
          {this.props.children}
        </div>
      );
    }

    return (
      <div id="full">
        {main}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth.authenticated,
});


export default connect(mapStateToProps, null)(App);
