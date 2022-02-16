export function checkRows(playerSign) {
   var isWinner = false;
   var cont;
   
   allBox.forEach((box, i) => {
       if (i % sizeBoard === 0)
           cont = 0;

       if (playerSign === box.id)
           cont++;

       if (cont === sizeBoard)
           isWinner = true;
   });
   return isWinner;
}

export function checkColumns(playerSign) {
   var cont;

   for (let i = 0; i < sizeBoard; i++) {
       cont = 0;
       for (let j = 0; j < sizeBoard; j++) {
           if (allBox[i + j * sizeBoard].id === playerSign)
               cont++;
       }
       if (cont === sizeBoard)
           return true;
   }
   return false;
}

export function checkDiagonals(playerSign) {
   var cont = 0;

   for (let i = 0; i < sizeBoard; i++) {
       if (allBox[(sizeBoard + 1) * i].id === playerSign)
           cont++;
   }

   if (cont === sizeBoard)
       return true;

   cont = 0;

   for (let i = 0; i < sizeBoard; i++) {
       if (allBox[(sizeBoard - 1) * (i + 1)].id === playerSign)
           cont++;
   }

   if (cont === sizeBoard)
       return true;

   return false;
}

export function checkWinner(playerSign) {
   return (checkRows(playerSign) ||
       checkColumns(playerSign) ||
       checkDiagonals(playerSign));
}

export function checkTie() {
   var isTie = false;
   var cont = 0;
   
   allBox.forEach((box, i) => {
       if (box.id === xSign || box.id === oSign)
           cont++;

       if (cont === allBox.length)
           isTie = true;
   });
   return isTie;
}