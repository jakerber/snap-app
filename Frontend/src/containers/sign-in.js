import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinUser } from '../actions';


class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      error: 0,
    };

    this.usernameWasChanged = this.usernameWasChanged.bind(this);
    this.passwordWasChanged = this.passwordWasChanged.bind(this);
    this.signUserIn = this.signUserIn.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.error !== 'none') {
      this.setState({
        error: 1,
      });
    } else {
      this.setState({
        error: 0,
      });
    }
  }

  usernameWasChanged(event) {
    this.setState({
      username: event.target.value,
      error: 0,
    });
  }

  passwordWasChanged(event) {
    this.setState({
      password: event.target.value,
      error: 0,
    });
  }

  signUserIn() {
    if (this.state.password === '' || this.state.username === '') {
      this.setState({
        error: 2,
      });
    } else {
      this.props.signinUser({
        username: this.state.username,
        password: this.state.password,
      });
    }
  }

  render() {
    if (this.state.error === 2) {
      return (
        <div className="Sign">
          <div className="sui-inner">
            <h1>SIGN IN</h1>
            <div className="sui-image-holder">
              <img role="presentation" src="../../images/snapapp-logo.png" />
            </div>
            <div id="email">
              <input placeholder="Username" value={this.state.username} onChange={this.usernameWasChanged} />
            </div>
            <div id="password">
              <input placeholder="Password" type="password" value={this.state.password} onChange={this.passwordWasChanged} />
            </div>
            <span>*all fields required</span>
            <p>ALL FIELDS REQUIRED!</p>
            <div id="splash-signup" className="submit-in-sui">
              <div>
                <a onClick={this.signUserIn}>SUBMIT</a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.error === 1) {
      return (
        <div className="Sign">
          <div className="sui-inner">
            <h1>SIGN IN</h1>
            <div className="sui-image-holder">
              <img role="presentation" src="../../images/snapapp-logo.png" />
            </div>
            <div id="email">
              <input placeholder="Username" value={this.state.username} onChange={this.usernameWasChanged} />
            </div>
            <div id="password">
              <input placeholder="Password" type="password" value={this.state.password} onChange={this.passwordWasChanged} />
            </div>
            <span>THIS ACCOUNT DOES NOT EXIST</span>
            <p>PLEASE TRY AGAIN</p>
            <div id="splash-signup" className="submit-in-sui">
              <div>
                <a onClick={this.signUserIn}>SUBMIT</a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Sign">
          <div className="sui-inner">
            <h1>SIGN IN</h1>
            <div className="sui-image-holder">
              <img role="presentation" src="../../images/snapapp-logo.png" />
            </div>
            <div id="email">
              <input placeholder="Username" value={this.state.username} onChange={this.usernameWasChanged} />
            </div>
            <div id="password">
              <input placeholder="Password" type="password" value={this.state.password} onChange={this.passwordWasChanged} />
            </div>
            <span>*all fields required</span>

            <div id="splash-signup" className="submit-in-sui">
              <div>
                <a onClick={this.signUserIn}>SUBMIT</a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
  };
}


export default connect(mapStateToProps, { signinUser })(SignIn);
