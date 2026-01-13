import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/signup";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
