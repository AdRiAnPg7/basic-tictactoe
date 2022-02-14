export function getIdVal(classname) {
   return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
   return (getIdVal(val1) == sign &&
       getIdVal(val2) == sign &&
       getIdVal(val3) == sign);
}

export function checkWinner(playerSign) {
   return (checkIdSign(1, 2, 3, playerSign) ||
       checkIdSign(4, 5, 6, playerSign) ||
       checkIdSign(7, 8, 9, playerSign) ||
       checkIdSign(1, 4, 7, playerSign) ||
       checkIdSign(2, 5, 8, playerSign) ||
       checkIdSign(3, 6, 9, playerSign) ||
       checkIdSign(1, 5, 9, playerSign) ||
       checkIdSign(3, 5, 7, playerSign));
}

export function checkTie() {
   return (getIdVal(1) != "" &&
       getIdVal(2) != "" &&
       getIdVal(3) != "" &&
       getIdVal(4) != "" &&
       getIdVal(5) != "" &&
       getIdVal(6) != "" &&
       getIdVal(7) != "" &&
       getIdVal(8) != "" &&
       getIdVal(9) != "");
}