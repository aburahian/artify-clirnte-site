import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";

const ArtDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  const [art, setArt] = useState({});
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    axiosInstance.get(`/artworks/${id}`).then((res) => {
      const data = res.data;
      const likesArray = Array.isArray(data.likedBy) ? data.likedBy : [];

      setArt(data);
      setLiked(user?.email ? likesArray.includes(user.email) : false);
      setFavorited(data.favorites?.includes(user?.email));
      setLikeCount(likesArray.length);
      setLoading(false);
    });
  }, [axiosInstance, id, user]);

  const handleLike = () => {
    axiosInstance
      .patch(`/artworks/${id}/like`, { userEmail: user.email })
      .then((res) => {
        console.log(res.data);
        setLiked(res.data.liked);
        setLikeCount(res.data.likeCount);
      })
      .catch((err) => console.error(err));
  };

  const handleFavorite = () => {
    axiosInstance
      .patch(`/artworks/${id}/favorite`, { userEmail: user.email })
      .then(() => {
        setFavorited((prev) => !prev);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-11/12 mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <img
          src={art.image}
          alt={art.title}
          className="w-full h-full object-cover rounded-3xl shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-2">
            {art.title}
          </h1>
          <p className=" text-sm mb-4">{art.artistName}</p>
          <p className=" text-lg mb-4">{art.medium}</p>
          <p className="text-gray-500 leading-relaxed mb-6">
            {art.description}
          </p>

          <Link to={`/arts/art/artist/${art.artistEmail}`}>
            <button className="flex items-center gap-2 px-5 bg-gray-200 mb-6 text-gray-700 py-2 rounded-full hover:bg-gray-300 transition">
              Artist Details
            </button>
          </Link>

          <div className="flex gap-4 mb-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition ${
                liked ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {liked ? <FaHeart /> : <FaRegHeart />} {likeCount}
            </button>

            <button
              onClick={handleFavorite}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition ${
                favorited
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <FaStar /> {favorited ? "Favorited" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetails;
