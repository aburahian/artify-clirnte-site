import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Celebrate Creativity",
      subtitle: "Explore stunning artworks from creators worldwide.",
      image: "https://i.ibb.co.com/PsVzgVTF/176937-1536x864.webp",
      btnText: "Explore Art",
      btnLink: "/explore",
    },
    {
      id: 2,
      title: "Share Your Masterpiece",
      subtitle: "Upload your art and get the recognition you deserve.",
      image: "https://i.ibb.co.com/p6WyRHfH/painting-brushes-1536x1024.jpg",
      btnText: "Upload Now",
      btnLink: "/add-artwork",
    },
    {
      id: 3,
      title: "Connect Through Art",
      subtitle: "Discover, appreciate, and connect with fellow artists.",
      image:
        "https://i.ibb.co.com/zWs3NXpB/Screenshot-2025-01-09-at-12-29-15-PM.png",
      btnText: "Join Community",
      btnLink: "/login",
    },
  ];

  return (
    <div className="mt-16">
      <section className="relative w-11/12 mx-auto rounded-3xl overflow-hidden shadow-2xl">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-[460px] md:h-[520px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative w-full h-full flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70" />

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 text-center text-white max-w-2xl px-6"
                >
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 text-gray-200">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={"/arts/addArtWork"}
                    className="inline-block px-8 py-3 bg-primary hover:bg-secondary rounded-full font-semibold shadow-md transition-all duration-300"
                  >
                    {slide.btnText}
                  </Link>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Banner;
