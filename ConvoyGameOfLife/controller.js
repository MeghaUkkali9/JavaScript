/**
 * @file controller.js
 * @fileOverview this file implements the controller.
 * @author Megha Ukkali
 */
"use strict";
//---------------------------------------------------------------------------
/**
 * this function is called (once) to init the controller.
 */
/**
 * this function converts (event.x,event.y) coordinates to (x,y) coordinates
 * in the canvas.
 * @param {Object} event is the event object instance.
 * @returns {Array} and array of (x,y) in canvas coodinates.
 */
function world2canvas ( event ) {
    var x = event.x;
    var y = event.y;
    var canvas = document.getElementById( "can" );

    //adjust for offset to canvas
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    x += document.body.scrollLeft;  
    y += document.body.scrollTop;   
    x += document.documentElement.scrollLeft;  
    y += document.documentElement.scrollTop;   

    return [ x, y ];
}
//---------------------------------------------------------------------------
/**
 * this function is called in response to a mouseDown event.
 * @param {Object} event is the event object instance.
 */
function doMouseMove ( event ) {
    var xy = world2canvas ( event );
    var x = xy[0];
    var y = xy[1];
}
//---------------------------------------------------------------------------
/**
 * this function is called in response to a mouseDown event.
 */
function doMouseDown ( event ) {
    var xy = world2canvas ( event );
    var x = xy[0];
    var y = xy[1];
}
//---------------------------------------------------------------------------

