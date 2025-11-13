import { useEffect, useState } from "react";

import useAxiosSecure from "../Hook/useAxiosSecure";
import { FaUser, FaEnvelope, FaGlobe, FaPaintBrush } from "react-icons/fa";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner";

const ArtistDetails = () => {
  const { email } = useParams();
  const axiosInstance = useAxiosSecure();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const { data: artistData } = await axiosInstance.get(`/artists/${email}`);
      const { data: artsData } = await axiosInstance.get(
        `/artworks?artist=${email}`
      );
      setArtist(artistData);
      setArtworks(artsData);
    };
    fetchData();
  }, [email, axiosInstance]);

  if (!artist)
    return (
      <div>
        <Spinner></Spinner>
        <p className="text-center py-20 text-gray-500">
          Loading artist info...
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <img
          src={artist.photoURL || "/default-artist.jpg"}
          alt={artist.name}
          className="w-40 h-40 rounded-full object-cover border-4 border-primary"
        />
        <div>
          <div className="flex items-center">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FaUser /> {artist.displayName}
            </h2>
            <button className="btn rounded-full ml-5">Follow</button>
          </div>
          <p className="text-gray-600 flex items-center gap-2">
            <FaEnvelope /> {artist.email}
          </p>
          {artist.website && (
            <p className="text-gray-600 flex items-center gap-2">
              <FaGlobe />{" "}
              <a href={artist.website} className="text-primary hover:underline">
                {artist.website}
              </a>
            </p>
          )}
          <p className="mt-2 text-gray-700">
            {artist.bio || "No bio available."}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200 my-10"></div>

      <h3 className="text-2xl text-primary font-bold mb-6 flex items-center gap-2">
        <FaPaintBrush /> Artworks by {artist.displayName}
      </h3>
      {artworks.length === 0 ? (
        <p className="text-gray-500">No artworks found for this artist.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="flex flex-col justify-between bg-white shadow-md rounded-xl overflow-hidden border border-gray-100"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-lg">{art.title}</h4>
                <p className="text-sm text-gray-500">{art.category}</p>
                <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                  <span>❤️ {art.likedBy?.length || 0}</span>
                  <div className="mt-4">
                    <Link
                      to={`/arts/art/${art._id}`}
                      className="btn btn-sm btn-primary w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistDetails;
