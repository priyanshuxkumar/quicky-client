import React from "react";

const Video = (mediaUrl:any) => {
  return (
    <video className="w-full h-full rounded-xl " width="320" height="300" autoPlay>
      <source src={mediaUrl.mediaUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
