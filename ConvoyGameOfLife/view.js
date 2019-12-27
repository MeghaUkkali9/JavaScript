/**
 * @file view.js
 * @fileOverview this file implements the view.
 *                In this file, paint() method is used to draw the board 
 *                and border around the board using canvas of set scale.
 * 
 * @author Megha Ukkali
 */
"use strict";
//---------------------------------------------------------------------------
/**
 * this functions returns the scale factor for the canvas (to allow it to be
 * resized). it maintains square cells (rather than rectangular).
 * @returns {number} scale factor.
 */
function getScale ( ) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    //we don't want to be more than 95% of max possible size.
    var maxWidth  = 0.95 * w;
    var maxHeight = 0.95 * h - 50;  //leave room at the bottom for buttons
    //calc scale factors (independently in both directions)
    var sc1 = maxWidth  / g.cols;
    var sc2 = maxHeight / g.rows;
    //maintain square cells
    var scale = sc1;
    if (sc2 < scale)    scale = sc2;
    //maintain minimum cell size
    if (scale < 4)      scale = 4;
    return scale;
}
//---------------------------------------------------------------------------
/**
* paint() method is used to draw the board and border around the board using canvas of set scale.
* In canvas, it prints the next generation number using fillText()method.
*/
function paint ( ) {

    var scale = getScale();
    //set the canvas size to exactly fit the board
    var canvas = document.getElementById( "can" );
    canvas.width  = g.cols * scale + 1;
    canvas.height = g.rows * scale + 1;

    var ctx = canvas.getContext( "2d" );
    ctx.fillStyle = "gray";
    ctx.fillRect( 0, 0, canvas.width, canvas.height );
    ctx.fillStyle = "yellow";
    console.log( g );
    for (var r = 0; r < g.rows; r++) {
        for (var c = 0; c < g.cols; c++) {
            if (g.board[r][c]) {
                ctx.fillRect( c*scale, r*scale, scale, scale );
            }
        }
    }
    
    //to show the generation number in the canvas.
    ctx.fillStyle = "black";
    ctx.font = "bold 20px Arial";
    var generation_number = "Generation# : " + g.generation;
    ctx.fillText(generation_number, 0, canvas.height);

    //to draw border (line) around board.
    canvas.style.border = "thick solid black";
  

}
//---------------------------------------------------------------------------

