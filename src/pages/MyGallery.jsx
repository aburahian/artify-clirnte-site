import { useEffect, useState } from "react";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";

import Spinner from "../components/Spinner";
import Swal from "sweetalert2";

const MyGallery = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArt, setSelectedArt] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    medium: "",
    image: "",
    description: "",
  });
  useEffect(() => {
    if (!user) return;
    axiosInstance
      .get(`/artworks?artistEmail=${user.email}`)
      .then((res) => {
        setArts(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [user, axiosInstance]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/artworks/${id}`).then(() => {
          setArts((prev) => prev.filter((art) => art._id !== id));
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const openUpdateModal = (art) => {
    setSelectedArt(art);
    setUpdatedData({
      title: art.title,
      medium: art.medium,
      image: art.image,
      description: art.description,
    });
    document.getElementById("update_modal").showModal();
  };

  const handleUpdate = () => {
    axiosInstance.put(`/artworks/${selectedArt._id}`, updatedData).then(() => {
      setArts((prev) =>
        prev.map((art) =>
          art._id === selectedArt._id ? { ...art, ...updatedData } : art
        )
      );
      setSelectedArt(null);
      setUpdatedData({ title: "", medium: "", image: "", description: "" });
      document.getElementById("update_modal").close();
      Swal.fire({
        title: "Updated!",
        text: "Your artwork has been updated.",
        icon: "success",
      });
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-11/12 mx-auto py-12">
      <h1 className="text-3xl text-primary font-bold mb-8">My Gallery</h1>
      <div className="border-b-2 border-primary my-9"></div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {arts.map((art) => (
          <div
            key={art._id}
            className="flex flex-col justify-between p-4 rounded-lg shadow-lg bg-base-100"
          >
            <img
              src={art.image}
              alt={art.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold">{art.title}</h2>
            <p className="text-gray-600">{art.medium}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openUpdateModal(art)}
                className="btn btn-primary btn-sm"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(art._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-primary text-lg mb-4 text-center">
            Update Artwork
          </h3>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              value={updatedData.title}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, title: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Medium</span>
            </label>
            <input
              type="text"
              value={updatedData.medium}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, medium: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              value={updatedData.image}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, image: e.target.value })
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              value={updatedData.description}
              rows={4}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, description: e.target.value })
              }
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn" onClick={() => setSelectedArt(null)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="btn btn-primary"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyGallery;
