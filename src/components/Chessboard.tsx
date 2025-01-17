import React, { useState } from "react";
import { Moves } from "./moves";

const Chessboard = () => {

  const pieceImages: { [key: string]: string } = {
    pawn: '/public/pieces-png/white-bpawn.png',
    knightW: '/public/pieces-png/white-nightrd.png',   
    bishopW: '/public/pieces-png/white-grassh.png',
    rookW: '/public/pieces-png/white-rook4.png',
    queenW: '/public/pieces-png/white-amazon.png',
    kingW: '/public/pieces-png/white-commonr.png',
    pawnB: '/public/pieces-png/black-bpawn.png', 
    knightB: '/public/pieces-png/black-nightrd.png',    
    bishopB: '/public/pieces-png/black-grassh.png',
    rookB: '/public/pieces-png/black-rook4.png',
    queenB: '/public/pieces-png/black-amazon.png',
    kingB: '/public/pieces-png/black-commonr.png',          
  };
  
  let initialPieces: Pieces = {
    pawn: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"], 
    knightW: ["b1", "g1"],    
    bishopW: ["c1", "f1"],
    rookW: ["a1", "h1"],
    queenW: ["d1"],
    kingW: ["e1"],
    pawnB: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"], 
    knightB: ["b8", "g8"],    
    bishopB: ["c8", "f8"],
    rookB: ["a8", "h8"],
    queenB: ["d8"],
    kingB: ["e8"],               
  };

  let initialPiecesWhite: Pieces = {
    pawn: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"], 
    knightW: ["b1", "g1"],    
    bishopW: ["c1", "f1"],
    rookW: ["a1", "h1"],
    queenW: ["d1"],
    kingW: ["e1"],              
  };

  let initialPiecesWhiteMock: Pieces = {
    pawnM: ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"], 
    knightWM: ["b1", "g1"],    
    bishopWM: ["c1", "f1"],
    rookWM: ["a1", "h1"],
    queenWM: ["d1"],
    kingWM: ["e1"],              
  };

  let initialPiecesBlack: Pieces = {
    pawnB: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"], 
    knightB: ["b8", "g8"],    
    bishopB: ["c8", "f8"],
    rookB: ["a8", "h8"],
    queenB: ["d8"],
    kingB: ["e8"],               
  };

  let initialPiecesBlackMock: Pieces = {
    pawnBM: ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"], 
    knightBM: ["b8", "g8"],    
    bishopBM: ["c8", "f8"],
    rookBM: ["a8", "h8"],
    queenBM: ["d8"],
    kingBM: ["e8"],               
  };


  //All useState hooks for storing various information

  const [pieces, setPieces] = useState<Pieces>(initialPieces);
  const [piecesWhite, setPiecesWhite] = useState<Pieces>(initialPiecesWhite);
  const [piecesBlack, setPiecesBlack] = useState<Pieces>(initialPiecesBlack);
  

  const [piecesWhiteMock, setPiecesWhiteMock] = useState<Pieces>(initialPiecesWhiteMock);
  const [piecesBlackMock, setPiecesBlackMock] = useState<Pieces>(initialPiecesBlackMock);

  const [whiteKingMoved, setWhiteKingMoved] = useState(false);
  const [firstWhiteRookMoved, setFirstWhiteRookMoved] = useState(false);
  const [secondWhiteRookMoved, setSecondWhiteRookMoved] = useState(false);

  const [BlackKingMoved, setBlackKingMoved] = useState(false);
  const [firstBlackRookMoved, setFirstBlackRookMoved] = useState(false);
  const [secondBlackRookMoved, setSecondBlackRookMoved] = useState(false);

  const [highlightedSquares, setHighlightedSquares] = useState<string[]>([]);


  //This helps to find piece by it's position so it could be uploaded in square
  //Also it helped to find which piece is on clicked square
  const findPieceByPosition = (pieces: Pieces, position: string): string | null => {
    for (const pieceType in pieces) {
      if (pieces[pieceType as keyof Pieces ].includes(position)) {
        return pieceImages[pieceType] || null;  
      }
    }
    return null;
  };


  type Pieces = {
    [key: string]: string[];
  };

  const availableMoves = new Moves();


  //For piece movement, first you need to click on piece and then you can move it
  const [previousClicked, setPreviousClicked] = useState<string | null>(null);
  const [currentClicked, setCurrentClicked] = useState<string | null>(null);


  const [whiteMove, setWhiteMove] = useState(true);

  const handleClick = (id: string) => {

    let moves: string[] = [];
    let idOfSquare:string = "";
    let pieceName:string | null = "";

    setPreviousClicked(currentClicked); 
    setCurrentClicked(id); 

    setHighlightedSquares([]);

    //Switch cases for each piece, when clicked on certain piece
    //it finds it available moves, also checks if it will still protect the king
    if(currentClicked != null){
      if(findPieceByPosition(pieces, currentClicked) != null){
        switch(findPieceByPosition(pieces, currentClicked)){
          case pieceImages.pawn:
            if(whiteMove){
              moves = availableMoves.getWhitePawnMoves(piecesBlack, currentClicked, piecesWhite);
              setHighlightedSquares(moves);
              if(moves.includes(id)){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }

                piecesWhiteMock.pawnM = piecesWhiteMock.pawnM || [];
                piecesWhiteMock.pawnM.push(id);
                piecesWhiteMock.pawnM = piecesWhiteMock.pawnM.filter(position => position !== currentClicked);
                setPiecesWhiteMock(piecesWhiteMock);


                if(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0])){
                  for (const [key, value] of Object.entries(piecesWhite)) {
                    piecesWhiteMock[`${key}M`] = [...value];
                  }
                  setPiecesWhiteMock(piecesWhiteMock);
                  return;
                }
              }

              if(moves.includes(id) && !(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0]))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(pieces);
                }
                if(id[1] === "8"){
                  pieces.pawn = pieces.pawn.filter(position => position !== currentClicked);
                  pieces.queenW.push(id);
                  piecesWhite.pawn = piecesWhite.pawn.filter(position => position !== currentClicked);
                  piecesWhite.queenW.push(id);
                  setPieces(pieces);
                  setPiecesWhite(piecesWhite);
                  setPiecesWhiteMock(piecesWhite);
                  setWhiteMove(false);
                  break;
                }
                
                pieces.pawn.push(id);
                pieces.pawn = pieces.pawn.filter(position => position !== currentClicked);

                piecesWhite.pawn.push(id);
                piecesWhite.pawn = piecesWhite.pawn.filter(position => position !== currentClicked);

                setPieces(pieces);
                setPiecesWhite(piecesWhite);
                setWhiteMove(false);
                setHighlightedSquares([]);
                for (const [key, value] of Object.entries(piecesWhite)) {
                    piecesWhiteMock[`${key}M`] = [...value];
                    setPiecesWhiteMock(piecesWhiteMock);
                  }
              }
              }
            break;
          case pieceImages.knightW:
            if(whiteMove){
              moves = availableMoves.getWhiteKnightMoves(piecesBlack, currentClicked, piecesWhite);
              
              let highlightedMoves = Object.values(piecesWhite).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w'))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }

                piecesWhiteMock.knightWM = piecesWhiteMock.knightWM || [];
                piecesWhiteMock.knightWM.push(id);
                piecesWhiteMock.knightWM = piecesWhiteMock.knightWM.filter(position => position !== currentClicked);
                setPiecesWhiteMock(piecesWhiteMock);


                if(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0])){
                  for (const [key, value] of Object.entries(piecesWhite)) {
                    piecesWhiteMock[`${key}M`] = [...value];
                  }
                  setPiecesWhiteMock(piecesWhiteMock);
                  return;
                }
              }

              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w')) && !(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0]))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(pieces);
                }
              pieces.knightW = pieces.knightW.filter(position => position !== currentClicked);
                pieces.knightW.push(id);
                piecesWhite.knightW = piecesWhite.knightW.filter(position => position !== currentClicked);
                piecesWhite.knightW.push(id);
                setPieces(pieces);
                setPiecesWhite(piecesWhite);
                for (const [key, value] of Object.entries(piecesWhite)) {
                  piecesWhiteMock[`${key}M`] = [...value];
                  setPiecesWhiteMock(piecesWhiteMock);
                }
                setWhiteMove(false);
                setHighlightedSquares([]);
              }
            }
            break;
          case pieceImages.bishopW:
            if(whiteMove){
              moves = availableMoves.getWhiteBishopMoves(piecesBlack, currentClicked, piecesWhite);
              let highlightedMoves = Object.values(piecesWhite).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w'))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }

                piecesWhiteMock.bishopWM = piecesWhiteMock.bishopWM || [];
                piecesWhiteMock.bishopWM.push(id);
                piecesWhiteMock.bishopWM = piecesWhiteMock.bishopWM.filter(position => position !== currentClicked);
                setPiecesWhiteMock(piecesWhiteMock);


                if(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0])){
                  for (const [key, value] of Object.entries(piecesWhite)) {
                    piecesWhiteMock[`${key}M`] = [...value];
                  }
                  setPiecesWhiteMock(piecesWhiteMock);
                  return;
                }
              }

              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w'))  && !(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0]))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(pieces);
                }
              pieces.bishopW = pieces.bishopW.filter(position => position !== currentClicked);
                pieces.bishopW.push(id);
                piecesWhite.bishopW = piecesWhite.bishopW.filter(position => position !== currentClicked);
                piecesWhite.bishopW.push(id);
                setPieces(pieces);
                setPiecesWhite(piecesWhite);
                for (const [key, value] of Object.entries(piecesWhite)) {
                  piecesWhiteMock[`${key}M`] = [...value];
                  setPiecesWhiteMock(piecesWhiteMock);
                }
                setWhiteMove(false);
                setHighlightedSquares([]);
              }
            }
            break;
          case pieceImages.rookW:
            if(whiteMove){
              moves = availableMoves.getWhiteRookMoves(piecesBlack, currentClicked, piecesWhite);
              let highlightedMoves = Object.values(piecesWhite).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w'))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }

                piecesWhiteMock.rookWM = piecesWhiteMock.rookWM || [];
                piecesWhiteMock.rookWM.push(id);
                piecesWhiteMock.rookWM = piecesWhiteMock.rookWM.filter(position => position !== currentClicked);
                setPiecesWhiteMock(piecesWhiteMock);


                if(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0])){
                  for (const [key, value] of Object.entries(piecesWhite)) {
                    piecesWhiteMock[`${key}M`] = [...value];
                  }
                  setPiecesWhiteMock(piecesWhiteMock);
                  return;
                }
              }
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w')) && !(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0]))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(pieces);
                }
                pieces.rookW = pieces.rookW.filter(position => position !== currentClicked);
                  pieces.rookW.push(id);
                  piecesWhite.rookW = piecesWhite.rookW.filter(position => position !== currentClicked);
                  piecesWhite.rookW.push(id);
                  setPieces(pieces);
                  setPiecesWhite(piecesWhite);
                  for (const [key, value] of Object.entries(piecesWhite)) {
                    piecesWhiteMock[`${key}M`] = [...value];
                    setPiecesWhiteMock(piecesWhiteMock);
                  }
                if(currentClicked === "a1"){
                  setFirstWhiteRookMoved(true);
                }
                if(currentClicked === "h1"){
                  setSecondWhiteRookMoved(true);
                }
                setWhiteMove(false);
                setHighlightedSquares([]);
              }
            }
            break;
          case pieceImages.queenW:
            if(whiteMove){
              moves = availableMoves.getWhiteQueenMoves(piecesBlack, currentClicked, piecesWhite);
              let highlightedMoves = Object.values(piecesWhite).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w'))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }

                piecesWhiteMock.queenWM = piecesWhiteMock.queenWM || [];
                piecesWhiteMock.queenWM.push(id);
                piecesWhiteMock.queenWM = piecesWhiteMock.queenWM.filter(position => position !== currentClicked);
                setPiecesWhiteMock(piecesWhiteMock);


                if(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0])){
                  for (const [key, value] of Object.entries(piecesWhite)) {
                    piecesWhiteMock[`${key}M`] = [...value];
                  }
                  setPiecesWhiteMock(piecesWhiteMock);
                  return;
                }
              }
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w')) && !(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhite.kingW[0]))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(pieces);
                }
              pieces.queenW = pieces.queenW.filter(position => position !== currentClicked);
                pieces.queenW.push(id);
                piecesWhite.queenW = piecesWhite.queenW.filter(position => position !== currentClicked);
                piecesWhite.queenW.push(id);
                setPieces(pieces);
                setPiecesWhite(piecesWhite);
                for (const [key, value] of Object.entries(piecesWhite)) {
                  piecesWhiteMock[`${key}M`] = [...value];
                  setPiecesWhiteMock(piecesWhiteMock);
                }
                setWhiteMove(false);
                setHighlightedSquares([]);
              }
            }
            break;
          case pieceImages.kingW:
            if(whiteMove){
              moves = availableMoves
              .getWhiteKingMoves(piecesBlack, currentClicked, piecesWhite)
              .filter(move => 
                !availableMoves
                  .getAllOppositionMoves(piecesWhite, piecesBlack, "white")
                  .includes(move)
              );
              let highlightedMoves = Object.values(piecesWhite).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              let allPiecesToArray: string[] = Object.values(pieces).flat();
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w'))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }

                piecesWhiteMock.kingWM = piecesWhiteMock.kingWM || [];
                piecesWhiteMock.kingWM.push(id);
                piecesWhiteMock.kingWM = piecesWhiteMock.kingWM.filter(position => position !== currentClicked);
                setPiecesWhiteMock(piecesWhiteMock);

                if(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhiteMock.kingWM[0])){
                  for (const [key, value] of Object.entries(piecesWhite)) {
                    piecesWhiteMock[`${key}M`] = [...value];
                  }
                  setPiecesWhiteMock(piecesWhiteMock);
                  return;
                }
              }
              
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'w')) && !(availableMoves.getAllOppositionMoves(piecesWhiteMock, piecesBlack, "white").includes(piecesWhiteMock.kingWM[0]))){
                if(Object.values(piecesBlack).flat().includes(id)){
                  for (const key in piecesBlack) {
                    piecesBlack[key] = piecesBlack[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(piecesBlack);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(pieces);
                }
                pieces.kingW = pieces.kingW.filter(position => position !== currentClicked);
                  pieces.kingW.push(id);
                  piecesWhite.kingW = piecesWhite.kingW.filter(position => position !== currentClicked);
                  piecesWhite.kingW.push(id);
                  setPieces(pieces);
                  setPiecesWhite(piecesWhite);
                  setWhiteKingMoved(true);
                  for (const [key, value] of Object.entries(piecesWhite)) {
                    piecesWhiteMock[`${key}M`] = [...value];
                    setPiecesWhiteMock(piecesWhiteMock);
                  }
                  setWhiteMove(false);
                  setHighlightedSquares([]);
              }
              //Castling of the white king left side
              else if((!(whiteKingMoved) && !(firstWhiteRookMoved)) && id === "c1" 
                      && (!allPiecesToArray.includes("b1")) 
                      && (!allPiecesToArray.includes("c1")) 
                      && (!allPiecesToArray.includes("d1"))){
                pieces.kingW = pieces.kingW.filter(position => position !== currentClicked);
                pieces.kingW.push(id);
                piecesWhite.kingW = piecesWhite.kingW.filter(position => position !== currentClicked);
                piecesWhite.kingW.push(id);

                pieces.rookW = pieces.rookW.filter(position => position !== "a1");
                pieces.rookW.push("d1");
                piecesWhite.rookW = piecesWhite.rookW.filter(position => position !== "a1");
                piecesWhite.rookW.push("d1");
                setPieces(pieces);
                setPiecesWhite(piecesWhite);
                setWhiteKingMoved(true);
                setWhiteMove(false);
                setHighlightedSquares([]);
              }
              //Castling of the white king right side
              else if((!(whiteKingMoved) && !(secondWhiteRookMoved)) && id === "g1" 
                      && (!allPiecesToArray.includes("f1")) 
                      && (!allPiecesToArray.includes("g1")) ){
                pieces.kingW = pieces.kingW.filter(position => position !== currentClicked);
                pieces.kingW.push(id);
                piecesWhite.kingW = piecesWhite.kingW.filter(position => position !== currentClicked);
                piecesWhite.kingW.push(id);

                pieces.rookW = pieces.rookW.filter(position => position !== "h1");
                pieces.rookW.push("f1");
                piecesWhite.rookW = piecesWhite.rookW.filter(position => position !== "h1");
                piecesWhite.rookW.push("f1");
                setPieces(pieces);
                setPiecesWhite(piecesWhite);
                setWhiteKingMoved(true);
                setWhiteMove(false);
                setHighlightedSquares([]);
              }
            }
            break;
            case pieceImages.pawnB:
            if(!whiteMove){
              moves = availableMoves.getBlackPawnMoves(piecesWhite, currentClicked, piecesBlack);
              let highlightedMoves = Object.values(piecesBlack).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              if(moves.includes(id)){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }

                piecesBlackMock.pawnBM = piecesBlackMock.pawnBM || [];
                piecesBlackMock.pawnBM.push(id);
                piecesBlackMock.pawnBM = piecesBlackMock.pawnBM.filter(position => position !== currentClicked);
                setPiecesBlackMock(piecesBlackMock);


                if(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0])){
                  for (const [key, value] of Object.entries(piecesBlack)) {
                    piecesBlackMock[`${key}M`] = [...value];
                  }
                  setPiecesBlackMock(piecesBlackMock);
                  return;
                }
              }
              if(moves.includes(id) && !(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0]))){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(pieces);
                }
                // Pawn turning to a queen
                if(id[1] === "1"){
                  pieces.pawnB = pieces.pawnB.filter(position => position !== currentClicked);
                  pieces.queenB.push(id);
                  piecesBlack.pawnB = piecesBlack.pawnB.filter(position => position !== currentClicked);
                  piecesBlack.queenB.push(id);
                  setPieces(pieces);
                  setPiecesBlack(piecesBlack);
                  setWhiteMove(true);
                  setHighlightedSquares([]);
                  break;
                }
                pieces.pawnB = pieces.pawnB.filter(position => position !== currentClicked);
                pieces.pawnB.push(id);
                piecesBlack.pawnB = piecesBlack.pawnB.filter(position => position !== currentClicked);
                piecesBlack.pawnB.push(id);
                setPieces(pieces);
                setPiecesBlack(piecesBlack);
                for (const [key, value] of Object.entries(piecesBlack)) {
                  piecesBlackMock[`${key}M`] = [...value];
                  setPiecesBlackMock(piecesBlackMock);
                }
                setWhiteMove(true);
                setHighlightedSquares([]);
              }
            }
            break;
          case pieceImages.knightB:
            if(!whiteMove){
              moves = availableMoves.getWhiteKnightMoves(piecesWhite, currentClicked, piecesBlack);
              let highlightedMoves = Object.values(piecesBlack).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              if(moves.includes(id)){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }

                piecesBlackMock.knightBM = piecesBlackMock.knightBM || [];
                piecesBlackMock.knightBM.push(id);
                piecesBlackMock.knightBM = piecesBlackMock.knightBM.filter(position => position !== currentClicked);
                setPiecesBlackMock(piecesBlackMock);


                if(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0])){
                  for (const [key, value] of Object.entries(piecesBlack)) {
                    piecesBlackMock[`${key}M`] = [...value];
                  }
                  setPiecesBlackMock(piecesBlackMock);
                  return;
                }
              }
              
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'b')) && !(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0]))){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(pieces);
                }
              pieces.knightB = pieces.knightB.filter(position => position !== currentClicked);
                pieces.knightB.push(id);
                piecesBlack.knightB = piecesBlack.knightB.filter(position => position !== currentClicked);
                piecesBlack.knightB.push(id);
                setPieces(pieces);
                setPiecesBlack(piecesBlack);
                for (const [key, value] of Object.entries(piecesBlack)) {
                  piecesBlackMock[`${key}M`] = [...value];
                  setPiecesBlackMock(piecesBlackMock);
                }
                setWhiteMove(true);
                setHighlightedSquares([]);
              }
            }
            break;
          case pieceImages.bishopB:
            if(!whiteMove){
              moves = availableMoves.getWhiteBishopMoves(piecesWhite, currentClicked, piecesBlack);
              let highlightedMoves = Object.values(piecesBlack).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              if(moves.includes(id)){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }

                piecesBlackMock.bishopBM = piecesBlackMock.bishopBM || [];
                piecesBlackMock.bishopBM.push(id);
                piecesBlackMock.bishopBM = piecesBlackMock.bishopBM.filter(position => position !== currentClicked);
                setPiecesBlackMock(piecesBlackMock);


                if(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0])){
                  for (const [key, value] of Object.entries(piecesBlack)) {
                    piecesBlackMock[`${key}M`] = [...value];
                  }
                  setPiecesBlackMock(piecesBlackMock);
                  return;
                }
              }
              
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'b')) && !(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0]))){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(pieces);
                }
              pieces.bishopB = pieces.bishopB.filter(position => position !== currentClicked);
                pieces.bishopB.push(id);
                piecesBlack.bishopB = piecesBlack.bishopB.filter(position => position !== currentClicked);
                piecesBlack.bishopB.push(id);
                setPieces(pieces);
                setPiecesBlack(piecesBlack);
                for (const [key, value] of Object.entries(piecesBlack)) {
                  piecesBlackMock[`${key}M`] = [...value];
                  setPiecesBlackMock(piecesBlackMock);
                }
                setWhiteMove(true);
                setHighlightedSquares([]);
              }
            }
            break;
          case pieceImages.rookB:
            if(!whiteMove){
              moves = availableMoves.getWhiteRookMoves(piecesWhite, currentClicked, piecesBlack);
              let highlightedMoves = Object.values(piecesBlack).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              if(moves.includes(id)){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }

                piecesBlackMock.rookBM = piecesBlackMock.rookBM || [];
                piecesBlackMock.rookBM.push(id);
                piecesBlackMock.rookBM = piecesBlackMock.rookBM.filter(position => position !== currentClicked);
                setPiecesBlackMock(piecesBlackMock);


                if(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0])){
                  for (const [key, value] of Object.entries(piecesBlack)) {
                    piecesBlackMock[`${key}M`] = [...value];
                  }
                  setPiecesBlackMock(piecesBlackMock);
                  return;
                }
              }
              
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'b')) && !(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0]))){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(pieces);
                }
              pieces.rookB = pieces.rookB.filter(position => position !== currentClicked);
                pieces.rookB.push(id);
                piecesBlack.rookB = piecesBlack.rookB.filter(position => position !== currentClicked);
                piecesBlack.rookB.push(id);
                setPieces(pieces);
                setPiecesBlack(piecesBlack);
                for (const [key, value] of Object.entries(piecesBlack)) {
                  piecesBlackMock[`${key}M`] = [...value];
                  setPiecesBlackMock(piecesBlackMock);
                }
                if(currentClicked === "a8"){
                  setFirstBlackRookMoved(true);
                }
                if(currentClicked === "h8"){
                  setSecondBlackRookMoved(true);
                }
                setWhiteMove(true);
                setHighlightedSquares([]);
              }
            }
            break;
          case pieceImages.queenB:
            if(!whiteMove){
              moves = availableMoves.getWhiteQueenMoves(piecesWhite, currentClicked, piecesBlack);
              let highlightedMoves = Object.values(piecesBlack).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              if(moves.includes(id)){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }

                piecesBlackMock.queenBM = piecesBlackMock.queenBM || [];
                piecesBlackMock.queenBM.push(id);
                piecesBlackMock.queenBM = piecesBlackMock.queenBM.filter(position => position !== currentClicked);
                setPiecesBlackMock(piecesBlackMock);


                if(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0])){
                  for (const [key, value] of Object.entries(piecesBlack)) {
                    piecesBlackMock[`${key}M`] = [...value];
                  }
                  setPiecesBlackMock(piecesBlackMock);
                  return;
                }
              }

              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'b')) && !(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlack.kingB[0]))){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(pieces);
                }
              pieces.queenB = pieces.queenB.filter(position => position !== currentClicked);
                pieces.queenB.push(id);
                piecesBlack.queenB = piecesBlack.queenB.filter(position => position !== currentClicked);
                piecesBlack.queenB.push(id);
                setPieces(pieces);
                setPiecesBlack(piecesBlack);
                for (const [key, value] of Object.entries(piecesBlack)) {
                  piecesBlackMock[`${key}M`] = [...value];
                  setPiecesBlackMock(piecesBlackMock);
                }
                setWhiteMove(true);
                setHighlightedSquares([]);
              }
            }
            break;
          case pieceImages.kingB:
            if(!whiteMove){
              moves = availableMoves
              .getWhiteKingMoves(piecesBlack, currentClicked, piecesWhite)
              .filter(move => 
                !availableMoves
                  .getAllOppositionMoves(piecesBlack, piecesWhite, "black")
                  .includes(move)
              );
              let highlightedMoves = Object.values(piecesBlack).flat();
              let attackingMoves = moves.filter(move => !highlightedMoves.includes(move));
              setHighlightedSquares(attackingMoves);
              let allPiecesToArrayB: string[] = Object.values(pieces).flat();
              idOfSquare = id.toString();
              pieceName = findPieceByPosition(pieces, idOfSquare);
              if(moves.includes(id)){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }

                piecesBlackMock.kingBM = piecesBlackMock.kingBM || [];
                piecesBlackMock.kingBM.push(id);
                piecesBlackMock.kingBM = piecesBlackMock.kingBM.filter(position => position !== currentClicked);
                setPiecesBlackMock(piecesBlackMock);


                if(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlackMock.kingBM[0])){
                  for (const [key, value] of Object.entries(piecesBlack)) {
                    piecesBlackMock[`${key}M`] = [...value];
                  }
                  setPiecesBlackMock(piecesBlackMock);
                  return;
                }
              }
              
              if(moves.includes(id) && ((pieceName === null) || (pieceName[19] !== 'b')) && !(availableMoves.getAllOppositionMoves(piecesBlackMock, piecesWhite, "black").includes(piecesBlackMock.kingBM[0]))){
                if(Object.values(piecesWhite).flat().includes(id)){
                  for (const key in piecesWhite) {
                    piecesWhite[key] = piecesWhite[key].filter(pos => pos !== id);
                  }
                  setPiecesWhite(piecesWhite);
                }
                if(Object.values(pieces).flat().includes(id)){
                  for (const key in pieces) {
                    pieces[key] = pieces[key].filter(pos => pos !== id);
                  }
                  setPiecesBlack(pieces);
                }
              pieces.kingB = pieces.kingB.filter(position => position !== currentClicked);
                pieces.kingB.push(id);
                piecesBlack.kingB = piecesBlack.kingB.filter(position => position !== currentClicked);
                piecesBlack.kingB.push(id);
                setPieces(pieces);
                setPiecesBlack(piecesBlack);
                setBlackKingMoved(true);
                for (const [key, value] of Object.entries(piecesBlack)) {
                  piecesBlackMock[`${key}M`] = [...value];
                  setPiecesBlackMock(piecesBlackMock);
                }
                setWhiteMove(true);
                setHighlightedSquares([]);
              }
              //Castling of the black king left side
              else if((!(BlackKingMoved) && !(firstBlackRookMoved)) && id === "c8" 
                      && (!allPiecesToArrayB.includes("b8")) 
                      && (!allPiecesToArrayB.includes("c8")) 
                      && (!allPiecesToArrayB.includes("d8"))){
                pieces.kingB = pieces.kingB.filter(position => position !== currentClicked);
                pieces.kingB.push(id);
                piecesBlack.kingB = piecesBlack.kingB.filter(position => position !== currentClicked);
                piecesBlack.kingB.push(id);

                pieces.rookB = pieces.rookB.filter(position => position !== "a8");
                pieces.rookB.push("d8");
                piecesBlack.rookB = piecesBlack.rookB.filter(position => position !== "a8");
                piecesBlack.rookB.push("d8");
                setPieces(pieces);
                setPiecesBlack(piecesBlack);
                setBlackKingMoved(true);
                setWhiteMove(true);
                setHighlightedSquares([]);
              }
              //Castling of the black king right side
              else if((!(BlackKingMoved) && !(secondBlackRookMoved)) && id === "g8" 
                      && (!allPiecesToArrayB.includes("f8")) 
                      && (!allPiecesToArrayB.includes("g8")) ){
                pieces.kingB = pieces.kingB.filter(position => position !== currentClicked);
                pieces.kingB.push(id);
                piecesBlack.kingB = piecesBlack.kingB.filter(position => position !== currentClicked);
                piecesBlack.kingB.push(id);

                pieces.rookB = pieces.rookB.filter(position => position !== "h8");
                pieces.rookB.push("f8");
                piecesBlack.rookB = piecesBlack.rookB.filter(position => position !== "h8");
                piecesBlack.rookB.push("f8");
                setPieces(pieces);
                setPiecesBlack(piecesBlack);
                setBlackKingMoved(true);
                setWhiteMove(true);
                setHighlightedSquares([]);
              }
            }
          }
      }
    }
  };

  return (
    <>
    <div className="container">
        <div className="chessboard">
        <div className="rowEight">
            <div id="a8" className={`even ${highlightedSquares.includes("a8") ? "highlight" : ""}`} onClick={() => handleClick("a8")}>
                {findPieceByPosition(pieces, "a8") && (
                    <img src={findPieceByPosition(pieces, "a8") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="b8" className={`odd ${highlightedSquares.includes("b8") ? "highlight" : ""}`} onClick={() => handleClick("b8")}>
                {findPieceByPosition(pieces, "b8") && (
                    <img src={findPieceByPosition(pieces, "b8") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="c8" className={`even ${highlightedSquares.includes("c8") ? "highlight" : ""}`} onClick={() => handleClick("c8")}>
                {findPieceByPosition(pieces, "c8") && (
                    <img src={findPieceByPosition(pieces, "c8") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="d8" className={`odd ${highlightedSquares.includes("d8") ? "highlight" : ""}`} onClick={() => handleClick("d8")}>
                {findPieceByPosition(pieces, "d8") && (
                    <img src={findPieceByPosition(pieces, "d8") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="e8" className={`even ${highlightedSquares.includes("e8") ? "highlight" : ""}`} onClick={() => handleClick("e8")}>
                {findPieceByPosition(pieces, "e8") && (
                    <img src={findPieceByPosition(pieces, "e8") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="f8" className={`odd ${highlightedSquares.includes("f8") ? "highlight" : ""}`} onClick={() => handleClick("f8")}>
                {findPieceByPosition(pieces, "f8") && (
                    <img src={findPieceByPosition(pieces, "f8") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="g8" className={`even ${highlightedSquares.includes("g8") ? "highlight" : ""}`} onClick={() => handleClick("g8")}>
                {findPieceByPosition(pieces, "g8") && (
                    <img src={findPieceByPosition(pieces, "g8") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="h8" className={`odd ${highlightedSquares.includes("h8") ? "highlight" : ""}`} onClick={() => handleClick("h8")}>
                {findPieceByPosition(pieces, "h8") && (
                    <img src={findPieceByPosition(pieces, "h8") ?? undefined} alt="chess piece" />
                )}
            </div>
        </div>
        <div className="rowSeven">
            <div id="a7" className={`odd ${highlightedSquares.includes("a7") ? "highlight" : ""}`} onClick={() => handleClick("a7")}>
                {findPieceByPosition(pieces, "a7") && (
                    <img src={findPieceByPosition(pieces, "a7") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="b7" className={`even ${highlightedSquares.includes("b7") ? "highlight" : ""}`} onClick={() => handleClick("b7")}>
                {findPieceByPosition(pieces, "b7") && (
                    <img src={findPieceByPosition(pieces, "b7") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="c7" className={`odd ${highlightedSquares.includes("c7") ? "highlight" : ""}`} onClick={() => handleClick("c7")}>
                {findPieceByPosition(pieces, "c7") && (
                    <img src={findPieceByPosition(pieces, "c7") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="d7" className={`even ${highlightedSquares.includes("d7") ? "highlight" : ""}`} onClick={() => handleClick("d7")}>
                {findPieceByPosition(pieces, "d7") && (
                    <img src={findPieceByPosition(pieces, "d7") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="e7" className={`odd ${highlightedSquares.includes("e7") ? "highlight" : ""}`} onClick={() => handleClick("e7")}>
                {findPieceByPosition(pieces, "e7") && (
                    <img src={findPieceByPosition(pieces, "e7") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="f7" className={`even ${highlightedSquares.includes("f7") ? "highlight" : ""}`} onClick={() => handleClick("f7")}>
                {findPieceByPosition(pieces, "f7") && (
                    <img src={findPieceByPosition(pieces, "f7") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="g7" className={`odd ${highlightedSquares.includes("g7") ? "highlight" : ""}`} onClick={() => handleClick("g7")}>
                {findPieceByPosition(pieces, "g7") && (
                    <img src={findPieceByPosition(pieces, "g7") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="h7" className={`even ${highlightedSquares.includes("h7") ? "highlight" : ""}`} onClick={() => handleClick("h7")}>
                {findPieceByPosition(pieces, "h7") && (
                    <img src={findPieceByPosition(pieces, "h7") ?? undefined} alt="chess piece" />
                )}
            </div>
        </div>
        <div className="rowSix">
            <div id="a6" className={`even ${highlightedSquares.includes("a6") ? "highlight" : ""}`} onClick={() => handleClick("a6")}>
                {findPieceByPosition(pieces, "a6") && (
                    <img src={findPieceByPosition(pieces, "a6") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="b6" className={`odd ${highlightedSquares.includes("b6") ? "highlight" : ""}`} onClick={() => handleClick("b6")}>
                {findPieceByPosition(pieces, "b6") && (
                    <img src={findPieceByPosition(pieces, "b6") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="c6" className={`even ${highlightedSquares.includes("c6") ? "highlight" : ""}`} onClick={() => handleClick("c6")}>
                {findPieceByPosition(pieces, "c6") && (
                    <img src={findPieceByPosition(pieces, "c6") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="d6" className={`odd ${highlightedSquares.includes("d6") ? "highlight" : ""}`} onClick={() => handleClick("d6")}>
                {findPieceByPosition(pieces, "d6") && (
                    <img src={findPieceByPosition(pieces, "d6") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="e6" className={`even ${highlightedSquares.includes("e6") ? "highlight" : ""}`} onClick={() => handleClick("e6")}>
                {findPieceByPosition(pieces, "e6") && (
                    <img src={findPieceByPosition(pieces, "e6") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="f6" className={`odd ${highlightedSquares.includes("f6") ? "highlight" : ""}`} onClick={() => handleClick("f6")}>
                {findPieceByPosition(pieces, "f6") && (
                    <img src={findPieceByPosition(pieces, "f6") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="g6" className={`even ${highlightedSquares.includes("g6") ? "highlight" : ""}`} onClick={() => handleClick("g6")}>
                {findPieceByPosition(pieces, "g6") && (
                    <img src={findPieceByPosition(pieces, "g6") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="h6" className={`odd ${highlightedSquares.includes("h6") ? "highlight" : ""}`} onClick={() => handleClick("h6")}>
                {findPieceByPosition(pieces, "h6") && (
                    <img src={findPieceByPosition(pieces, "h6") ?? undefined} alt="chess piece" />
                )}
            </div>
        </div>
        <div className="rowFive">
            <div id="a5" className={`odd ${highlightedSquares.includes("a5") ? "highlight" : ""}`} onClick={() => handleClick("a5")}>
                {findPieceByPosition(pieces, "a5") && (
                    <img src={findPieceByPosition(pieces, "a5") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="b5" className={`even ${highlightedSquares.includes("b5") ? "highlight" : ""}`} onClick={() => handleClick("b5")}>
                {findPieceByPosition(pieces, "b5") && (
                    <img src={findPieceByPosition(pieces, "b5") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="c5" className={`odd ${highlightedSquares.includes("c5") ? "highlight" : ""}`} onClick={() => handleClick("c5")}>
                {findPieceByPosition(pieces, "c5") && (
                    <img src={findPieceByPosition(pieces, "c5") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="d5" className={`even ${highlightedSquares.includes("d5") ? "highlight" : ""}`} onClick={() => handleClick("d5")}>
                {findPieceByPosition(pieces, "d5") && (
                    <img src={findPieceByPosition(pieces, "d5") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="e5" className={`odd ${highlightedSquares.includes("e5") ? "highlight" : ""}`} onClick={() => handleClick("e5")}>
                {findPieceByPosition(pieces, "e5") && (
                    <img src={findPieceByPosition(pieces, "e5") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="f5" className={`even ${highlightedSquares.includes("f5") ? "highlight" : ""}`} onClick={() => handleClick("f5")}>
                {findPieceByPosition(pieces, "f5") && (
                    <img src={findPieceByPosition(pieces, "f5") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="g5" className={`odd ${highlightedSquares.includes("g5") ? "highlight" : ""}`} onClick={() => handleClick("g5")}>
                {findPieceByPosition(pieces, "g5") && (
                    <img src={findPieceByPosition(pieces, "g5") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="h5" className={`even ${highlightedSquares.includes("h5") ? "highlight" : ""}`} onClick={() => handleClick("h5")}>
                {findPieceByPosition(pieces, "h5") && (
                    <img src={findPieceByPosition(pieces, "h5") ?? undefined} alt="chess piece" />
                )}
            </div>
        </div>
        <div className="rowFour">
            <div id="a4" className={`even ${highlightedSquares.includes("a4") ? "highlight" : ""}`} onClick={() => handleClick("a4")}>
                {findPieceByPosition(pieces, "a4") && (
                    <img src={findPieceByPosition(pieces, "a4") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="b4" className={`odd ${highlightedSquares.includes("b4") ? "highlight" : ""}`} onClick={() => handleClick("b4")}>
                {findPieceByPosition(pieces, "b4") && (
                    <img src={findPieceByPosition(pieces, "b4") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="c4" className={`even ${highlightedSquares.includes("c4") ? "highlight" : ""}`} onClick={() => handleClick("c4")}>
                {findPieceByPosition(pieces, "c4") && (
                    <img src={findPieceByPosition(pieces, "c4") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="d4" className={`odd ${highlightedSquares.includes("d4") ? "highlight" : ""}`} onClick={() => handleClick("d4")}>
                {findPieceByPosition(pieces, "d4") && (
                    <img src={findPieceByPosition(pieces, "d4") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="e4" className={`even ${highlightedSquares.includes("e4") ? "highlight" : ""}`} onClick={() => handleClick("e4")}>
                {findPieceByPosition(pieces, "e4") && (
                    <img src={findPieceByPosition(pieces, "e4") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="f4" className={`odd ${highlightedSquares.includes("f4") ? "highlight" : ""}`} onClick={() => handleClick("f4")}>
                {findPieceByPosition(pieces, "f4") && (
                    <img src={findPieceByPosition(pieces, "f4") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="g4" className={`even ${highlightedSquares.includes("g4") ? "highlight" : ""}`} onClick={() => handleClick("g4")}>
                {findPieceByPosition(pieces, "g4") && (
                    <img src={findPieceByPosition(pieces, "g4") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="h4" className={`odd ${highlightedSquares.includes("h4") ? "highlight" : ""}`} onClick={() => handleClick("h4")}>
                {findPieceByPosition(pieces, "h4") && (
                    <img src={findPieceByPosition(pieces, "h4") ?? undefined} alt="chess piece" />
                )}
            </div>
        </div>
        <div className="rowThree">
            <div id="a3" className={`odd ${highlightedSquares.includes("a3") ? "highlight" : ""}`} onClick={() => handleClick("a3")}>
                {findPieceByPosition(pieces, "a3") && (
                    <img src={findPieceByPosition(pieces, "a3") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="b3" className={`even ${highlightedSquares.includes("b3") ? "highlight" : ""}`} onClick={() => handleClick("b3")}>
                {findPieceByPosition(pieces, "b3") && (
                    <img src={findPieceByPosition(pieces, "b3") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="c3" className={`odd ${highlightedSquares.includes("c3") ? "highlight" : ""}`} onClick={() => handleClick("c3")}>
                {findPieceByPosition(pieces, "c3") && (
                    <img src={findPieceByPosition(pieces, "c3") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="d3" className={`even ${highlightedSquares.includes("d3") ? "highlight" : ""}`} onClick={() => handleClick("d3")}>
                {findPieceByPosition(pieces, "d3") && (
                    <img src={findPieceByPosition(pieces, "d3") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="e3" className={`odd ${highlightedSquares.includes("e3") ? "highlight" : ""}`} onClick={() => handleClick("e3")}>
                {findPieceByPosition(pieces, "e3") && (
                    <img src={findPieceByPosition(pieces, "e3") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="f3" className={`even ${highlightedSquares.includes("f3") ? "highlight" : ""}`} onClick={() => handleClick("f3")}>
                {findPieceByPosition(pieces, "f3") && (
                    <img src={findPieceByPosition(pieces, "f3") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="g3" className={`odd ${highlightedSquares.includes("g3") ? "highlight" : ""}`} onClick={() => handleClick("g3")}>
                {findPieceByPosition(pieces, "g3") && (
                    <img src={findPieceByPosition(pieces, "g3") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="h3" className={`even ${highlightedSquares.includes("h3") ? "highlight" : ""}`} onClick={() => handleClick("h3")}>
                {findPieceByPosition(pieces, "h3") && (
                    <img src={findPieceByPosition(pieces, "h3") ?? undefined} alt="chess piece" />
                )}
            </div>
        </div>
        <div className="rowTwo">
            <div id="a2" className={`even ${highlightedSquares.includes("a2") ? "highlight" : ""}`} onClick={() => handleClick("a2")}>
                {findPieceByPosition(pieces, "a2") && (
                    <img src={findPieceByPosition(pieces, "a2") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="b2" className={`odd ${highlightedSquares.includes("b2") ? "highlight" : ""}`} onClick={() => handleClick("b2")}>
                {findPieceByPosition(pieces, "b2") && (
                    <img src={findPieceByPosition(pieces, "b2") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="c2" className={`even ${highlightedSquares.includes("c2") ? "highlight" : ""}`} onClick={() => handleClick("c2")}>
                {findPieceByPosition(pieces, "c2") && (
                    <img src={findPieceByPosition(pieces, "c2") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="d2" className={`odd ${highlightedSquares.includes("d2") ? "highlight" : ""}`} onClick={() => handleClick("d2")}>
                {findPieceByPosition(pieces, "d2") && (
                    <img src={findPieceByPosition(pieces, "d2") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="e2" className={`even ${highlightedSquares.includes("e2") ? "highlight" : ""}`} onClick={() => handleClick("e2")}>
                {findPieceByPosition(pieces, "e2") && (
                    <img src={findPieceByPosition(pieces, "e2") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="f2" className={`odd ${highlightedSquares.includes("f2") ? "highlight" : ""}`} onClick={() => handleClick("f2")}>
                {findPieceByPosition(pieces, "f2") && (
                    <img src={findPieceByPosition(pieces, "f2") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="g2" className={`even ${highlightedSquares.includes("g2") ? "highlight" : ""}`} onClick={() => handleClick("g2")}>
                {findPieceByPosition(pieces, "g2") && (
                    <img src={findPieceByPosition(pieces, "g2") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="h2" className={`odd ${highlightedSquares.includes("h2") ? "highlight" : ""}`} onClick={() => handleClick("h2")}>
                {findPieceByPosition(pieces, "h2") && (
                    <img src={findPieceByPosition(pieces, "h2") ?? undefined} alt="chess piece" />
                )}
            </div>
        </div>
        <div className="rowOne">
            <div id="a1" className={`odd ${highlightedSquares.includes("a1") ? "highlight" : ""}`} onClick={() => handleClick("a1")}>
                {findPieceByPosition(pieces, "a1") && (
                    <img src={findPieceByPosition(pieces, "a1") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="b1" className={`even ${highlightedSquares.includes("b1") ? "highlight" : ""}`} onClick={() => handleClick("b1")}>
                {findPieceByPosition(pieces, "b1") && (
                    <img src={findPieceByPosition(pieces, "b1") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="c1" className={`odd ${highlightedSquares.includes("c1") ? "highlight" : ""}`} onClick={() => handleClick("c1")}>
                {findPieceByPosition(pieces, "c1") && (
                    <img src={findPieceByPosition(pieces, "c1") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="d1" className={`even ${highlightedSquares.includes("d1") ? "highlight" : ""}`} onClick={() => handleClick("d1")}>
                {findPieceByPosition(pieces, "d1") && (
                    <img src={findPieceByPosition(pieces, "d1") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="e1" className={`odd ${highlightedSquares.includes("e1") ? "highlight" : ""}`} onClick={() => handleClick("e1")}>
                {findPieceByPosition(pieces, "e1") && (
                    <img src={findPieceByPosition(pieces, "e1") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="f1" className={`even ${highlightedSquares.includes("f1") ? "highlight" : ""}`} onClick={() => handleClick("f1")}>
                {findPieceByPosition(pieces, "f1") && (
                    <img src={findPieceByPosition(pieces, "f1") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="g1" className={`odd ${highlightedSquares.includes("g1") ? "highlight" : ""}`} onClick={() => handleClick("g1")}>
                {findPieceByPosition(pieces, "g1") && (
                    <img src={findPieceByPosition(pieces, "g1") ?? undefined} alt="chess piece" />
                )}
            </div>
            <div id="h1" className={`even ${highlightedSquares.includes("h1") ? "highlight" : ""}`} onClick={() => handleClick("h1")}>
                {findPieceByPosition(pieces, "h1") && (
                    <img src={findPieceByPosition(pieces, "h1") ?? undefined} alt="chess piece" />
                )}
            </div>
        </div>
        </div>
    </div>

    </>
  );
};

export default Chessboard;
