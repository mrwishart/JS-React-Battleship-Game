import React, {Component} from 'react';

class GridSquare extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
    const squareId = event.target.value;
    this.props.clickHandler(squareId);
  }

  render(){

    let clickClass = "";
    if (this.props.clickValue === true){
      clickClass = "Hit";
    } else if (this.props.clickValue === false){
      clickClass = "Miss";
    }

      return (
        <button
        onClick={this.handleClick}
        value={this.props.squareId}
        className={clickClass}
        disabled={!this.props.isClickable}
        ></button>
      );
  }
}

export default GridSquare;
