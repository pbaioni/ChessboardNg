import { Component, OnInit, HostListener } from '@angular/core';
declare const ChessBoard: any;
declare const Chess: any;

@Component( {
    selector: 'app-chessboard',
    templateUrl: './chessboard.component.html',
    styleUrls: ['./chessboard.component.css']
} )
export class ChessboardComponent implements OnInit {

    board: any;
    game: any;

    constructor() { }

   
    ngOnInit() {
        var config = {
            orientation: 'white',
            draggable: true,
            position: 'start',
            moveSpeed: 'fast',
            snapbackSpeed: 100,
            snapSpeed: 100,
            pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
            showNotation: false
        }

        this.board = new ChessBoard( 'board', config );
        
        this.game = new Chess();

        console.log('color of g5: ' + this.game.square_color('g5'));
        
        this.board.move('e2-e4');

        this.updateStatus();

    }
    

    onDragStart (source, piece, position, orientation) {
        // do not pick up pieces if the game is over
        if (this.game.game_over()) {return false};

        // only pick up pieces for the side to move
        if ((this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
            (this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
          return false
        };
        return true;
      }


    updateStatus () {
        var status = ''

        var moveColor = 'White'
        if (this.game.turn() === 'b') {
          moveColor = 'Black'
        }

        // checkmate?
        if (this.game.in_checkmate()) {
          status = 'Game over, ' + moveColor + ' is in checkmate.'
        }

        // draw?
        else if (this.game.in_draw()) {
          status = 'Game over, drawn position'
        }

        // game still on
        else {
          status = moveColor + ' to move'

          // check?
          if (this.game.in_check()) {
            status += ', ' + moveColor + ' is in check'
          }
        }
        
        console.log(status);
      }

}
