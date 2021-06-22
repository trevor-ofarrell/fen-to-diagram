import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";

const fens = [
  "start",
  "8/p7/1p1nB1p1/3P4/1P2p3/3k1K1P/P7/8 w - - 0 50",
  "8/p7/1p1nB1p1/3P4/1P2p3/3k1K1P/P7/8 w - - 0 50",
  "start",
  "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R",
  "start",
]

function App() {
  const [base64, setBase64] = useState('');

  useEffect(() => {
    let outside

    fetch('http://localhost:3009/screenshot')
      .then(response => response.blob())
      .then(response => {
        var reader = new FileReader();
        console.log(response.type)
        reader.readAsDataURL(response); 
        reader.onloadend = function() {
            var base64data = reader.result;                
            console.log(base64data);
            setBase64(base64data)
        }
      })
      //.then(images => {
          // Then create a local URL for that image and print it 
          //outside = URL.createObjectURL(images)
          //console.log(outside)
      //})
  }, [base64])

  return (
    <div className="bg-gray-400 h-screen w-screen m-auto">
      <div className="grid grid-flow-row grid-cols-2 grid-rows-3 m-auto pt-12">
        {fens.map((fen, i) => {
          return <div className="p-auto m-auto mb-12">
            <span className="text-md font-normal text-black">#{i + 1}</span>
            <Chessboard
              id={`${i}key`}
              position={fen}
              transitionDuration={100}
              showNotation={false}
              width={350}
            />
          </div>
        })}
        <div>
          <img src={base64}/>
        </div>
      </div>
    </div>
  );
}

export default App;
