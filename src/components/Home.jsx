import React, { useState } from 'react';

// Modals
import Select from './modals/Select';
import Result from './modals/Result';
import Game from './modals/Game';


export default function Home() {

  const [game, setGame] = useState({
    xSign: 'X',
    oSign: 'O',
    result: '',
    player:'',
    size: 2,
    cells:[1,2]
  });


  const [showResultModal, setShowResultModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(true);
  const [showGameModal, setShowGameModal] = useState(false);

  function displayGame() {
    setShowSelectModal(false);
    setShowGameModal(true);
  }

  function displayResult() {
    setShowGameModal(false);
    setShowResultModal(true);
  }

  function displayHome() {
    setShowResultModal(false);
    setShowSelectModal(true);
  }

  return (
    <>
      {showSelectModal ?
        <Select
          game={game}
          setGame={setGame}
          displayGame={displayGame}
        />
        : null
      }

      {showGameModal &&
        <Game
          game={game}
          setGame={setGame}
          displayResult={displayResult}
        />
      }

      {showResultModal &&
        <Result
          game={game}
          displayHome={displayHome}
        />
      }

    </>

  )
}
