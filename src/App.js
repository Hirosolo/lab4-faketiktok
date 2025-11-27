import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";
import UploadInfo from "./components/UploadInfo";

// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    profilePic:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2e4b2a2b-521c-4707-b16f-645b22f8c479/dfmosun-003ff67c-2e4c-48ae-a83a-5873209dd47f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJlNGIyYTJiLTUyMWMtNDcwNy1iMTZmLTY0NWIyMmY4YzQ3OVwvZGZtb3N1bi0wMDNmZjY3Yy0yZTRjLTQ4YWUtYTgzYS01ODczMjA5ZGQ0N2YuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Blln_ahbLc9cc2CJhrTQ3BsCJmN4HZV86PUQdNmxWf8",
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    profilePic:
      "https://i.pinimg.com/736x/a6/84/42/a684423469f5f4f2de485cb9e10f457b.jpg",
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    profilePic:
      "https://th.bing.com/th/id/OIP.SosMdPq_Pph_2wEJW2gouwHaHa?o=7&cb=ucfimg2rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    profilePic:
      "https://tse1.explicit.bing.net/th/id/OIP.lL0B6_oiduUOUFTzRozI3AHaH6?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const infoTimeoutRef = useRef(null);
  const startY = useRef(null);
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;
        if (entry.isIntersecting) {
          // Play may return a promise that rejects if the user hasn't
          // interacted with the page yet — catch to avoid uncaught errors.
          const p = videoElement.play();
          if (p && p.catch) p.catch(() => {});
          // try to read the index from a data attribute
          const idx = parseInt(videoElement.dataset.index, 10);
          if (!Number.isNaN(idx)) setCurrentIndex(idx);
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  // Mouse handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const threshold = 50; // drag distance in pixels
    let lastScrollTime = 0;
    const scrollCooldown = 600; // ms between automatic navigations

    const handleMouseDown = (e) => {
      // Only start drag on left mouse button
      if (e.button !== 0) return;
      isDragging.current = true;
      startY.current = e.clientY;
      // Prevent text selection while dragging
      if (container && container.style) container.style.userSelect = "none";
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current || startY.current === null) return;

      const deltaY = e.clientY - startY.current;
      const now = Date.now();

      if (deltaY < -threshold && now - lastScrollTime > scrollCooldown) {
        scrollToNextVideo();
        startY.current = e.clientY; // reset so user can continue dragging
        lastScrollTime = now;
      } else if (deltaY > threshold && now - lastScrollTime > scrollCooldown) {
        scrollToPrevVideo();
        startY.current = e.clientY;
        lastScrollTime = now;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      startY.current = null;
      if (container && container.style) container.style.userSelect = "";
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);

    // Also support leaving the container while dragging
    container.addEventListener("mouseleave", handleMouseUp);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      if (container && container.style) container.style.userSelect = "";
    };
  }, []);

  // Handle scroll function
  const scrollToNextVideo = () => {
    const current = window.scrollY;
    const height = window.innerHeight;
    window.scrollTo({
      top: current + height,
      behavior: "smooth",
    });
    // show upload info briefly when navigating
    if (infoTimeoutRef.current) clearTimeout(infoTimeoutRef.current);
    setShowInfo(true);
    infoTimeoutRef.current = setTimeout(() => setShowInfo(false), 3000);
  };

  const scrollToPrevVideo = () => {
    const current = window.scrollY;
    const height = window.innerHeight;
    window.scrollTo({
      top: current - height,
      behavior: "smooth",
    });
    if (infoTimeoutRef.current) clearTimeout(infoTimeoutRef.current);
    setShowInfo(true);
    infoTimeoutRef.current = setTimeout(() => setShowInfo(false), 3000);
  };

  // Show info when user presses ArrowRight
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        if (infoTimeoutRef.current) clearTimeout(infoTimeoutRef.current);
        setShowInfo(true);
        infoTimeoutRef.current = setTimeout(() => setShowInfo(false), 3000);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="app">
      <div className="container " ref={containerRef}>
        <TopNavbar className="top-navbar" />
        {/* Here we map over the videos array and create VideoCard components */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            index={index}
            autoplay={index === 0}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
      {/* Upload info overlay */}
      <UploadInfo video={videos[currentIndex]} visible={showInfo} />
    </div>
  );
}

export default App;
