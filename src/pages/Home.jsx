import AccessManagementCard from "../components/cards/AccessManagementCard";
import { useSelector } from "react-redux";
import smsLogo from "../assets/logo/sms-logo.jpeg";
import backgroundImage from "../assets/background/bg-login.jpg";

function Home() {
  const userData = useSelector((state) => state.user.User);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* <header className="bg-white shadow-md">
          <div className="container mx-auto flex items-center justify-between px-4 py-2">
            <img src={smsLogo} alt="SMS Logo" width={80} />
          </div>
        </header> */}
      <main className="container mx-auto px-4 py-8">
        <section className="bg-white bg-opacity-50 p-8 rounded-lg shadow-md mb-8 backdrop-filter backdrop-blur-lg animate-fade-in glassmorphism">
          <h1 className="text-4xl font-bold text-center text-teal-800 mb-4 animate-slide-up">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-xl text-center text-gray-600 animate-slide-up animate-delay-200">
            We're glad to see you back at PT Sehat Murni Sejahtera System.
          </p>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.role_id === 1 && (
            <>
              <AccessManagementCard
                card={{
                  title: "Operasional",
                  link: "operasional/dashboard",
                  description: "Manage operational activities",
                  icon: "mdi:database",
                }}
              />
              <AccessManagementCard
                card={{
                  title: "Setting",
                  link: "setting/dashboard",
                  description: "Configure system settings",
                  icon: "mdi:cog-outline",
                }}
              />
              <AccessManagementCard
                card={{
                  title: "Marketing",
                  link: "marketing/dashboard",
                  description: "Manage marketing campaigns",
                  icon: "mdi:bullhorn",
                }}
              />
            </>
          )}
          {userData.role_id === 2 && (
            <AccessManagementCard
              card={{
                title: "Marketing",
                link: "marketing/dashboard",
                description: "Manage marketing campaigns",
                icon: "mdi:bullhorn",
              }}
            />
          )}

          {userData.role_id === 3 && (
            <AccessManagementCard
              card={{
                title: "Operasional",
                link: "operasional/dashboard",
                description: "Manage operational activities",
                icon: "mdi:database",
              }}
            />
          )}
        </section>
      </main>
      {/* <footer className="bg-white shadow-md mt-8 backdrop-filter backdrop-blur-lg position-bottom-6">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-gray-600">
            &copy; 2024 PT Sehat Murni Sejahtera System. All rights reserved.
          </p>
        </div>
      </footer> */}
    </div>
  );
}

export default Home;
