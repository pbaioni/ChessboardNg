import { Component, OnInit} from '@angular/core';
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
    config: any;

    constructor() {  }


    ngOnInit() {
        
        this.config = {
            orientation: 'white',
            draggable: true,
            position: 'start',
            appearSpeed: 'fast',
            moveSpeed: 'fast',
            snapbackSpeed: 50,
            snapSpeed: 50,
            trashSpeed: 'fast',
            sparePieces: false,
            pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
            showNotation: false,
            showerrors: true,
            onDragStart: this.onDragStart.bind( this ),
            onDrop: this.onDrop.bind( this ),
            onSnapEnd: this.onSnapEnd.bind( this ),
            onSnapbackEnd: this.onSnapbackEnd.bind( this ),
            onMouseoutSquare: this.onMouseoutSquare.bind( this ),
            onMouseoverSquare: this.onMouseoverSquare.bind( this ),
            onMoveEnd: this.onMoveEnd.bind( this )
        }

        this.board = new ChessBoard( 'board', this.config );

        this.game = new Chess();

        this.updateStatus();

    }

    onDragStart( source, piece, position, orientation ) {
        // do not pick up pieces if the game is over
        if ( this.game.game_over() ) return false

        // only pick up pieces for the side to move
        if ( ( this.game.turn() === 'w' && piece.search( /^b/ ) !== -1 ) ||
            ( this.game.turn() === 'b' && piece.search( /^w/ ) !== -1 ) ) {
            return false
        }
    }

    onDrop( source, target ) {

        // see if the move is legal
        let move = this.game.move( {
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        } )

        // illegal move
        if ( move === null ) return 'snapback'

        this.updateStatus()
    }

    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    onSnapEnd() {
        this.board.position( this.game.fen() )
    }
    
    onSnapbackEnd() {
        this.board.position( this.game.fen() )
    }


    updateStatus() {
        var status = ''

        var moveColor = 'White'
        if ( this.game.turn() === 'b' ) {
            moveColor = 'Black'
        }

        // checkmate?
        if ( this.game.in_checkmate() ) {
            status = 'Game over, ' + moveColor + ' is in checkmate.'
        }

        // draw?
        else if ( this.game.in_draw() ) {
            status = 'Game over, drawn position'
        }

        // game still on
        else {
            status = moveColor + ' to move'

            // check?
            if ( this.game.in_check() ) {
                status += ', ' + moveColor + ' is in check'
            }
        }

        console.log( status );
    }

    onMouseoverSquare( square, piece ) {

        //nothing to do

    }

    onMouseoutSquare( square, piece ) {

        //nothing to do

    }

    onMoveEnd() {

        //nothing to do

    }
    
    start() {
        
        
        this.board.start(true);

        this.game = new Chess();
    }
    
    clear() {
        
        this.board.clear();

        this.game = new Chess();
    }

    onlyPawns() {
        
        console.log('only pawns');

    }

}
