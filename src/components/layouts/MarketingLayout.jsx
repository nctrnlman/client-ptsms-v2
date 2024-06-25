import React, { useState } from "react";
import MarketingSidebar from "./MarketingSidebar";
import Topbar from "./Topbar";

const MarketingLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <MarketingSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <main
          className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "ml-1" : "ml-1"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MarketingLayout;
