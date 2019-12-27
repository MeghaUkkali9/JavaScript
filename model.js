/**
 * @file model.js
 * @fileOverview this file implements the model in M-V-C for tictac.
 * @author Megha Ukkali
 */
"use strict";

console.log("model.js loading");

class Model {


    /**
     * this memthod creates a new instance of the tictac model.
     * @param {number} rows is the number of rows in the board
     * @param {number} cols is the number of cols in the board
     * @param {number} howMany is the number in a row (or column or diagonal) for a winner
     */
    constructor(rows = 3, cols = 3, howMany = 3) {
        this.rows = rows;     	 //rows in board
        this.cols = cols;     	 //cols in board
        this.howMany = howMany;  //how many in a sequence for a winner
        this.turn = Model.X;  	 //X goes first
        this.xWon = this.oWon = this.gameOver = false;

        this.board = new Array(this.rows);
        for (var i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(cols);
        }
        //allocate the remainder of the board (a 2d array is an array of
        // arrays) and init every position to None.

        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
                this.board[r][c] = null;
            }
        }
    }

    /**
     * this function returns a string that represents/looks like the board.
     * normally, it should not print anything.
     * @returns {string} a string that represents the board.
     */
    toString() {
        var displayBoard = "";
        displayBoard = "\n";
        for (var i = 0; i <= this.rows - 1; i++) {
            for (var j = 0; j <= this.cols - 1; j++) {
                var boardValue = "  ";
                if (this.board[i][j] == 2) {
                    boardValue = "X ";
                }
                if (this.board[i][j] == 3) {
                    boardValue = "O ";
                }
                displayBoard += this.board[i][j] == "" ? "  " : boardValue;
                if (j < this.cols - 1) {
                    displayBoard += "|";
                }
                if (j == this.cols - 1) {
                    displayBoard += '\n';
                }
            }
            if (i < this.rows - 1) {
                for (var line = 0; line <= this.cols - 1; line++) {
                    if (line < this.cols - 1) {
                        displayBoard += "--|";
                    }
                    if (line == this.cols - 1) {
                        displayBoard += "--\n";
                    }
                }
            }
        }
        return displayBoard;
    }

    /**
     * check for a horizontal winner (-)
     * @param {number} r is the row of the start of the winner to check
     * @param {number} c is the col of the start of the winner to check
     * @param {either Model.X or Model.o only} p specifies the winner type
     * @returns true if there is a winner at (r,c); false otherwise
     */

    checkHorizontal(r, c, p) {
        var result = [];
        var count = 0;
        for (var c = 0; c < this.cols; c++) {
            if (this.board[r][c] == p) {
                result[c] = true;
            } else {
                result[c] = false;
            }
        }
        for (var i = 0; i < this.cols; i++) {
            if (result[i] === true) {
                count++;
            } else if (count == this.howMany) {
                return true;
            } else {
                count = 0;
            }
        }
        if (count >= this.howMany) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * check for a vertical winner (|)
     * @param {number} r is the row of the start of the winner to check
     * @param {number} c is the col of the start of the winner to check
     * @param {either Model.X or Model.o only} p specifies the winner type
     * @returns true if there is a winner at (r,c); false otherwise
     */
    checkVertical(r, c, p) {
        var result = [];
        var count = 0;
        for (var r = 0; r < this.rows; r++) {
            if (this.board[r][c] == p) {
                result[r] = true;
            } else {
                result[r] = false;
            }
        }
        for (var i = 0; i < this.rows; i++) {
            if (result[i] === true) {
                count++;
            } else if (count == this.howMany) {
                return true;
            } else {
                count = 0;
            }
        }
        if (count >= this.howMany) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * check for a backslash winner (\)
     * @param {number} r is the row of the start of the winner to check
     * @param {number} c is the col of the start of the winner to check
     * @param {either Model.X or Model.o only} p specifies the winner type
     * @returns true if there is a winner at (r,c); false otherwise
     */
    checkBackslash(r, c, p) {
        var result = [];
        var count = 0;
        for (var i = r, j = c; i < this.rows; i++ , j++) {

            if (this.board[i][j] == p) {
                result[i] = true;

            }
        }
        for (var i = 0; i < this.rows; i++) {
            if (result[i] === true) {
                count++;
            } else if (count == this.howMany) {
                return true;
            } else {
                count = 0;
            }
        }
        if (count >= this.howMany) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * check for a forward slash winner (/)
     * @param {number} r is the row of the start of the winner to check
     * @param {number} c is the col of the start of the winner to check
     * @param {either Model.X or Model.o only} p specifies the winner type
     * @returns true if there is a winner at (r,c); false otherwise
     */
    checkForeslash(r, c, p) {

        var result = [];
        var count = 0;

        for (var i = r, j = c; i < this.rows; i++ , j--) {
            if (this.board[i][j] == p) {          //(0,2);(1,1);(2,0);
                result[i] = true;
            }
        }

        for (var i = 0; i < this.rows; i++) {
            if (result[i] === true) {
                count++;
            } else if (count == this.howMany) {
                return true;
            } else {
                count = 0;
            }
        }

        if (count >= this.howMany) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * this function determines if there is a winner for either X or O.
     * @param {either Model.X or Model.o only} p specifies the winner type
     * @returns true if there is a winner for p anywhere; false otherwise.
     */
    isWinner(p) {

        if (p != Model.X && p != Model.O) return false;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c] == p) {
                    if (this.checkHorizontal(r, c, p)) return true;
                    if (this.checkVertical(r, c, p)) return true;
                    if (this.checkBackslash(r, c, p)) return true;
                    if (this.checkForeslash(r, c, p)) return true;
                }
            }
        }

        return false;
    }

    /**
     * this function determines if the board is full
     * @returns true if the board is full; false otherwise.
     */
    isBoardFull() {

        var count = 0;
        var result = new Array(this.rows);

        for (var i = 0; i < this.board.length; i++) {
            result[i] = new Array(this.cols);
        }

        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                if (this.board[i][j] != null) {
                    result[i][j] = true;
                } else {
                    result[i][j] = false;
                }
            }
        }

        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                if (result[i][j] === true) {
                    count++;
                }
            }
        }

        if (count == (this.rows * this.cols)) {
            return true;

        } else {
            return false;
        }
    }

}

Model.None = 1;
Model.X = 2;
Model.O = 3;

