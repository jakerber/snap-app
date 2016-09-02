import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
// import FacebookLogin from '../containers/fb.js';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAll: 1,
    };
    this.hideDisplay = this.hideDisplay.bind(this);
    this.showDisplay = this.showDisplay.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    this.setState({
      displayAll: 0,
    });
    browserHistory.push('/signup');
  }

  showDisplay() {
    this.setState({
      displayAll: 1,
    });
  }

  hideDisplay() {
    this.setState({
      displayAll: 0,
    });
  }

  render() {
    if (this.state.displayAll === 1) {
      return (
        <div className="splash-full">
          <div id="splash-title">
            <h1>SnapApp</h1>
          </div>
          <div id="splash-signup">
            <div>
              <a onClick={this.onSignUp}>SIGN UP</a>
            </div>
          </div>
          <div id="splash-signin">
            Already have an account? <Link to="/signin" onClick={this.hideDisplay} className="SignIn">Sign in.</Link>
          </div>
          <div id="splash-logo">
            <img role="presentation" src="../../images/snapapp-logo.png"></img>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bth-div">
          <Link id="back-to-home" to="/" onClick={this.showDisplay}>
            <div><i className="material-icons">keyboard_backspace</i> Back To Home</div>
          </Link>
        </div>
      );
    }
  }
}

// <li><div id="nav-bottom-title"><h1 id="nav-bottom-text">SnapApp &#9400;</h1></div></li>
export default Splash;
