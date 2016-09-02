import React, { Component } from 'react';

class Friend extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      name: props.name,
      active: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.active === 0) {
      // user has chosen friends
      this.setState({
        active: 1,
      });
    } else {
      // user has un-chosen friends
      this.setState({
        active: 0,
      });
    }
  }

  render() {
    if (this.state.active === 0) {
      // not selected yet
      return (
        <div className="ns-checkname" id="ns-checkname-div-inactive" onClick={this.handleClick}>
          <i className="material-icons">check_box_outline_blank</i>
          {this.state.name}
        </div>
      );
    } else {
      // currently selected
      return (
        <div className="ns-checkname" id="ns-checkname-div-active" onClick={this.handleClick}>
          <i className="material-icons">check_box</i>
          {this.state.name}
        </div>
      );
    }
  }
}

export default Friend;
