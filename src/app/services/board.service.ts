// board.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BoardService {

    url = 'http://localhost:9001';

    constructor(private http: HttpClient) { 
        this.getBoard();
    }

    getBoard() {
        return this.http.get(this.url + '/board');
    }

    getOnlyPawns(fen: string){
        return this.http.post(this.url + '/board/onlypawns', fen);
    }



}