import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";

const Diagram = () => {
  const [base64, setBase64] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const FEN = urlParams.get('fen').split(',');
  const [listening, setListening] = useState(false);


  useEffect(() => {
    if (!listening) {
      fetch(`http://localhost:3009/screenshot?fen=${FEN}`)
        .then(response => response.blob())
        .then(response => {
          const reader = new FileReader();
          reader.readAsDataURL(response); 
          reader.onloadend = function() {
              const base64data = reader.result;                
              setBase64(base64data)
          }
        })
      setListening(true);
    }
  }, [base64, FEN, listening])

  return (
    <div className="bg-gray-400 h-screen w-screen m-auto">
      {!base64 ? (
        <div
          className={`grid ${FEN.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} m-auto pt-12 h-auto`}
          id="diagram"
        >
          {FEN.map((fen, i) => {
            return (
              <div className="p-auto m-auto mb-16 h-auto">
                  <span className="text-md font-normal text-black">#{i + 1}</span>
                  <Chessboard
                      id={`${i}key`}
                      position={fen}
                      transitionDuration={100}
                      showNotation={false}
                      width={350}
                  />
              </div>
            )
          })}
        </div>
      ):(
          <>
              <h2 className="text-3xl text-center pt-6 mb-12">PNG image of diagram</h2>
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
