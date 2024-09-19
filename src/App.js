import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { FetchMP3, FetchTrack } from "./api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [songs, setsongs] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      let data = await fetch(
        "https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json"
      );
      let jsonData = await data.json();
      setVideos(jsonData);
    };
    fetchData();
    const fetchSongs = async () => {
      let res = await FetchTrack();

      if (res) {
        console.log(res);
        // res?.map((el) => {
        //   console.log(el)
        //   setsongs((prev) => [...prev, el?.preview_url]);
        // });
        setsongs(res);
      }
    };
    fetchSongs();
  }, []);
  let bgImage =
    "data:image/png;base64,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";
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {videos?.length > 0 &&
        videos?.map((elem, i) => {
          return (
            <div
              style={{ width: "24%", height: "250px", margin: "8px 0px" }}
              key={i}
            >
              <ReactPlayer
                url={elem?.videoUrl}
                controls
                width="100%"
                height="100%"
                style={{ backgroundColor: "#000000" }}
                // light="true"
              />
            </div>
          );
        })}
      {songs.length > 0 &&
        songs.map((el, i) => {
          return (
            <div
              style={{
                width: "24%",
                height: "250px",
                margin: "8px 0px",
                border: "1px solid black",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              key={i}
            >
              <div
                style={{
                  height: "65%",
                  backgroundImage: `url(${bgImage})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <h2 style={{ textAlign: "center" }}>{el?.name}</h2>
              </div>
              <div style={{ height: "35%" }}>
                <AudioPlayer
                  // autoPlay
                  src={el?.preview_url}
                  onPlay={(e) => console.log("onPlay")}
                  controls
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;

// import axios from "axios";

// const options = {
//       method: 'GET',
//       url: 'https://spotify23.p.rapidapi.com/search/',
//       params: {
//         q: '<REQUIRED>',
//      },
//       headers: {
//         'X-RapidAPI-Key': '442dbdc7d1msh78be1622678ea11p1d5053jsnd0a5775977b2',
//         'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//       }
//     };
// export const FetchFunc=async()=>{
//  const {data}= await axios.request(options)
//  return data?.tracks?.items

// }
