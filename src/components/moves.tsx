import { useState } from "react";


type Pieces = {
    [key: string]: string[];
  };
  const column = "12345678";
  const row = "abcdefgh";
  export class Moves {
  
    //This function gets all the possible moves from white pawn
    getWhitePawnMoves(oppositionPieces: Pieces, position: string, myPieces: Pieces): string[] {
    
        let moves: string[] = [];   
        let myPiecesToArray: string[] = Object.values(myPieces).flat();
        let oppositionPiecesToArray: string[] = Object.values(oppositionPieces).flat();
        let index = 0;
        if(position[1] === "2" && (!(myPiecesToArray.includes(position[0]+3)) 
            && !(myPiecesToArray.includes(position[0]+4))) 
            && (!(oppositionPiecesToArray.includes(position[0]+3)) 
            && !(oppositionPiecesToArray.includes(position[0]+4)))){
            moves.push(position[0]+4);
            moves.push(position[0]+3);
        }
        else if(!(myPiecesToArray.includes(position[0]+(parseInt(position[1])+1).toString()))
                && !(oppositionPiecesToArray.includes(position[0]+(parseInt(position[1])+1).toString()))){
            moves.push(position[0]+(parseInt(position[1])+1).toString());
        }
        if(oppositionPiecesToArray.includes(row[row.indexOf(position[0]) + 1]+(parseInt(position[1])+1).toString())){
            moves.push(row[row.indexOf(position[0]) + 1]+(parseInt(position[1])+1).toString());
        }
        if(oppositionPiecesToArray.includes(row[row.indexOf(position[0]) - 1]+(parseInt(position[1])+1).toString())){
            moves.push(row[row.indexOf(position[0]) - 1]+(parseInt(position[1])+1).toString());
        }
        return moves;
    }

    //This function gets all the possible attacking moves from white pawn
    getWhitePawnAttackingMoves(oppositionPieces: Pieces, position: string, myPieces: Pieces): string[] {
    
        let moves: string[] = [];   
        let oppositionPiecesToArray: string[] = Object.values(oppositionPieces).flat();
        moves.push(row[row.indexOf(position[0]) + 1]+(parseInt(position[1])+1).toString());
        moves.push(row[row.indexOf(position[0]) - 1]+(parseInt(position[1])+1).toString());
        
        return moves;
    }

    //This function gets all the possible moves from black pawn
    getBlackPawnMoves(oppositionPieces: Pieces, position: string, myPieces: Pieces): string[] {
    
        let moves: string[] = [];   
        let myPiecesToArray: string[] = Object.values(myPieces).flat();
        let oppositionPiecesToArray: string[] = Object.values(oppositionPieces).flat();

        if(position[1] === "7" && (!(myPiecesToArray.includes(position[0]+5)) 
            && !(myPiecesToArray.includes(position[0]+6)))
            && (!(oppositionPiecesToArray.includes(position[0]+5)) 
            && !(oppositionPiecesToArray.includes(position[0]+6)))){
            moves.push(position[0]+5);
            moves.push(position[0]+6);
        }
        else if(!(myPiecesToArray.includes(position[0]+(parseInt(position[1])-1).toString()))
                && !(oppositionPiecesToArray.includes(position[0]+(parseInt(position[1])-1).toString()))){
            moves.push(position[0]+(parseInt(position[1])-1).toString());
        }
        if(oppositionPiecesToArray.includes(row[row.indexOf(position[0]) + 1]+(parseInt(position[1])-1).toString())){
            moves.push(row[row.indexOf(position[0]) + 1]+(parseInt(position[1])-1).toString());
        }
        if(oppositionPiecesToArray.includes(row[row.indexOf(position[0]) - 1]+(parseInt(position[1])-1).toString())){
            moves.push(row[row.indexOf(position[0]) - 1]+(parseInt(position[1])-1).toString());
        }

        return moves;
    }

    //This function gets all the possible attacking moves from black pawn
    getBlackPawnAtackingMoves(oppositionPieces: Pieces, position: string, myPieces: Pieces): string[] {
    
        let moves: string[] = [];   
        moves.push(row[row.indexOf(position[0]) + 1]+(parseInt(position[1])-1).toString());
        moves.push(row[row.indexOf(position[0]) - 1]+(parseInt(position[1])-1).toString());
        
        return moves;
    }
    
    //This gets all rook moves, includes defending pieces, checks all
    //columns and rows from rook's position
    getWhiteRookMoves(oppositionPieces: Pieces, position: string, myPieces: Pieces): string[] {
    
        let moves: string[] = [];
        let j=0;
        let positionIndexRow = row.indexOf(position[0]);
        let positionIndexColumn = column.indexOf(position[1]);
        let myPiecesToArray: string[] = Object.values(myPieces).flat();
        let oppositionPiecesToArray = Object.values(oppositionPieces).flat();
        for(let i = positionIndexColumn+1; i < column.length; i++){
            moves[j] = position[0]+column[i];
            j++;
            if(oppositionPiecesToArray.includes(position[0]+column[i]))
                break;
            if(myPiecesToArray.includes(position[0]+column[i]))
                break;
        }
        for(let i = positionIndexColumn-1; i >= 0; i--){
            moves[j] = position[0]+column[i];
            j++;
            if(oppositionPiecesToArray.includes(position[0]+column[i]))
                break;
            if(myPiecesToArray.includes(position[0]+column[i]))
                break;
        }
        for(let i = positionIndexRow+1; i < row.length; i++){
            moves[j] = row[i]+position[1];
            j++;
            if(oppositionPiecesToArray.includes(row[i]+position[1]))
                break;
            if(myPiecesToArray.includes(row[i]+position[1]))
                break;
        }
        for(let i = positionIndexRow-1; i >= 0; i--){
            moves[j] = row[i]+position[1];
            j++;
            if(oppositionPiecesToArray.includes(row[i]+position[1]))
                break;
            if(myPiecesToArray.includes(row[i]+position[1]))
                break;
        }
        return moves;
    }

    //This gets all bishop moves, includes defending pieces, checks all
    //columns and rows from bishop's position
    getWhiteBishopMoves(oppositionPieces: Pieces, position: string, myPieces: Pieces): string[] {
    
        let moves: string[] = [];
        let j=0;
        let x = position[0];
        let y = parseInt(position[1]);
        let myPiecesToArray: string[] = Object.values(myPieces).flat();
        let oppositionPiecesToArray: string[] = Object.values(oppositionPieces).flat();

        for(let i = row.indexOf(x)+1; i < row.length && y < 8; i++){
            y++;
            moves[j] = row[i] + y;
            j++;
            if(myPiecesToArray.includes(row[i] + y))
                break;
            if(oppositionPiecesToArray.includes(row[i] + y))
                break;
        }

        x = position[0];
        y = parseInt(position[1]);

        for(let i = row.indexOf(x)+1; i < row.length && y > 1; i++){
            y--;
            moves[j] = row[i] + y;
            j++;
            if(myPiecesToArray.includes(row[i] + y))
                break;
            if(oppositionPiecesToArray.includes(row[i] + y))
                break;
        }

        x = position[0];
        y = parseInt(position[1]);

        for(let i = row.indexOf(x)-1; i >= 0 && y < 8; i--){
            y++;
            moves[j] = row[i] + y;
            j++;
            if(myPiecesToArray.includes(row[i] + y))
                break;
            if(oppositionPiecesToArray.includes(row[i] + y))
                break;
        }
        x = position[0];
        y = parseInt(position[1]);

        for(let i = row.indexOf(x)-1; i >= 0 && y > 1; i--){
            y--;
            moves[j] = row[i] + y;
            j++;
            if(myPiecesToArray.includes(row[i] + y))
                break;
            if(oppositionPiecesToArray.includes(row[i] + y))
                break;
        }

        return moves;
    }


    //This gets all knight's possible moves, includes defending pieces
    getWhiteKnightMoves(oppositionPieces: Pieces, position: string, myPieces: Pieces): string[] {
    
        let moves: string[] = [];
        let x = row.indexOf(position[0]); 
        let y = parseInt(position[1]);   
        let j=0;
        let myPiecesToArray: string[] = Object.values(myPieces).flat();
    
        const knightMoves = [
            [2, 1], [1, 2], [-1, 2], [-2, 1], 
            [-2, -1], [-1, -2], [1, -2], [2, -1] 
        ];
    
        for (let [dx, dy] of knightMoves) {
            let newX = x + dx;
            let newY = y + dy;
    

            if (newX >= 0 && newX < row.length && newY >= 1 && newY <= 8) {
                moves[j] = row[newX] + newY; 
                j++;
            }
        }
    return moves;

    }

    //This gets all queen's possible moves, includes defending pieces
    getWhiteQueenMoves(oppositionPieces: Pieces, position: string, myPieces: Pieces): string[] {

        let movesRook: string[] = [];
        let movesBishop: string[] = [];
        let moves: string[] = [];


        movesRook = this.getWhiteRookMoves(oppositionPieces, position, myPieces);
        movesBishop = this.getWhiteBishopMoves(oppositionPieces, position, myPieces);

        moves = movesRook.concat(movesBishop);

        return moves;
    }

    //This gets all king's possible moves, includes defending pieces
    getWhiteKingMoves(oppositionPieces: Pieces, position: string, 
        myPieces: Pieces): string[] {

        let moves: string[] = [];
        let j = 0;
        let x = row.indexOf(position[0]); 
        let y = parseInt(position[1]);    
        let myPiecesToArray: string[] = Object.values(myPieces).flat();

        const kingMoves = [
            [1, 0],  
            [0, 1],  
            [-1, 0], 
            [0, -1], 
            [1, 1],  
            [1, -1], 
            [-1, 1], 
            [-1, -1] 
        ];

        for (let [dx, dy] of kingMoves) {
            let newX = x + dx;
            let newY = y + dy;

            if (newX >= 0 && newX < row.length && newY >= 1 && newY <= 8) {
                moves[j] = row[newX] + newY;
                j++;
            }
        }
        return moves;
    }

    //This gets all opposition possible moves, including defending pieces
    //I used this method mainly for checking if king could move to certain positions
    getAllOppositionMoves(oppositionPieces: Pieces, myPieces: Pieces, side: string): string[] {
        const allMovesSet: Set<string> = new Set(); 
            
    
        if(side === "black"){
            const moveFunctions: Record<string, (position: string) => string[]> = {
                pawn: position => this.getWhitePawnAttackingMoves(oppositionPieces, position, myPieces),
                knightW: position => this.getWhiteKnightMoves(oppositionPieces, position, myPieces),
                bishopW: position => this.getWhiteBishopMoves(oppositionPieces, position, myPieces),
                rookW: position => this.getWhiteRookMoves(oppositionPieces, position, myPieces),
                queenW: position => this.getWhiteQueenMoves(oppositionPieces, position, myPieces),
                kingW: position => this.getWhiteKingMoves(oppositionPieces, position, myPieces),
            };
        
            for (const [pieceType, positions] of Object.entries(myPieces)) {
                const moveFunction = moveFunctions[pieceType]; 
                if (!moveFunction) {
                    continue; 
                }
        
                positions.forEach(position => {
                    const moves = moveFunction(position);
                    moves.forEach(move => {
                        allMovesSet.add(move); 
                    });
                });
            }
        }
        else{
            const moveFunctions: Record<string, (position: string) => string[]> = {
                pawnB: position => this.getBlackPawnAtackingMoves(oppositionPieces, position, myPieces),
                knightB: position => this.getWhiteKnightMoves(oppositionPieces, position, myPieces),
                bishopB: position => this.getWhiteBishopMoves(myPieces, position, oppositionPieces),
                rookB: position => this.getWhiteRookMoves(oppositionPieces, position, myPieces),
                queenB: position => this.getWhiteQueenMoves(oppositionPieces, position, myPieces),
                kingB: position => this.getWhiteKingMoves(oppositionPieces, position, myPieces),
            };
        
            for (const [pieceType, positions] of Object.entries(myPieces)) {
                const moveFunction = moveFunctions[pieceType]; 
                if (!moveFunction) {
                    continue; 
                }
        
                positions.forEach(position => {
                    const moves = moveFunction(position);
                    moves.forEach(move => {
                        allMovesSet.add(move); 
                    });
                });
            }
        }
    
        return Array.from(allMovesSet); 
    } 
  }