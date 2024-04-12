import React, { useState } from "react";
import Sidebar from "./OperasionalSidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // <div className="flex">
    //   <Sidebar isOpen={isSidebarOpen} />
    //   <div className="flex flex-col gap-6 w-full">
    //     <Topbar toggleSidebar={toggleSidebar} />
    //     <div className="">{children}</div>
    //   </div>
    // </div>
    <div className="">
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="p-4 w-full overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
