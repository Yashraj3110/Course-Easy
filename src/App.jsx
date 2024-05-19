import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import MainPage from "./view/Mainpage";
import Coursein from "./view/Course/coursein";
import CoursePage from "./view/Course/Coursepage";
import Userpage from "./view/user-page/Profilepage";
import UserForm from "./view/user-page/User-Form";
import UserDetails from "./view/user-page/UserDetails";
import Purchased from "./view/user-page/purchased";
import Saved from "./view/user-page/saved";
import AdminPage from "./view/Admin/adminpage";
import Fseller from "./view/Educator/Fseller";
import GoogleAuthSuccess from "./view/Googleauth";
import axios from "axios";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" />} />
        <Route path="/HomePage" element={<MainPage />} />
       
        <Route path="/auth/google/success" element={<GoogleAuthSuccess />} />


        <Route path="/:topic/courses" element={<CoursePage />} />
        <Route path="/course/:CourseID" element={<Coursein />} />


        <Route path="/Educator" element={<Fseller />} />


        <Route path="/User-Profile/*" element={<Userpage />} />
        <Route path="/User-Profile/details" element={<UserDetails />} />
        {/* Add route for UserDetails */}
        <Route path="/User-Profile/edit" element={<UserForm />} />
        <Route path="/User-Profile/purchased" element={<Purchased />} />
        <Route path="/User-Profile/saved" element={<Saved />} />


        <Route path="/Admin" element={<AdminPage />} />
      </Routes>
    </Router>


  );
}

export default App;
