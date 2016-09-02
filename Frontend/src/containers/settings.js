import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserObject, updateProfile, signoutUser, deleteUser } from '../actions';
import Dropzone from 'react-dropzone';
import jQuery from 'jquery';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatingInfo: 0,
      username: 'Loading...',
      email: 'Loading...',
      password: 'Loading...',
      profilePictureURL: '',
      pic: '',
    };

    this.updateInfo = this.updateInfo.bind(this);
    this.changingUsername = this.changingUsername.bind(this);
    this.changingEmail = this.changingEmail.bind(this);
    this.changingPassword = this.changingPassword.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.callback = this.callback.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  componentWillMount() {
    console.log('getting user object');
    this.props.getUserObject();
    console.log('USER TOKEN', localStorage.getItem('token'));
  }

  componentWillReceiveProps(props) {
    this.setState({
      username: props.user.username,
      email: props.user.email,
      password: props.user.password,
    });
    // if (props.user.facebookUserID) {
    //   this.setState({
    //     pic: this.props.user.fbProfPicURL,
    //   });
    // } else {
    if (props.user.profilePicURL) {
      // Source: http://stackoverflow.com/questions/17657184/using-jquerys-ajax-method-to-retrieve-images-as-a-blob
      jQuery.get(props.user.profilePicURL, (data) => {
        // console.log('THIS IS THE DATA', data);
        this.setState({
          pic: data,
        });
      });
    } else {
      this.setState({
        // placeholder
        pic: 'http://xacatolicos.com/app/images/avatar/icon-user.png',
      });
    }
  }

  onDrop(files) {
    const reader = new FileReader();
    reader.onload = this.callback;


    reader.onerror = function asdf(stuff) {
      console.log('error', stuff);
      console.log(stuff.getMessage());
    };

    reader.readAsDataURL(files[0]);

    // const newArray = this.state.files.slice();
    console.log('Received files: ', files);
    // newArray.push(files);
    console.log('first is ', files[0]);
    this.setState({
      usingWebcam: 0,
      snapReady: 1,
    });
  }

  callback(data) {
    this.setState({
      pic: data.target.result,
    });
  }

  changingUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  changingPassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  changingEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  updateInfo() {
    if (this.state.updatingInfo === 0) {
      // updTING INFO
      this.setState({
        updatingInfo: 1,
      });
    } else {
      // saving info
      this.setState({
        updatingInfo: 0,
      });
      if (this.props.user.profilePicURL) {
        this.props.updateProfile({ email: this.state.email, username: this.state.username, id: this.props.user._id, file: this.state.pic });
      } else {
        this.props.updateProfile({ email: this.state.email, username: this.state.username, id: this.props.user._id, file: this.state.pic });
      }
    }
  }

  deleteProfile() {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.props.deleteUser(localStorage.getItem('token'));
      this.props.signoutUser();
      // backend function
    }
  }

  render() {
    if (this.state.updatingInfo === 0) {
      return (
        <div className="settings-top">
          <div id="settings-header">SETTINGS</div>
          <div className="settings">
            <h1>Account Settings</h1>
            <div className="list-holder-settings">
              <ul className="settings-ul1">
                <li>  USERNAME <span id="fl">{this.state.username}</span></li>
                <li>  EMAIL <span id="fl">{this.state.email}</span></li>
                <li>  PASSWORD <span id="fl">&#8226;</span></li>
                <li>  PROFILE PICTURE <span id="ppicon"><i className="material-icons">person_pin</i></span></li>
              </ul>
              <div className="content-row">
                <div onClick={this.updateInfo} id="settings-change-info">UPDATE INFO</div>
                <div onClick={this.deleteProfile} id="settings-change-info">DELETE PROFILE</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="settings-top">
          <div id="settings-header">SETTINGS</div>
          <div className="settings">
            <h1>Update Account</h1>
            <div className="list-holder-settings">
              <ul className="settings-ul2">
                <li id="nobg"><span id="black">UPDATE USERNAME:</span><input type="text" placeholder="Username" value={this.state.username} onChange={this.changingUsername} /></li>
                <li id="nobg"><span id="black">UPDATE EMAIL:</span><input type="text" placeholder="Email" value={this.state.email} onChange={this.changingEmail} /></li>
                <li id="tam">
                  <Dropzone ref="dropzone" style="border: none" onDrop={this.onDrop} multiple={false}>
                    CLICK TO UPDATE PROFILE PICTURE
                  </Dropzone>
                </li>
              </ul>
              <div className="update-prof-pic">
                {this.state.pic ?
                  <div id="tam"><img alt="null" src={this.state.pic} />PROFILE PICTURE</div>
                  : null}
              </div>
              <div onClick={this.updateInfo} id="settings-change-info">SAVE</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}


export default connect(mapStateToProps, { getUserObject, updateProfile, signoutUser, deleteUser })(Settings);
