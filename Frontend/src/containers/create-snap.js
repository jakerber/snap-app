import React, { Component } from 'react';
import { createSnap, getUserObject, checkUserExists } from '../actions/index.js';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Webcam from 'react-webcam';
import { browserHistory } from 'react-router';
import Range from 'react-range';
import Friend from '../components/friend.js';
import update from 'immutability-helper';

/* adapted from https://www.npmjs.com/package/webcam-capture */
/* webcam!! */

class CreateSnap extends Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      caption: '',
      files: [],
      usingWebcam: 0,
      snapReady: 0,
      pic: '',
      timerVal: 5,
      friends: [],
      sentToTextField: '',
      sentTo: [],
      propsRecv: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.resetPage = this.resetPage.bind(this);
    this.snapshot = this.snapshot.bind(this);
    this.choseWebcam = this.choseWebcam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imageCaptionWasSet = this.imageCaptionWasSet.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.retakePic = this.retakePic.bind(this);
    this.test = this.test.bind(this);
    this.callback = this.callback.bind(this);
    this.snapSentToSet = this.snapSentToSet.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.checkSentTo = this.checkSentTo.bind(this);
  }

  componentWillMount() {
    this.props.getUserObject();
  }

  componentWillReceiveProps(props) {
    console.log('RECEIVED USER', props.user);
    this.setState({
      friends: props.user.friends,
      propsRecv: 1,
    });
  }

  onSubmit() {
    let pictureURL;
    if (!this.state.caption) {
      pictureURL = 'No Image';
    } else {
      pictureURL = this.state.caption;
    }
    const sentFrom = this.props.user.username;
    const caption = this.state.caption;
    const timer = this.state.timerVal;
    for (let i = 0; i < this.state.sentTo.length; i++) {
      const sentTo = this.state.sentTo[i];
      this.props.createSnap({ caption, timer, pictureURL, sentFrom, sentTo, file: this.state.pic });
      console.log(`SNAP SENT TO ${sentTo}`);
    }
    if (this.state.sentToTextField !== '') {
      const sentTo = this.state.sentToTextField;
      this.props.createSnap({ caption, timer, pictureURL, sentFrom, sentTo, file: this.state.pic });
      console.log(`SNAP SENT TO ${sentTo}`);
    }
    browserHistory.push('/snaps');
  }

  test(data) {//  eslint-disable-line
    this.setState({
      pic: data,
    });
  }

  callback(data) {
    console.log('storing all the data');

    this.setState({
      pic: data.target.result,
    });
  }

  onDrop(files) {
    const reader = new FileReader();

    // calls callback on response
    reader.onload = this.callback;


    reader.onerror = function asdf(stuff) {
      console.log('error', stuff);
      console.log(stuff.getMessage());
    };

    // get image data
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

  onOpenClick() {
    this.refs.dropzone.open();
  }

  handleClick(name) {
    let foundName = 0;
    for (let i = 0; i < this.state.sentTo.length; i++) {
      if (this.state.sentTo[i] === name) {
        // update array and remove index i
        this.setState({
          sentTo: update(this.state.sentTo, { $splice: [[i, 1]] }),
        });
        foundName = 1;
        break;
      }
    }
    if (foundName === 0) {
      // new person to send
      const friendArray = this.state.sentTo;
      friendArray.push(name);
      this.setState({
        sentTo: friendArray,
      });
    }
  }

  handleOnChange(event) {
    this.setState({
      timerVal: event.target.value,
    });
  }

  retakePic() {
    this.setState({
      snapReady: 0,
      usingWebcam: 1,
    });
  }

  choseWebcam() {
    // adapted from http://stackoverflow.com/questions/5899783/detect-safari-using-jquery
    // identify browser
    let isChrome = navigator.userAgent.indexOf('Chrome') > -1;
    let isSafari = navigator.userAgent.indexOf('Safari') > -1;
    const isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1;
    if ((isChrome) && (isSafari)) { isSafari = false; }
    if ((isChrome) && (isOpera)) { isChrome = false; }
    if (isSafari) {
      window.alert('SnapApp does not yet support webcam capture in Safari. We apologize for this inconvenience.');
    } else {
      this.setState({
        usingWebcam: 1,
      });
    }
  }

  snapshot() {
    const newPic = this.refs.webcam.getScreenshot();
    this.setState({
      usingWebcam: 1,
      snapReady: 1,
      pic: newPic,
    });
  }

  imageCaptionWasSet(event) {
    this.setState({
      caption: event.target.value,
    });
  }

  snapSentToSet(event) {
    this.setState({
      sentToTextField: event.target.value,
    });
  }

  resetPage() {
    this.setState({
      caption: '',
      files: [],
      usingWebcam: 0,
      snapReady: 0,
    });
  }

  checkSentTo() {
    this.props.checkUserExists({ sentTo: this.state.sentToTextField });
  }

  render() {
    let friendsAdded = 0;
    let friendsAll = this.state.friends.map((friend) => {
      friendsAdded = 1;
      if (friend.name != null) {
        return (
          <div id="friend-holder" onClick={() => this.handleClick(friend.name)}>
            <Friend name={friend.name} score={friend.score} />
          </div>
        );
      } else {
        return null;
      }
    });
    if (this.state.propsRecv === 1 && friendsAdded === 0) {
      return (
        <div className="NewSnap">
          <div id="ns-header">SEND A SNAP</div>
          <div className="cts">You currently have no friends :/</div>
          <div className="cts">Friends are required to send snaps. Add some using the friends tab!</div>
        </div>
      );
    } else if (this.state.snapReady === 0) {
      // snap not ready to send
      if (this.state.usingWebcam === 1) {
        // using webcam
        return (
          <div className="NewSnap">
            <div id="ns-header">SEND A SNAP</div>
            <div onClick={this.resetPage} id="ns-reset-div">
              <i className="material-icons">replay</i>
              <p>RESET</p>
            </div>
            <h4>PRESS PHOTO TO CAPTURE</h4>
            <div className="pic-to-send-webcam" onClick={this.snapshot}>
              <Webcam audio={false} ref="webcam" />
            </div>
          </div>
        );
      } else {
        // not using webcam
        return (
          <div className="NewSnap">
            <div id="ns-header">SEND A SNAP</div>
            <div className="ns-options">
              <div className="ns-icons">
                <div id="ns-snapshot">
                  <i id="snapshot-icon" onClick={this.choseWebcam} className="material-icons">add_a_photo</i>
                </div>

                <div id="ns-Dropzone">
                  <Dropzone ref="dropzone" style="border: none" onDrop={this.onDrop} multiple={false}>
                    <i id="drop-zone-icon" className="material-icons">cloud_upload</i>
                  </Dropzone>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      // snap ready to send
      if (this.state.usingWebcam === 1) {
        // using webcam
        return (
          <div className="NewSnap">
            <div id="ns-header">SEND A SNAP</div>
            <div onClick={this.resetPage} id="ns-reset-div">
              <i className="material-icons">replay</i>
              <p>RESET</p>
            </div>

            <div className="form">
              <div className="ssf-inner">
                <h4>PRESS PHOTO TO RETAKE</h4>
                <div className="pic-to-send" onClick={this.retakePic}>
                  {this.state.pic ? <img alt="null" src={this.state.pic} /> : null}
                </div>
                <div>
                  <input className="ssf-inner-input" placeholder="Caption *optional" value={this.state.caption} onChange={this.imageCaptionWasSet} />
                </div>
                <div>
                  <Range className="ssf-inner-input" max={10} min={1} value={this.state.timerVal} onChange={this.handleOnChange} />
                </div>
                <div>
                  <i className="material-icons">timer</i>{this.state.timerVal}
                </div>
                <div id="bbp">SELECT FRIENDS</div>
                {friendsAll}
                <div id="splash-signup" className="submit-in-ssf">
                  <div>
                    <a onClick={this.onSubmit}>SEND</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // using upload
        return (
          <div className="NewSnap">
            <div id="ns-header">SEND A SNAP</div>
            <div onClick={this.resetPage} id="ns-reset-div">
              <i className="material-icons">replay</i>
              <p>RESET</p>
            </div>

            <div className="form">
              <div className="ssf-inner">
                <div className="pic-to-send">
                  {this.state.pic ? <img alt="null" src={this.state.pic} /> : null}
                </div>
                <div>
                  <input className="ssf-inner-input" placeholder="Caption *optional" value={this.state.caption} onChange={this.imageCaptionWasSet} />
                </div>
                <div>
                  <Range className="ssf-inner-input" max={10} min={1} value={this.state.timerVal} onChange={this.handleOnChange} />
                </div>
                <div>
                  <i className="material-icons">timer</i>{this.state.timerVal}
                </div>
                <div id="bbp">SELECT FRIENDS</div>
                {friendsAll}
                <div id="splash-signup" className="submit-in-ssf">
                  <div>
                    <a onClick={this.onSubmit}>SEND</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}


export default connect(mapStateToProps, { createSnap, getUserObject, checkUserExists })(CreateSnap);
