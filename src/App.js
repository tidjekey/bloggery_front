import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Error404 from './pages/404';
import Bloggers from "./pages/dashboard/bloggers";
import Campaigns from "./pages/dashboard/campaigns";
import Admin from "./pages/dashboard/admin";
import User from "./pages/user";

import './App.css';
import CreateBlogger from "./pages/blogger/createBlogger";
import ViewBlogger from "./pages/blogger/viewBlogger";
import Wallet from "./pages/wallet";
import Support from "./pages/support";
import Links from "./pages/dashboard/links";
import CreateOffer from "./pages/campaigns/createOffer";
import ViewOffer from "./pages/campaigns/viewOffer";

import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Router>
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Routes>
        <Route path="/" element={<ProtectedRoute/>}>
          <Route index element={<Dashboard />}/>

          

          <Route path="user" element={<User />} />
          <Route path="wallet" element={<Wallet />} />

          <Route path="support" element={<Support />} />

          <Route path="campaigns" element={<Campaigns />} />
          
          <Route path="campaign/create/:id" element={<CreateOffer />} />
          <Route path="campaign/create" element={<CreateOffer />} />
          <Route path="campaign/create/to/:exclusive" element={<CreateOffer />} />
          <Route path="campaign/:id" element={<ViewOffer />} />

          <Route path="links" element={<Links />} />

          <Route path="admin" element={<Admin />} />

          <Route path="bloggers" element={<Bloggers />} />
          <Route path="blogger/create" element={<CreateBlogger />} />
          <Route path="blogger/:id" element={<ViewBlogger />} />

          
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error404 />} /> 
      </Routes>
  </Router>
  );
}

export default App;
