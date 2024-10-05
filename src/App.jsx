/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Navbar from './pages/Navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Courses from './pages/Courses/Courses';
import Contact from './pages/Contact/Contact';
import Explore from './pages/Explore/Explore';
import EnrollNow from './pages/EnrollNow/EnrollNow';
import Payment from './pages/Payment/Payment';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import CategoryList from './pages/CategoryList/CategoryList';
import AddCategory from './pages/AddCategory/AddCategory';
import EditCategory from './pages/EditCategory/EditCategory';
import AddVideo from './pages/AddVideo/AddVideo';
import EditVideo from './pages/EditVideo/EditVideo';
import VideoList from './pages/VideoList/VideoList';
import VideoPlayer from './pages/VideoPlayer/VideoPlayer';
import UpscGallery from './pages/UpscGallery/UpscGallery';
import MpscGallery from './pages/MpscGallery/MpscGallery';
import SscGallery from './pages/SscGallery/SscGallery';
import FreeGallery from './pages/FreeGalley/FreeGallery';
import BankGallery from './pages/BankGallery/BankGallery';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import ADashboard from './pages/ADashboard/ADashboard';
// import FixADash from './pages/FixADash/FixADash';
import AFixSide from './pages/AFixSide/AFixSide';
import SFixSide from './pages/SFixSide/SFixSide';
import CourseCard from './pages/CourseCard/CourseCard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/enrollnow" element={<EnrollNow />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/categorylist" element={<AFixSide><CategoryList /></AFixSide>} />
          <Route path="/addcategory" element={<AFixSide><AddCategory /></AFixSide>} />
          <Route path="/editcategory/:id" element={<AFixSide><EditCategory /></AFixSide>} />

          {/* Wrapping the FixADash component around the AddVideo, VideoList, and EditVideo components */}
          <Route path="/addvideo" element={<AFixSide><AddVideo /></AFixSide>} />
          <Route path="/videolist" element={<AFixSide><VideoList /></AFixSide>} />
          <Route path="/editvideo/:id" element={<AFixSide><EditVideo /></AFixSide>} />

          <Route path="/videoplayer/:id" element={<VideoPlayer />} />

          {/* Routes for UPSC, MPSC, and SSC galleries */}
          <Route path="/upscgallery" element={<SFixSide><UpscGallery /></SFixSide>} />
          <Route path="/mpscgallery" element={<SFixSide><MpscGallery /></SFixSide>} />
          <Route path="/sscgallery" element={<SscGallery />} />

          <Route path="/freegallery" element={<FreeGallery />} />
          <Route path="/bankgallery" element={<SFixSide><BankGallery /></SFixSide>} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/adashboard" element={<ADashboard />} />
          <Route path="/afixside" element={<AFixSide />} />
          <Route path="/sfixside" element={<SFixSide />} />
          <Route path="/coursecard" element={<CourseCard />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
