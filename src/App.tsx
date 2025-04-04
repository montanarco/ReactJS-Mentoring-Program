import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Layout from "./Layout";
import CoreConcepts from "./pages/CoreConcepts";
import './App.css'
import Testing from "./pages/Testing";

export default function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="users" element={<Users />} />
              <Route path="testing" element={<Testing />} />
              <Route path="core-concepts" element={<CoreConcepts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      );
}

function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }