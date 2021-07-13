import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import Chess from "chess.js";

const Diagram = () => {
  const [base64, setBase64] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const [listening, setListening] = useState(false);

  const FEN = urlParams.get('fen').split(',').filter(
    fen => new Chess().load(fen) === true
  ).map((item) => {
    const chess = new Chess()
    chess.load(item)
    return [item, chess.turn()]
  }).slice(0, 10);

  const isMated = (fen) => {
    const chess = new Chess(fen)
    return([chess.in_checkmate(), chess.turn()])
  }

  useEffect(() => {
    if (!listening) {
      fetch(`https://d9.wtf/screenshot?fen=${FEN}`)
        .then(response => response.blob())
        .then(response => {
          const reader = new FileReader();
          reader.readAsDataURL(response); 
          reader.onloadend = () => {
              const base64data = reader.result;                
              setBase64(base64data)
          }
        })
      setListening(true);
    }
  }, [base64, listening, FEN])

  return (
    <div className="w-screen h-full min-h-screen m-auto overflow-y-hidden bg-gray-400">
      {!base64 ? (
        <div>
          <div className="grid max-w-lg grid-cols-2 pt-10 pl-6 m-auto">
            <h2 className="pt-10 mb-12 text-3xl font-normal text-center text-gray-800 opacity-75">creating diagram</h2>
            <div className="flex items-center justify-center ">
              <div className="w-32 h-32 border-b-2 border-gray-600 rounded-full animate-spin"></div>
            </div>
          </div>
          <div
            className={`grid grid-cols-1 ${FEN.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'} pt-12 h-auto min-w-full mx-auto`}
            id="diagram"
          >
            {FEN.map((fen, i) => {
              return (
                <div className="h-auto m-auto p-auto pb-28">
                  <div className="flex flex-row">
                    <span className="font-normal text-black text-md">#{i + 1}</span>
                    {isMated(fen[0])[0] === true ? (
                      <>
                        {isMated(fen[0])[1] === 'b' ? (
                          <div className="ml-auto">1-0</div>
                        ):(
                          <div className="ml-auto">0-1</div>
                        )}
                      </>
                    ):(
                      <div className={`rounded-full h-4 w-4 ${fen[1] === 'b' ? "bg-black" : "bg-white border-black border-1"} ml-auto mr-3`}></div>
                    )}
                  </div>
                  <Chessboard
                      id={`${i}key`}
                      position={fen[0]}
                      transitionDuration={100}
                      showNotation={false}
                      width={350}
                  />
                </div>
              )
            })}
          </div>
        </div>
      ):(
        <>
          <h2 className="pt-6 mb-12 text-3xl font-normal text-center text-gray-800 opacity-75">PNG of diagram created!</h2>
          <div className="m-auto">
            <img
              src={base64}
              alt="chess diagram made from the FEN strings submitted"
              className="m-auto border-gray-500 shadow-xl border-1"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Diagram;
