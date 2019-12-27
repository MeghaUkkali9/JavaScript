/**
 * @file view.js
 * @fileOverview this file implements the view for tictac.
 * @author Megha Ukkali
 */
"use strict";

console.log("view.js loading");

//set button width, height, and font size according to window and 
//board (matrix) sizes

var w = window.innerWidth / (m.cols + 1);
var h = window.innerHeight / (m.rows + 1);
var size = w;

if (h < size) size = h;
document.write("<style id='cell'> button { "
    + "height:    " + size + "px; "
    + "width:     " + size + "px; "
    + "font-size: " + size / 2 + "px; "
    + "} </style> \n");

//output a table of buttons
document.write("<table> \n");
for (let r = 0; r < m.rows; r++) {
    document.write("<tr> \n");
    for (let c = 0; c < m.cols; c++) {
        document.write("<td><button type='button' onclick='doClick( this,"
            + r + "," + c + ");'> </button></td> ");
    }
    document.write("</tr> \n");
}
document.write("</table> \n");
