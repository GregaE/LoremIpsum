import React from 'react';
import {  Link } from "react-router-dom";

export default function Header() {

  return (
    <div className="w-full h-1/10 py-4 bg-primary-bg flex flex-row justify-between items-center px-8">
      <h2>Header Name</h2>
      <Link to="/Profile">
      <div id="profile" className="flex flex-row justify-around items-center">
        <h2>UserName</h2>
          <img
            className="w-10 h-10 rounded-full mx-8"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt=""/>
      </div>
      </Link>
    </div>
  );
}