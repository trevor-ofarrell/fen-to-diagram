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
    history.go(0)
  };

  return (
    <div
      style={{ height: height, width: width }}
      className="bg-scheme-dark overflow-hidden fixed h-full max-h-full"
    >
      <div className="text-scheme-orange text-3xl text-center p-2 pb-6">
        FEN to diagram
      </div>
      <form>
        <div className="md:w-3/5 md:mt-20 max-w-xl overflow-hidden p-4 mt-6 m-auto">
          <input
            className="w-full h-10 pl-3 mb-4 text-base bg-scheme-light placeholder-gray-500 text-gray-500 border rounded-lg focus:shadow-outline"
            id="message"
            type="text"
            label="Message"
            placeholder="Enter FEN(s). Seperate multiple entries with commas."
            variant="outlined"
            value={FEN}
            onChange={(event) => setFEN(event.target.value)}
          />
          <div className="m-auto text-center text-white mb-6">
            <button
              onClick={() => handleClick()}
              className="border-scheme-orange border-1 px-20 py-4 mt-4 rounded-lg"
            >
              create diagram
            </button>
          </div>
        </div>
      </form>
      <footer className="text-center fixed w-full bottom-0 text-scheme-orange p-4 flex">
        <a
          href="https://github.com/trevor-ofarrell/lichessTV-watch-party"
          className="lg:text-xl text-sm underline m-auto"
        >
          check out the source code on GitHub
        </a>
      </footer>
    </div>
  );
};

export default Home;
