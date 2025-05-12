import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import back_arrow_icon from '../assets/back_arrow_icon.png';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: '',
  });

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTJlM2M2NTgzMDAzMGMzYzkzOTlkOWQ4MTFmYzFjZiIsIm5iZiI6MS43NDY4MjA2OTY4NDYwMDAyZSs5LCJzdWIiOiI2ODFlNWU1ODQ2Nzk2NDA2MDUzNDhlMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2eMCCyv-5WXHIJaih7a9618jq82WnvDH_hXlg52iHFI',
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]);
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [id]);

  return (
    <div className="relative h-screen bg-black flex flex-col items-center justify-center">
      {/* Back Arrow */}
      <img
        src={back_arrow_icon}
        alt="Back"
        className="absolute top-5 left-5 w-10 cursor-pointer z-50 pointer-events-auto"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/');
          }
        }}
      />

      {/* Video */}
      <iframe
        className="rounded-lg w-[90%] h-[90%] z-10 pointer-events-none"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>

      {/* Video Info */}
      <div className="flex justify-between items-center w-[90%] mt-4 text-white text-sm z-20">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
