import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-50 px-6 py-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-zinc-600">
          © {new Date().getFullYear()} National University Web Programming Lab
        </p>
        <nav className="flex gap-6 text-sm font-medium text-zinc-700">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/articles">Articles</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
