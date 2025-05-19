import {  RouterProvider } from "react-router-dom";
import React from 'react';
import './App.css'
import {myBrowser} from "./router";

export default function App() {
  return <RouterProvider router={myBrowser} />
}