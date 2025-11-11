// src/components/Layout.jsx
import { useEffect, useState } from "react";

export default function Layout({ children, noNavbarPadding = false }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`font-poppins min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white transition-colors relative${!noNavbarPadding ? ' pt-20' : ''}`}
    >
      {/* Glowing White Dots Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="w-full h-full">
          <circle cx="10%" cy="15%" r="1.2" fill="#fff" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.2;2.2;1.2" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="80%" cy="25%" r="0.9" fill="#fff" opacity="0.5">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="r" values="0.9;1.7;0.9" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="60%" cy="80%" r="1.3" fill="#fff" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.3;2.3;1.3" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="30%" cy="60%" r="0.7" fill="#fff" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="r" values="0.7;1.5;0.7" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="50%" cy="40%" r="1.1" fill="#fff" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="r" values="1.1;2.1;1.1" dur="2.6s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
