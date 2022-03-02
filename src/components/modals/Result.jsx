import React from 'react'

import '../../styles/modals/Result.css';
import '../../styles/Common.css';

export default function Result({ game, displayHome }) {
    return (
        <div className="result-box center">
            <div className="won-text">
                {game.result}
            </div>
            <div className="btn" onClick={() => displayHome()}>
                <button>
                    Restart
                </button>
            </div>
        </div>
    )
}
