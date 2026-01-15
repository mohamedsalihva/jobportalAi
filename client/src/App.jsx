import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Jobs from "./pages/jobs/jobs";
import Home from "./pages/home/Home";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/jobs" element={<Jobs/>}/>
      </Routes>
    </BrowserRouter>
  );
}
