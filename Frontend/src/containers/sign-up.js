import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      username: '',
      error: 0,
    };

    this.emailWasChanged = this.emailWasChanged.bind(this);
    this.usernameWasChanged = this.usernameWasChanged.bind(this);
    this.passwordWasChanged = this.passwordWasChanged.bind(this);
    this.signUserUp = this.signUserUp.bind(this);
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

  emailWasChanged(event) {
    this.setState({
      email: event.target.value,
      error: 0,
    });
  }

  passwordWasChanged(event) {
    this.setState({
      password: event.target.value,
      error: 0,
    });
  }

  signUserUp() {
    if (this.state.password === '' || this.state.email === '' || this.state.username === '') {
      this.setState({
        error: 2,
      });
    } else {
      this.props.signupUser({
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
      });
    }
  }

  render() {
    if (this.state.error === 2) {
      return (
        <div className="Sign">
          <div className="sui-inner">
            <h1>SIGN UP</h1>
            <div className="sui-image-holder">
              <img role="presentation" src="../../images/snapapp-logo.png" />
            </div>
            <div id="email">
              <input placeholder="Email" value={this.state.email} onChange={this.emailWasChanged} />
            </div>
            <div id="username">
              <input placeholder="Username" value={this.state.username} onChange={this.usernameWasChanged} />
            </div>
            <div id="password">
              <input placeholder="Password" type="password" value={this.state.password} onChange={this.passwordWasChanged} />
            </div>
            <span>*all fields required</span>
            <p>ALL FIELDS REQUIRED!</p>
            <div id="splash-signup" className="submit-in-sui">
              <div>
                <a onClick={this.signUserUp}>SUBMIT</a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.error === 0) {
      return (
        <div className="Sign">
          <div className="sui-inner">
            <h1>SIGN UP</h1>
            <div className="sui-image-holder">
              <img role="presentation" src="../../images/snapapp-logo.png" />
            </div>
            <div id="email">
              <input placeholder="Email" value={this.state.email} onChange={this.emailWasChanged} />
            </div>
            <div id="username">
              <input placeholder="Username" value={this.state.username} onChange={this.usernameWasChanged} />
            </div>
            <div id="password">
              <input placeholder="Password" type="password" value={this.state.password} onChange={this.passwordWasChanged} />
            </div>
            <span>*all fields required</span>
            <i id="secure-user-i" className="material-icons">vpn_lock</i>
            <p id="secure-user">Your informaton is safe with us.</p>
            <div id="splash-signup" className="submit-in-sui">
              <div>
                <a onClick={this.signUserUp}>SUBMIT</a>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.error === 1) {
      return (
        <div className="Sign">
          <div className="sui-inner">
            <h1>SIGN UP</h1>
            <div className="sui-image-holder">
              <img role="presentation" src="../../images/snapapp-logo.png" />
            </div>
            <div id="email">
              <input placeholder="Email" value={this.state.email} onChange={this.emailWasChanged} />
            </div>
            <div id="username">
              <input placeholder="Username" value={this.state.username} onChange={this.usernameWasChanged} />
            </div>
            <div id="password">
              <input placeholder="Password" type="password" value={this.state.password} onChange={this.passwordWasChanged} />
            </div>
            <span>UNABLE TO SIGN UP</span>
            <p>EMAIL OR USERNAME ALREADY EXISTS</p>
            <p>PLEASE TRY AGAIN</p>
            <div id="splash-signup" className="submit-in-sui">
              <div>
                <a onClick={this.signUserUp}>SUBMIT</a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Sign">
          <div className="sui-inner">
            <h1>SIGN UP</h1>
            <div className="sui-image-holder">
              <img role="presentation" src="../../images/snapapp-logo.png" />
            </div>
            <div id="email">
              <input placeholder="Email" value={this.state.email} onChange={this.emailWasChanged} />
            </div>
            <div id="username">
              <input placeholder="Username" value={this.state.username} onChange={this.usernameWasChanged} />
            </div>
            <div id="password">
              <input placeholder="Password" type="password" value={this.state.password} onChange={this.passwordWasChanged} />
            </div>
            <span>*all fields required</span>
            <i id="secure-user-i" className="material-icons">vpn_lock</i>
            <p id="secure-user">Your informaton is safe with us.</p>
            <div id="splash-signup" className="submit-in-sui">
              <div>
                <a onClick={this.signUserUp}>SUBMIT</a>
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

export default connect(mapStateToProps, { signupUser })(SignUp);
