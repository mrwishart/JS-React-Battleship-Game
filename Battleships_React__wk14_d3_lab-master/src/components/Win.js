import React, {Component} from 'react';

class Win extends Component {
  render(){
    if (this.props.gameWon) {
      return <h1>A winner is you!</h1>;
    }
    else {
      return null;
    }
  }
}

export default Win;
