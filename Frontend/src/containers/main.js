

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSnaps } from '../actions';
import Snap from '../components/snap.js';
// import { Link } from 'react-router';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeout: null,
    };
  }

  //  get snaps every 4.5 secs
  componentWillMount() {
    console.log('GETTING SNAPS');
    this.props.getSnaps();

    // Source: http://www.w3schools.com/jsref/met_win_setinterval.asp
    const refreshInterval = setInterval(() => {
      console.log('GETTING SNAPS');
      this.props.getSnaps();
    }, 4500);
    this.setState({
      timeout: refreshInterval,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  render() {
    let receivedSnaps = 1;
    let count = 0;
    let snaps = this.props.snaps.map((snap) => {
      receivedSnaps = 0;
      if (count === 0) {
        count = 1;
        return (
          <Snap timer={snap.timer} fromUser={snap.sentFrom} snapId={snap.id} key={snap.id} spec={'first'} time={snap.time} />
        );
      } else {
        return (
          <Snap timer={snap.timer} fromUser={snap.sentFrom} snapId={snap.id} key={snap.id} spec={'not-first'} time={snap.time} />
        );
      }
    });
    if (receivedSnaps === 0) {
      // recieved snaps
      return (
        <div>
          <h1 id="recv-snaps-title">NEW SNAPS</h1>
          <div id="recv-snaps">
            {snaps}
          </div>
          <div id="recv-snaps-end"></div>
        </div>
      );
    } else {
      // did not recieve any snaps
      return (
        <div>
          <h1 id="recv-snaps-title">NO NEW SNAPS</h1>
          <div className="main-page-div">
            <img role="presentation" src="../../images/snapapp-logo.png" />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    snaps: state.snaps.all,
  };
}

export default connect(mapStateToProps, { getSnaps })(Main);
