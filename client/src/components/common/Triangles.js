import React from "react";
import triangles from "./Triangles.gif";

export default () => {
  return (
    <div>
      <img
        src={triangles}
        style={{ widht: "500px", margin: "auto", display: "block" }}
        alt="loading"
      />
      <p className="text-center text-muted">
        Fetching news data, please wait. Thanks for visiting this site!
      </p>
    </div>
  );
};
