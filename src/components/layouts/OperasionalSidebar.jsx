import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const OperasionalSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useState(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const pages = [
    { path: "/operasional/dashboard", icon: DashboardIcon, title: "Dashboard" },
    {
      path: "/operasional/suppliers",
      icon: DistributorIcon,
      title: "Suppliers",
    },
    { path: "/operasional/customers", icon: HospitalIcon, title: "Customers" },
    {
      path: "/operasional/distributors",
      icon: DistributorIcon,
      title: "Distributors",
    },
    {
      path: "/",
      icon: BackToAccessIcon,
      title: "Back to Access",
    },
  ];

  function DashboardIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-brand-500 dark:group-hover:text-white ${
          activePage === "/operasional/dashboard"
            ? "text-brand-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 21"
      >
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
      </svg>
    );
  }

  function DistributorIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-brand-500 dark:group-hover:text-white ${
          activePage === "/operasional/suppliers"
            ? "text-brand-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 18"
      >
        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
      </svg>
    );
  }

  function HospitalIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-brand-500 dark:group-hover:text-white ${
          activePage === "/operasional/customers"
            ? "text-brand-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 20"
      >
        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
      </svg>
    );
  }

  function BackToAccessIcon() {
    return (
      <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-brand-500 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
        />
      </svg>
    );
  }

  const handlePageClick = (pagePath) => {
    setActivePage(pagePath);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-50 sm:hidden"
          onClick={onClose}
        ></div>
      )}
      <aside
        id="default-sidebar"
        className={`fixed sm:relative left-0 z-20 sm:z-0 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  to={page.path}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    activePage === page.path && "font-bold bg-gray-200"
                  }`}
                  onClick={() => handlePageClick(page.path)}
                >
                  <page.icon />
                  <span className="ms-3">{page.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default OperasionalSidebar;
