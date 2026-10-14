import { useState, useRef, useEffect } from "react";
import video1 from "../assets/videos/Vid-1.mp4";
import video2 from "../assets/videos/Vid-2.mp4";
import "./IntroOverlay.css";

const VIDEOS = [video1, video2];

function IntroOverlay({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [closing, setClosing] = useState(false);
  const videoRef = useRef(null);
  const nextVideoRef = useRef(null);

  // Preload the upcoming video in a hidden <video> so it's already
  // buffered by the time it's this one's turn to play.
  useEffect(() => {
    const nextIndex = (index + 1) % VIDEOS.length;
    if (nextVideoRef.current) {
      nextVideoRef.current.src = VIDEOS[nextIndex];
      nextVideoRef.current.load();
    }
  }, [index]);

  // Swap the src on the SAME video element instead of unmounting/
  // remounting it (no more `key={index}`), which avoids the gap
  // where nothing is rendered.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = VIDEOS[index];
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [index]);

  function handleVideoEnd() {
    setIndex((prev) => (prev + 1) % VIDEOS.length);
  }

  function handleDismiss() {
    setClosing(true);
    setTimeout(() => {
      onFinish();
    }, 900); // matches CSS transition duration
  }

  return (
    <div
      className={`intro-overlay ${closing ? "is-closing" : ""}`}
      onClick={handleDismiss}
    >
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* Hidden preload buffer for the next clip in the loop */}
      <video ref={nextVideoRef} className="intro-video-preload" muted playsInline />

      <div className="intro-content">
        <h1>Deb Lucky Fashion Jewelries</h1>
        <p>Click anywhere to enter</p>
      </div>
    </div>
  );
}

export default IntroOverlay;