import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ShareModal.css";

function ShareModal({ visible, onClose, videoUrl }) {
  if (!visible) return null;

  const handleShareClick = (platform) => {
    let url = "";
    const text = encodeURIComponent("Check out this amazing video!");
    const vidUrl = encodeURIComponent(videoUrl || window.location.href);

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${vidUrl}`;
        break;
      case "instagram":
        // Instagram doesn't have a direct share API; just show a placeholder
        alert("Open Instagram and share manually!");
        return;
      case "threads":
        url = `https://threads.net/intent/post?text=${text}%20${vidUrl}`;
        break;
      default:
        break;
    }

    if (url) window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          <h2 style={{color:"black"}}>Share</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-btn"
            onClick={onClose}
          />
        </div>
        <div className="share-options">
          <button
            className="share-option facebook"
            onClick={() => handleShareClick("facebook")}
          >
            <span className="icon">f</span>
            <span className="label">Facebook</span>
          </button>
          <button
            className="share-option instagram"
            onClick={() => handleShareClick("instagram")}
          >
            <span className="icon">📷</span>
            <span className="label">Instagram</span>
          </button>
          <button
            className="share-option threads"
            onClick={() => handleShareClick("threads")}
          >
            <span className="icon">@</span>
            <span className="label">Threads</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
