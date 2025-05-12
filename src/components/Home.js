import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TitleCards from "./TitleCards";

// Assets
import hero_banner from "../assets/hero_banner.jpg";
import caption from "../assets/caption.png";
import play_icon from "../assets/play_icon.png";
import info_icon from "../assets/info_icon.png";

const Home = () => {
  return (
    <div className="home bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative"> 
      <img
  src={hero_banner}
  alt="Banner"
  className="w-full h-[1000px] object-cover [mask-image:linear-gradient(to_right,transparent,black_75%)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_75%)]"
/>


        <div className="absolute bottom-0 w-full pl-[4%] md:pl-[6%]">
          <img
            src={caption}
            alt="Caption"
            className="w-[40%] md:w-[90%] max-w-[420px] mb-2.5 hidden sm:block"
          />

          <p className="text-[12px] md:text-[17px] max-w-[700px] mb-2.5">
            Sample caption text goes here.
          </p>

          <div className="flex gap-2 mb-6 md:mb-[50px]">
            <button className="flex items-center gap-2 px-2.5 py-1 text-[10px] md:text-[15px] font-semibold rounded bg-white hover:bg-[#ffffffbf] text-black">
              <img src={play_icon} className="w-[15px] md:w-[25px]" alt="Play" />
              Play
            </button>

            <button className="flex items-center gap-2 px-2.5 py-1 text-[10px] md:text-[15px] font-semibold rounded bg-[#6d6d6eb3] text-white hover:bg-[#6d6d6e66]">
              <img src={info_icon} className="w-[15px] md:w-[25px]" alt="Info" />
              More Info
            </button>
          </div>

          <div className="pl-[4%] md:pl-[6%]">
            {/* More content or cards */}
          </div>
        </div>
      </div>

      {/* Title Card Sections */}
      <div className="bg-black">
        <TitleCards title={"Trending Now"} category={"now_playing"} />
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Picks for You"} category={"now_playing"} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
