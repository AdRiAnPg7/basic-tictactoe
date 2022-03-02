import React from 'react'

import { SizeOptions } from './utils/SizeOptions';

import '../../styles/modals/Select.css';
import '../../styles/Common.css';

export default function Select({ game, setGame, displayGame }) {

  function selectSize(event) {
    let newSize = event.target.value;
    setGame({
      ...game,
      size: newSize,
      cells: generateCells(newSize)
    });
  }

  function generateCells(size) {
    let cells = [];
    for (var i = 0; i < size; i++) {
      cells.push(i);
    }
    return cells;
  }

  function goToGame(player){
    setGame({
      ...game, 
      player: player
    });
    displayGame();
  }

  return (
    <div className="select-box center">
      <header>Tic Tac Toe</header>
      <div className="content">
        <div className="title">Select which you want to be?</div>

        <select className="list-boards" onChange={selectSize} value={game.size}>
          {SizeOptions.map((option) => (
            <option key={option.key} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>

        <div className="options">
          <button className="playerX" onClick={() => goToGame('X')}>
            Player (X)
          </button>
          <button className="playerO" onClick={() => goToGame('O')}>
            Player (O)
          </button>
        </div>

      </div>
    </div>
  )
}
