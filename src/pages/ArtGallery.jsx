import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";

const ArtGallery = () => {
  const axiosInstance = useAxiosSecure();
  const { setLoading } = useAuth();
  const [arts, setArts] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("artWorks");
        setArts(res.data);
        const galleryImages = res.data.map((art) => ({
          original: art.image,
          thumbnail: art.image,
          description: `${art.title} by ${art.artistName || "Unknown"}`,
        }));

        setImages(galleryImages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArts();
  }, [axiosInstance, setLoading]);

  if (images.length === 0) {
    return <p className="text-center mt-10">No artworks to display.</p>;
  }

  return (
    <div className="w-11/12 mx-auto my-30">
      <h2 className="text-3xl font-bold mb-4 text-primary  ">Art Gallery</h2>
      <div className="border-b-2 border-primary my-9 "></div>
      <ImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={true}
        autoPlay={false}
        slideInterval={5000}
      />
    </div>
  );
};

export default ArtGallery;
