import React from "react";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { toast } from "react-toastify";

const AddArtwork = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const medium = e.target.medium.value;
    const addArt = {
      title,
      image,
      category,
      description,
      medium,
      artistName: user?.displayName || "Unknown Artist",
      artistEmail: user?.email,
      createdAt: new Date(),
      likes: 0,
      follower: 0,
    };
    axiosInstance.post("/artWork", addArt).then((res) => {
      if (res.data.insertedId) {
        toast.success("Artwork added successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to add artwork. Try again!");
      }
    });
  };
  return (
    <section className="max-w-2xl mx-auto mt-10 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Add New Artwork
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Artwork Title"
          required
          className="input input-bordered w-full"
        />
        <input
          type="url"
          name="image"
          placeholder="Artwork Image URL"
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="medium"
          placeholder="Artwork Medium (e.g. Oil on Canvas, Digital, Acrylic)"
          required
          className="input input-bordered w-full"
        />
        <select
          name="category"
          required
          className="select select-bordered w-full"
        >
          <option disabled selected>
            Select Category
          </option>
          <option>Digital Art</option>
          <option>Illustration</option>
          <option>Photography</option>
          <option>Painting</option>
          <option>3D Model</option>
        </select>
        <textarea
          name="description"
          placeholder="Write a short description..."
          rows={4}
          required
          className="textarea textarea-bordered w-full"
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">
          Upload Artwork
        </button>
      </form>
    </section>
  );
};

export default AddArtwork;
