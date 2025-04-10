import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Home from "./Home";
import Layout from "./Layout";
import CoreConcepts from "./pages/CoreConcepts";
import './App.css'
import Testing from "./pages/Testing";
import SecondPageComponents from "./pages/SecondPageComponents";
import ApplyComposition from "./pages/ApplyComposition";

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
              <Route path="second-page" element={<SecondPageComponents />} />
              <Route path="apply-composition" element={<ApplyComposition />} />
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