import React, { useEffect, useState } from "react";
import NotFound from "./NotFound";
import Spinner from "../components/Spinner";
import ArtCard from "../components/ArtCard";
import useAxios from "../Hook/useAxios";

const Home = () => {
  const axiosInstance = useAxios();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/latest-art").then((res) => setArts(res.data));
    setLoading(false);
  }, [axiosInstance]);
  return (
    <div className="w-11/12 mx-auto my-30">
      <h2 className="text-3xl font-extrabold text-primary my-10">
        Explore Artworks
      </h2>
      <div className="border-b-2 border-primary my-9"></div>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {arts.map((art) => (
            <ArtCard key={art._id} art={art}></ArtCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
