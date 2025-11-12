import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import TopArtists from "../components/TopArtists";
import CommunityHighlights from "../components/CommunityHighlights";
import ArtGallery from "../pages/ArtGallery";

const MainLayout = () => {
  return (
    <div className="bg-base-100">
      <Navbar></Navbar>
      <Banner></Banner>
      <Outlet></Outlet>
      <TopArtists></TopArtists>
      <CommunityHighlights></CommunityHighlights>
      <ArtGallery></ArtGallery>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
