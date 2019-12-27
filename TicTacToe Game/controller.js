/**
 * @file controller.js
 * @fileOverview this file implements the controller for tictac.
 * @author Megha Ukkali
 */
"use strict";

console.log("controller.js loading");

/** @todo test code for different board sizes, shapes, and number required for a winner. */
var m = new Model(3, 3);

/**
 * this function responds to button clicks.
 * @param {Object} b is the specific button
 * @param {number} r is the button's row
 * @param {number} c is the button's col
 */
function doClick(b, r, c) {

    console.log("doClick( b=" + b + ", r=" + r + ", c=" + c);
    console.log("board=" + m.toString());

    if (m.gameOver) return;  

    if (m.turn == Model.X) {
        b.innerText = "X";
        m.board[r][c] = Model.X;
        if (m.isWinner(Model.X)) m.xWon = m.gameOver = true;
        m.turn = Model.O;
    } else {
        b.innerText = "O";
        m.board[r][c] = Model.O;
        if (m.isWinner(Model.O)) m.oWon = m.gameOver = true;
        m.turn = Model.X;
    }

    b.onclick = null;
    if (m.isBoardFull()) m.gameOver = true;

    if (m.gameOver) {
        if (m.xWon) alert("Game over. \n\nX won!");
        else if (m.oWon) alert("Game over. \n\nO won!");
        else alert("Game over. \n\nDraw!")
    }
}