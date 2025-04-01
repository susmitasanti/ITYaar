import React from "react";

import Logo from "./img/icon.png";
import Video from "./Video/Video";
import ReelIcon from "./img/instagram-reel.png"


import "./Reels.css";

export default function Reels() {
   const data = [
    {
      channel: "aaa",
      song: "song-1",
      url: "https://projects-results.d-id.com/auth0%7C67e65c3f02ef757b3627e485%2Fprj_0Dkc6oBW-AewsvmgHNh0j%2Fresult.mp4", // Replace with actual video URL
      likes: "32",
      comment: "2",
      shares: "23",
    },
    {
      channel: "bbb",
      song: "song-2",
      url: "https://projects-results.d-id.com/auth0%7C67e65c3f02ef757b3627e485%2Fprj__yBEcZnUKEF4TZmj69fMN%2Fresult.mp4", // Replace with actual video URL
      likes: "3",
      comment: "22",
      shares: "23",
    },
  ];


  return (
      <center>
        <div className="logo">
          <img alt="logo" src={ReelIcon} className="insta-logo" />
        </div>
        <h3>ITYaar</h3>
        {/*  */}

        <div className="video-container" id="video-container">
          {/*  */}

          {data.map((list, i) => (
            <Video
              key={i}
              channel={list.channel}
              song={list.song}
              url={list.url}
              likes={list.likes}
              comment={list.comment}
              shares={list.shares}
            />
          ))}

          {/*  */}
        </div>
      </center>
  );
}
