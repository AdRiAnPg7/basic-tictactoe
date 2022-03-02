export function checkRows(playerSign, allBoxes, game) {
    var isWinner = false;
    var cont;

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

export function checkColumns(playerSign, allBoxes, game) {
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

export function checkDiagonals(playerSign, allBoxes, game) {
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

export function checkWinner(playerSign, allBoxes, game) {
    return (checkRows(playerSign, allBoxes, game) ||
        checkColumns(playerSign, allBoxes, game) ||
        checkDiagonals(playerSign, allBoxes, game));
}