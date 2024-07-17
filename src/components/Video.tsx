import React from "react";

const Video = (mediaUrl:any) => {
  return (
    <video className="w-52 h-full rounded-lg " width="50" height="50" autoPlay>
      <source src={mediaUrl.mediaUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
