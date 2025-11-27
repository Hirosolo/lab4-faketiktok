import React, { useRef, useEffect } from "react";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import "./VideoCard.css";
import { use } from "react";

const VideoCard = (props) => {
  const {
    url,
    username,
    description,
    song,
    likes,
    shares,
    comments,
    saves,
    profilePic,
    setVideoRef,
    autoplay,
    index,
  } = props;
  const videoRef = useRef(null);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      const p = videoRef.current.play();
      if (p && p.catch) p.catch(() => {});
    }
  }, [autoplay]);
  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  return (
    <div className="video">
      <video
        className="player"
        onClick={onVideoPress}
        data-index={index}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        muted
        playsInline
        src={url}
      ></video>
      <div className="bottom-controls">
        <div className="fotter-left">
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
        </div>
        <div className="footer-right">
          <FooterRight
            url={url}
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
