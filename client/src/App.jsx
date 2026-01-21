import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Jobs from "./pages/jobs/Jobs";
import Profile from "./pages/profile/profile";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterPostJob from "./pages/recruiter/RecruiterPostJob";
import RecruiterMyJobs from "./pages/recruiter/RecruiterMyJobs";
import RecruiterApplicants from "./pages/recruiter/RecruiterApplicants";
import RecruiterCreateProfile from "./pages/recruiter/RecruiterCreateProfile";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile";


import PublicRoute from "./routes/publicRoute";
import PrivateRoute from "./routes/privateRoute";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/my-jobs" element={<RecruiterMyJobs />} />
        <Route path="/recruiter/edit-job/:jobId" element={<RecruiterPostJob editMode={true}/>}/>
        <Route path="/recruiter/job/:jobId/applicants" element={<RecruiterApplicants />}/>
        <Route path="/recruiter/create-profile" element={<RecruiterCreateProfile/>}/>
        <Route path="/recruiter/post-job" element={<RecruiterPostJob />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />}/> 

      </Route>
    </Routes>
  );
}

export default App;
