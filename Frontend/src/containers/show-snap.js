import React, { Component } from 'react';
import { getSnap, deleteSnap } from '../actions/index';
import { connect } from 'react-redux';
import Timer from 'react.timer';
import jQuery from 'jquery';
import { browserHistory } from 'react-router';


class ShowSnap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sentFrom: '',
      sentTo: '',
      src: null,
      timer: 5,
      caption: '',
      timeout: null,
      deleted: 0,
    };
  }


  componentWillMount() {
    this.props.getSnap(this.props.params.id);
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.props.deleteSnap(this.props.params.id);
  //   }, 10000);
  // }

  componentWillReceiveProps(props) {
    console.log('\n\nSNAP PROPS', props.snap);
    if (props.snap) {
      this.setState({
        sentFrom: props.snap.sentFrom,
        sentTo: props.snap.sentTo,
        timer: props.snap.timer,
        caption: props.snap.caption,
      });
      jQuery.get(props.snap.pictureURL, (data) => {
        // console.log('THIS IS THE DATA', data);
        this.setState({
          src: data,
        });
        const snapTimeout = setTimeout(() => {
          this.props.deleteSnap(this.props.params.id, { snap: this.props.snap });
          this.setState({
            deleted: 1,
          });
          browserHistory.push('/snaps');
        }, this.state.timer * 1000);
        this.setState({
          timeout: snapTimeout,
        });
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
    if (this.state.deleted !== 1) {
      this.props.deleteSnap(this.props.params.id, { snap: this.props.snap });
    } else {
      this.props.deleteSnap(this.props.params.id, { snap: this.props.snap });
    }
  }

  render() {
    if (this.state.src) {
      if (this.state.caption !== '') {
        return (
          <div id="show-snap-full">
            <div id="show-snap-tops">
              <div id="show-snap-header2">NEW SNAP FROM {this.state.sentFrom}</div>
              <div id="timer-div">
                <i className="material-icons">timer</i><Timer countDown startTime={this.state.timer} />
              </div>
            </div>
            <div className="show-snap-outer">
              <div id="show-snap-box">
                <img role="presentation" src={this.state.src} />
              </div>
              <div id="show-snap-caption">
                {this.state.caption}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div id="show-snap-full">
            <div id="show-snap-tops">
              <div id="show-snap-header2">NEW SNAP FROM {this.state.sentFrom}</div>
              <div id="timer-div">
                <i className="material-icons">timer</i><Timer countDown startTime={this.state.timer} />
              </div>
            </div>
            <div className="show-snap-outer">
              <div id="show-snap-box">
                <img role="presentation" src={this.state.src} />
              </div>
              <div id="no-caption">
              </div>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div id="show-snap-full">
          <div id="show-snap-header2">NEW SNAP FROM {this.state.sentFrom}</div>
          <div id="show-snap-box">
            <h2> LOADING... </h2>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  snap: state.snaps.snap,
});

export default connect(mapStateToProps, { getSnap, deleteSnap })(ShowSnap);
