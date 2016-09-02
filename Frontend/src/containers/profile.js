import React, { Component } from 'react';
import { getUserObject, updateProfile } from '../actions';
import { connect } from 'react-redux';
import jQuery from 'jquery';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: this.props.user.username,
      username: this.props.user.username,
      email: '',
      profilePictureURL: 'http://xacatolicos.com/app/images/avatar/icon-user.png',
      snapScore: 0,
      topFriendName: 'None',
      streak: 0,
      friends: 0,
      groups: 0,
      recievedProps: 0,
    };
  }

  componentWillMount() {
    console.log('getting user object');
    this.props.getUserObject();
  }

  componentWillReceiveProps(props) {
    console.log('PROPS friend ', props.user);
    let max = 0;
    let topFriend;
    if (props.user.friends.length > 0) {
      for (let i = 0; i < props.user.friends.length; i++) {
        if (props.user.friends[i].score > max) {
          max = props.user.friends[i].score;
          topFriend = props.user.friends[i].name;
        }
      }
    } else {
      topFriend = 'No Friends';
    }
    this.setState({
      topFriendName: topFriend,
      friends: props.user.friends.length,
    });

    // if (props.user.facebookUserID) {
    //   this.setState({
    //     profilePictureURL: this.props.user.fbProfPicURL,
    //   });
    // } else {
    if (props.user.profilePicURL) {
      jQuery.get(props.user.profilePicURL, (data) => {
        // console.log('THIS IS THE DATA', data);
        this.setState({
          profilePictureURL: data,
          recievedProps: 1,
        });
      });
    } else {
      this.setState({
        profilePictureURL: 'http://xacatolicos.com/app/images/avatar/icon-user.png',
        recievedProps: 1,
      });
    }
  }

  render() {
    if (this.state.recievedProps === 0) {
      return (
        <div className="profile-top">
          <div id="profile-header">LOADING PROFILE...</div>
        </div>
      );
    } else {
      console.log(this.props.user);
      return (
        <div className="profile-top">
          <div id="profile-header">PROFILE</div>
          <div className="profile">
            <div id="profile-pic">
              <img src={this.state.profilePictureURL} alt="null" className="prof-user-img" />
            </div>
            <h1>{this.props.user.username}</h1>
            <h4>{this.props.user.email}</h4>
            <div className="list-holder">
              <ul className="profile-ul1">
                <li><i className="material-icons">star</i> SNAP SCORE <span id="fl">{this.props.user.snapScore}</span></li>
                <li><i className="material-icons">person_pin</i> TOP FRIEND <span id="fl">{this.state.topFriendName}</span></li>
                <li><i className="material-icons">group</i> FRIENDS <span id="fl">{this.state.friends}</span></li>
              </ul>
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

export default connect(mapStateToProps, { getUserObject, updateProfile })(Profile);
