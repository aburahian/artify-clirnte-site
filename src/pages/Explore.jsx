import React, { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import NotFound from "./NotFound";
import Spinner from "../components/Spinner";
import useAxiosSecure from "../Hook/useAxiosSecure";

const Explore = () => {
  const axiosInstance = useAxiosSecure();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setLoading(true);
    axiosInstance.get("artWorks").then((res) => setArts(res.data));
    setLoading(false);
  }, [axiosInstance]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    setQuery(query);
    setLoading(true);
    axiosInstance.get(`/search?search=${query}`).then((res) => {
      setArts(res.data);
      setLoading(false);
    });
  };
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setLoading(true);
    axiosInstance.get(`/artWorks?category=${category}`).then((res) => {
      setArts(res.data);
      setLoading(false);
    });
  };
  return (
    <div className="w-11/12 mx-auto ">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4  my-8">
        <h2 className="text-3xl font-extrabold text-primary">
          Explore Artworks
        </h2>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search by title or artist..."
            className="input input-bordered w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input type="submit" value="Search" className="btn bg-primary" />
        </form>
      </div>
      <div className="mb-6">
        <label className="mr-3 font-semibold">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="select select-bordered w-64"
        >
          <option disabled>Select Category</option>
          <option>Digital Art</option>
          <option>Illustration</option>
          <option>Photography</option>
          <option>Painting</option>
          <option>3D Model</option>
        </select>
      </div>
      <div className="border-b-2 border-primary my-9"></div>
      {loading ? (
        <Spinner></Spinner>
      ) : query.length > 0 && arts.length === 0 ? (
        <NotFound></NotFound>
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

export default Explore;
