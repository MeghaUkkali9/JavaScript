"use strict";

QUnit.test(
    "test block (still life)",
    function( assert ) {
        var g = new ConwaysGameOfLife( 50, 50 );
        var r = 1;
        var c = 1;
        g.board[r][c]   = true;    g.board[r][c+1]   = true;
        g.board[r+1][c] = true;    g.board[r+1][c+1] = true;

        g.nextGeneration();
        assert.ok( !g.board[0][0], "Passed." );
        //not a great test, but ok as an example.
        assert.ok( g.board[r][c]   && g.board[r][c+1] &&
                   g.board[r+1][c] && g.board[r+1][c+1], "It is Passed." );

        g.nextGeneration();
        assert.ok( !g.board[0][0], "Passed." );
        //not a great test, but ok as an example.
        assert.ok( g.board[r][c]   && g.board[r][c+1] &&
                   g.board[r+1][c] && g.board[r+1][c+1], "It is Passed." );
    }
);

