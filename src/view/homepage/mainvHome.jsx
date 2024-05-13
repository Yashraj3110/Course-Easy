import React from "react";
import Banner from "./Banner";
import Platform from "./platform";
import Footer from "./footer";
import Beginer from "./beginer";
import Category from "./categories";
import Planguage from "./planguage";
import WOnline from "./whyonline";
import Educator from "./partner";
import "../../css/homepage.css";
import "../../css/course.css";
import "../../css/user.css";
import "../../css/Admin.css";
import { ClipLoader } from "react-spinners";


function MainvHome({sesData}) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  return (
    <>
      <Banner />
      <WOnline/>
      <Beginer />
      <Category sesData={sesData}/>
      <Planguage />
      <Educator/>
      <Platform />
    </>
  );
};

export default MainvHome;