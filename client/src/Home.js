import React, { useState } from "react";
import useWindowDimensions from "./useWindowDimensions";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { height, width } = useWindowDimensions();
  const [FEN, setFEN] = useState("");
  const history = useHistory();

  const handleClick = () => {
    history.push({
        pathname: `/diagram?fen=${FEN}`,
        state: { FEN },
    });
    history.go(0);
  };

  return (
    <div
      style={{ height: height, width: width }}
      className="bg-gray-400 overflow-hidden fixed h-full max-h-full"
    >
      <div className="text-gray-700 text-3xl text-center p-2 pb-6">
        FEN to diagram
      </div>
      <form>
        <div className="md:w-3/5 md:mt-50% max-w-xl overflow-hidden p-4 mt-6 m-auto">
          <div className="text-md font-normal text-gray-600 text-center pb-2">limit of 10 FENs per request</div>
          <input
            className="w-full h-10 pl-3 mb-8 text-base bg-gray-500 placeholder-gray-700 text-gray-700 border rounded-lg"
            id="message"
            type="text"
            label="Message"
            placeholder="Enter FEN(s). Separate multiple entries with commas."
            variant="outlined"
            autoComplete="off"
            value={FEN}
            onChange={(event) => setFEN(event.target.value)}
          />
          <div className="m-auto text-center text-gray-700 mb-6">
            <button
              onClick={() => handleClick()}
              className="border-gray-700 border-1 px-20 py-4 mt-4 rounded-lg"
            >
              create diagram
            </button>
          </div>
        </div>
      </form>
      <footer className="text-center fixed w-full bottom-0 text-gray-700 p-4 flex">
        <a
          href="https://github.com/trevor-ofarrell/fen-to-diagram"
          className="lg:text-xl text-sm underline m-auto"
        >
          check out the source code on GitHub
        </a>
      </footer>
    </div>
  );
};

export default Home;
