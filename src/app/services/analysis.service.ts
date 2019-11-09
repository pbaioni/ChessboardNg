// board.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnalysisService {

    serverUrl = 'http://localhost:9001';

    constructor(private http: HttpClient) { 
        this.getBoard();
    }

    getBoard() {
        return this.http.get(this.serverUrl + '/board');
    }

    getOnlyPawns(fen: string){
        return this.http.post(this.serverUrl + '/board/onlypawns', fen);
    }

    getAnalysis(fen: string){
        return this.http.post(this.serverUrl + '/board/analysis', fen);
    }

}