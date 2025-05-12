import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJlM2M2NTgzMDAzMGMzYzkzOTlkOWQ4MTFmYzFjZiIsIm5iZiI6MS43NDY4MjA2OTY4NDYwMDAyZSs5LCJzdWIiOiI2ODFlNWU1ODQ2Nzk2NDA2MDUzNDhlMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2eMCCyv-5WXHIJaih7a9618jq82WnvDH_hXlg52iHFI',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${category || 'now_playing'}?language=en-US&page=1`,
      options
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setApiData(data.results || []))
      .catch((err) => console.error('Fetch failed:', err));
  }, [category]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-12 mb-8 px-4 w-full bg-black">
      <h2 className="text-xl font-semibold text-white mb-4">{title || 'Popular on Netflix'}</h2>
      <Slider {...settings}>
        {apiData.map((card, index) => (
          <div key={index} className="px-1">
            <Link to={`/player/${card.id}`} className="relative block w-full">
              {card.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title}
                  className="rounded-lg w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-[135px] bg-zinc-800 flex items-center justify-center text-sm text-zinc-400">
                  No Image
                </div>
              )}
              <p className="absolute bottom-2 right-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                {card.original_title}
              </p>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TitleCards;
