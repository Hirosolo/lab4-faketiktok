import React from "react";
import "./UploadInfo.css";

function UploadInfo({ video, visible }) {
  if (!video) return null;

  return (
    <div className={`upload-info ${visible ? "visible" : ""}`}>
      <div className="upload-left">
        <img src={video.profilePic} alt="profile" />
      </div>
      <div className="upload-main">
        <div className="upload-user">@{video.username}</div>
        <div className="upload-desc">{video.description}</div>
        <div className="upload-song">🎵 {video.song}</div>
      </div>
      <div className="upload-meta">
        <div>❤️ {video.likes}</div>
        <div>💬 {video.comments}</div>
        <div>🔖 {video.saves}</div>
      </div>
    </div>
  );
}

export default UploadInfo;
