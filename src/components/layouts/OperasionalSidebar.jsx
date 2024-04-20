import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const OperasionalSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const pages = [
    { path: "/operasional/dashboard", icon: DashboardIcon, title: "Dashboard" },
    {
      path: "/operasional/suppliers",
      icon: SuppliersIcon,
      title: "Suppliers",
    },
    { path: "/operasional/customers", icon: CustomersIcon, title: "Customers" },
    {
      path: "/operasional/products",
      icon: ProductIcon,
      title: "Products",
    },
    {
      path: "/operasional/distributors",
      icon: DistributorIcon,
      title: "Distributors",
    },
    {
      path: "/operasional/sales",
      icon: SalesmanIcon,
      title: "Sales",
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
        className={`w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-white ${
          activePage === "/operasional/dashboard"
            ? "text-teal-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
      </svg>
    );
  }

  function SuppliersIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-white ${
          activePage === "/operasional/suppliers"
            ? "text-teal-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
      </svg>
    );
  }

  function CustomersIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-white ${
          activePage === "/operasional/customers"
            ? "text-teal-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
      </svg>
    );
  }

  function ProductIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-white ${
          activePage === "/operasional/products"
            ? "text-teal-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-5 14H9v-2h6v2zm3-4H6v-2h12v2zm0-4H6V8h12v2z" />
      </svg>
    );
  }

  function DistributorIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-white ${
          activePage === "/operasional/distributors"
            ? "text-teal-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M11 22v-2H5c-1.11 0-1.99-.89-1.99-2L3 5c0-1.11.89-2 2-2h10c1.11 0 2 .89 2 2v13c0 1.11-.89 2-2 2h-6v2h4c1.11 0 2-.89 2-2V5h2v15h-8zM5 5v13h6V5H5z" />
      </svg>
    );
  }

  function SalesmanIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-white ${
          activePage === "/operasional/sales"
            ? "text-teal-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 11.003V5h4a2 2 0 012 2v5.003M13 13.003V5h2l3 3v5.003M9 15.003V18"
        />
      </svg>
    );
  }

  function BackToAccessIcon() {
    return (
      <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-teal-500 dark:group-hover:text-white"
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
                    activePage === page.path ? "font-bold bg-gray-200" : ""
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
