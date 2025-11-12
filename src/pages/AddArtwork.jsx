import React from "react";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";

const AddArtwork = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const medium = e.target.medium.value || null;
    const dimensions = e.target.dimensions.value || null;
    const price = e.target.price.value || null;
    const visibility = e.target.visibility.value;

    const addArt = {
      title,
      image,
      category,
      description,
      medium,
      dimensions,
      price,
      visibility,
      artistName: user?.displayName || "Unknown Artist",
      artistEmail: user?.email,
      createdAt: new Date(),
    };
    axiosInstance.post("/artWorks", addArt).then((res) => {
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
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        <Typewriter
          words={[
            "Add New Artwork",
            "Show Your Creativity",
            "Share Your Vision",
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="font-semibold ">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Artwork Title"
          required
          className="input input-bordered w-full"
        />
        <label className="font-semibold">Image URL</label>
        <input
          type="url"
          name="image"
          placeholder="Artwork Image URL"
          required
          className="input input-bordered w-full"
        />
        <label className="font-semibold">Category</label>
        <select
          name="category"
          required
          className="select select-bordered w-full"
        >
          <option disabled>Select Category</option>
          <option>Digital Art</option>
          <option>Illustration</option>
          <option>Photography</option>
          <option>Painting</option>
          <option>3D Model</option>
        </select>
        <label className="font-semibold">Medium / Tools</label>
        <input
          type="text"
          name="medium"
          placeholder="Artwork Medium (e.g. Oil on Canvas, Digital, Acrylic)"
          required
          className="input input-bordered w-full"
        />
        <label className="font-semibold">Dimensions (optional)</label>
        <input
          type="text"
          name="dimensions"
          placeholder="e.g., 24x36 inches"
          className="input input-bordered w-full mt-1"
        />
        <label className="font-semibold">Price (optional)</label>
        <input
          type="number"
          name="price"
          placeholder="Enter price (if for sale)"
          className="input input-bordered w-full mt-1"
        />
        <label className="font-semibold">Visibility</label>
        <select
          name="visibility"
          className="select select-bordered w-full mt-1"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <label className="font-semibold">Description</label>
        <textarea
          name="description"
          placeholder="Write a short description..."
          rows={4}
          required
          className="textarea textarea-bordered w-full"
        ></textarea>
        <label className="font-semibold">User Name</label>
        <input
          type="text"
          name="userName"
          defaultValue={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full mt-1  "
        />
        <label className="font-semibold">User Email</label>
        <input
          type="email"
          name="userEmail"
          defaultValue={user?.email || ""}
          readOnly
          className="input input-bordered w-full mt-1 "
        />
        <button type="submit" className="btn btn-primary w-full">
          Upload Artwork
        </button>
      </form>
    </section>
  );
};

export default AddArtwork;
