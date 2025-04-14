import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {
          /*<li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          */}
          <li>
            <Link to="/core-concepts">Core Concepts</Link>
          </li>
          <li>
            <Link to="/second-page">Second Page Components</Link>
          </li>
          <li>
            <Link to="/apply-composition">Apply composition</Link>
          </li>
          <li>
            <Link to="/testing">Testing</Link>
          </li>
          <li>
            <Link to="/movie-list-page">Movie List Page</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;