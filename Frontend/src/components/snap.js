import React from 'react';
import { Link } from 'react-router';
const prettydate = require('pretty-date');

const Snap = (props) => {
  // id="home-snap-first"
  let date = prettydate.format(new Date(props.time));
  if (props.spec === 'first') {
    if (props.timer === 1) {
      return (
        <div className="home-snap-full" id="home-snap-first">
          <Link to={`snaps/${props.snapId}`}>
            <div id="snap-circle">
              <i className="material-icons" id="home-snap-icon-no-hover">mail</i>
              <i className="material-icons md-36" id="home-snap-icon-hover">drafts</i>
            </div>
          </Link>
          <div className="home-snap-link-div">
            <p id="hsflp">{date} </p>
            <p id="home-snap-p1">Received from {props.fromUser}</p>
            <p>Duration {props.timer} second</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="home-snap-full" id="home-snap-first">
          <Link to={`snaps/${props.snapId}`}>
            <div id="snap-circle">
              <i className="material-icons" id="home-snap-icon-no-hover">mail</i>
              <i className="material-icons md-36" id="home-snap-icon-hover">drafts</i>
            </div>
          </Link>
          <div className="home-snap-link-div">
            <p id="hsflp">{date} </p>
            <p id="home-snap-p1">Received from {props.fromUser}</p>
            <p>Duration {props.timer} seconds</p>
          </div>
        </div>
      );
    }
  } else {
    if (props.timer === 1) {
      return (
        <div className="home-snap-full">
          <Link to={`snaps/${props.snapId}`}>
            <div id="snap-circle">
              <i className="material-icons" id="home-snap-icon-no-hover">mail</i>
              <i className="material-icons md-36" id="home-snap-icon-hover">drafts</i>
            </div>
          </Link>
          <div className="home-snap-link-div">
            <p id="hsflp">{date} </p>
            <p id="home-snap-p1">Received from {props.fromUser}</p>
            <p>Duration {props.timer} second</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="home-snap-full">
          <Link to={`snaps/${props.snapId}`}>
            <div id="snap-circle">
              <i className="material-icons" id="home-snap-icon-no-hover">mail</i>
              <i className="material-icons md-36" id="home-snap-icon-hover">drafts</i>
            </div>
          </Link>
          <div className="home-snap-link-div">
            <p id="hsflp">{date} </p>
            <p id="home-snap-p1">Received from {props.fromUser}</p>
            <p>Duration {props.timer} seconds</p>
          </div>
        </div>
      );
    }
  }
};

export default Snap;
