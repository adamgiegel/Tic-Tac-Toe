import React from 'react';
import ReactDOM from 'react-dom'

//these combinations in the grid will be winners
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default class Board extends React.Component {

  state = {
    grid: Array(9),
    whosNext: true,
    winner: ''
  };

  calculateWinner(grid) {
    for (let i = 0; i < winCombos.length; i++) {
      //save each array in winCombos as [a,b,c]
      const [a, b, c] = winCombos[i];
      //if there is a value at grid[a](not null), and the value equals the value at grid[b], and the value also
      //equals the value at grid[c] then return the winner, which will be grid[a]
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a];
      }
    }
    return null;
  }

  makeGrid(i) {
    return ( <
      button className = "square"
      onClick = {
        () => this.handleClick(i)
      } >
      {
        this.state.grid[i]
      } <
      /button>
    );
  }

  handleClick(i) {
    //make a new array so the original isnt mutated
    const grid = [...this.state.grid];
    //if the value at this.state.whosNext is true, then grid[i] === "X", otherwise it equals "O"
    grid[i] = this.state.whosNext ? 'X' : 'O';
    //set the state for the next click
    this.setState({
      grid: grid,
      whosNext: !this.state.whosNext,
    });
  }

  reset() {
    //reset the state
    this.setState({
      grid: Array(9),
      whosNext: true,
    })
  }

  render() {
    //save the winner in a variable
    const winner = this.calculateWinner(this.state.grid);

    let status;
    //if winner is true, status = the winner
    if (winner) {
      status = 'Winner: ' + winner;
      //else the next player is the value at this.state.whosNext
    } else {
      status = 'Next player: ' + (this.state.whosNext ? 'X' : 'O');
    }

      return (
        <div>
          <div className="status">{status}</div>
            <div className="center">
              <div className="grid">
                {this.makeGrid(0)}
                {this.makeGrid(1)}
                {this.makeGrid(2)}
              </div>
              <div className="grid">
                {this.makeGrid(3)}
                {this.makeGrid(4)}
                {this.makeGrid(5)}
              </div>
              <div className="grid">
                {this.makeGrid(6)}
                {this.makeGrid(7)}
                {this.makeGrid(8)}
              </div>
              <button className="button" onClick={() => this.reset()}>START OVER</button>
            </div>
          </div>
      );
  }
}
