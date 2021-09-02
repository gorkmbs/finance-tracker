import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <div className="flex justify-center m-4 p5">
        <h1>404 There is no such page -_-</h1>
      </div>
      <div className="flex justify-center m-4 p5">
        <Link to="/" className="linkWithoutBlueLine">
          <h1 className="text-blue-600">GO BACK HOME</h1>
        </Link>
      </div>
    </>
  );
};

export default Error;
