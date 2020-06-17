import React from "react";

function Home(props) {
  return (
    <img
      alt="backgroun-img"
      style={{
        height: "-webkit-fill-available",
        width: "-webkit-fill-available",
      }}
      src={process.env.PUBLIC_URL + "/home-background.jpg"}
    />
  );
}

export default Home;
