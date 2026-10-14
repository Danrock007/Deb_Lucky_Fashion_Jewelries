import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroVideo from "../assets/videos/Vid-2.mp4";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <main className="home-hero">
        <video
          className="home-hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="home-hero-content">
          <h1>Timeless Elegance, Crafted for You</h1>
          <p>Discover fine jewelry designed to last a lifetime.</p>
          <Link to="/shop" className="cta-button">
            Explore Collections
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;