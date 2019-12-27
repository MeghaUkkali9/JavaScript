/**
 * @file model.js
 * @fileOverview Conway's Game of Life :this file implements the model.
 *                In this file, Board is initialized starting configuration.
 *                Board can be reset to initial board pattern.
 *                Board content will be displayed on the page.
 *                Next generation is genearated using following rules:
 *                1.Any live cell with fewer than two live neighbours dies, as if by underpopulation.
 *                2.Any live cell with two or three live neighbours lives on to the next generation.
 *                3.Any live cell with more than three live neighbours dies, as if by overpopulation.
 *                4.Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 *               
 * @author    Megha Ukkali
 */
"use strict";
/**
 * @class 
 */
class ConwaysGameOfLife {

    /** 
     * this method clears the board where it sets all the values to false.
     */
    clear() {

        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
                this.board[r][c] = false;
            }
        }

    }
    //-----------------------------------------------------------------------
    /**
     * this method creates a new instance of Conway's Game of Life.
     * @param {number} rows is the number of rows in the board.
     * @param {number} cols is the number of cols in the board.
     */
    constructor(rows, cols) {
        console.log("constructor called.");
        //class vars
        this.generation = 0;
        this.rows = rows;
        this.cols = cols;
        //allocate the board. (a 2d array is an array of arrays.)
        this.board = new Array();
        for (var r = 0; r < this.rows; r++) {
            this.board[r] = new Array();
        }

        this.clear();
    }
    //-----------------------------------------------------------------------
    /**
     * this function sets the initial (starting) board configration.
     * @param {string} which indicates the desired initial pattern.
     * When user presses random button, randomly generated canvas is displayed.
     * Math.floor is used to generate the board. 
     * When user presses reset button, board will be set back to initial.
     */
    initializeBoard(which) {
        console.log("initializeBoard called.");
        this.generation = 0;

        this.clear();

        switch (which) {
            case "random":
                for (var r = 0; r < this.rows; r++) {
                    for (var c = 0; c < this.cols; c++) {
                        this.board[r][c] = Math.floor(Math.random() * 2);
                    }
                }
                break;

            case "reset":

            default:
                for (var r = 0; r < this.rows; r++) {
                    for (var c = 0; c < r; c++) {
                        this.board[r][c] = true;
                    }
                }
                break;
        }
    }
    //-----------------------------------------------------------------------
    /**
     * this function gets the board value at the specified position. if the 
     * specifed position is out of bounds, false is returned.
     * @param {number} r is the row.
     * @param {number} c is the col.
     * @returns {boolean} true if alive; false if cell is not alive.
     */
    get(r, c) {
        if (r < 0) return false;
        if (r >= this.rows) return false;
        if (c < 0) return false;
        if (c >= this.cols) return false;
        return this.board[r][c];
    }
    //.......................................................................
    /**
     * this function replaces the current generation with the next generation.
     */
    nextGeneration() {

        ++this.generation;

        console.log("creating next generation " + this.generation + ".");

        //create space for the next generation
        var next = new Array();
        for (var r = 0; r < this.rows; r++) {
            next[r] = new Array();
        }

        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
                var cell_status = this.get(r, c);
                var live_cells = 0;

                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        let row = (r + i + this.rows) % this.rows;
                        let col = (c + j + this.cols) % this.cols;
                        live_cells = live_cells + this.get(row, col);
                    }
                }

                live_cells = live_cells - this.get(r, c);

                if (cell_status == true && live_cells < 2) {
                    cell_status = false;
                    next[r][c] = cell_status;
                } else if (cell_status == true && live_cells > 3) {
                    cell_status = false;
                    next[r][c] = cell_status;
                } else if (cell_status == false && live_cells == 3) {
                    cell_status = true;
                    next[r][c] = cell_status;
                } else {
                    next[r][c] = cell_status;
                }
            }
        }
        //replace old generation with new one
        this.board = next;
    }


    //-----------------------------------------------------------------------
    /**
     * this function returns a string that represents this object instance.
     * Board's contents are added to s.
     * if cell has false value then - will be added to s.
     * if cell has true value then * will be added to s.
     */
    toString() {
        var s = "";
        s += "gen  = " + this.generation + ", ";
        s += "rows = " + this.rows + ", ";
        s += "cols = " + this.cols + "\n";

        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {

                if (this.get(r, c) == false)
                    s += "" + "-";
                else {
                    s += "" + "*";
                }
            }
            s += "\n";
        }
        return s;
    }

}

