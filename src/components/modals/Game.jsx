import React, { useEffect, useState } from 'react'

import '../../styles/modals/Game.css';
import '../../styles/Common.css';

import { checkWinner, checkTie } from './utils/validator';

export default function Game({ game, setGame, displayResult }) {

    const [allBoxes, setAllBoxes] = useState([]);
    const [runBot, setRunBot] = useState(true);

    useEffect(() => {
        var checkboxes = document.querySelectorAll('section span');
        setAllBoxes(checkboxes);
    }, [])

    function setIconToBox(element, icon) {
        element.textContent = icon;
        element.setAttribute("id", icon);
    }

    function clickedBox(element) {
        console.log(element.target);
        console.log(element.target.className);

        setIconToBox(element.target, game.player);
        selectWinner();

        let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
        setTimeout(() => {
            bot(runBot);
        }, randomTimeDelay);
    }

    function bot() {
        let freePositions = [];

        if (runBot) {
            getFreePositions(freePositions);
            let randomBox = freePositions[Math.floor(Math.random() * freePositions.length)];

            if (freePositions.length > 0) {
                if (game.player === 'X') {
                    setIconToBox(allBoxes[randomBox], game.oSign);
                } else {
                    setIconToBox(allBoxes[randomBox], game.xSign);
                }
                selectWinner();
            }
        }
    }

    function getFreePositions(freePositions) {
        for (let i = 0; i < allBoxes.length; i++) {
            if (allBoxes[i].id !== null) {
                freePositions.push(i);
            }
        }
        console.log(freePositions)
    }

    function generateKey(row, column) {
        return 'box' + row + column;
    }

    function checkRows(playerSign) {
        var isWinner = false;
        var cont;

        console.log(allBoxes)
        allBoxes.forEach((box, i) => {
            if (i % game.size === 0)
                cont = 0;

            if (playerSign === box.id)
                cont++;

            if (cont === game.size)
                isWinner = true;
        });

        return isWinner;
    }

    function checkColumns(playerSign) {
        var cont;

        for (let i = 0; i < game.size; i++) {
            cont = 0;
            for (let j = 0; j < game.size; j++) {
                if (allBoxes[i + j * game.size].id === playerSign)
                    cont++;
            }
            if (cont === game.size)
                return true;
        }
        return false;
    }

    function checkDiagonals(playerSign) {
        var cont = 0;

        for (let i = 0; i < game.size; i++) {
            if (allBoxes[(game.size + 1) * i].id === playerSign)
                cont++;
        }

        if (cont === game.size)
            return true;

        cont = 0;

        for (let i = 0; i < game.size; i++) {
            if (allBoxes[(game.size - 1) * (i + 1)].id === playerSign)
                cont++;
        }

        if (cont === game.size)
            return true;

        return false;
    }

    function checkWinner(playerSign) {
        return (checkRows(playerSign) ||
            checkColumns(playerSign) ||
            checkDiagonals(playerSign));
    }

    function checkTie() {
        var isTie = false;
        var cont = 0;

        allBoxes.forEach((box, i) => {
            if (box.id === game.xSign || box.id === game.oSign)
                cont++;

            if (cont === allBoxes.length)
                isTie = true;
        });
        return isTie;
    }

    function selectWinner() {
        if (checkWinner(game.player)) {
            setRunBot(false);
            setTimeout(() => {
                displayResult();
            }, 1000);
            setGame({
                ...game,
                result: `Player ${game.player} won the game!`
            });

        } else {
            if (checkTie()) {
                setRunBot(false);
                setTimeout(() => {
                    displayResult();
                }, 1000);
                setGame({
                    ...game,
                    result: "Game ends in a draw!"
                });
            }
        }
    }

    return (
        <div className="play-board center">
            <div className="details">
                <div className="players">
                    <span className="Xturn" onClick={() => displayResult()}>
                        X's Turn
                    </span>
                    <span className="Oturn" onClick={() => displayResult()}>
                        O's Turn
                    </span>
                    <div className="slider"></div>
                </div>
            </div>

            <div className="play-area">
                {
                    game.cells.map((row, i) => (
                        <section key={i}>
                            {
                                game.cells.map((column, j) => (
                                    <span
                                        className={generateKey(row, column)}
                                        key={generateKey(row, column)}
                                        onClick={(event) => clickedBox(event)}
                                    ></span>
                                ))
                            }
                        </section>
                    ))
                }
            </div>
        </div>
    )
}
