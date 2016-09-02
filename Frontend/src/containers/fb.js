import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { fbAuth } from '../actions/index.js';
import { connect } from 'react-redux';


// example class based component (smart component)
class fb extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.onFacebookLogin = this.onFacebookLogin.bind(this);
  }

  onFacebookLogin(response) {
    if (response.status !== 'not_authorized' && response.status !== 'unknown') {
      console.log(response);
      this.props.fbAuth(response.accessToken);
    } else {
      console.log('error');
    }
  }


  render() {
    return (
      <div id="login">
        <div id="facebook">
          <FacebookLogin
            appId="1020474614715187"
            autoLoad
            fields="name,email,picture.type(large)"
            callback={this.onFacebookLogin}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { fbAuth })(fb);
