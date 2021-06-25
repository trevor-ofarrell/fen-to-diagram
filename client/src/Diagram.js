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
    <div className="bg-gray-400 min-h-screen h-full w-screen m-auto overflow-y-hidden">
      {!base64 ? (
        <div>
          <div className="max-w-lg m-auto grid grid-cols-2 pt-10 pl-6">
            <h2 className="text-3xl font-normal text-center pt-10 mb-12 opacity-75 text-gray-800">creating diagram</h2>
            <div class=" flex justify-center items-center">
              <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600"></div>
            </div>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 pt-12 h-auto min-w-full}`}
            id="diagram"
          >
            {FEN.map((fen, i) => {
              return (
                <div className="p-auto pb-28 m-auto h-auto">
                  <div className="flex flex-row">
                    <span className="text-md font-normal text-black">#{i + 1}</span>
                    <div className={`rounded-full h-4 w-4 ${fen[1] === 'b' ? "bg-black" : "bg-white border-black border-1"} ml-auto mr-3`}></div>
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
          <h2 className="text-3xl font-normal text-center pt-6 mb-12 text-gray-800 opacity-75">PNG of diagram created!</h2>
          <div className="m-auto">
            <img
              src={base64}
              alt="chess diagram made from the FEN strings submitted"
              className="m-auto border-1 border-gray-500 shadow-xl"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Diagram;
