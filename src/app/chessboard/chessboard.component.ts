import { Component, OnInit } from '@angular/core';
declare const ChessBoard: any;

@Component( {
    selector: 'app-chessboard',
    templateUrl: './chessboard.component.html',
    styleUrls: ['./chessboard.component.css']
} )
export class ChessboardComponent implements OnInit {

    board: any;

    constructor() {}

    ngOnInit() {
        var config = {
                orientation: 'white',
                draggable: true,
                position: 'start',
                moveSpeed: 'slow',
                snapbackSpeed: 500,
                snapSpeed: 100,
                pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
                showNotation: false
            }
            this.board = ChessBoard('board', config)
            
            console.log('Position loaded from fen: ' + this.board.fen());
            

    }

}
