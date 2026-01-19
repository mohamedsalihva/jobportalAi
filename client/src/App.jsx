import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Jobs from "./pages/jobs/Jobs";

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
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
  );
}

export default App;
