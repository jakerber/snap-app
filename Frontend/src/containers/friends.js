import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserObject, addFriendToUser } from '../actions';

class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newFriend: '',
      friends: [],
      friendPH: 'Username',
    };

    this.friendNameWasChanged = this.friendNameWasChanged.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
  }

  componentWillMount() {
    this.props.getUserObject();
  }

  componentWillReceiveProps(props) {
    console.log('RECEIVED USER', props.user);
    this.setState({
      username: props.user.username,
      friends: props.user.friends,
    });
    if (props.user) {
      for (let i = 0; i < props.user.friends.length; i++) {
        console.log('friend!', props.user.friends[i]);
      }
    }
    console.log('CURRENT STAE', this.state);
  }

  addFriend() {
    if (this.state.newFriend !== '') {
      const newArray = this.state.friends.slice();
      newArray.push({ name: this.state.newFriend, score: 0 });
      this.setState({ friends: newArray });
      this.props.addFriendToUser({ friends: newArray });
      this.setState({
        newFriend: '',
        friendPH: 'Friend added!',
      });
    }
  }

  removeFriend(name) {
    console.log(`arg is ${name}`);
    const newArray = [];
    for (let i = 0; i < this.state.friends.length; i++) {
      console.log(`found friend ${this.state.friends[i].name}`);
      if (this.state.friends[i].name !== name) {
        console.log('found');
        newArray.push(this.state.friends[i]);
      }
    }
    this.setState({
      friends: newArray,
    });
    this.props.addFriendToUser({ friends: newArray });
  }

  friendNameWasChanged(event) {
    if (this.state.newFriend === '') {
      this.setState({
        friendPH: 'Username',
        newFriend: event.target.value,
      });
    } else {
      this.setState({
        newFriend: event.target.value,
      });
    }
  }

  render() {
    let receivedFriends = 1;
    let friendsAll = this.state.friends.map((friend) => {
      console.log('mapping');
      receivedFriends = 0;
      return (
        <div key={friend._id} className="single-friend-full">
          <div id="sff-icon"><i className="material-icons">person</i></div>
          <p>{friend.name}</p>
          <p id="jfr"><i onClick={() => this.removeFriend(friend.name)} className="material-icons">delete_sweep</i></p>
        </div>
      );
    });
    if (receivedFriends === 0) {
      // did recieve friends
      return (
        <div className="Friends">
          <div id="show-snap-header">FRIENDS</div>
          <div className="friends-inner">
            <h1>Add New Friends</h1>
            <div>
              <input placeholder={this.state.friendPH} value={this.state.newFriend} onChange={this.friendNameWasChanged} />
            </div>
            <div id="friends-add" className="submit-in-friends">
              <div>
                <a onClick={this.addFriend}>ADD</a>
              </div>
            </div>
            <h1 id="bbt">Friends List</h1>
            <div id="FriendList">
              {friendsAll}
            </div>
          </div>
        </div>
      );
    } else {
      // did not reieve friends
      return (
        <div className="Friends">
          <div id="show-snap-header">FRIENDS</div>
          <div className="friends-inner">
            <h1>Add New Friends</h1>
            <div>
              <input placeholder={this.state.friendPH} value={this.state.newFriend} onChange={this.friendNameWasChanged} />
            </div>
            <div id="friends-add" className="submit-in-friends">
              <div>
                <a onClick={this.addFriend}>ADD</a>
              </div>
            </div>
            <h1 id="bbt">Friends List</h1>
            <div id="FriendList" className="tam">
              You currently have no friends :/
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


export default connect(mapStateToProps, { getUserObject, addFriendToUser })(Friends);
